require("dotenv").config();
const axios = require("axios");

const createTask = async (issueData) => {
  const username = process.env.JIRA_USERNAME;
  const apiToken = process.env.JIRA_API_TOKEN;
  const domain = process.env.JIRA_DOMAIN;

  // Base64 encode the credentials for Basic Authentication
  const token = Buffer.from(`${username}:${apiToken}`, "utf8").toString(
    "base64"
  );
  const authHeader = `Basic ${token}`;

  const baseUrl = `https://${domain}.atlassian.net`;
  const endpoint = `${baseUrl}/rest/api/3/issue`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  };

  try {
    const response = await axios.post(endpoint, issueData, config);
    console.log("Issue created:", response.data);
    return response.data; // Return the issue creation response
  } catch (error) {
    console.error("Error creating issue:", error.message);
    throw error; // Throw the error to handle it in the caller function
  }
};

module.exports = { createTask };
