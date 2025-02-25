const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Define the GitHub Personal Access Token (PAT)
const GITHUB_TOKEN = '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'; // Replace this with your actual GitHub token

const PORT = 5000;

app.use(cors()); // Enable CORS for all routes

// GitHub API endpoint to fetch user details and their repos
app.get('/api/github/user/:username', async (req, res) => {
  const { username } = req.params;

  // Set up the headers with the authorization token
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
  };

  try {
    // Get the user's data from GitHub
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, { headers });
    
    // Fetch the user's repos using the repos_url from the response
    const reposResponse = await axios.get(userResponse.data.repos_url, { headers });

    // Attach the repos to the user data
    const userData = { ...userResponse.data, repos: reposResponse.data };
    
    res.json(userData); // Send the complete user data with repos
  } catch (error) {
    console.error(error);

    // Handle rate limit or other errors
    if (error.response && error.response.status === 403) {
      return res.status(403).json({
        message: "API rate limit exceeded. Please try again later or authenticate with a GitHub token.",
      });
    }
    
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
