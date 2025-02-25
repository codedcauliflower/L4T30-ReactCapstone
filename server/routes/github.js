const express = require('express');
const axios = require('axios');

const router = express.Router();

// GitHub API base URL
const GITHUB_API_URL = 'https://api.github.com';

// Function to handle fetching data from GitHub API
const fetchGithubData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from GitHub API');
  }
};

// Search GitHub users by username
router.get('/search/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const data = await fetchGithubData(`${GITHUB_API_URL}/search/users?q=${username}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user details including repos
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  console.log(`Received request for user: ${username}`);  // Log the username received
  try {
    const userData = await fetchGithubData(`${GITHUB_API_URL}/users/${username}`);
    const reposData = await fetchGithubData(`${GITHUB_API_URL}/users/${username}/repos`);
    console.log(`User Data:`, userData);  // Log the response from GitHub
    console.log(`Repos Data:`, reposData);  // Log the repositories data
    res.json({ user: userData, repos: reposData });
  } catch (error) {
    console.error("Error fetching user data from GitHub API:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get repository details and commits
router.get('/repo/:username/:repo', async (req, res) => {
  const { username, repo } = req.params;
  try {
    const repoData = await fetchGithubData(`${GITHUB_API_URL}/${username}/repos/${repo}`);
    const commitsData = await fetchGithubData(`${GITHUB_API_URL}/${username}/repos/${repo}/commits`);
    
    // Limit to the last 5 commits
    const lastCommits = commitsData.slice(0, 5).map(commit => ({
      message: commit.commit.message,
      date: commit.commit.author.date
    }));

    res.json({ repo: repoData, commits: lastCommits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;