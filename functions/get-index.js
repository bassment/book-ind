"use strict";

const fs = require("fs");
const Promise = require("bluebird");
const http = require("superagent-promise")(require("superagent"), Promise);
const Mustache = require("mustache");

const usersApiRoot = process.env.users_api;
const bookApiRoot = process.env.book_api;

const loadHtml = async () => {
  return fs.readFileSync("static/index.html", "utf-8");
};

const getUsers = async () => {
  return http.get(usersApiRoot);
};

module.exports.handler = async (event) => {
  const template = await loadHtml();
  const usersRes = await getUsers();
  const html = Mustache.render(template, {
    users: JSON.parse(usersRes.text),
    bookUrl: bookApiRoot,
  });

  return {
    statusCode: 200,
    body: html,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
    },
  };
};
