import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ onSignIn }) {
  const { setToken, setOwnerId } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('username', formData.username);
      form.append('password', formData.password);
      if (file) {
        form.append('wallet', file);
      }

      const response = await fetch('http://localhost:3000/users/sign-in', {
        method: 'POST',
        body: form
      });

      const data = await response.json();
	  console.log(data);
      if (data.status === 'SUCCESS') {
        setToken(data.data.token);
		setOwnerId(data.data.id);
        onSignIn(true);
      } else {
        setError(data.message || 'Sign in failed');
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <div>
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
