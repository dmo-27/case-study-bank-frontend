import React, { useState } from 'react';
import { 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Search, 
  ChevronDown, 
  Plus
} from 'lucide-react';
import CreateTicketModal from'./../../components/Support/CreateSupportModal';

function support() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [tickets, setTickets] = useState([
    {
      id: '1',
      title: 'Account Access Issues',
      description: 'Customer unable to login for the past 2 days',
      user: 'user1',
      priority: 'high',
      status: 'open',
      created: '7/9/2025'
    },
    {
      id: '2',
      title: 'Fraudulent Transaction Report',
      description: 'Customer reports unauthorized transaction on account',
      user: 'user2',
      priority: 'critical',
      status: 'escalated',
      created: '7/9/2025'
    },
    {
      id: '3',
      title: 'Card Replacement Request',
      description: 'Lost card needs replacement',
      user: 'user3',
      priority: 'medium',
      status: 'resolved',
      created: '5/9/2025'
    }
  ]);

  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    escalated: tickets.filter(t => t.status === 'escalated').length,
    resolved: tickets.filter(t => t.status === 'resolved').length
  };

  const handleCreateTicket = (newTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    setIsModalOpen(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-blue-100 text-blue-800';
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Tickets</h1>
          <p className="text-gray-600">Manage customer support tickets and SLA monitoring</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-900">{stats.open}</p>
                <p className="text-sm text-gray-600">Open Tickets</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-900">{stats.escalated}</p>
                <p className="text-sm text-gray-600">Escalated</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-900">{stats.resolved}</p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option>All Priorities</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Create Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">TICKET</th>
                
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">PRIORITY</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">CREATED</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{ticket.title}</p>
                        <p className="text-sm text-gray-500">{ticket.description}</p>
                      </div>
                    </td>
                    {/* <td className="py-4 px-6 text-gray-900">{ticket.user}</td> */}
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{ticket.created}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                          View
                        </button>
                        {ticket.status !== 'resolved' && (
                          <>
                            <button className="text-orange-600 hover:text-orange-800 font-medium text-sm transition-colors">
                              Escalate
                            </button>
                            <button className="text-green-600 hover:text-green-800 font-medium text-sm transition-colors">
                              Resolve
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
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
      </div>
    </div>
  );
};

export default support;
