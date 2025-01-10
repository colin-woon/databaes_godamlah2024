import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UploadButton = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3000/file/', {
        method: 'POST',
        body: formData,
		headers: {
            'Authorization': `Bearer ${token}`
    	}
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        console.log('File uploaded successfully:', data);
		onUploadSuccess();
        // Add success handling here
      } else {
        console.error('Upload failed:', data);
        // Add error handling here
      }
    } catch (error) {
      console.error('Upload error:', error);
      // Add error handling here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
      <button
	  class="font-bold rounded-md bg-amber-600 py-2 px-4 border border-transparent text-center text-sm text-slate-800 transition-all shadow-md hover:shadow-lg focus:bg-amber-700 focus:shadow-none active:bg-amber-700 hover:bg-amber-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        onClick={() => document.getElementById('file-upload').click()}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
};

export default UploadButton;
