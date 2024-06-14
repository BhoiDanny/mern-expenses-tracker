const jwt = require('jsonwebtoken')

const isAuthenticated = async (req, res, next) => {
    //! Get the token from the header
    const token = req?.header('Authorization')?.split(' ')[1];
    //? or you can do this 
    //* const token = req.headers?.authorization?.split(" ")[1]
    const verifyToken = jwt.verify(token, 'hello', (err, decoded) => {
        if(err) return false;
        return decoded;
    })

    if(verifyToken) {
        //! Save the user in the request object
        req.user = verifyToken.id;
        next()
    } else {
        const err = new Error("Token expired, login again")
        next(err)
    }

}

module.exports = isAuthenticated