import React, { useState, useEffect } from 'react';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Acme Corp',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    defaultLanguage: 'en',
    enableEmployeeSelfService: true,
    enableTwoFactorAuth: false,
    passwordExpiryDays: 90,
    apiKeys: [
      { id: 1, name: 'Integration with Payroll System', key: '*****a3f2', lastUsed: '2023-06-10' },
      { id: 2, name: 'HR Mobile App', key: '*****b5g7', lastUsed: '2023-06-15' }
    ],
    categories: {
      departments: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'],
      documentTypes: ['Contract', 'Policy', 'Certificate', 'Legal', 'Other'],
      trainingCategories: ['Onboarding', 'Technical', 'Soft Skills', 'Compliance', 'Leadership']
    }
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [newApiKey, setNewApiKey] = useState({ name: '', key: '' });
  const [newCategory, setNewCategory] = useState({ type: '', value: '' });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would be an API call
    console.log('Settings saved:', settings);
    alert('Settings saved successfully');
  };

  const handleAddApiKey = () => {
    if (newApiKey.name.trim()) {
      setSettings(prev => ({
        ...prev,
        apiKeys: [...prev.apiKeys, {
          id: prev.apiKeys.length + 1,
          name: newApiKey.name,
          key: '*****' + Math.random().toString(36).substr(2, 4),
          lastUsed: 'Never'
        }]
      }));
      setNewApiKey({ name: '', key: '' });
    }
  };

  const handleDeleteApiKey = (id) => {
    setSettings(prev => ({
      ...prev,
      apiKeys: prev.apiKeys.filter(key => key.id !== id)
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.type && newCategory.value.trim()) {
      setSettings(prev => ({
        ...prev,
        categories: {
          ...prev.categories,
          [newCategory.type]: [...prev.categories[newCategory.type], newCategory.value]
        }
      }));
      setNewCategory({ type: '', value: '' });
    }
  };

  const handleDeleteCategory = (type, index) => {
    setSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [type]: prev.categories[type].filter((_, i) => i !== index)
      }
    }));
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading system settings...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'general' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            General Settings
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'api' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            API Keys
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'categories' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Categories
          </button>
        </nav>
      </div>

      {activeTab === 'general' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">General System Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={settings.companyName}
                onChange={handleSettingChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="timezone">
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                value={settings.timezone}
                onChange={handleSettingChange}
                className="w-full p-2 border rounded"
              >
                <option value="America/New_York">Eastern Time (America/New_York)</option>
                <option value="America/Chicago">Central Time (America/Chicago)</option>
                <option value="America/Denver">Mountain Time (America/Denver)</option>
                <option value="America/Los_Angeles">Pacific Time (America/Los_Angeles)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="dateFormat">
                Date Format
              </label>
              <select
                id="dateFormat"
                name="dateFormat"
                value={settings.dateFormat}
                onChange={handleSettingChange}
                className="w-full p-2 border rounded"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="defaultLanguage">
                Default Language
              </label>
              <select
                id="defaultLanguage"
                name="defaultLanguage"
                value={settings.defaultLanguage}
                onChange={handleSettingChange}
                className="w-full p-2 border rounded"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableEmployeeSelfService"
                name="enableEmployeeSelfService"
                checked={settings.enableEmployeeSelfService}
                onChange={handleSettingChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="enableEmployeeSelfService" className="ml-2 block text-gray-700">
                Enable Employee Self-Service Portal
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableTwoFactorAuth"
                name="enableTwoFactorAuth"
                checked={settings.enableTwoFactorAuth}
                onChange={handleSettingChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="enableTwoFactorAuth" className="ml-2 block text-gray-700">
                Require Two-Factor Authentication for Admins
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="passwordExpiryDays">
              Password Expiry (days)
            </label>
            <input
              type="number"
              id="passwordExpiryDays"
              name="passwordExpiryDays"
              value={settings.passwordExpiryDays}
              onChange={handleSettingChange}
              min="1"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">API Key Management</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Add New API Key</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Key name/description"
                  className="w-full p-2 border rounded"
                  value={newApiKey.name}
                  onChange={(e) => setNewApiKey({...newApiKey, name: e.target.value})}
                />
              </div>
              <div>
                <button
                  onClick={handleAddApiKey}
                  className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
                >
                  Generate Key
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Note: The actual key will only be shown once after generation. Store it securely.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Existing API Keys</h3>
            {settings.apiKeys.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No API keys generated yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {settings.apiKeys.map((apiKey) => (
                      <tr key={apiKey.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{apiKey.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{apiKey.key}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{apiKey.lastUsed}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteApiKey(apiKey.id)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">System Categories</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Add New Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <select
                  value={newCategory.type}
                  onChange={(e) => setNewCategory({...newCategory, type: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select category type</option>
                  <option value="departments">Department</option>
                  <option value="documentTypes">Document Type</option>
                  <option value="trainingCategories">Training Category</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Category value"
                  className="w-full p-2 border rounded"
                  value={newCategory.value}
                  onChange={(e) => setNewCategory({...newCategory, value: e.target.value})}
                />
              </div>
              <div>
                <button
                  onClick={handleAddCategory}
                  className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Departments</h3>
              <ul className="space-y-2">
                {settings.categories.departments.map((dept, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{dept}</span>
                    <button
                      onClick={() => handleDeleteCategory('departments', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Document Types</h3>
              <ul className="space-y-2">
                {settings.categories.documentTypes.map((docType, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{docType}</span>
                    <button
                      onClick={() => handleDeleteCategory('documentTypes', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Training Categories</h3>
              <ul className="space-y-2">
                {settings.categories.trainingCategories.map((trainingCat, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{trainingCat}</span>
                    <button
                      onClick={() => handleDeleteCategory('trainingCategories', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;