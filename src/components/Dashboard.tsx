import React from 'react';
import { Users, FolderOpen, Calendar, CheckSquare, TrendingUp, Activity } from 'lucide-react';

function Dashboard() {
  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'bg-gradient-to-br from-blue-600 to-blue-700', change: '+12%' },
    { label: 'Active Projects', value: '23', icon: FolderOpen, color: 'bg-gradient-to-br from-slate-700 to-slate-800', change: '+5%' },
    { label: 'Running Sprints', value: '8', icon: Calendar, color: 'bg-gradient-to-br from-blue-500 to-blue-600', change: '+2%' },
    { label: 'Pending Tasks', value: '156', icon: CheckSquare, color: 'bg-gradient-to-br from-slate-600 to-slate-700', change: '-8%' },
  ];

  const recentActivity = [
    { action: 'New project "Mobile App" created', time: '2 hours ago' },
    { action: 'Sprint "Feature Development" completed', time: '4 hours ago' },
    { action: 'User "john.doe@company.com" assigned to project', time: '6 hours ago' },
    { action: 'Task "API Integration" marked as completed', time: '8 hours ago' },
    { action: 'New sprint "Bug Fixes" started', time: '1 day ago' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-600 mt-2 text-lg">Welcome back! Here's what's happening in your system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{stat.label}</p>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.change.startsWith('+') 
                        ? 'text-green-700 bg-green-100' 
                        : 'text-red-700 bg-red-100'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50">
          <div className="p-6 border-b border-slate-200/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 shadow-sm"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50">
          <div className="p-6 border-b border-slate-200/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Performance Overview</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Project Completion Rate</span>
                <span className="text-sm font-bold text-slate-900">87%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" style={{ width: '87%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Task Completion Rate</span>
                <span className="text-sm font-bold text-slate-900">92%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-slate-600 to-slate-700 h-3 rounded-full shadow-sm" style={{ width: '92%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Sprint Success Rate</span>
                <span className="text-sm font-bold text-slate-900">78%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;