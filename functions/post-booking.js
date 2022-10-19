"use strict";

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.users_table;

module.exports.handler = async (event) => {
  const res = Buffer.from(event.body, "base64").toString("utf-8");
  const params = new URLSearchParams(res);

  const name = params.get("name");
  const lastname = params.get("lastname");
  const email = params.get("email");
  const phone = params.get("phone");
  const Vnumber = params.get("Vnumber");

  try {
    const res = await dynamodb
      .put({
        TableName: tableName,
        Item: { name, lastname, email, phone, Vnumber },
      })
      .promise();

    console.log("!!!", res);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Congrats! You've made a booking!",
      }),
    };
  } catch (e) {
    console.log("!!!", e);
    return {
      statusCode: 200,
      body: JSON.stringify(e),
    };
  }
};
