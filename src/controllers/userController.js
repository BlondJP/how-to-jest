const verifyJwt = require('../services/verifyJwt.factory')

module.exports = (server) => {

    server.get('/api/users', async (req, res) => {

        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(400).send('missing header authorization')
        }

        // console.log(authorization)

        return verifyJwt(authorization)
            .then((uuid) => res.send(uuid))
            .catch(error => {
                 console.log(error)
                return res.status(403).send('jwt verifying has failed')
            })
    })


}