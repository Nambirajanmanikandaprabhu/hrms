import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, Download, Calendar, Filter, FileText, TrendingUp, Users, DollarSign } from 'lucide-react';

const ReportsList = () => {
  const { hasRole } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Mock reports data
    const mockReports = [
      {
        id: 'employee-summary',
        name: 'Employee Summary Report',
        description: 'Overview of all employees with their basic information',
        category: 'HR',
        icon: Users,
        color: 'blue',
        lastGenerated: '2024-02-01T10:00:00Z'
      },
      {
        id: 'attendance-report',
        name: 'Attendance Report',
        description: 'Employee attendance patterns and statistics',
        category: 'Attendance',
        icon: Calendar,
        color: 'green',
        lastGenerated: '2024-02-01T08:30:00Z'
      },
      {
        id: 'payroll-summary',
        name: 'Payroll Summary',
        description: 'Monthly payroll breakdown and costs',
        category: 'Finance',
        icon: DollarSign,
        color: 'purple',
        lastGenerated: '2024-01-31T16:45:00Z'
      },
      {
        id: 'leave-analysis',
        name: 'Leave Analysis Report',
        description: 'Leave patterns and balance analysis',
        category: 'HR',
        icon: TrendingUp,
        color: 'orange',
        lastGenerated: '2024-02-01T12:15:00Z'
      },
      {
        id: 'recruitment-metrics',
        name: 'Recruitment Metrics',
        description: 'Hiring statistics and recruitment performance',
        category: 'Recruitment',
        icon: BarChart3,
        color: 'indigo',
        lastGenerated: '2024-01-30T14:20:00Z'
      },
      {
        id: 'performance-overview',
        name: 'Performance Overview',
        description: 'Employee performance ratings and trends',
        category: 'Performance',
        icon: TrendingUp,
        color: 'pink',
        lastGenerated: '2024-01-29T11:30:00Z'
      }
    ];

    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      pink: 'bg-pink-100 text-pink-600'
    };
    return colors[color] || colors.blue;
  };

  const handleGenerateReport = (reportId) => {
    console.log('Generating report:', reportId, { dateRange, filters });
    // Mock report generation
    alert(`Generating ${reports.find(r => r.id === reportId)?.name}...`);
  };

  const categories = [...new Set(reports.map(r => r.category))];

  if (!hasRole(['admin', 'hr', 'manager'])) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">You don't have permission to access reports.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate comprehensive reports and analyze HR data</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Generated Today</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled Reports</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Report Generation Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Report</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a report...</option>
              {reports.map(report => (
                <option key={report.id} value={report.id}>{report.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => selectedReport && handleGenerateReport(selectedReport)}
              disabled={!selectedReport}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>

        {selectedReport && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {reports.find(r => r.id === selectedReport)?.icon && 
                  React.createElement(reports.find(r => r.id === selectedReport).icon, {
                    className: "h-5 w-5 text-blue-600 mt-0.5"
                  })
                }
              </div>
              <div>
                <h4 className="font-medium text-blue-900">
                  {reports.find(r => r.id === selectedReport)?.name}
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  {reports.find(r => r.id === selectedReport)?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Available Reports</h3>
        </div>
        
        <div className="p-6">
          {categories.map(category => (
            <div key={category} className="mb-8 last:mb-0">
              <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                {category}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.filter(report => report.category === category).map(report => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(report.color)}`}>
                        <report.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(report.lastGenerated).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h5 className="font-semibold text-gray-900 mb-2">{report.name}</h5>
                    <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Last: {new Date(report.lastGenerated).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleGenerateReport(report.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                      >
                        <Download className="h-3 w-3" />
                        <span>Generate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsList;