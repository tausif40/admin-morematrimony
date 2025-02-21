import React from 'react';
import { Users, Crown, DollarSign, TrendingUp, Activity, UserPlus, Calendar, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const stats = [
  {
    title: 'Total Users',
    value: '12,345',
    icon: Users,
    change: '+12%',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700',
  },
  {
    title: 'Paid Members',
    value: '2,567',
    icon: Crown,
    change: '+23%',
    color: 'bg-gradient-to-r from-orange-500 to-orange-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700',
  },
  {
    title: 'Free Members',
    value: '3,658',
    icon: TrendingUp,
    change: '+15%',
    color: 'bg-gradient-to-r from-gray-500 to-slate-600',
    hoverColor: 'hover:from-orange-600 hover:to-orange-700',
  },
  {
    title: 'Monthly Revenue',
    value: '$45,678',
    icon: DollarSign,
    change: '+8%',
    color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    hoverColor: 'hover:from-emerald-600 hover:to-emerald-700',
  },

];

const recentActivity = [
  {
    id: 1,
    type: 'new_user',
    icon: UserPlus,
    color: 'bg-blue-100 text-blue-600',
    message: 'New user registered',
    name: 'Sarah Johnson',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'subscription',
    icon: CreditCard,
    color: 'bg-purple-100 text-purple-600',
    message: 'Premium subscription purchased',
    name: 'Michael Chen',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'activity',
    icon: Activity,
    color: 'bg-green-100 text-green-600',
    message: 'Profile completion milestone reached',
    name: 'Emma Wilson',
    time: '6 hours ago',
  },
];

const monthlyStats = [
  { month: 'Jan', users: 30 },
  { month: 'Feb', users: 116 },
  { month: 'Mar', users: 45 },
  { month: 'Apr', users: 125 },
  { month: 'May', users: 40 },
  { month: 'Jun', users: 90 },
  { month: 'Jul', users: 40 },
  { month: 'Aug', users: 60 },
  { month: 'Sep', users: 80 },
  { month: 'Oct', users: 132 },
  { month: 'Nov', users: 280 },
  { month: 'Dec', users: 125 },
];
// Find the maximum number of users to normalize the heights

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-500" size={20} />
          <span className="text-gray-600">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden ${stat.hoverColor}`}
          >
            <div className={`p-6 ${stat.color}`}>
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm opacity-90">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-white bg-opacity-20">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-white">
                <span className="text-sm font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
                <span className="text-sm ml-2 opacity-90">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-center mb-4">Monthly Growth Chart</h2>
          {/* <div className="h-64 flex items-end justify-between space-x-2"> */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3b82f6" barSize={20} activeBar={{ fill: "#3b82f6" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* </div> */}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 border border-transparent hover:border-gray-200"
              >
                <div className={`p-3 rounded-full ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.name}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Average Match Rate</h3>
          <div className="text-3xl font-bold">78%</div>
          <p className="text-sm opacity-90 mt-1">Based on user preferences</p>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Active Conversations</h3>
          <div className="text-3xl font-bold">1,234</div>
          <p className="text-sm opacity-90 mt-1">Across all users today</p>
        </div>
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Success Stories</h3>
          <div className="text-3xl font-bold">456</div>
          <p className="text-sm opacity-90 mt-1">Marriages this year</p>
        </div>
      </div>
    </div>
  );
}