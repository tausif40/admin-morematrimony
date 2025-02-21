import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth-slice';
import plansSlice from './features/plans-slice';
import userSlice from './features/user-slice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		planSlice: plansSlice,
		userSlice: userSlice,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			ignoredPaths: [ 'registerUser.abortController' ],
		}),
});
