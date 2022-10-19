const https = require("https");

module.exports = {
  httpsGet: (url) => {
    return new Promise((resolve, reject) => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      //create the request object with the callback with the result
      const req = https.request(url, options, (res) => {
        resolve(JSON.stringify(res.data));
      });

      // handle the possible errors
      req.on("error", (e) => {
        reject(e.message);
      });

      //finish the request
      req.end();
    });
  },
  httpPost: (url, data) => {
    return new Promise((resolve, reject) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      //create the request object with the callback with the result
      const req = https.request(url, options, (res) => {
        resolve(JSON.stringify(res.data));
      });

      // handle the possible errors
      req.on("error", (e) => {
        reject(e.message);
      });

      //do the request
      req.write(JSON.stringify(data));

      //finish the request
      req.end();
    });
  },
};
