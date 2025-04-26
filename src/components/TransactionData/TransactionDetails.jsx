import React from 'react';

const transactionData = {
	transaction: {
		results: [
			{
				_id: "6806262af8a64ceb3422cbdb",
				agentId: {
					firstName: "narendra",
					lastName: "patidar",
					gender: "male",
					email: "nk580585@gmail.com",
					mobile: "8817792602",
					dateOfBirth: "2004-06-08T00:00:00.000Z",
				},
				planId: {
					name: "Platinum",
					price: 90,
					image: "https://more-matrimony.blr1.vultrobjects.com/plan/portfolio2.png",
					duration: "3",
				},
				transactionImage: "https://more-matrimony.blr1.vultrobjects.com/transaction/677911ddd14f1f7afe317274/Screenshot%20(50).png",
				createdAt: "2025-04-21T11:04:10.890Z",
			},
		],
	},
};

const TransactionDetails = () => {
	const transaction = transactionData.transaction.results[ 0 ];
	const agent = transaction.agentId;
	const plan = transaction.planId;

	return (
		<div className="max-w-5xl mx-auto p-8 font-sans bg-gradient-to-tr from-blue-50 to-purple-50 min-h-screen">
			<h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10 drop-shadow-sm">💳 Transaction Details</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Agent Info */}
				<div className="col-span-1 lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all duration-300">
					<h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
						<span className="text-3xl">👤</span> Agent Info
					</h2>
					<ul className="space-y-2 text-gray-700">
						<li><strong>Name:</strong> {agent.firstName} {agent.lastName}</li>
						<li><strong>Email:</strong> {agent.email}</li>
						<li><strong>Mobile:</strong> {agent.mobile}</li>
						<li><strong>Gender:</strong> {agent.gender}</li>
						<li><strong>DOB:</strong> {new Date(agent.dateOfBirth).toLocaleDateString()}</li>
					</ul>
				</div>

				{/* Plan Info */}
				<div className="col-span-1 lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-all duration-300">
					<h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
						<span className="text-3xl">📦</span> Plan Info
					</h2>
					<ul className="space-y-2 text-gray-700">
						<li><strong>Plan:</strong> {plan.name}</li>
						<li><strong>Price:</strong> ${plan.price}</li>
						<li><strong>Duration:</strong> {plan.duration} months</li>
					</ul>
					<img src={plan.image} alt="Plan" className="mt-4 w-full rounded-lg border border-gray-200" />
				</div>

				{/* Transaction Image */}
				<div className="col-span-1 lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all duration-300">
					<h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
						<span className="text-3xl">🧾</span> Proof
					</h2>
					<img
						src={transaction.transactionImage}
						alt="Transaction"
						className="rounded-lg border border-gray-300 w-full object-cover"
					/>
					<p className="text-center text-sm text-gray-600 mt-3">
						<strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	);
};

export default TransactionDetails