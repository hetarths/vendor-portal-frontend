import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  FolderOpen, 
  Calendar, 
  CheckSquare, 
  LogOut,
  User,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  currentUser: any;
  onSignOut: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-blue-600' },
  { id: 'users', label: 'User Management', icon: Users, color: 'from-emerald-500 to-emerald-600' },
  { id: 'roles', label: 'Roles & Rights', icon: Shield, color: 'from-purple-500 to-purple-600' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, color: 'from-orange-500 to-orange-600' },
  { id: 'sprints', label: 'Sprints', icon: Calendar, color: 'from-cyan-500 to-cyan-600' },
  { id: 'tasks', label: 'Task Management', icon: CheckSquare, color: 'from-pink-500 to-pink-600' },
];

function Sidebar({ activeModule, setActiveModule, currentUser, onSignOut }: SidebarProps) {
  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full group relative flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-white/10 to-white/5 shadow-lg border border-white/10'
                  : 'hover:bg-white/5 hover:translate-x-1'
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full shadow-lg" />
              )}
              
              {/* Icon with gradient background */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? `bg-gradient-to-br ${item.color} shadow-lg scale-110` 
                  : 'bg-slate-700/50 group-hover:bg-slate-600/50'
              }`}>
                <Icon className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                }`} />
              </div>
              
              {/* Label */}
              <span className={`font-medium transition-all duration-300 ${
                isActive 
                  ? 'text-white' 
                  : 'text-slate-300 group-hover:text-white'
              }`}>
                {item.label}
              </span>
              
              {/* Arrow indicator */}
              <ChevronRight className={`w-4 h-4 ml-auto transition-all duration-300 ${
                isActive 
                  ? 'text-white opacity-100 translate-x-0' 
                  : 'text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`} />
            </button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 mb-3 border border-slate-600/30">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser?.name}</p>
              <p className="text-xs text-slate-400 truncate">{currentUser?.role}</p>
              <div className="flex items-center space-x-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sign Out Button */}
        <button
          onClick={onSignOut}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all duration-300 group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-700/50 group-hover:bg-red-500/20 flex items-center justify-center transition-all duration-300">
            <LogOut className="w-4 h-4 group-hover:text-red-400" />
          </div>
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;