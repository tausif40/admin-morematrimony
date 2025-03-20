import React, { useState, useRef, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { AiOutlineLogin } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginByAdmin, setFilter, useStatusToggle } from "../../store/features/user-slice";
import male from '../../img/male.png'
import female from '../../img/female.png'
import { Pagination, Switch } from 'antd';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UsersTable = () => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const debounceTimer = useRef(null);
  const [ openMenu, setOpenMenu ] = useState(null);
  const [ users, setUsers ] = useState([]);

  const [ filterList, setFilterList ] = useState({
    page: '',
    limit: '',
    totalUsers: '',
    isActive: '',
    planType: '',
    search: ''
  })

  const usersList = useSelector((state) => state.userSlice.users);
  const filterData = useSelector((state) => state.userSlice.filter);
  const prevFilterListRef = useRef(filterList);


  useEffect(() => {
    dispatch(getUser(filterList));
  }, [ dispatch ]);

  useEffect(() => {
    console.log(usersList?.data);
    setUsers(usersList?.data?.users);
  }, [ usersList ]);


  useEffect(() => {
    if (usersList?.data && (filterList.limit !== usersList.data.limit || filterList.page !== usersList.data.page || filterList.totalUsers !== usersList.data.totalUsers)
    ) {
      console.log(filterData);
      setFilterList((prevFilter) => ({
        ...prevFilter,
        limit: filterData?.limit,
        page: filterData?.page || usersList.data.currentPage,
        totalUsers: filterData?.totalUsers || usersList.data.totalUsers,
      }));
    }
    dispatch(setFilter(filterList));
  }, [ usersList, filterData ]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      if (JSON.stringify(prevFilterListRef.current) !== JSON.stringify(filterList)) {
        dispatch(getUser(filterList));
        prevFilterListRef.current = filterList;
      }
    }, 500);
    return () => clearTimeout(debounceTimer.current);
  }, [ filterList, dispatch ]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handelLogin = async (id) => {
    try {
      const res = await dispatch(loginByAdmin(id)).unwrap();
      console.log(res);
      const accessToken = res?.admin?.tokens?.access?.token;
      const refreshToken = res?.admin?.tokens?.refresh?.token;
      // const url = `http://localhost:3000/?token=${accessToken}`;
      const url = `https://morematrimony.com/?token=${accessToken}`;
      window.open(url, '_blank');
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.message || "Login failed.";
      toast.error(errorMessage);
    }
  }

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const handelNavigate = (useData) => {
    navigate('/users/assign-plan', { state: useData })
  }
  const handelUseStatusToggle = (id) => {
    console.log("id=", id);
    dispatch(useStatusToggle(id));
    setOpenMenu(null)
  }

  const formateDate = (formaDate) => {
    const date = new Date(formaDate);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;
    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    let currentStatus;
    daysLeft < 0 ? currentStatus = `Expired` : currentStatus = `${daysLeft} days left`
    return { formattedDate, currentStatus };
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Users Table</h1>
      </div>
      <div className="w-full my-4 flex gap-4">
        <input type="text" className="w-full p-2" onChange={(e) => setFilterList((prevFilter) => ({ ...prevFilter, search: e.target.value }))} />
        <select name="" id="" className="w-52 p-2"
          value={filterList.planType}
          onChange={(e) => setFilterList((prev) => ({ ...prev, planType: e.target.value }))
          }>
          <option value="">All Users</option>
          <option value="free">Free User</option>
          <option value="premium">Paid User</option>
        </select>
      </div>
      <div className="overflow-x-auto overflow-y-visible bg-white shadow-md rounded-lg p-2">
        <table className="min-w-full">
          <thead>
            <tr className="bg-slate-200 text-left text-gray-700">
              <th className="p-4 text-center">USER</th>
              <th className="p-4 text-center w-36">User ID</th>
              <th className="p-4">Gender</th>
              <th className="p-4 text-center">Plan Expiry</th>
              <th className="p-4  text-center">Member Since</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Login</th>
              <th className="p-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className={`${openMenu === user._id ? 'bg-red-50' : 'hover:bg-gray-50'} border-t `}>
                <td className="p-4 flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden cursor-pointer" onClick={() => handelNavigate(user)}>
                    {user?.userDetails[ 0 ]?.profileImage
                      ? <img src={user?.userDetails[ 0 ]?.profileImage} alt="img" className="w-10 h-10 rounded-full object-cover" />
                      : <img src={user.gender === 'male' ? male : female} alt="img" className="w-10 h-10 rounded-full object-cover" />
                    }
                  </div>
                  <div>
                    <p className="font-semibold capitalize cursor-pointer hover:text-blue-600 transition" onClick={() => handelNavigate(user)}>{user.firstName} {user.lastName}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-center uppercase">{user._id?.slice(-8)}</td>
                <td className="p-4 text-gray-600 capitalize">{user.gender}</td>

                <td className="p-4 text-gray-600 text-center">
                  <p className={`min-w-max text-sm ${formateDate(user.planExpiry)?.currentStatus === 'Expired' ? 'text-red-600' : 'text-green-600'}`}>{user.planExpiry ? `${formateDate(user.planExpiry)?.currentStatus}` : ''}</p>
                  <p className="min-w-max">{user.planExpiry ? formateDate(user.planExpiry)?.formattedDate : '-'}</p>
                </td>
                <td className="p-4 text-gray-600 text-center"><p className="min-w-max">{formateDate(user.createdAt)?.formattedDate}</p></td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 text-sm  rounded-full ${user?.isActive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                    {user?.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {/* <Switch defaultChecked onChange={onChange} /> */}
                </td>

                <td className="p-4 text-gray-600 text-center">
                  <p className="cursor-pointer p-2" onClick={() => handelLogin(user._id)} style={{ display: 'inline-block' }}><AiOutlineLogin size={20} /></p>
                </td>
                <td className="p-4 relative text-center">
                  <button
                    className="p-2 rounded-full hover:bg-gray-200"
                    onClick={() => setOpenMenu(openMenu === user._id ? null : user._id)}
                  >
                    <IoEllipsisVertical />
                  </button>
                  {openMenu === user._id && (
                    <div
                      ref={menuRef}
                      className="absolute overflow-visible right-12 mt-2 w-40 bg-white border rounded-lg shadow-md z-50"
                    >
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handelNavigate(user)}>View</button>
                      {/* <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Assign Plan</button> */}
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handelUseStatusToggle(user._id)}>{user?.isActive ? 'Inactive' : 'Active'}</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10 bg-white p-2 rounded-lg border">
        <Pagination align="center" defaultCurrent={filterData?.page} total={filterList?.totalUsers} pageSize={filterList?.limit || 10} showQuickJumper
          onChange={(page) => {
            setFilterList((prev) => ({ ...prev, page: page }));
          }}
          showSizeChanger
          onShowSizeChange={(current, size) => {
            setFilterList((prevFilter) => ({ ...prevFilter, limit: size, page: current }));
          }}
        />
      </div>
    </>
  );
};

export default UsersTable;
