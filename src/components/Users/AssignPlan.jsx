import React, { useEffect, useState } from "react";
import { UserCircle, Mail, Phone, Cake, CalendarDays, DollarSign } from 'lucide-react';
import { IoMaleFemaleOutline } from "react-icons/io5";
import moment from 'moment';
import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { BsHourglassSplit } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assignPlan } from "../../store/features/user-slice";
import male from '../../img/male.png'
import female from '../../img/female.png'
import toast from "react-hot-toast";
import { getUserActivePlan } from "../../store/features/plans-slice";
import ProfileItem from "../ui/ProfileItem";

const AssignPlan = () => {
	const navigate = useNavigate()
	const location = useLocation();
	const dispatch = useDispatch()
	const [ userData, setUserData ] = useState([]);
	const [ planList, setPlanList ] = useState([]);
	const [ userId, setUserId ] = useState();
	// const [ currentPlanStatus, setCurrentPlanStatus ] = useState();
	const [ profileImg, setProfileImg ] = useState();

	useEffect(() => {
		setUserId(location?.state?._id)
		dispatch(getUserActivePlan(location?.state?._id))
		setProfileImg(location?.state?.userDetails[ 0 ]?.profileImage)
	}, [ location ])

	const activePlanList = useSelector((state) => state.planSlice.activePlan);
	const userActivePlan = useSelector((state) => state.planSlice.userActivePlan);
	// console.log(userActivePlan?.data?.agent);

	useEffect(() => {
		setUserData(userActivePlan?.data?.agent)
	}, [ activePlanList, userActivePlan ])

	const handelBack = () => {
		navigate(-1);
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
			<div className="w-12 bg-white rounded-full border-2 flex justify-center cursor-pointer mb-2 lg:mb-0" onClick={handelBack}><IoIosArrowRoundBack size={32} /></div>
			<div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
				{/* User Profile Section */}
				<div className="px-8 py-3 bg-gradient-to-r from-gold to-red-200 flex items-center gap-8">
					{profileImg ?
						<img src={profileImg} alt="img" className="w-32 h-32 rounded-full object-cover bg-white" />
						: <img src={userData?.gender === 'male' ? male : female} alt="img" className="w-32 h-32 bg-white rounded-full object-cover" />
					}
					<div>
						<h1 className="text-4xl font-bold text-gray-800 capitalize">
							{`${userData?.firstName || ''} ${userData?.lastName || ''}`}
						</h1>
						<p className="uppercase text-gray-700">ID: {userData?._id?.slice(-8)}</p>
					</div>
				</div>
				<div className="p-8">
					<div className="space-y-6">
						{/* User Details */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<ProfileItem
								icon={<Mail className="w-5 h-5" />}
								label="Email"
								value={userData?.email}
								isVerifiedEmail={userData?.isVerifiedEmail}
							/>
							<ProfileItem
								icon={<Phone className="w-5 h-5" />}
								label="Mobile"
								value={userData?.mobile}
								isVerifiedMobile={userData?.isVerifiedMobile}
							/>
							<ProfileItem
								icon={<IoMaleFemaleOutline className="w-5 h-5" />}
								label="Gender"
								value={userData?.gender}
							/>
							<ProfileItem
								icon={<UserCircle className="w-5 h-5" />}
								label="On Behalf"
								value={userData?.onBehalf}
							/>
							<ProfileItem
								icon={<Cake className="w-5 h-5" />}
								label="Date of Birth"
								value={moment(userData?.dateOfBirth).format('DD MMM YYYY')}
							/>
							<ProfileItem
								icon={<CalendarDays className="w-5 h-5" />}
								label="Member Since"
								value={moment(userData?.createdAt).format('DD MMM YYYY')}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-5xl mx-auto mt-6 bg-gray flex flex-col gap-8">
				{/* Plan Details or Assign Plan Section */}

				<div className="bg-white shadow-md rounded-lg overflow-hidden">
					{userData?.plan && (
						<div className="">
							{/* // Plan Details */}
							<div className={`p-8 ${formateDate(userData.planExpiry)?.currentStatus === 'Expired' ? 'bg-red-200' : 'bg-green-600'}`}>
								<h2 className={`text-2xl font-bold mb-4 flex items-center ${formateDate(userData?.planExpiry)?.currentStatus === 'Expired' ? 'text-red-600' : 'text-green-600'}`}>

									<FaCreditCard className="mr-2 text-gray-600" /> <span className="text-gray-600"> Active Plan Details&nbsp; </span> {formateDate(userData?.planExpiry)?.currentStatus === 'Expired' && "(Expired)"}
								</h2>
							</div>
							<div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<FaCreditCard className={`mr-2 ${formateDate(userData?.planExpiry)?.currentStatus === 'Expired' ? 'text-gray-600' : 'text-green-500'}`} />
									<div>
										<span className="text-gray-600 font-medium">Plan Name:</span>
										<span className="text-gray-800 block mt-1">{userData?.plan?.name}</span>
									</div>
								</div>
								<div className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<DollarSign className={`mr-2 ${formateDate(userData?.planExpiry)?.currentStatus === 'Expired' ? 'text-gray-600' : 'text-green-500'}`} />
									<div>
										<span className="text-gray-600 font-medium">Plan Price:</span>
										<span className="text-gray-800 block mt-1">BD {userData?.plan?.price}</span>
									</div>
								</div>
								<div className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<BsHourglassSplit className={`mr-2 ${formateDate(userData?.planExpiry)?.currentStatus === 'Expired' ? 'text-gray-600' : 'text-green-500'}`} />
									<div>
										<span className="text-gray-600 font-medium">Plan Duration:</span>
										<span className="text-gray-800 block mt-1">{userData?.plan?.duration} {userData.plan.duration === '1' ? 'Month' : 'Months'}</span>
									</div>
								</div>
								<div className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<FaCalendarAlt className={`mr-2 ${formateDate(userData?.planExpiry)?.currentStatus === 'Expired' ? 'text-gray-600' : 'text-green-500'}`} />
									<div>
										<span className="text-gray-600 font-medium">Plan Expiry:</span>
										<span className="text-gray-800 block mt-1">
											{moment(userData?.planExpiry).format('DD MMM YYYY')}
											{/* {formateDate(userData?.planExpiry)} */}
										</span>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

			</div >
		</>
	);
};
export default AssignPlan