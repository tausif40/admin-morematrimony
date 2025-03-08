import React, { useEffect, useState } from 'react';
import { Check, Pencil, Trash2, Star, Zap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import { getPlans } from '../../store/features/plans-slice';
import { Button, Tooltip } from 'antd';

function ShowPlan({ plan, editingPlan, isOpen }) {
	const dispatch = useDispatch();
	const [ activeTab, setActiveTab ] = useState('all');
	const [ activePlan, setActivePlan ] = useState([]);
	const [ inactivePlans, setInactivePlans ] = useState([]);
	const [ loading, setLoading ] = useState({});
	const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
	const token = Cookies.get('access_token');

	useEffect(() => {
		dispatch(getPlans());
	}, [ dispatch, activeTab ]);

	useEffect(() => {
		if (plan) {
			const active = plan.filter((p) => p.isActive);
			const inactive = plan.filter((p) => !p.isActive);

			setActivePlan(active);
			setInactivePlans(inactive);
		}
	}, [ plan ]);

	const handleAction = async (id, action) => {
		setLoading((prev) => ({ ...prev, [ id ]: true }));
		const formPayload = new FormData();
		formPayload.append('isActive', !action);

		try {
			const response = await axios.put(`${BASE_URL}/plan/${id}`, formPayload, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
			if (response.status === 200) {
				dispatch(getPlans());
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading((prev) => ({ ...prev, [ id ]: false }));
		}
	};

	const getColorScheme = (index) => {
		const schemes = [
			{
				bg: 'bg-rose-100',
				accent: 'text-rose-600',
				button: 'bg-rose-600 hover:bg-rose-700',
				icon: 'text-rose-500',
				border: 'border-rose-200'
			},
			{
				bg: 'bg-cyan-100',
				accent: 'text-cyan-600',
				button: 'bg-cyan-600 hover:bg-cyan-700',
				icon: 'text-cyan-500',
				border: 'border-cyan-200'
			},
			{
				bg: 'bg-amber-100',
				accent: 'text-amber-600',
				button: 'bg-amber-600 hover:bg-amber-700',
				icon: 'text-amber-500',
				border: 'border-amber-200'
			}
		];
		return schemes[ index % schemes.length ];
	};

	return (
		<>
			<div className="px-4 pb-4">
				<div className="mx-auto">
					<div className='flex justify-end'>
						<div className="flex p-1 max-w-min bg-gray-300 rounded-full mb-6">
							<button
								className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "all" ? "bg-blue-500 text-white" : "text-gray-600"} min-w-max`}
								onClick={() => setActiveTab("all")}>
								All
							</button>
							<button
								className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "active" ? "bg-emerald-500 text-white" : "text-gray-600"} min-w-max`}
								onClick={() => setActiveTab("active")}>
								Active
							</button>
							<button
								className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "inactive" ? "bg-red-500 text-white" : "text-gray-600"} min-w-max`}
								onClick={() => setActiveTab("inactive")}>
								Inactive
							</button>
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
						{(activeTab === 'active' ? activePlan : activeTab === 'inactive' ? inactivePlans : plan)?.map((plan, index) => {
							const colors = getColorScheme(index);
							return (
								<div
									key={plan._id}
									className={`flex flex-col justify-between p-4 relative rounded-3xl overflow-hidden transition-all duration-300 ${colors.bg} border-2 ${colors.border}`}
								>
									<div>
										{plan.Popular && (
											<div className="absolute top-0 right-0 left-0 text-center py-2 bg-yellow-400 text-yellow-900 font-semibold text-sm flex items-center justify-center gap-1">
												<Star className="w-4 h-4" />Most Popular<Star className="w-4 h-4" />
											</div>
										)}
										<div className="">
											<div className="h-44 flex items-center justify-center mb-6">
												<img src={plan.image} alt={plan.name} className="max-h-full w-auto object-contain" />
											</div>

											<h3 className={`text-2xl font-bold mb-3 ${colors.accent}`}>
												{plan.name}
											</h3>

											<div className="mb-6 flex items-baseline gap-1">
												<span className={`text-4xl font-bold ${colors.accent}`}>BD {plan.price}</span>
												<span className="text-lg text-gray-500">/{plan.duration} {plan.duration === '1' ? 'Month' : 'Months'}</span>
											</div>

											<div className="space-y-4 mb-8">
												<div className="flex items-center gap-3">
													<div className={`p-1 rounded-full ${colors.bg}`}>
														<Zap className={`w-5 h-5 ${colors.icon}`} />
													</div>
													<span className="text-gray-700">Up to {plan.profileLimit} profiles</span>
												</div>
												<div className="flex items-center gap-3">
													<div className={`p-1 rounded-full ${colors.bg}`}>
														<Check className={`w-5 h-5 ${colors.icon}`} />
													</div>
													<span className="text-gray-700">{plan.userDescription}</span>
												</div>
												<div className="flex items-start gap-3 border border-gray-800 rounded-md bg-white p-1">
													<span className="text-gray-700"><span className={`font-semibold ${colors.accent}`}>Admin: </span>{plan.adminDescription}</span>
												</div>
											</div>
										</div>
									</div>

									<div className="flex gap-4">
										<button
											onClick={() => { editingPlan(plan); isOpen(true) }}
											className="flex-1 px-4 h-10 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
										>
											<Pencil size={16} />
											Edit
										</button>
										<Tooltip placement="top"
											color={plan.isActive ? 'red' : '#00c951'}
											title={`Click to ${!plan.isActive ? 'Activate' : 'Deactivate'}`}>
											<button
												onClick={() => handleAction(plan._id, plan.isActive)}
												className={`flex-1 px-4 h-10 text-white rounded-lg flex items-center justify-center gap-2 ${plan.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
												disabled={loading[ plan._id ]}
											>
												{loading[ plan._id ] ? "Updating..." : plan.isActive ? 'Active' : 'Inactive'}
											</button>
										</Tooltip>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default ShowPlan;