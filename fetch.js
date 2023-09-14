const fs = require("fs");
const https = require("https");
const process = require("process");
require("dotenv").config();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

const ERR = {
  noUserName:
    "GitHub Username was found to be undefined. Please set all relevant environment variables.",
  requestFailed:
    "The request to GitHub didn't succeed. Check if GitHub token in your .env file is correct."
};

if (GITHUB_USERNAME === undefined) {
  throw new Error(ERR.noUserName);
}

console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
const data = JSON.stringify({
  query: `
{
  user(login:"${GITHUB_USERNAME}") { 
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
        node {
          ... on Repository {
            name
            description
            forkCount
            stargazers {
              totalCount
            }
            url
            id
            diskUsage
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
}
`
});

const options = {
  hostname: "api.github.com",
  path: "/graphql",
  port: 443,
  method: "POST",
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "User-Agent": "Node"
  }
};

const req = https.request(options, res => {
  let data = "";

  console.log(`statusCode: ${res.statusCode}`);
  if (res.statusCode !== 200) {
    throw new Error(ERR.requestFailed);
  }

  res.on("data", d => {
    data += d;
  });
  res.on("end", () => {
    fs.writeFile("./public/profile.json", data, function (err) {
      if (err) return console.log(err);
      console.log("Saved profile data to public/profile.json");
    });
  });
});

req.on("error", error => {
  throw error;
});

req.write(data);
req.end();
