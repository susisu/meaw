"use strict";

const fs      = require("fs");
const request = require("request");

function readFile(filepath, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, options, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function writeFile(filepath, data, options) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, data, options, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(body);
    });
  });
}

module.exports = {
  readFile,
  writeFile,
  fetchUrl,
};
