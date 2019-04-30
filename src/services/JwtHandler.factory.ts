// deps
const fs = require("file-system");
const path = require("path");
const jwt = require("jsonwebtoken");

// instantiation
const JwtHandler = require("./JwtHandler");
const instance = new JwtHandler(fs, path, jwt);
export default instance;
