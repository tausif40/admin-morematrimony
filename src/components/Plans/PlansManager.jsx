import React, { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ShowPlan from './ShowPlan';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import AddPlan from './AddPlan';


export default function PlansManager() {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ editingPlan, setEditingPlan ] = useState([]);
  const [ plans, setPlans ] = useState([])
  const getPlan = useSelector((state) => state.planSlice.plans);

  useEffect(() => {
    setPlans(getPlan?.data?.plans)
  }, [ getPlan ])

  const [ formData, setFormData ] = useState({
    name: "",
    price: "",
    duration: "",
    profileLimit: "",
    userDescription: "",
    adminDescription: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Membership Plans</h1>
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2" ><Plus size={20} /> Add New Plan
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 relative hover:shadow-md transition-shadow">
        <ShowPlan plan={plans} editingPlan={setEditingPlan} isOpen={setIsOpen} />
      </div>

      {/* Create/Edit Plan Modal */}
      <Dialog open={isOpen} onClose={() => { setIsOpen(false); setEditingPlan(null); }} className="fixed inset-0 z-10 overflow-y-auto" >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-xl  mx-4 p-6">
            <button onClick={() => { setIsOpen(false); setEditingPlan(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
              <X size={20} />
            </button>
            <Dialog.Title className="text-lg font-medium mb-4">
              {editingPlan ? 'Edit Plan' : 'Create New Plan'}
            </Dialog.Title>

            <AddPlan editingPlan={editingPlan} />
          </div>
        </div>
      </Dialog>

    </div>
  );
}