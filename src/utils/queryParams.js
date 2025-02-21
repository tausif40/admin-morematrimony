export const getQueryParams = (filterData) => {
	const queryParams = new URLSearchParams();

	Object.entries(filterData).forEach(([ key, value ]) => {
		if (Array.isArray(value)) {
			queryParams.append(key, value.join(','));
		} else if (value !== undefined && value !== null) {
			queryParams.append(key, value);
		}
	});
	return queryParams.toString();
};