// deps
const fs = require('file-system')
const path = require('path')
const jwt = require('jsonwebtoken')
const deps = {fs, path, jwt}

// func
const func = require('./verifyJwt')
const createFunc = require('./di/createFunc')

// create
const verifyJwt = createFunc(func, deps)

// export
module.exports = verifyJwt