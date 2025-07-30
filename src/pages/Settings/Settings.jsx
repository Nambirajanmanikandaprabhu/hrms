import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Settings as SettingsIcon, Save, User, Bell, Shield, Database, Mail, Globe } from 'lucide-react';

const Settings = () => {
  const { user, hasRole } = useAuth();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Mock settings data - replace with API call
    const mockSettings = {
      general: {
        companyName: 'TechCorp Solutions',
        companyEmail: 'info@techcorp.com',
        companyPhone: '+1-555-0100',
        companyAddress: '123 Business Ave, New York, NY 10001',
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD'
      },
      notifications: {
        emailNotifications: true,
        leaveRequestNotifications: true,
        attendanceAlerts: true,
        payrollNotifications: false,
        systemUpdates: true
      },
      security: {
        passwordMinLength: 8,
        requireSpecialChars: true,
        sessionTimeout: 30,
        twoFactorAuth: false,
        loginAttempts: 5
      },
      hr: {
        probationPeriod: 90,
        annualLeaveDefault: 25,
        sickLeaveDefault: 10,
        workingHoursPerDay: 8,
        workingDaysPerWeek: 5,
        overtimeRate: 1.5
      },
      integrations: {
        slackEnabled: false,
        slackWebhook: '',
        emailProvider: 'smtp',
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUsername: '',
        smtpPassword: ''
      }
    };

    setTimeout(() => {
      setSettings(mockSettings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = async (category, data) => {
    setSaving(true);
    try {
      // Mock API call - replace with actual API call
      console.log('Saving settings:', category, data);
      
      setSettings(prev => ({
        ...prev,
        [category]: { ...prev[category], ...data }
      }));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'hr', name: 'HR Policies', icon: User },
    { id: 'integrations', name: 'Integrations', icon: Database }
  ];

  if (!hasRole(['admin'])) {
    return (
      <div className="text-center py-12">
        <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">You don't have permission to access system settings.</p>
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
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                handleSave('general', data);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      defaultValue={settings.general?.companyName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
                    <input
                      type="email"
                      name="companyEmail"
                      defaultValue={settings.general?.companyEmail}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Phone</label>
                    <input
                      type="tel"
                      name="companyPhone"
                      defaultValue={settings.general?.companyPhone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      name="timezone"
                      defaultValue={settings.general?.timezone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select
                      name="dateFormat"
                      defaultValue={settings.general?.dateFormat}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      name="currency"
                      defaultValue={settings.general?.currency}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                  <textarea
                    name="companyAddress"
                    defaultValue={settings.general?.companyAddress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {};
                // Handle checkboxes
                Object.keys(settings.notifications || {}).forEach(key => {
                  data[key] = formData.has(key);
                });
                handleSave('notifications', data);
              }}>
                <div className="space-y-4">
                  {Object.entries(settings.notifications || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                        <p className="text-sm text-gray-500">
                          Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name={key}
                        defaultChecked={value}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                // Convert numeric fields
                data.passwordMinLength = parseInt(data.passwordMinLength);
                data.sessionTimeout = parseInt(data.sessionTimeout);
                data.loginAttempts = parseInt(data.loginAttempts);
                data.requireSpecialChars = formData.has('requireSpecialChars');
                data.twoFactorAuth = formData.has('twoFactorAuth');
                handleSave('security', data);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
                    <input
                      type="number"
                      name="passwordMinLength"
                      defaultValue={settings.security?.passwordMinLength}
                      min="6"
                      max="20"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      name="sessionTimeout"
                      defaultValue={settings.security?.sessionTimeout}
                      min="5"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      name="loginAttempts"
                      defaultValue={settings.security?.loginAttempts}
                      min="3"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Require Special Characters</label>
                      <p className="text-sm text-gray-500">Passwords must contain special characters</p>
                    </div>
                    <input
                      type="checkbox"
                      name="requireSpecialChars"
                      defaultChecked={settings.security?.requireSpecialChars}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Two-Factor Authentication</label>
                      <p className="text-sm text-gray-500">Enable 2FA for all users</p>
                    </div>
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      defaultChecked={settings.security?.twoFactorAuth}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* HR Policies */}
          {activeTab === 'hr' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">HR Policies</h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                // Convert numeric fields
                Object.keys(data).forEach(key => {
                  if (!isNaN(data[key])) {
                    data[key] = parseFloat(data[key]);
                  }
                });
                handleSave('hr', data);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Probation Period (days)</label>
                    <input
                      type="number"
                      name="probationPeriod"
                      defaultValue={settings.hr?.probationPeriod}
                      min="30"
                      max="365"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Leave Default (days)</label>
                    <input
                      type="number"
                      name="annualLeaveDefault"
                      defaultValue={settings.hr?.annualLeaveDefault}
                      min="10"
                      max="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sick Leave Default (days)</label>
                    <input
                      type="number"
                      name="sickLeaveDefault"
                      defaultValue={settings.hr?.sickLeaveDefault}
                      min="5"
                      max="30"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours Per Day</label>
                    <input
                      type="number"
                      name="workingHoursPerDay"
                      defaultValue={settings.hr?.workingHoursPerDay}
                      min="6"
                      max="12"
                      step="0.5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Days Per Week</label>
                    <input
                      type="number"
                      name="workingDaysPerWeek"
                      defaultValue={settings.hr?.workingDaysPerWeek}
                      min="4"
                      max="7"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overtime Rate Multiplier</label>
                    <input
                      type="number"
                      name="overtimeRate"
                      defaultValue={settings.hr?.overtimeRate}
                      min="1.0"
                      max="3.0"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
              
              <div className="space-y-8">
                {/* Slack Integration */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Slack Integration</h4>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = {
                      slackEnabled: formData.has('slackEnabled'),
                      slackWebhook: formData.get('slackWebhook')
                    };
                    handleSave('integrations', { ...settings.integrations, ...data });
                  }}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-900">Enable Slack Notifications</label>
                          <p className="text-sm text-gray-500">Send HR notifications to Slack</p>
                        </div>
                        <input
                          type="checkbox"
                          name="slackEnabled"
                          defaultChecked={settings.integrations?.slackEnabled}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slack Webhook URL</label>
                        <input
                          type="url"
                          name="slackWebhook"
                          defaultValue={settings.integrations?.slackWebhook}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://hooks.slack.com/services/..."
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                        <span>{saving ? 'Saving...' : 'Save'}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Email Integration */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Email Configuration</h4>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    data.smtpPort = parseInt(data.smtpPort);
                    handleSave('integrations', { ...settings.integrations, ...data });
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                        <input
                          type="text"
                          name="smtpHost"
                          defaultValue={settings.integrations?.smtpHost}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                        <input
                          type="number"
                          name="smtpPort"
                          defaultValue={settings.integrations?.smtpPort}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                        <input
                          type="text"
                          name="smtpUsername"
                          defaultValue={settings.integrations?.smtpUsername}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                        <input
                          type="password"
                          name="smtpPassword"
                          defaultValue={settings.integrations?.smtpPassword}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                        <span>{saving ? 'Saving...' : 'Save'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;