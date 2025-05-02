import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { getQueryParams } from '../../utils/queryParams';

export const getTransaction = createAsyncThunk('transaction/getTransaction', async (data, { rejectWithValue }) => {
	try {
		const filterData = getQueryParams(data)
		// console.log(`/transaction?${filterData}`);
		const response = await apiClient.get(`/transaction?${filterData}`);
		// console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to get transaction');
	}
});

const transaction = createSlice({
	name: 'transaction',
	initialState: {
		transaction: { data: [], loading: false, error: null, },
		filter: { page: 1, limit: '', totalResults: '', statusByAdmin: 'pending' }
	},
	reducers: {
		setFilter(state, action) {
			state.filter.limit = action.payload.limit;
			state.filter.page = action.payload.page;
			state.filter.totalResults = action.payload.totalResults;
			state.filter.statusByAdmin = action.payload.statusByAdmin;
			// console.log("filter update")
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTransaction.pending, (state) => {
				state.transaction.loading = true
				state.transaction.error = true
			})
			.addCase(getTransaction.fulfilled, (state, action) => {
				state.transaction.data = action.payload;
				state.transaction.loading = false;
			})
			.addCase(getTransaction.rejected, (state, action) => {
				state.transaction.loading = false;
				state.transaction.error = action.payload || action.error.message;
			})
	}
});

export const { setFilter } = transaction.actions;
export default transaction.reducer;