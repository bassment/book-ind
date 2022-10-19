"use strict";

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.users_table;

const getUsers = async (count) => {
  const req = {
    TableName: tableName,
    Limit: count,
  };

  const res = await dynamodb.scan(req).promise();
  return res.Items;
};

module.exports.handler = async (event) => {
  const users = await getUsers(defaultResults);
  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};
