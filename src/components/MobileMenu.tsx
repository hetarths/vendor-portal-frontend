import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  FolderOpen, 
  Calendar, 
  CheckSquare, 
  LogOut,
  ChevronRight
} from 'lucide-react';

interface MobileMenuProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  onSignOut: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-blue-600' },
  { id: 'users', label: 'User Management', icon: Users, color: 'from-emerald-500 to-emerald-600' },
  { id: 'roles', label: 'Roles & Rights', icon: Shield, color: 'from-purple-500 to-purple-600' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, color: 'from-orange-500 to-orange-600' },
  { id: 'sprints', label: 'Sprints', icon: Calendar, color: 'from-cyan-500 to-cyan-600' },
  { id: 'tasks', label: 'Task Management', icon: CheckSquare, color: 'from-pink-500 to-pink-600' },
];

function MobileMenu({ activeModule, setActiveModule, onSignOut, isOpen, onClose }: MobileMenuProps) {
  const handleMenuItemClick = (moduleId: string) => {
    setActiveModule(moduleId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`w-full group relative flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg border border-blue-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full shadow-lg" />
                )}
                
                {/* Icon with gradient background */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-br ${item.color} shadow-lg scale-110` 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <Icon className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                  }`} />
                </div>
                
                {/* Label */}
                <span className={`font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  {item.label}
                </span>
                
                {/* Arrow indicator */}
                <ChevronRight className={`w-4 h-4 ml-auto transition-all duration-300 ${
                  isActive 
                    ? 'text-gray-700 opacity-100 translate-x-0' 
                    : 'text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* Sign Out Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onSignOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 border border-transparent transition-all duration-300 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-all duration-300">
              <LogOut className="w-4 h-4 group-hover:text-red-400" />
            </div>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;