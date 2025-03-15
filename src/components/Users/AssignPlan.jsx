import React, { useEffect, useState } from "react";
import { UserCircle, Mail, Phone, Cake, CalendarDays, DollarSign } from 'lucide-react';
import { IoMaleFemaleOutline } from "react-icons/io5";
import moment from 'moment';
import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { BsHourglassSplit } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { assignPlan } from "../../store/features/user-slice";
import male from '../../img/male.png'
import female from '../../img/female.png'
import toast from "react-hot-toast";
import { IoIosArrowRoundBack } from "react-icons/io";

const ProfileItem = ({ icon, label, value, isVerifiedEmail, isVerifiedMobile }) => {
	const [ isHovered, setIsHovered ] = useState(false);

	return (
		<div
			className="flex items-center bg-gray-100 p-4 rounded-lg transition-all duration-300 hover:shadow-md relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="mr-4 text-gray-500">{icon}</div>
			<div className="flex-grow">
				<div className="flex items-center gap-2">
					<p className="text-sm text-gray-500">{label || '_'}</p>
					<span className="flex items-center">
						{isVerifiedEmail && <p className='flex items-center gap-1 text-green-600'><RiVerifiedBadgeFill color="#00c951" /> <p className="text-xs mb-[2px]">verified</p></p>}
						{isVerifiedMobile && <p className='flex items-center gap-1 text-green-600'><RiVerifiedBadgeFill color="#00c951" /> <p className="text-xs mb-[2px]">verified</p></p>}
					</span>
				</div>
				<p className="font-medium text-gray-800">{value || '_'}</p>
			</div>
		</div>
	);
};

const AssignPlan = () => {
	const navigate = useNavigate()
	const location = useLocation();
	const dispatch = useDispatch()
	const [ userData, setUserData ] = useState([]);
	const [ planList, setPlanList ] = useState([]);
	const [ userId, setUserId ] = useState();
	const [ planId, setPlanId ] = useState("");
	const [ isLoading, setIsLoading ] = useState(false);
	const [ successAssign, setSuccessAssign ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ selectedPlan, setSelectedPlan ] = useState("");

	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// 	console.log(window.scrollTo(0, 0));
	// }, [ location.pathname ]);

	const activePlanList = useSelector((state) => state.planSlice.activePlan);
	useEffect(() => {
		console.log(activePlanList?.data?.plans);
		setPlanList(activePlanList?.data?.plans)
	}, [ activePlanList ])

	useEffect(() => {
		setUserData(location?.state)
		setUserId(location?.state?._id)
	}, [ location ])


	const handleAssignPlan = async () => {
		if (selectedPlan === '') {
			toast.error('Please Select PLan');
			return;
		}
		const loadingToast = toast.loading('Assigning...');
		try {
			setIsLoading(true)
			const data = { userId: userId, planId: selectedPlan }
			console.log("Assigning plan:", data);
			const res = await dispatch(assignPlan(data)).unwrap();
			console.log(res);
			setIsLoading(false)
			setSuccessAssign(true)
			setError(false)
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
			<div className="w-12 bg-white rounded-full border-2 flex justify-center cursor-pointer" onClick={handelBack}><IoIosArrowRoundBack size={32} /></div>
			<div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
				{/* User Profile Section */}
				<div className="px-8 py-3 bg-gradient-to-r from-gold to-red-200 flex items-center gap-8">
					{userData?.userDetails && <>
						{userData?.userDetails[ 0 ]?.profileImage
							? <img src={userData?.userDetails[ 0 ]?.profileImage} alt="img" className="w-32 h-32 rounded-full object-cover bg-white" />
							: <img src={userData?.gender === 'male' ? male : female} alt="img" className="w-32 h-32 bg-white rounded-full object-cover" />}
					</>}
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

			<div className="max-w-5xl mx-auto mt-6 bg-white shadow-md rounded-lg overflow-hidden">
				{/* Plan Details or Assign Plan Section */}
				{userData?.plan ? (
					<div className="p-8 bg-gradient-to-r from-green-500 to-green-400">
						<h2 className="text-2xl font-bold text-white mb-4 flex items-center">
							<FaCreditCard className="mr-2" /> Plan Details
						</h2>
					</div>
				) : (
					<div className="p-8 bg-gradient-to-r from-red-500 to-red-400">
						<h2 className="text-2xl font-bold text-white mb-4 flex items-center">
							<FaCreditCard className="mr-2" /> Assign Plan
						</h2>
					</div>
				)}
				<div className="p-8">
					<div className="space-y-6">
						{userData?.plan ? (
							// Plan Details
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<FaCreditCard className="text-green-500 mr-2" />
									<div>
										<span className="text-gray-600 font-medium">Plan Name:</span>
										<span className="text-gray-800 block mt-1">{userData?.planDetails?.name}</span>
									</div>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<DollarSign className="text-green-500 mr-2" />
									<div>
										<span className="text-gray-600 font-medium">Plan Price:</span>
										<span className="text-gray-800 block mt-1">BD {userData?.planDetails?.price}</span>
									</div>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<BsHourglassSplit className="text-green-500 mr-2" />
									<div>
										<span className="text-gray-600 font-medium">Plan Duration:</span>
										<span className="text-gray-800 block mt-1">{userData?.planDetails?.duration}</span>
									</div>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center gap-4">
									<FaCalendarAlt className="text-green-500 mr-2" />
									<div>
										<span className="text-gray-600 font-medium">Plan Expiry:</span>
										<span className="text-gray-800 block mt-1">
											{new Date(userData?.planExpiry).toLocaleDateString()}
										</span>
									</div>
								</div>
							</div>
						) : (
							// Assign Plan Section
							<div className="flex flex-col space-y-4">

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
								<button onClick={handleAssignPlan} className={`${isLoading ? 'bg-yellow-300' : successAssign ? 'bg-emerald-400' : error ? 'bg-red-400 hover:bg-yellow-500' : 'bg-yellow-400 hover:bg-yellow-500'}  text-gray-800 px-6 py-3 rounded-md font-semibold transition duration-300 shadow-lg`} disabled={isLoading}>
									{isLoading ? 'Assigning...' : error ? 'Assign failed! Try Again' : successAssign ? 'Assigned successfully' : 'Assign Plan'}
								</button>
							</div>
						)}
					</div>
				</div>
			</div >
		</>
	);
};
export default AssignPlan