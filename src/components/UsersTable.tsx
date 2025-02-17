import React, { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { Menu } from '@headlessui/react';
import { format } from 'date-fns';
import { User } from '../types';
import { mockUsers } from '../data/mockData';
import toast from 'react-hot-toast';

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleUserAction = (userId: string, action: string) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        switch (action) {
          case 'block':
            toast.success('User blocked successfully');
            return { ...user, status: 'blocked' as const };
          case 'activate':
            toast.success('User activated successfully');
            return { ...user, status: 'active' as const };
          default:
            return user;
        }
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'premium') return matchesSearch && user.membershipType === 'premium';
    if (filterType === 'free') return matchesSearch && user.membershipType === 'free';
    if (filterType === 'blocked') return matchesSearch && user.status === 'blocked';
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="premium">Premium</option>
            <option value="free">Free</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm ">
        <div className="">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.membershipType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(user.lastLogin), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical size={16} />
                      </Menu.Button>
                      <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm w-full text-left`}
                              onClick={() => handleUserAction(user.id, user.status === 'active' ? 'block' : 'activate')}
                            >
                              {user.status === 'active' ? 'Block User' : 'Activate User'}
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm w-full text-left`}
                              onClick={() => toast.success('Profile viewed')}
                            >
                              View Profile
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}