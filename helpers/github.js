const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  let TOKEN = config.TOKEN;
  if (!TOKEN) {
    TOKEN = process.env.GITHUBTOKEN
  }

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios(options);

}

module.exports.getReposByUsername = getReposByUsername;