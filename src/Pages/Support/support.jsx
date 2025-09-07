// src/pages/admin/support.jsx
import React, { useState } from 'react';
import { 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Search, 
  ChevronDown, 
  Plus,
  AlertTriangle
} from 'lucide-react';
import CreateTicketModal from './../../components/Support/CreateSupportModal';
import ViewTicketModal from '../../components/Support/ViewTicketModal';

function Support() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [tickets, setTickets] = useState([
    {
      id: '1',
      subject: 'Account Access Issues',
      description: 'Customer unable to login for the past 2 days',
      userId: 'user1',
      priority: 'high',
      status: 'open',
      createdAt: '2025-09-07T09:00:00',
      updatedAt: '2025-09-07T09:00:00'
    },
    {
      id: '2',
      subject: 'Fraudulent Transaction Report',
      description: 'Customer reports unauthorized transaction on account',
      userId: 'user2',
      priority: 'critical',
      status: 'escalated',
      createdAt: '2025-09-07T08:30:00',
      updatedAt: '2025-09-07T09:30:00'
    },
    {
      id: '3',
      subject: 'Card Replacement Request',
      description: 'Lost card needs replacement',
      userId: 'user3',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2025-09-05T11:00:00',
      updatedAt: '2025-09-06T14:00:00'
    }
  ]);

  // Stats
  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    escalated: tickets.filter(t => t.status === 'escalated').length,
    resolved: tickets.filter(t => t.status === 'resolved').length
  };

  // CRUD Actions
  const handleCreateTicket = (newTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    setIsModalOpen(false);
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  };

  const handleEscalateTicket = (ticketId) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? { ...t, status: 'escalated', priority: 'critical', updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const handleResolveTicket = (ticketId) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? { ...t, status: 'resolved', updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  // Helpers
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSLAStatus = (ticket) => {
    const createdAt = new Date(ticket.createdAt);
    const hoursSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
    const slaHours = ticket.priority === 'critical' ? 1 : ticket.priority === 'high' ? 4 : 24;

    if (ticket.status === 'resolved') return null;
    return hoursSinceCreation > slaHours ? 'breached' : 'within';
  };

  // Filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Tickets</h1>
          <p className="text-gray-600">Manage customer support tickets and SLA monitoring</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="text-3xl font-bold">{stats.open}</p>
                <p className="text-sm text-gray-600">Open</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-orange-600 mr-3" />
              <div>
                <p className="text-3xl font-bold">{stats.escalated}</p>
                <p className="text-sm text-gray-600">Escalated</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-3xl font-bold">{stats.resolved}</p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Ticket
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Ticket</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">User</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Priority</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Created</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTickets.map(ticket => {
                  const createdAt = new Date(ticket.createdAt);
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <p className="font-medium">{ticket.subject}</p>
                        <p className="text-sm text-gray-500">{ticket.description}</p>
                      </td>
                      <td className="py-4 px-6">{ticket.userId}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">{createdAt.toLocaleDateString()}</td>
                      <td className="py-4 px-6 space-x-2">
                        <button
                          onClick={() => handleViewTicket(ticket)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View
                        </button>
                        {ticket.status !== 'escalated' && ticket.status !== 'resolved' && (
                          <button
                            onClick={() => handleEscalateTicket(ticket.id)}
                            className="text-orange-600 hover:text-orange-800 text-sm"
                          >
                            Escalate
                          </button>
                        )}
                        {ticket.status !== 'resolved' && (
                          <button
                            onClick={() => handleResolveTicket(ticket.id)}
                            className="text-green-600 hover:text-green-800 text-sm"
                          >
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Ticket Modal */}
        {isModalOpen && (
          <CreateTicketModal 
            onClose={() => setIsModalOpen(false)} 
            onCreate={handleCreateTicket}
          />
        )}

        {/* View Ticket Modal */}
        {isModalOpen && (
  <CreateTicketModal 
    onClose={() => setIsModalOpen(false)} 
    onCreate={handleCreateTicket}
  />
)}

<ViewTicketModal
  isOpen={isViewModalOpen}
  onClose={() => setIsViewModalOpen(false)}
  ticket={selectedTicket}
  onEscalate={handleEscalateTicket}
  onResolve={handleResolveTicket}
  getPriorityColor={getPriorityColor}
  getStatusColor={getStatusColor}
  getSLAStatus={getSLAStatus}
/>
      </div>
    </div>
  );
}

export default Support;
