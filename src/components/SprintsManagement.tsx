import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Calendar, FolderOpen, Paperclip } from 'lucide-react';
import Modal from './Modal';

interface Sprint {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'on-hold' | 'pending-approval' | 'in-queue' | 'pending-dues' | 'invoiced';
  comments: string;
  attachments: string[];
}

function SprintsManagement() {
  const [sprints, setSprints] = useState<Sprint[]>([
    {
      id: '1',
      name: 'User Authentication Sprint',
      projectId: '1',
      projectName: 'E-commerce Website',
      startDate: '2024-01-15',
      endDate: '2024-01-29',
      status: 'active',
      comments: 'Implementing login, signup, and password reset functionality',
      attachments: ['requirements.pdf', 'wireframes.fig']
    },
    {
      id: '2',
      name: 'Payment Integration',
      projectId: '2',
      projectName: 'Mobile Banking App',
      startDate: '2024-01-10',
      endDate: '2024-01-24',
      status: 'pending-approval',
      comments: 'Integrate payment gateway and transaction processing',
      attachments: ['payment-specs.pdf']
    },
    {
      id: '3',
      name: 'Dashboard Development',
      projectId: '3',
      projectName: 'Healthcare Portal',
      startDate: '2024-01-05',
      endDate: '2024-01-19',
      status: 'invoiced',
      comments: 'Complete admin dashboard with analytics',
      attachments: ['dashboard-mockups.png', 'analytics-requirements.docx']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    projectId: '',
    startDate: '',
    endDate: '',
    status: 'in-queue' as Sprint['status'],
    comments: '',
    attachments: [] as string[]
  });

  const projects = [
    { id: '1', name: 'E-commerce Website' },
    { id: '2', name: 'Mobile Banking App' },
    { id: '3', name: 'Healthcare Portal' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-blue-900 text-white' },
    { value: 'on-hold', label: 'On Hold', color: 'bg-gray-600 text-white' },
    { value: 'pending-approval', label: 'Pending Approval', color: 'bg-black text-white' },
    { value: 'in-queue', label: 'In Queue', color: 'bg-blue-900 text-white' },
    { value: 'pending-dues', label: 'Pending Dues', color: 'bg-black text-white' },
    { value: 'invoiced', label: 'Invoiced', color: 'bg-gray-800 text-white' }
  ];

  const filteredSprints = sprints.filter(sprint => {
    const matchesSearch = sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sprint.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sprint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingSprint(null);
    setFormData({
      name: '',
      projectId: '',
      startDate: '',
      endDate: '',
      status: 'in-queue',
      comments: '',
      attachments: []
    });
    setShowModal(true);
  };

  const openEditModal = (sprint: Sprint) => {
    setEditingSprint(sprint);
    setFormData({
      name: sprint.name,
      projectId: sprint.projectId,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      status: sprint.status,
      comments: sprint.comments,
      attachments: [...sprint.attachments]
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProject = projects.find(p => p.id === formData.projectId);
    
    if (editingSprint) {
      setSprints(sprints.map(sprint => 
        sprint.id === editingSprint.id 
          ? { 
              ...sprint, 
              ...formData, 
              projectName: selectedProject?.name || sprint.projectName 
            }
          : sprint
      ));
    } else {
      const newSprint: Sprint = {
        id: Date.now().toString(),
        ...formData,
        projectName: selectedProject?.name || ''
      };
      setSprints([...sprints, newSprint]);
    }
    
    setShowModal(false);
  };

  const deleteSprint = (id: string) => {
    if (confirm('Are you sure you want to delete this sprint?')) {
      setSprints(sprints.filter(sprint => sprint.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption?.color || 'bg-gray-100 text-gray-800';
  };

  const addAttachment = () => {
    const fileName = prompt('Enter attachment name:');
    if (fileName && fileName.trim()) {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, fileName.trim()]
      });
    }
  };

  const removeAttachment = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Sprints Management</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage project sprints and track their progress</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-black text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Sprint</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sprints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
            >
              <option value="all">All Statuses</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sprint</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Project</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Duration</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Attachments</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSprints.map((sprint) => (
                <tr key={sprint.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{sprint.name}</div>
                      <div className="text-sm text-gray-500 mt-1 md:hidden">{sprint.projectName}</div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">{sprint.comments}</div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{sprint.projectName}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div className="text-sm text-gray-900">
                        {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sprint.status)}`}>
                      {statusOptions.find(option => option.value === sprint.status)?.label}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                    <div className="flex items-center space-x-2">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{sprint.attachments.length} files</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(sprint)}
                        className="text-blue-900 hover:text-black transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSprint(sprint.id)}
                        className="text-black hover:text-gray-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingSprint ? 'Edit Sprint' : 'Add New Sprint'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sprint Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Sprint['status'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comments/Description</label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Add any comments or descriptions..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
            <div className="space-y-2">
              {formData.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-700">{attachment}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-black hover:text-gray-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAttachment}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg px-3 py-2 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
              >
                + Add Attachment
              </button>
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
              {editingSprint ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default SprintsManagement;