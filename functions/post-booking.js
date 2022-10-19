"use strict";

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Make a booking",
    }),
  };
};
