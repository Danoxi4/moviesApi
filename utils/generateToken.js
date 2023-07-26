const jwt = require('jsonwebtoken')

exports.generateToken = (id) => {
    return jwt.sign( { id }, "anykey", { expiresIn: "5d" } )
}

//module.exports = generateToken