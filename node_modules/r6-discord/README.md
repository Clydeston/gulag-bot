# R6 Discord

Async JavaScript wrapper for r6stats.com. 

## Example
```javascript
const R6Api = require('r6-discord');
const R6 = new R6Api();

const username = args[0];
const platform = args[1];

// Get stats on a user on that platform.
R6.stats(username, platform, /* Optional Boolean if you want operator stats. */).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});

// Get details on a user on R6 depending on platform.
R6.profile(username, platform).then(response => {
    console.log(response);
}).catch(error => {
    console.error(error);
});
```

## Installation
```
npm i r6-discord
```

Using <https://r6stats.com> for the API and stats.