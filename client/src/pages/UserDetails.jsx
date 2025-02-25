import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // Import spinner for loading state

const UserDetails = () => {
  const { username } = useParams(); // Get the username from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/github/user/${username}`);
        setUser(response.data); // If the user data is directly in response.data
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null); // Set user to null if error occurs
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <ClipLoader color="#000" size={50} className="mx-auto mt-10" />;
  if (!user) return <p className="text-center text-gray-500">User not found or loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back
      </Link>

      <div className="flex items-center gap-6 mt-6">
        <img
          src={user.avatar_url}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />
        <div>
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <p className="text-gray-700 mt-2">{user.bio}</p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 mt-4 inline-block hover:underline"
          >
            View GitHub Profile
          </a>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-8">Repositories</h3>
      <ul className="mt-4 space-y-4">
        {user.repos && user.repos.length > 0 ? (
          user.repos.map((repo) => (
            <li
              key={repo.id}
              className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <h4 className="text-xl font-semibold text-blue-600">{repo.name}</h4>
              <p className="text-gray-700 mt-2">{repo.description || 'No description available'}</p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors mt-4 inline-block"
              >
                View Repository
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No repositories found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserDetails;
