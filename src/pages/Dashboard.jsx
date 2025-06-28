import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      {!user ? (
        <p>Loading user info...</p>
      ) : (
        <div>
          <p className="text-lg">Hello, {user.username}</p>
          <p className="text-gray-600">Role: {user.role}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
