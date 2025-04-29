import React, { useState } from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";

const ProfileItem = ({ icon, label, value, isVerifiedEmail, isVerifiedMobile }) => {
	const [ isHovered, setIsHovered ] = useState(false);

	return (
		<div
			className="flex items-center bg-gray-100 p-4 rounded-lg transition-all duration-300 hover:shadow-md relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="mr-4 text-gray-500">{icon}</div>
			<div className="flex-grow">
				<div className="flex items-center gap-2">
					<p className="text-sm text-gray-500">{label || '_'}</p>
					<span className="flex items-center">
						{isVerifiedEmail && <p className='flex items-center gap-1 text-green-600'><RiVerifiedBadgeFill color="#00c951" /> <p className="text-xs mb-[2px]">verified</p></p>}
						{isVerifiedMobile && <p className='flex items-center gap-1 text-green-600'><RiVerifiedBadgeFill color="#00c951" /> <p className="text-xs mb-[2px]">verified</p></p>}
					</span>
				</div>
				<p className="font-medium text-gray-800">{value || '_'}</p>
			</div>
		</div>
	);
};

export default ProfileItem