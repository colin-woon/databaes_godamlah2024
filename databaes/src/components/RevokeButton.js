import { useState } from "react";
import { useAuth } from '../context/AuthContext';

export default function RevokeButton({ fileId }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [targetUserId, setTargetUserId] = useState("");
  const { token } = useAuth();

  async function handleSubmit() {
    try {
      const response = await fetch(`http://localhost:3000/file/access/${fileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ access: "REVOKE", userId: targetUserId })
      });
      const data = await response.json();
      console.log("Revoke response:", data);
    } catch (err) {
      console.error("Revoke error:", err);
    } finally {
      setDialogOpen(false);
      setTargetUserId("");
    }
  }

  return (
    <>
      <button
        className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
        onClick={() => setDialogOpen(true)}
      >
        REVOKE
      </button>

      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-neutral-800 p-4 rounded shadow-md">
            <label className="block mb-2 text-white">
              Enter User ID:
              <input
                type="text"
                className="block w-full mt-1 p-1 text-black"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
              />
            </label>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-3 py-1 text-sm font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-3 py-1 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Confirm REVOKE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
