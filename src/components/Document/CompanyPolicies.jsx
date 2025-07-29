import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CompanyPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    // Simulate API call
    const fetchPolicies = async () => {
      try {
        const mockData = [
          { id: 1, title: 'Code of Conduct', category: 'General', version: '2.1', effectiveDate: '2023-01-01', requiresAcknowledgment: true },
          { id: 2, title: 'Remote Work Policy', category: 'Workplace', version: '1.3', effectiveDate: '2022-06-15', requiresAcknowledgment: true },
          { id: 3, title: 'Anti-Discrimination Policy', category: 'HR', version: '3.0', effectiveDate: '2023-03-10', requiresAcknowledgment: true },
          { id: 4, title: 'Expense Reimbursement', category: 'Finance', version: '1.5', effectiveDate: '2022-11-20', requiresAcknowledgment: false },
        ];
        setPolicies(mockData);
      } catch (error) {
        console.error('Error fetching policies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const filteredPolicies = policies.filter(policy => {
    const matchesCategory = categoryFilter === 'All' || policy.category === categoryFilter;
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         policy.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', ...new Set(policies.map(policy => policy.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Company Policies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Search policies..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Filter by category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading policies...</div>
      ) : filteredPolicies.length === 0 ? (
        <div className="text-center py-8">No policies found matching your criteria</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acknowledgment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/policies/${policy.id}`} className="text-blue-600 hover:underline">
                      {policy.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{policy.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{policy.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{policy.effectiveDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {policy.requiresAcknowledgment ? (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        Not Required
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <a 
                        href={`/policies/${policy.id}/view`} 
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View
                      </a>
                      {policy.requiresAcknowledgment && (
                        <button className="text-green-600 hover:underline text-sm">
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyPolicies;