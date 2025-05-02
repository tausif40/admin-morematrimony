import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ show, onClose, children }) => {

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (event.target.id === "modal-wrapper") {
				onClose();
			}
		};

		window.addEventListener("click", handleOutsideClick);

		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}, [ onClose ]);

	if (!show) {
		return null;
	}

	return (
		<>
			<div id="modal-wrapper" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
				<div className="bg-white rounded-lg custom-shadow2 p-6 max-w-md w-full relative mx-2 ">
					<button
						onClick={onClose}
						className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1 transition-all"
					>
						<RxCross2 />
					</button>
					{children}
				</div>
			</div>
		</>
	);
};

export default Modal;
