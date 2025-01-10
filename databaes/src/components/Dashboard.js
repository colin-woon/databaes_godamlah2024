import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import UploadButton from './UploadButton';
import GrantButton from './GrantButton';
import RevokeButton from './RevokeButton';

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);
  const { token, ownerId } = useAuth();

  const handleDownload = async (fileId, fileName) => {
    setDownloadingId(fileId);
    try {
      const response = await fetch(`http://localhost:3000/file/${fileId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      setError('Failed to download file');
    } finally {
      setDownloadingId(null);
    }
  };

  const fetchFiles = async () => {
	try {
		const response = await fetch('http://localhost:3000/file', {
		headers: {
		  'Authorization': `Bearer ${token}`
		}
	  });

	  const data = await response.json();

	  if (data.status === 'SUCCESS') {
		setFiles(data.data);
	  } else {
		setError(data.message);
	  }
	} catch (err) {
	  setError('Failed to fetch files');
	} finally {
	  setLoading(false);
	}
  };

  useEffect(() => {
    fetchFiles();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-neutral-900 text-white">
		<div className="flex justify-between items-center mb-4">
			<div className="flex items-center gap-2">
      			<h2 className="text-2xl font-bold text-white">All Files</h2>
				  <button
          onClick={fetchFiles}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
			</div>
	  	<UploadButton onUploadSuccess={fetchFiles} />
		</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-neutral-800 shadow-lg rounded-sm">
          <thead className="bg-neutral-950">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Owner ID</th>
			  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
			</tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {files.map((file) => (

              <tr key={file.ID}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDownload(file.ID, file.FileName)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    disabled={downloadingId === file.ID}
                  >
                    {downloadingId === file.ID ? 'Downloading...' : file.FileName}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{file.Version}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(file.LastUpdated).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{file.OwnerID}</td>
				<td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
				  <GrantButton fileId={file.ID}/>
				  {file.OwnerID === ownerId && <RevokeButton fileId={file.ID}/>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
