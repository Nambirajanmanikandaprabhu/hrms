import React, { useState } from 'react';
import { Eye, EyeOff, User, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null); // Store token in React state instead of localStorage

  // Use environment variable or fallback to localhost:3000
  // Note: process.env is not available in Claude artifacts, so we'll use the fallback
  const API_BASE_URL = 'http://localhost:3000';

  const handleLogin = async (email, password) => {
    console.log('🚀 Frontend: Starting login process...');
    console.log('📧 Email:', email);
    console.log('🔗 API URL:', `${API_BASE_URL}/api/auth/login`);
    
    try {
      // Fix: Use correct backend URL
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      const contentType = response.headers.get('content-type');
      let data = {};
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('📦 Response data:', data);
      } else {
        console.log('⚠️ Non-JSON response received');
        const textResponse = await response.text();
        console.log('📄 Raw response:', textResponse);
      }

      if (!response.ok) {
        console.log('❌ Request failed with status:', response.status);
        throw new Error(
          response.status === 401 
            ? 'Invalid email or password. Check server logs for details.'
            : response.status === 404
            ? 'Login endpoint not found. Is the backend running on port 3000?'
            : response.status === 500
            ? 'Server error. Check backend logs for details.'
            : data.message || `Server error (${response.status})`
        );
      }

      // Store token in React state instead of localStorage
      if (data.data?.accessToken) {
        setToken(data.data.accessToken);
        console.log('✅ Login successful!');
        console.log('👤 User data:', data.data.user);
        console.log('🔑 Access token received:', data.data.accessToken.substring(0, 20) + '...');
      }
      
      // Note: In artifacts, we can't actually redirect, so we'll show success
      setError(''); // Clear any previous errors
      
    } catch (err) {
      console.log('💥 Frontend error:', err.message);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running on port 3000.');
      }
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await handleLogin(email, password);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to HRMS
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Human Resource Management System
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Backend URL: {API_BASE_URL}
          </p>
          {token && (
            <div className="mt-2 p-3 bg-green-100 border border-green-200 rounded text-sm text-green-800">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium">✅ Login Successful!</span>
              </div>
              <div className="mt-1 text-xs">
                Token: {token.substring(0, 20)}...
              </div>
              <div className="mt-2 text-xs">
                In a real app, you would be redirected to the dashboard now.
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign in'}
          </button>

          <div className="text-center text-xs text-gray-500 mt-4">
            <p className="font-medium">🔧 Debug Information:</p>
            <div className="mt-2 space-y-1">
              <p>• Backend URL: {API_BASE_URL}</p>
              <p>• Check browser console for detailed logs</p>
              <p>• Check server console for backend logs</p>
              {token && <p className="text-green-600">• Authentication: SUCCESS ✅</p>}
              {error && <p className="text-red-600">• Last Error: {error.substring(0, 50)}...</p>}
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="font-medium text-gray-600">Troubleshooting Steps:</p>
              <div className="mt-1 space-y-1 text-left">
                <p>1. Ensure backend is running on port 3000</p>
                <p>2. Verify user exists: sujin@gmail.com</p>
                <p>3. Check if password is hashed in database</p>
                <p>4. Review CORS settings in server.js</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;