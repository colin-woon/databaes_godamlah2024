import { useState } from "react";
import { useAuth } from '../context/AuthContext';

export default function GrantButton({ fileId }) {
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
        body: JSON.stringify({ access: "GRANT", userId: targetUserId })
      });
      const data = await response.json();
      console.log("Grant response:", data);
    } catch (err) {
      console.error("Grant error:", err);
    } finally {
      setDialogOpen(false);
      setTargetUserId("");
    }
  }

  return (
    <>
      <button
        className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
        onClick={() => setDialogOpen(true)}
      >
        GRANT
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
                className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Confirm GRANT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
