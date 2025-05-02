import React, { useEffect, useState } from 'react';
import ProfileItem from '../ui/ProfileItem';
import { useLocation, useNavigate } from 'react-router-dom';
import male from '../../img/male.png'
import female from '../../img/female.png'
import { Cake, CalendarDays, DollarSign, Mail, Phone, UserCircle } from 'lucide-react';
import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsHourglassSplit } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMaleFemaleOutline } from 'react-icons/io5';
import moment from 'moment';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserActivePlan } from '../../store/features/plans-slice';
import toast from 'react-hot-toast';
import { assignPlan } from '../../store/features/user-slice';
import { formateDate } from '../../utils/utils';
import Modal from '../Modal/Modal'

const PaymentDetails = () => {
	const location = useLocation();
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [ userData, setUserData ] = useState()
	const [ plan, setPlan ] = useState()
	const [ planList, setPlanList ] = useState([]);
	const [ userId, setUserId ] = useState();
	const [ activePlan, setActivePlan ] = useState("");
	const [ isLoading, setIsLoading ] = useState(false);
	const [ successAssign, setSuccessAssign ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ showModal, setShowModal ] = useState(false);
	const [ selectedPlan, setSelectedPlan ] = useState(location?.state?.planId?._id);
	const { currentStatus } = formateDate(userData?.planExpiry);
	const [ isImage, setIsImage ] = useState(false);

	useEffect(() => {
		setUserData(location?.state?.agentId);
		setPlan(location?.state?.planId);
		const test = fileCheck()
		console.log("fileCheck - ", test);
	}, [ location ])


	useEffect(() => {
		setUserId(location?.state?.agentId?._id)
		dispatch(getUserActivePlan(location?.state?.agentId?._id))
	}, [ location, dispatch ])

	const activePlanList = useSelector((state) => state.planSlice.activePlan);
	const userActivePlan = useSelector((state) => state.planSlice.userActivePlan);

	console.log(userActivePlan);

	useEffect(() => {
		setActivePlan(userActivePlan?.data?.agent?.plan)
		setPlanList(activePlanList?.data?.plans)
	}, [ activePlanList, userActivePlan ])

	const fileCheck = (url) => {
		const imageExtensions = [ 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp' ];
		const extension = url?.split('.').pop()?.toLowerCase();
		return imageExtensions.includes(extension ?? '');
	};

	// useEffect(() => {
	// 	if (isImageFile(transactionImage)) {
	// 	}
	// }, [ location?.state?.transactionImage ])

	const handlePlanConformation = () => {
		if (selectedPlan === '') {
			toast.error('Please Select PLan');
			return;
		} else {
			setShowModal(true)
		}
	}

	const handleAssignPlan = async () => {
		setShowModal(false)
		const loadingToast = toast.loading('Assigning...');
		try {
			setIsLoading(true)
			const data = { userId: userId, planId: selectedPlan }
			// console.log("Assigning plan:", data);
			const res = await dispatch(assignPlan(data)).unwrap();
			console.log(res);
			// if (res?.data) {
			setIsLoading(false)
			setSuccessAssign(true)
			setError(false)
			// }
			dispatch(getUserActivePlan(userId))
			toast.success('Assigned successfully', { id: loadingToast });
		} catch (err) {
			console.log(err);
			setIsLoading(false)
			setError(true)
			toast.error('Assigned failed.', { id: loadingToast });
		}
	};

	const handelBack = () => {
		navigate(-1);
	}

	return (
		<>
			{showModal && <Modal show={showModal} onClose={() => { setShowModal(false); onClose(); }}>
				<p className='font-semibold text-xl'>Are you sure?</p>
				<div className='border mt-4 px-2 py-2 rounded-md shadow bg-slate-100'>
					<ul className="grid grid-cols-2 gap-2 text-gray-700">
						<li>{plan?.name}</li>
						<li>{plan?.price} BD</li>
						<li>{plan?.duration} months</li>
						<li>{plan?.profileLimit} Mobile Number</li>
					</ul>
				</div>
				<div className='flex justify-end gap-5 mt-8'>
					<button className='button bg-gray-300' onClick={() => setShowModal(false)}>Cancel</button>
					<button className='button bg-emerald-400' onClick={handleAssignPlan}>Yes</button>
				</div>
			</Modal>
			}
			<div className="w-12 bg-white rounded-full border-2 flex justify-center cursor-pointer mb-2 lg:mb-0" onClick={handelBack}><IoIosArrowRoundBack size={32} /></div>
			<div className="max-w-5xl mx-auto p-8 font-sans bg-gradient-to-tr min-h-screen">
				{/* <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10 drop-shadow-sm">💳 Transaction Details</h1> */}

				{/* Agent Info */}
				<div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
					{/* User Profile Section */}
					<div className="px-8 py-3 bg-gradient-to-r from-gold to-red-200 flex items-center gap-8">
						{/* {profileImg ?
							<img src={profileImg} alt="img" className="w-32 h-32 rounded-full object-cover bg-white" />
							: <img src={userData?.gender === 'male' ? male : female} alt="img" className="w-32 h-32 bg-white rounded-full object-cover" />
						} */}
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

				<div className='grid grid-cols-2 gap-5 mt-8'>
					{/* Plan Info */}
					<div className="col-span-1 lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-all duration-300">
						<h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
							<span className="text-3xl">📦</span> Plan Info
						</h2>
						<img src={plan?.image} alt="Plan" className="my-4 w-full h-52 object-cover rounded-lg border border-gray-200" />
						<ul className="space-y-2 text-gray-700">
							<li><strong>Plan:</strong> {plan?.name}</li>
							<li><strong>Price:</strong> {plan?.price} BD</li>
							<li><strong>Duration:</strong> {plan?.duration} months</li>
							<li><strong>View:</strong> {plan?.profileLimit} Mobile Number</li>
						</ul>
					</div>

					{/* Transaction Image */}
					<div className="col-span-1 lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all duration-300">
						<h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
							<span className="text-3xl">🧾</span> Upload Image
						</h2>
						{isImage ?
							<PhotoProvider maskOpacity={0.6}>
								<PhotoView src={location?.state?.transactionImage}>
									<img src={location?.state?.transactionImage} alt="transition image" className='rounded-lg border border-gray-300 w-full h-52 object-cover' />
								</PhotoView>
							</PhotoProvider>
							: <div className='w-full min-h-52 bg-gray-200 flex items-center justify-center rounded-lg'>
								<a
									href={location?.state?.transactionImage}
									download
									className="px-6 py-2 border bg-emerald-200 hover:bg-emerald-300 border-green-500 rounded-full text-lg font-semibold transition"
								>
									Download
								</a>
							</div>
						}
						{/* <img
						src={location?.state?.transactionImage}
						alt="Transaction"
						className="rounded-lg border border-gray-300 w-full h-52 object-cover"
					/> */}
						<p className="text-sm text-gray-600 mt-5 space-y-2">
							<p>
								<strong>Date:</strong> {moment(userData?.updatedAt).format('DD MMM YYYY')}
							</p>
							<p>
								<strong>Time:</strong> {moment(userData?.updatedAt).format('h:mm:ss A')}
							</p>
						</p>
					</div>
				</div >

				<div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
					{activePlan && (
						<div className="">
							{/* // Plan Details */}
							<div className={`p-8 ${currentStatus === 'Expired' ? 'bg-red-200' : 'bg-green-500'}`}>
								<h2 className={`text-2xl font-bold mb-4 flex items-center ${currentStatus === 'Expired' ? 'text-gray-600' : 'text-white'}`}>

									<FaCreditCard className="mr-2" /> Active Plan Details&nbsp; <span className="text-red-500">{currentStatus === 'Expired' && "(Expired)"}</span>
								</h2>
							</div>
							<div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<FaCreditCard className={`mr-2 ${currentStatus === 'Expired' ? 'text-gray-600' : 'text-green-500'}`} />
									<div>
										<span className="text-gray-600 font-medium">Plan Name:</span>
										<span className="text-gray-800 block mt-1">{activePlan?.name}</span>
									</div>
								</div>
								<div className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<DollarSign className={`mr-2 ${currentStatus === 'Expired' ? 'text-gray-600' : 'text-green-500'}`} />
									<div>
										<span className="text-gray-600 font-medium">Plan Price:</span>
										<span className="text-gray-800 block mt-1">BD {activePlan?.price}</span>
									</div>
								</div>
								<div className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<BsHourglassSplit className={`mr-2 ${currentStatus === 'Expired' ? 'text-gray-600' : 'text-green-500'}`} />
									<div>
										<span className="text-gray-600 font-medium">Plan Duration:</span>
										<span className="text-gray-800 block mt-1">{activePlan?.duration} {activePlan?.duration === '1' ? 'Month' : 'Months'}</span>
									</div>
								</div>
								<div className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<FaCalendarAlt className={`mr-2 ${currentStatus === 'Expired' ? 'text-gray-600' : 'text-green-500'}`} />
									<div>
										<span className="text-gray-600 font-medium">Plan Expiry:</span>
										<span className="text-gray-800 block mt-1">
											{moment(activePlan?.planExpiry).format('DD MMM YYYY')}
										</span>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* // Assign Plan Section */}
				<div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
					<div className="p-8 bg-gradient-to-r from-red-500 to-red-400">
						<h2 className="text-2xl font-bold text-white mb-4 flex items-center">
							<FaCreditCard className="mr-2" /> Assign Plan
						</h2>
					</div>
					<div className="p-8 flex flex-col space-y-4 ">
						<div className="w-full">
							<label className="block text-sm font-medium text-gray-700">Select a Plan</label>
							<select
								className="w-full mt-3 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={selectedPlan}
								onChange={(e) => setSelectedPlan(e.target.value)}
							>
								<option value="">Choose a Plan</option>
								{planList?.map((plan) => (
									<option key={plan._id} value={plan._id}>
										{plan?.name} - {plan?.price} BD ({plan?.duration} Month{plan?.duration === '1' ? "" : "s"})
									</option>
								))}
							</select>
						</div>
						<button onClick={handlePlanConformation} className={`${isLoading ? 'bg-yellow-300' : successAssign ? 'bg-emerald-400' : error ? 'bg-red-400 hover:bg-yellow-500' : 'bg-yellow-400 hover:bg-yellow-500'}  text-gray-800 px-6 py-3 rounded-md font-semibold transition duration-300 shadow-lg`} disabled={isLoading}>
							{isLoading ? 'Assigning...' : error ? 'Assign failed! Try Again' : successAssign ? 'Assigned successfully' : 'Assign Plan'}
						</button>
					</div>
				</div>

			</div >
		</>
	);
};

export default PaymentDetails