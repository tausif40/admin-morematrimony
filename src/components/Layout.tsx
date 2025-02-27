import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Users, Crown, LogOut, ChevronDown, User as UserIcon } from 'lucide-react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import toast from 'react-hot-toast';

const menuItems = [
  { icon: LayoutDashboard, name: 'Dashboard', path: '/dashboard' },
  { icon: Users, name: 'Users', path: '/users' },
  { icon: Crown, name: 'Plans', path: '/plans' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    // Add actual logout logic here
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} text-black transition-all duration-300 shadow-md ease-in-out z-10`} >
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-gray-300 rounded-lg "
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center px-4 py-3 ${location.pathname.startsWith(item.path) ? 'bg-gray-800 text-white' : 'hover:bg-gray-300'}`}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="ml-4">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-end h-16 px-4">
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100">
                <UserIcon size={20} className="text-gray-600" />
                <ChevronDown size={16} className="ml-2 text-gray-600" />
              </HeadlessMenu.Button>

              <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2`}                    >
                      Profile
                    </button>
                  )}
                </HeadlessMenu.Item>
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button onClick={handleLogout} className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2 text-red-600`}>
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </div>
                    </button>
                  )}
                </HeadlessMenu.Item>
              </HeadlessMenu.Items>
            </HeadlessMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f3f4f6] p-6"><Outlet /></main>
      </div>
    </div>
  );
}