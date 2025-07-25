import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import RolesManagement from './components/RolesManagement';
import ProjectsManagement from './components/ProjectsManagement';
import SprintsManagement from './components/SprintsManagement';
import TasksManagement from './components/TasksManagement';

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState('dashboard');

  const handleSignIn = (email: string, password: string) => {
    // Mock authentication
    if (email === 'admin@company.com' && password === 'admin123') {
      const user: User = {
        id: '1',
        email: email,
        name: 'Admin User',
        role: 'Super Admin'
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveModule('dashboard');
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RolesManagement />;
      case 'projects':
        return <ProjectsManagement />;
      case 'sprints':
        return <SprintsManagement />;
      case 'tasks':
        return <TasksManagement />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-blue-50/30">
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />
      <main className="flex-1 overflow-auto">
        {renderActiveModule()}
      </main>
    </div>
  );
}

export default App;