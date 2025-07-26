import React, { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Users } from 'lucide-react';
import Modal from './Modal';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

function RolesManagement() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: ['user.create', 'user.read', 'user.update', 'user.delete', 'project.create', 'project.read', 'project.update', 'project.delete', 'sprint.create', 'sprint.read', 'sprint.update', 'sprint.delete'],
      userCount: 2
    },
    {
      id: '2',
      name: 'Project Manager',
      description: 'Can manage projects and sprints',
      permissions: ['project.create', 'project.read', 'project.update', 'sprint.create', 'sprint.read', 'sprint.update'],
      userCount: 5
    },
    {
      id: '3',
      name: 'Developer',
      description: 'Can view projects and manage tasks',
      permissions: ['project.read', 'sprint.read', 'task.create', 'task.read', 'task.update'],
      userCount: 12
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const availablePermissions = [
    { id: 'user.create', label: 'Create Users', category: 'User Management' },
    { id: 'user.read', label: 'View Users', category: 'User Management' },
    { id: 'user.update', label: 'Edit Users', category: 'User Management' },
    { id: 'user.delete', label: 'Delete Users', category: 'User Management' },
    { id: 'project.create', label: 'Create Projects', category: 'Project Management' },
    { id: 'project.read', label: 'View Projects', category: 'Project Management' },
    { id: 'project.update', label: 'Edit Projects', category: 'Project Management' },
    { id: 'project.delete', label: 'Delete Projects', category: 'Project Management' },
    { id: 'sprint.create', label: 'Create Sprints', category: 'Sprint Management' },
    { id: 'sprint.read', label: 'View Sprints', category: 'Sprint Management' },
    { id: 'sprint.update', label: 'Edit Sprints', category: 'Sprint Management' },
    { id: 'sprint.delete', label: 'Delete Sprints', category: 'Sprint Management' },
    { id: 'task.create', label: 'Create Tasks', category: 'Task Management' },
    { id: 'task.read', label: 'View Tasks', category: 'Task Management' },
    { id: 'task.update', label: 'Edit Tasks', category: 'Task Management' },
    { id: 'task.delete', label: 'Delete Tasks', category: 'Task Management' },
  ];

  const openAddModal = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
    setShowModal(true);
  };

  const openEditModal = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...formData }
          : role
      ));
    } else {
      const newRole: Role = {
        id: Date.now().toString(),
        ...formData,
        userCount: 0
      };
      setRoles([...roles, newRole]);
    }
    
    setShowModal(false);
  };

  const deleteRole = (id: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  const togglePermission = (permission: string) => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];
    
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const permissionsByCategory = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof availablePermissions>);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Roles & Rights Management</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage user roles and permissions</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-black text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Role</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-900" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{role.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(role)}
                  className="text-blue-900 hover:text-black transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteRole(role.id)}
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{role.description}</p>
            
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{role.userCount} users assigned</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Permissions ({role.permissions.length})</p>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((permission) => (
                  <span key={permission} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-900 text-white rounded">
                    {permission.split('.')[1]}
                  </span>
                ))}
                {role.permissions.length > 3 && (
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-black text-white rounded">
                    +{role.permissions.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingRole ? 'Edit Role' : 'Add New Role'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">{category}</h4>
                  <div className="space-y-2 ml-4">
                    {permissions.map((permission) => (
                      <label key={permission.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                        />
                        <span className="text-sm text-gray-700">{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
            >
              {editingRole ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default RolesManagement;