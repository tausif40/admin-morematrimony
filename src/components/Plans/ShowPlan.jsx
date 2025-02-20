import React, { useEffect, useState } from 'react';
import { Check, Pencil, Trash2, Star, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';

function ShowPlan({ plan, editingPlan, isOpen }) {

	const [ plans, setPlans ] = useState()
	const [ showDeleteConfirm, setShowDeleteConfirm ] = useState(null);

	useEffect(() => setPlans(plan), [ plan ])

	const handleDelete = (id) => {
		setPlans(plans.filter((p) => p.id !== id));
		setShowDeleteConfirm(null);
		toast.success('Plan deleted successfully');
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
			<div className="py-6 px-4">
				<div className="max-w-7xl mx-auto">

					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
						{plans?.map((plan, index) => {
							const colors = getColorScheme(index);
							return (
								<div
									key={plan._id}
									className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${colors.bg} border-2 ${colors.border}`}
								>
									{plan.Popular && (
										<div className="absolute top-0 right-0 left-0 text-center py-2 bg-yellow-400 text-yellow-900 font-semibold text-sm flex items-center justify-center gap-1">
											<Star className="w-4 h-4" />
											Most Popular
											<Star className="w-4 h-4" />
										</div>
									)}
									<div className='absolute top-4 right-6'>
										<p>Active</p>
									</div>
									<div className="p-4 pt-4">
										<div className="h-44 flex items-center justify-center mb-8">
											<img
												src={plan.image}
												alt={plan.name}
												className="max-h-full w-auto object-contain "
											/>
										</div>

										<h3 className={`text-2xl font-bold mb-2 ${colors.accent}`}>
											{plan.name}
										</h3>

										<div className="mb-6 flex items-baseline gap-1">
											<span className={`text-5xl font-bold ${colors.accent}`}>
												${plan.price}
											</span>
											<span className="text-gray-500">/{plan.duration}</span>
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

										<div className="flex gap-2">
											<button
												onClick={() => { editingPlan(plan); isOpen(true) }}
												className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
											>
												<Pencil size={16} />
												Edit
											</button>
											<button
												onClick={() => setShowDeleteConfirm(plan.id)}
												className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
											>
												<Trash2 size={16} />
												Delete
											</button>
										</div>
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

export default ShowPlan