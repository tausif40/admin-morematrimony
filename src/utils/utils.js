// export const formateDate = (formaDate) => {
// 	const date = new Date(formaDate);
// 	const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;
// 	const today = new Date();
// 	const timeDiff = date.getTime() - today.getTime();
// 	const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
// 	let currentStatus;
// 	daysLeft < 0 ? currentStatus = `Expired` : currentStatus = `${daysLeft} days left`
// 	return { formattedDate, currentStatus };
// }

// utils/dateHelpers.js
export const formateDate = (inputDate) => {
	const date = new Date(inputDate);
	const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getFullYear()}`;

	const today = new Date();
	const timeDiff = date.getTime() - today.getTime();
	const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

	const currentStatus = daysLeft < 0 ? "Expired" : `${daysLeft} days left`;

	return { formattedDate, currentStatus };
};
