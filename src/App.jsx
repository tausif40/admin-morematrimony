import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UsersTable from './components/Users/UsersTable';
import PlansManager from './components/Plans/PlansManager';
import { useDispatch } from 'react-redux';
import { getActivePlan, getPlans } from './store/features/plans-slice';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AssignPlan from './components/Users/AssignPlan';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getActivePlan());
  }, [ dispatch ]);

  return (
    <>
      <Toaster position="top-right" className='z-50' />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Wrap protected routes inside Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UsersTable />} />
            <Route path="/plans" element={<PlansManager />} />
            <Route path="/users/assign-plan" element={<AssignPlan />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
