import { configureStore } from '@reduxjs/toolkit'

import plansSlice from './features/plans-slice';

export const store = configureStore({
	reducer: {
		plansSlice: plansSlice,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			ignoredPaths: [ 'registerUser.abortController' ],
		}),
});