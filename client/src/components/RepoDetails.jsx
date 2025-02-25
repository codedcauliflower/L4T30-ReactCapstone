import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import spinner for loading state

const RepoDetails = () => {
  const { username, repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch repo details and commits (simulated)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRepo({
        name: repoName,
        description: "A sample repository to display details",
        created_at: "2024-01-01",
        last_commit: "2025-02-20",
      });

      setCommits([
        { message: "Initial commit", id: 1 },
        { message: "Added README", id: 2 },
        { message: "Fixed bugs", id: 3 },
        { message: "Refactored code", id: 4 },
        { message: "Improved performance", id: 5 },
      ]);

      setLoading(false);
    }, 1000); // Simulating loading time
  }, [repoName]);

  if (loading) return <ClipLoader color="#000" size={50} className="mx-auto mt-10" />; // Show loading spinner

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to={`/user/${username}`} className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back to User
      </Link>

      <h2 className="text-3xl font-semibold mt-6">{repo.name}</h2>
      <p className="text-gray-700 mt-2">{repo.description}</p>
      <p className="text-gray-500 mt-4">Created on: {repo.created_at}</p>
      <p className="text-gray-500">Last commit: {repo.last_commit}</p>

      <h3 className="text-xl font-semibold mt-8">Last 5 Commits</h3>
      <ul className="mt-4 space-y-4">
        {commits.map((commit) => (
          <li key={commit.id} className="p-4 bg-gray-50 border rounded-lg shadow-sm hover:bg-gray-100">
            {commit.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoDetails;
