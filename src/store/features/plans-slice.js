import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const addPlan = createAsyncThunk('plan/addPlan', async (data, { rejectWithValue }) => {
	try {
		const response = await apiClient.post(`/plan`, data);
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to add plan');
	}
});
export const getPlans = createAsyncThunk('plan/getPlans', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/plan`);
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch plan');
	}
});
export const getActivePlan = createAsyncThunk('plan/getActivePlan', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/plan/active`);
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch active plan');
	}
});
export const getUserActivePlan = createAsyncThunk('user/getUserActivePlan', async (id, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/admin/agent/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed get user active plan');
	}
});

const plansSlice = createSlice({
	name: 'plan',
	initialState: {
		plans: { data: [], loading: false, error: null, },
		userActivePlan: { data: [], loading: false, error: null, },
		addPlans: { data: [], loading: false, error: null, },
		activePlan: { data: [], loading: false, error: null, },
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
			// user Active Plan
			.addCase(getUserActivePlan.pending, (state) => {
				state.userActivePlan.loading = true
				state.userActivePlan.error = true
			})
			.addCase(getUserActivePlan.fulfilled, (state, action) => {
				state.userActivePlan.data = action.payload;
				state.userActivePlan.loading = false;
			})
			.addCase(getUserActivePlan.rejected, (state, action) => {
				state.userActivePlan.loading = false;
				state.userActivePlan.error = action.payload || action.error.message;
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
			// active plan
			.addCase(getActivePlan.pending, (state) => {
				state.activePlan.loading = true
				state.activePlan.error = true
			})
			.addCase(getActivePlan.fulfilled, (state, action) => {
				state.activePlan.data = action.payload;
				state.activePlan.loading = false;
			})
			.addCase(getActivePlan.rejected, (state, action) => {
				state.activePlan.loading = false;
				state.activePlan.error = action.payload || action.error.message;
			})
	}
})

export default plansSlice.reducer;