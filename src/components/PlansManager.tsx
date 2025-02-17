import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';
import { Plan } from '../types';
import { mockPlans } from '../data/mockData';

export default function PlansManager() {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPlan = {
      id: editingPlan?.id || Date.now().toString(),
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      duration: Number(formData.get('duration')),
      features: (formData.get('features') as string).split('\n').filter(Boolean),
      isPopular: Boolean(formData.get('isPopular')),
    };

    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === editingPlan.id ? newPlan : p)));
      toast.success('Plan updated successfully');
    } else {
      setPlans([...plans, newPlan]);
      toast.success('Plan created successfully');
    }
    setIsOpen(false);
    setEditingPlan(null);
  };

  const handleDelete = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id));
    setShowDeleteConfirm(null);
    toast.success('Plan deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Membership Plans</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-xl shadow-sm p-6 relative hover:shadow-md transition-shadow"
          >
            {plan.isPopular && (
              <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold mb-4">
              ${plan.price}
              <span className="text-gray-500 text-base font-normal">
                /{plan.duration} months
              </span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingPlan(plan);
                  setIsOpen(true);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
              >
                <Pencil size={16} />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(plan.id)}
                className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Plan Modal */}
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingPlan(null);
        }}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-xl max-w-md w-full mx-4 p-6">
            <button
              onClick={() => {
                setIsOpen(false);
                setEditingPlan(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>

            <Dialog.Title className="text-lg font-medium mb-4">
              {editingPlan ? 'Edit Plan' : 'Create New Plan'}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plan Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingPlan?.name}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingPlan?.price}
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (months)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    defaultValue={editingPlan?.duration}
                    required
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Features (one per line)
                </label>
                <textarea
                  name="features"
                  defaultValue={editingPlan?.features.join('\n')}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPopular"
                  defaultChecked={editingPlan?.isPopular}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Mark as Popular
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </button>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={Boolean(showDeleteConfirm)}
        onClose={() => setShowDeleteConfirm(null)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-xl max-w-md w-full mx-4 p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Confirm Delete
            </Dialog.Title>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete this plan? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}