import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";

const Home = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
      <SearchBar onSearch={setQuery} />
      <UserList query={query} />
    </div>
  );
};

export default Home;
