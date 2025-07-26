import React from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';

interface MobileHeaderProps {
  currentUser: any;
  onMenuToggle: () => void;
  onSignOut: () => void;
  isMenuOpen: boolean;
}

function MobileHeader({ currentUser, onMenuToggle, onSignOut, isMenuOpen }: MobileHeaderProps) {
  return (
    <header className="lg:hidden bg-white shadow-lg border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{currentUser?.name}</p>
            <p className="text-xs text-gray-600">{currentUser?.role}</p>
          </div>
        </div>
        
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
}

export default MobileHeader;