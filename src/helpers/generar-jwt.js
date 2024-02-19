const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '1hr'
            },
            (err, token) => {
                err ? (console.log(err), reject('Nose pudo generar')) : resolve(token)
            }
        )

    })
}

module.exports = { generarJWT }