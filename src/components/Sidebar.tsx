import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  FolderOpen, 
  Calendar, 
  CheckSquare, 
  LogOut,
  User
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  currentUser: any;
  onSignOut: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'roles', label: 'Roles & Rights', icon: Shield },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'sprints', label: 'Sprints', icon: Calendar },
  { id: 'tasks', label: 'Task Management', icon: CheckSquare },
];

function Sidebar({ activeModule, setActiveModule, currentUser, onSignOut }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeModule === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentUser?.name}</p>
            <p className="text-xs text-gray-400 truncate">{currentUser?.role}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;