import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UsersTable from './components/UsersTable';
import PlansManager from './components/PlansManager';
import { useDispatch } from 'react-redux';
import { addPlans } from './store/features/plans-slice'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addPlans())
  })

  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/plans" element={<PlansManager />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;