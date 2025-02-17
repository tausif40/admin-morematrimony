import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const addPlans = createAsyncThunk('plan/addPlans', async (userData, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`plan`);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || 'Failed to update profile images');
	}
});

const plansSlice = createSlice({
	name: 'plan',
	initialState: {
		plans: { images: [], loading: false, error: null, },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addPlans.pending, (state) => {
				state.plans.loading = true
				state.plans.error = true
			})
			.addCase(addPlans.fulfilled, (state, action) => {
				state.plans.images = action.payload;
				state.plans.loading = false;
			})
			.addCase(addPlans.rejected, (state, action) => {
				state.plans.loading = false;
				state.plans.error = action.payload || action.error.message;
			})
	}
})

export default plansSlice.reducer;