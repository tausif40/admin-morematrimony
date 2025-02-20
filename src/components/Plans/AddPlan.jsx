import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import axios from "axios";
import Cookies from 'js-cookie';

function AddPlan({ editingPlan }) {
	const [ isOpen, setIsOpen ] = useState(false);
	// const [ editingPlan, setEditingPlan ] = useState(null);
	const [ showDeleteConfirm, setShowDeleteConfirm ] = useState(null);
	const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
	const token = Cookies.get('access_token');

	const [ formData, setFormData ] = useState({
		name: "",
		price: "",
		duration: "",
		profileLimit: "",
		userDescription: "",
		adminDescription: "",
		// isPopular: false,
	});

	useEffect(() => {
		console.log(editingPlan);
		if (editingPlan) {
			setFormData({
				name: editingPlan.name || "",
				price: editingPlan.price || "",
				duration: editingPlan.duration || "",
				profileLimit: editingPlan.profileLimit || "",
				userDescription: editingPlan.userDescription || "",
				adminDescription: editingPlan.adminDescription || "",
				// isPopular: editingPlan.isPopular || false,
			});
		}
	}, [ editingPlan ]);

	// Handle input change
	const handleChange = (e) => {
		const { name, type, value, checked, files } = e.target;
		console.log(files);
		setFormData((prevData) => ({
			...prevData,
			[ name ]: type === "checkbox" ? checked : type === "file" ? files[ 0 ] : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formPayload = new FormData();

		Object.keys(formData).forEach((key) => {
			formPayload.append(key, formData[ key ]);
		});

		for (const [ key, value ] of formPayload.entries()) {
			console.log(`${key}:`, value);
		}

		try {
			const response = editingPlan ? await axios.put(`${BASE_URL}/plan/${editingPlan._id}`, formPayload, {
				Authorization: `Bearer ${token}`,
				headers: { "Content-Type": "multipart/form-data" },
			})
				: await axios.post(`${BASE_URL}/plan`, formPayload, {
					Authorization: `Bearer ${token}`,
					headers: { "Content-Type": "multipart/form-data" },
				});
			console.log(response);
			console.log(editingPlan ? "Plan updated successfully!" : "Plan created successfully!");
		} catch (error) {
			console.error("Error saving plan:", error);
		}
	};


	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-4 z-50">
				<div>
					<label className="block text-sm font-medium text-gray-700">Plan Name</label>
					<input type="text" name="name" value={formData.name} onChange={handleChange} required className="input" />
				</div>
				<div className="grid grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">Price ($)</label>
						<input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="input" />
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Duration (months)</label>
						<input type="text" name="duration" value={formData.duration} onChange={handleChange} required min="1" className="input" />
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Profile Limit</label>
						<input type="number" name="profileLimit" value={formData.profileLimit} onChange={handleChange} required min="1" className="input" />
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">User Description</label>
					<textarea name="userDescription" value={formData.userDescription} onChange={handleChange} required rows={2} className="input" />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Admin Description</label>
					<textarea name="adminDescription" value={formData.adminDescription} onChange={handleChange} required rows={2} className="input" />
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Profile Limit</label>
					<input type="file" name="file" value={formData.image} onChange={handleChange} className="input" />
				</div>
				<div className="flex items-center">
					<input type="checkbox" name="isPopular" id="isPopular" checked={formData.isPopular} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
					<label className="ml-2 block text-sm text-gray-700" htmlFor="isPopular">Mark as Popular</label>
				</div>

				<button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
					{editingPlan ? "Update Plan" : "Create Plan"}
				</button>
			</form>

		</>
	)
}

export default AddPlan