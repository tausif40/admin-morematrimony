import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { getQueryParams } from '../../utils/queryParams';

export const getUser = createAsyncThunk('user/getUser', async (data, { rejectWithValue }) => {
	try {
		const filterData = getQueryParams(data)
		const response = await apiClient.get(`/admin/users?${filterData}`);
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to add plan');
	}
});
export const loginByAdmin = createAsyncThunk('user/loginByAdmin', async (id, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/admin/login-admin-to-user/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to login');
	}
});
export const assignPlan = createAsyncThunk('user/assignPlan', async (data, { rejectWithValue }) => {
	try {
		// console.log(data);
		const response = await apiClient.post(`/plan/admin/set-plan`, data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed assign plan');
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState: {
		users: { data: [], loading: false, error: null, },
		adminLogin: { data: [], loading: false, error: null, },
		assignedPlan: { data: [], loading: false, error: null, },
		filter: { page: '', limit: '', totalUsers: '', }
	},
	reducers: {
		setFilter(state, action) {
			state.filter.limit = action.payload.limit,
				state.filter.page = action.payload.page,
				state.filter.totalUsers = action.payload.totalUsers
			// console.log(action);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.users.loading = true
				state.users.error = true
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.users.data = action.payload;
				state.users.loading = false;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.users.loading = false;
				state.users.error = action.payload || action.error.message;
			})
			// login By Admin
			.addCase(loginByAdmin.pending, (state) => {
				state.adminLogin.loading = true
				state.adminLogin.error = true
			})
			.addCase(loginByAdmin.fulfilled, (state, action) => {
				state.adminLogin.data = action.payload;
				state.adminLogin.loading = false;
			})
			.addCase(loginByAdmin.rejected, (state, action) => {
				state.adminLogin.loading = false;
				state.adminLogin.error = action.payload || action.error.message;
			})
			// login By Admin
			.addCase(assignPlan.pending, (state) => {
				state.assignedPlan.loading = true
				state.assignedPlan.error = true
			})
			.addCase(assignPlan.fulfilled, (state, action) => {
				state.assignedPlan.data = action.payload;
				state.assignedPlan.loading = false;
			})
			.addCase(assignPlan.rejected, (state, action) => {
				state.assignedPlan.loading = false;
				state.assignedPlan.error = action.payload || action.error.message;
			})
	}
})

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;