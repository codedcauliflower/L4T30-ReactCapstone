import { useEffect, useState } from "react";
import { searchUsers } from "../api/github";
import { Link } from "react-router-dom";

const UserList = ({ query }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    searchUsers(query).then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, [query]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="mt-4">
      {users.length === 0 && query && <p className="text-center">No users found.</p>}
      {users.map((user) => (
        <div key={user.id} className="p-4 border rounded flex items-center gap-4 mb-2">
          <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
          <div>
            <Link to={`/user/${user.login}`} className="text-blue-500 font-bold">
              {user.login}
            </Link>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-gray-500"
            >
              (GitHub Profile)
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
