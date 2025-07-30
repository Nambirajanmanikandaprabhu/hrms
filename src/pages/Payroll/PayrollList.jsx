import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DollarSign, Download, Eye, Calendar, Filter, Search, FileText, TrendingUp } from 'lucide-react';

const PayrollList = () => {
  const { user, hasRole } = useAuth();
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockPayrollData = [
      {
        id: '1',
        employee: { firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
        payPeriodStart: '2024-01-01',
        payPeriodEnd: '2024-01-31',
        baseSalary: 8000.00,
        overtime: 500.00,
        bonuses: 1000.00,
        allowances: 300.00,
        deductions: 200.00,
        tax: 1800.00,
        netPay: 7800.00,
        status: 'PAID',
        processedAt: '2024-01-31T10:00:00Z',
        paidAt: '2024-02-01T14:30:00Z'
      },
      {
        id: '2',
        employee: { firstName: 'Sarah', lastName: 'Wilson', employeeId: 'EMP002' },
        payPeriodStart: '2024-01-01',
        payPeriodEnd: '2024-01-31',
        baseSalary: 7000.00,
        overtime: 200.00,
        bonuses: 500.00,
        allowances: 250.00,
        deductions: 150.00,
        tax: 1400.00,
        netPay: 6400.00,
        status: 'PROCESSING',
        processedAt: '2024-01-31T10:00:00Z',
        paidAt: null
      },
      {
        id: '3',
        employee: { firstName: 'Mike', lastName: 'Johnson', employeeId: 'EMP003' },
        payPeriodStart: '2024-01-01',
        payPeriodEnd: '2024-01-31',
        baseSalary: 10000.00,
        overtime: 0.00,
        bonuses: 2000.00,
        allowances: 500.00,
        deductions: 300.00,
        tax: 2400.00,
        netPay: 9800.00,
        status: 'PENDING',
        processedAt: null,
        paidAt: null
      }
    ];

    setTimeout(() => {
      setPayrollRecords(mockPayrollData);
      setLoading(false);
    }, 1000);
  }, [selectedMonth]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-800';
      case 'PROCESSING': return 'bg-yellow-100 text-yellow-800';
      case 'PENDING': return 'bg-orange-100 text-orange-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = 
      `${record.employee.firstName} ${record.employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    
    // For employees, only show their own records
    if (hasRole(['employee']) && record.employee.employeeId !== user?.employeeId) {
      return false;
    }
    
    return matchesSearch && matchesStatus;
  });

  const totalPayroll = filteredRecords.reduce((sum, record) => sum + record.netPay, 0);
  const averagePay = filteredRecords.length > 0 ? totalPayroll / filteredRecords.length : 0;

  const PayslipModal = ({ record, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Payslip</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Employee Info */}
            <div className="border-b border-gray-200 pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Employee Information</h4>
                  <p className="text-gray-600">{record.employee.firstName} {record.employee.lastName}</p>
                  <p className="text-gray-600">{record.employee.employeeId}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Pay Period</h4>
                  <p className="text-gray-600">
                    {new Date(record.payPeriodStart).toLocaleDateString()} - {new Date(record.payPeriodEnd).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Earnings</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Salary</span>
                  <span className="font-medium">${record.baseSalary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overtime</span>
                  <span className="font-medium">${record.overtime.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bonuses</span>
                  <span className="font-medium">${record.bonuses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Allowances</span>
                  <span className="font-medium">${record.allowances.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                  <span>Gross Pay</span>
                  <span>${(record.baseSalary + record.overtime + record.bonuses + record.allowances).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Deductions</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${record.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Other Deductions</span>
                  <span className="font-medium">${record.deductions.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                  <span>Total Deductions</span>
                  <span>${(record.tax + record.deductions).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Net Pay */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Net Pay</span>
                <span className="text-2xl font-bold text-blue-600">${record.netPay.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [selectedPayslip, setSelectedPayslip] = useState(null);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600">
            {hasRole(['employee']) ? 'View your payslips and salary information' : 'Manage employee payroll and compensation'}
          </p>
        </div>
        {hasRole(['admin', 'hr']) && (
          <div className="flex items-center space-x-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <TrendingUp className="h-4 w-4" />
              <span>Process Payroll</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards (Admin/HR View) */}
      {hasRole(['admin', 'hr']) && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payroll</p>
                <p className="text-2xl font-bold text-gray-900">${totalPayroll.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Pay</p>
                <p className="text-2xl font-bold text-gray-900">${averagePay.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processed</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredRecords.filter(r => r.status === 'PAID').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">
                  {filteredRecords.filter(r => r.status === 'PENDING').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pay Period</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {!hasRole(['employee']) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Employee</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="PAID">Paid</option>
              <option value="PROCESSING">Processing</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Payroll Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {!hasRole(['employee']) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => {
                const grossPay = record.baseSalary + record.overtime + record.bonuses + record.allowances;
                const totalDeductions = record.tax + record.deductions;

                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    {!hasRole(['employee']) && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {record.employee.firstName} {record.employee.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{record.employee.employeeId}</div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>{new Date(record.payPeriodStart).toLocaleDateString()}</div>
                        <div className="text-gray-500">to {new Date(record.payPeriodEnd).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${grossPay.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      ${totalDeductions.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                      ${record.netPay.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedPayslip(record)}
                          className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </button>
                        <button className="text-green-600 hover:text-green-900 flex items-center space-x-1">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payroll records found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or select a different pay period</p>
        </div>
      )}

      {/* Payslip Modal */}
      {selectedPayslip && (
        <PayslipModal
          record={selectedPayslip}
          onClose={() => setSelectedPayslip(null)}
        />
      )}
    </div>
  );
};

export default PayrollList;