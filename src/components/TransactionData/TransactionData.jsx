import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTransaction } from '../../store/features/transaction-slice';
import { useNavigate } from 'react-router-dom';

function TransactionData() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ activeTab, setActiveTab ] = useState('pending');
	const [ allTransaction, setAllTransaction ] = useState([]);

	const transactionData = useSelector((state) => state.transaction.transaction);

	useEffect(() => {
		const data = { populate: 'agentId,planId' }
		dispatch(getTransaction(data));
		setAllTransaction(transactionData?.data?.transaction?.results)
		console.log(transactionData);
	}, [ dispatch ])

	const handelUser = ({ data }) => {
		navigate('/transactions/assign-plan', { state: data })
	}

	return (
		<>
			<div>
				<h1 className='text-2xl font-bold text-gray-900'>Pending Transactions</h1>
			</div>
			<div className="bg-white rounded-xl shadow-sm p-6 relative hover:shadow-md transition-shadow mt-8">
				<div className='flex justify-end'>
					<div className="grid grid-cols-2 sm:grid-cols-4 p-1 bg-gray-200 rounded-3xl sm:rounded-full mb-6">
						<button
							className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "pending" ? "bg-orange-500 text-white" : "text-gray-500"} min-w-max`}
							onClick={() => setActiveTab("pending")}>
							Pending
						</button>
						<button
							className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "all" ? "bg-blue-500 text-white" : "text-gray-500"} min-w-max`}
							onClick={() => setActiveTab("all")}>
							All
						</button>
						<button
							className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "assigned" ? "bg-emerald-500 text-white" : "text-gray-500"} min-w-max`}
							onClick={() => setActiveTab("assigned")}>
							Assigned
						</button>
						<button
							className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "reject" ? "bg-red-500 text-white" : "text-gray-500"} min-w-max`}
							onClick={() => setActiveTab("reject")}>
							Reject
						</button>
					</div>
				</div>

				<div className="bg-white rounded-2xl shadow overflow-hidden">
					<table className="min-w-full table-auto text-left">
						<thead className="bg-purple-100 text-purple-800">
							<tr>
								<th className="px-4 py-3">Name</th>
								<th className="px-4 py-3">Email</th>
								<th className="px-4 py-3">Plan</th>
								<th className="px-4 py-3">Price</th>
								<th className="px-4 py-3">Status</th>
								<th className="px-4 py-3">Action</th>
							</tr>
						</thead>
						<tbody>
							{allTransaction?.map((tx) => (
								<tr key={tx._id} className="border-t hover:bg-gray-50 transition cursor-pointer">
									<td className="px-4 py-3 text-gray-700">{tx.agentId.firstName} {tx.agentId.lastName}</td>
									<td className="px-4 py-3 text-gray-700">{tx.agentId.email}</td>
									<td className="px-4 py-3 text-gray-700">{tx.planId.name}</td>
									<td className="px-4 py-3 text-gray-700">{tx.planId.price} BD</td>
									<td className="px-4 py-3 text-yellow-600 font-semibold">{tx.status}</td>
									<td className="px-4 py-3 text-gray-700">
										<button
											onClick={() => handelUser(tx)}
											className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-full text-sm"
										>
											View
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default TransactionData;