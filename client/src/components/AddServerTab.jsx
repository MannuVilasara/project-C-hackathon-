import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddServerTab = () => {
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchUserServers();
  }, []);

  const fetchUserServers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/my/servers`, { withCredentials: true });

      
        const data = response.data;
        setServers(data.servers || []);
    } catch (error) {
      console.error('Error fetching servers:', error);
      toast.error('Error loading servers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddServer = () => {
    navigate('/add/server');
  };

  const handleViewServer = (serverId) => {
    toast.success(`Viewing server ${serverId} details...`);
  };

  const handleDeleteServer = async (serverId, serverName) => {
    if (!window.confirm(`Are you sure you want to delete "${serverName}"?`)) {
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete/server/${serverId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Server deleted successfully!');
        // Refresh the server list
        fetchUserServers();
      }
    } catch (error) {
      console.error('Error deleting server:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to delete server. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Server Management</h2>
          <button
            onClick={handleAddServer}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Server
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{servers.length}</div>
              <div className="text-gray-400 text-sm">Total Servers</div>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {loading ? '...' : servers.length}
              </div>
              <div className="text-gray-400 text-sm">Monitored</div>
            </div>
          </div>
        </div>
      </div>


      <div>
        <h3 className="text-xl font-bold text-white mb-4">Your Servers</h3>
        
        {loading ? (
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading servers...</p>
          </div>
        ) : servers.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Servers Added</h3>
            <p className="text-gray-400 mb-4">Get started by adding your first server to monitor</p>
            <button
              onClick={handleAddServer}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add Your First Server
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {servers.map((server) => (
              <div key={server._id} className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{server.name}</h4>
                      <p className="text-gray-400 text-sm">Server</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Server IP</span>
                    <span className="text-white font-mono text-sm">••••••••••••••••</span>
                  </div>
                  {server.createdAt && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Added</span>
                      <span className="text-white text-sm">
                        {new Date(server.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewServer(server._id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </button>
                  <button 
                    onClick={() => handleDeleteServer(server._id, server.name)}
                    className="bg-gray-700 hover:bg-red-500 text-gray-300 hover:text-white py-2 px-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                    title="Delete Server"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddServerTab;