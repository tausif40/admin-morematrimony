import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const addPlan = createAsyncThunk('plan/addPlan', async (data, { rejectWithValue }) => {
	try {
		const response = await apiClient.post(`/plan`, data);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to add plan');
	}
});
export const getPlans = createAsyncThunk('plan/getPlans', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/plan`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch plan');
	}
});

const plansSlice = createSlice({
	name: 'plan',
	initialState: {
		plans: { data: [], loading: false, error: null, },
		addPlans: { data: [], loading: false, error: null, },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPlans.pending, (state) => {
				state.plans.loading = true
				state.plans.error = true
			})
			.addCase(getPlans.fulfilled, (state, action) => {
				state.plans.data = action.payload;
				state.plans.loading = false;
			})
			.addCase(getPlans.rejected, (state, action) => {
				state.plans.loading = false;
				state.plans.error = action.payload || action.error.message;
			})
			.addCase(addPlan.pending, (state) => {
				state.addPlans.loading = true
				state.addPlans.error = true
			})
			.addCase(addPlan.fulfilled, (state, action) => {
				state.addPlans.data = action.payload;
				state.addPlans.loading = false;
			})
			.addCase(addPlan.rejected, (state, action) => {
				state.addPlans.loading = false;
				state.addPlans.error = action.payload || action.error.message;
			})
	}
})

export default plansSlice.reducer;