import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth-slice';
import plansSlice from './features/plans-slice';
import userSlice from './features/user-slice';
import transaction from './features/transaction-slice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		planSlice: plansSlice,
		userSlice: userSlice,
		transaction: transaction,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			ignoredPaths: [ 'registerUser.abortController' ],
		}),
});
