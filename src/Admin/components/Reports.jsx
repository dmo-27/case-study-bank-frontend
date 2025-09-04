import React, { useState } from 'react';
import { Download, Calendar, FileText, TrendingUp, Users, CreditCard, Activity } from 'lucide-react';
import Button from './ui/Button';

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState('accounts');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const reportTypes = [
    {
      id: 'accounts',
      name: 'Account Summary Report',
      description: 'Account balances, status, and activity summary',
      icon: CreditCard,
      color: 'blue'
    },
    {
      id: 'transactions',
      name: 'Transaction Report',
      description: 'Detailed transaction history and analytics',
      icon: Activity,
      color: 'green'
    },
    {
      id: 'users',
      name: 'User Activity Report',
      description: 'User login patterns and behavior analysis',
      icon: Users,
      color: 'purple'
    },
    {
      id: 'fraud',
      name: 'Fraud Detection Report',
      description: 'Flagged transactions and suspicious activities',
      icon: TrendingUp,
      color: 'red'
    }
  ];

  const scheduledReports = [
    {
      id: '1',
      name: 'Daily Transaction Summary',
      schedule: 'Daily at 9:00 AM',
      lastRun: '2024-12-01 09:00',
      status: 'active'
    },
    {
      id: '2',
      name: 'Weekly Account Report',
      schedule: 'Weekly on Monday',
      lastRun: '2024-11-25 08:00',
      status: 'active'
    },
    {
      id: '3',
      name: 'Monthly Fraud Analysis',
      schedule: 'Monthly on 1st',
      lastRun: '2024-11-01 10:00',
      status: 'paused'
    }
  ];

  const handleGenerateReport = () => {
    const reportData = {
      type: selectedReportType,
      dateRange,
      timestamp: new Date().toISOString()
    };
    
    console.log('Generating report:', reportData);
    alert(`${reportTypes.find(t => t.id === selectedReportType)?.name} generated successfully!`);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Generate and schedule comprehensive reports</p>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {reportTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedReportType(type.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                selectedReportType === type.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <type.icon className={`h-6 w-6 mr-2 ${
                  type.color === 'blue' ? 'text-blue-600' :
                  type.color === 'green' ? 'text-green-600' :
                  type.color === 'purple' ? 'text-purple-600' :
                  'text-red-600'
                }`} />
                <h3 className="font-medium text-gray-900">{type.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleGenerateReport}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Scheduled Reports</h2>
          <Button className="bg-green-600 hover:bg-green-700">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduledReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.schedule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.lastRun}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3 transition-colors">
                      Edit
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3 transition-colors">
                      Run Now
                    </button>
                    <button className="text-red-600 hover:text-red-900 transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
