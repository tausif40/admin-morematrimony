import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth-slice';
import plansSlice from './features/plans-slice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		planSlice: plansSlice,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			ignoredPaths: [ 'registerUser.abortController' ],
		}),
});
