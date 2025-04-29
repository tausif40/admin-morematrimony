import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTransaction, setFilter } from '../../store/features/transaction-slice';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';

function PaymentList() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ allTransaction, setAllTransaction ] = useState([]);
	const [ filterStatus, setFilterStatus ] = useState([]);

	const transactionData = useSelector((state) => state.transaction.transaction);
	const filterData = useSelector((state) => state.transaction.filter);

	const [ activeTab, setActiveTab ] = useState(filterData?.statusByAdmin || 'pending');


	const [ filterList, setFilterList ] = useState({
		populate: 'agentId,planId',
		page: '',
		limit: '',
		totalResults: '',
		...(activeTab !== '' && { statusByAdmin: filterData?.statusByAdmin })
	});

	console.log("filter Data-", filterData);
	console.log('filterList-', filterList);

	useEffect(() => {
		dispatch(setFilter(filterList));
	}, [ filterList, dispatch ]);

	useEffect(() => {
		// const data = { populate: 'agentId,planId' }
		dispatch(getTransaction(filterList));
	}, [ dispatch ])

	const prevFilterListRef = useRef(filterList);

	useEffect(() => {
		console.log(transactionData);
		const user = transactionData?.data?.transaction;

		setFilterList((prevFilter) => ({
			...prevFilter,
			limit: filterData?.limit || user?.limit,
			page: filterData?.page || user?.totalPages,
			totalResults: filterData?.totalResults || user?.totalResults,
			statusByAdmin: filterData?.statusByAdmin,
		}));
	}, [ transactionData ]);

	useEffect(() => {
		if (JSON.stringify(prevFilterListRef.current) !== JSON.stringify(filterList)) {
			dispatch(getTransaction(filterList));
			prevFilterListRef.current = filterList;
		}
	}, [ filterList, dispatch ]);

	useEffect(() => {
		setAllTransaction(transactionData?.data?.transaction?.results)
		console.log(transactionData?.data?.transaction);
	}, [ transactionData ])

	const handelUser = (data) => {
		navigate('/payment/assign-plan', { state: data })
	}

	return (
		<>
			<div>
				<h1 className='text-2xl font-bold text-gray-900'>Pending Transactions</h1>
			</div>
			<div className="bg-white rounded-xl shadow-sm p-6 relative hover:shadow-md transition-shadow mt-8">
				<div className='flex justify-end'>
					<div className="grid grid-cols-2 sm:grid-cols-3 p-1 bg-gray-200 rounded-3xl sm:rounded-full mb-6">
						<button
							className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "pending" ? "bg-orange-500 text-white" : "text-gray-500"} min-w-max`}
							onClick={() => { setActiveTab("pending"); setFilterList((prev) => ({ ...prev, statusByAdmin: 'pending' })) }}>
							Pending
						</button>
						{/* <button
							className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "all" ? "bg-blue-500 text-white" : "text-gray-500"} min-w-max`}
							onClick={() => { setActiveTab("all"); setFilterList((prev) => ({ ...prev, statusByAdmin: '' })) }}>
							All
						</button> */}
						<button
							className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "approved" ? "bg-emerald-500 text-white" : "text-gray-500"} min-w-max`}
							onClick={() => { setActiveTab("approved"); setFilterList((prev) => ({ ...prev, statusByAdmin: 'approved' })) }}>
							Approved
						</button>
						<button
							className={`px-10 py-2 rounded-full text-sm font-medium ${activeTab === "rejected" ? "bg-red-500 text-white" : "text-gray-500"} min-w-max`}
							onClick={() => { setActiveTab("rejected"); setFilterList((prev) => ({ ...prev, statusByAdmin: 'rejected' })) }}>
							Rejected
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
							{allTransaction?.length !== 0 ? allTransaction?.map((tx) => (
								<tr key={tx._id} className="border-t hover:bg-gray-50 transition cursor-pointer">
									<td className="px-4 py-3 text-gray-700">{tx.agentId.firstName} {tx.agentId.lastName}</td>
									<td className="px-4 py-3 text-gray-700">{tx.agentId.email}</td>
									<td className="px-4 py-3 text-gray-700">{tx.planId.name}</td>
									<td className="px-4 py-3 text-gray-700">{tx.planId.price} BD</td>
									<td className={`px-4 py-3 font-semibold capitalize ${tx.statusByAdmin == 'approved' ? 'text-emerald-500' : tx.statusByAdmin == 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>{tx.statusByAdmin}</td>
									<td className="px-4 py-3 text-gray-700">
										<button
											onClick={() => handelUser(tx)}
											className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-full text-sm"
										>
											View
										</button>
									</td>
								</tr>
							))
								: <tr className='text-center'>
									<td colSpan={6} className='font-semibold text-xl text-gray-800 p-4 capitalize'>No {activeTab} Transactions</td>
								</tr>}
						</tbody>
					</table>
				</div>
			</div >

			<div className='flex justify-center pt-6 mb-4'>
				<Pagination align="center"
					defaultCurrent={filterData?.page}
					total={filterList?.totalResults}
					pageSize={filterList?.limit || 10}
					onChange={(page) => {
						setFilterList((prev) => ({ ...prev, page: page }));
					}}
					showQuickJumper
					onShowSizeChange={(current, size) => {
						setFilterList((prevFilter) => ({ ...prevFilter, limit: size, page: current }));
					}}
				/>
			</div>
		</>
	);
}

export default PaymentList;