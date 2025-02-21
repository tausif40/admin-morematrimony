import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { getQueryParams } from '../../utils/queryParams';

export const getUser = createAsyncThunk('user/getUser', async (data, { rejectWithValue }) => {
	try {
		const filterData = getQueryParams(data)
		const response = await apiClient.get(`/admin/users?${filterData}`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to add plan');
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState: {
		users: { data: [], loading: false, error: null, },
	},
	reducers: {},
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
	}
})

export default userSlice.reducer;