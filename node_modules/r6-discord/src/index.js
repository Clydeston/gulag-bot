const snek = require('snekfetch');

module.exports = class R6 {
  constructor() {

  }

  /**
   * 
   * @param {Username} username The username of the player. 
   * @param {Platform} platform The platform to get stats on.
   * @param {Boolean} operators True/False option to get stats about the user's usage of operators. 
   */
  stats(username, platform, operators) {
    return new Promise((resolve, reject) => {
      const platforms = ['uplay', 'xone', 'ps4'];
      if (!platforms.includes(platform)) return reject(new TypeError('Platform must be uplay, xone, or ps4.'));
      if (!username || typeof username !== 'string') return reject(new TypeError('Invalid username. The username must be a string.'));
      operator = operators || false;
      if (typeof operators !== boolean) return reject(new TypeError('The operators value must be a boolean.'));
      if (typeof platforms !== 'string' || !platform) return reject(new TypeError('Invalid platform. Platform must be uplay, xone, or ps4.'));
      let endpoint = `https://api.r6stats.com/api/v1/players/${username.toString()}/?platform=${platform}`;
      if (operators) {
        endpoint = `https://api.r6stats.com/api/v1/players/${username}/operators/?platform=${platform}`;
      }

      snek.get(endpoint, (error, response, body) => {
        if (!error && response.statusCode == '200') {
          return resolve(JSON.parse(body));
        } else {
          return reject(JSON.parse(body));
        }
      });
    });
  }

  /**
   * 
   * @param {Username} username The username of the player.
   * @param {Platform} platform The platform from which to get their profile. 
   */
  profile(username, platform) {
    return new Promise((resolve, reject) => {
      const platforms = ['uplay', 'xone', 'ps4'];
      if (!platforms.includes(platform)) return reject(new TypeError('Platform must be uplay, xone, or ps4.'));
      if (!username || typeof username !== 'string') return reject(new TypeError('Invalid username. The username must be a string.'));
      if (typeof platforms !== 'string' || !platform) return reject(new TypeError('Invalid platform. Platform must be uplay, xone, or ps4.'));
      const endpoint = `https://api.r6stats.com/api/v1/users/${username}/profile/?platform=${platform}`;
      
      snek.get(endpoint, (error, response, body) => {
        if (!error && response.statusCode == '200') {
          return resolve(JSON.parse(body));
        } else {
          return reject(JSON.parse(body));
        }
      });
    });
  }
};