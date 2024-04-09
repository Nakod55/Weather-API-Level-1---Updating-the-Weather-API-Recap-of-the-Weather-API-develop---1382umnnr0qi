const jwt = require('jsonwebtoken');
const JWT_SECRET = 'newtonSchool';

/*
Write a middleware function that checks if the user is logged in. The middleware should return a 401 status code with an error message in the JSON payload if the token is missing or invalid. 

The token can be extracted from req.headers.authorization

The middleware should have the following signature:
function protectUserRoutes(req: Request, res: Response, next: NextFunction) => void

Possible Cases:

Token is missing: { message: 'Authentication failed: Missing token.', status: 'error' } (401)
Token is invalid: { message: 'Authentication failed: Invalid token.', status: 'error' } (401)
*/
function isLoggedIn(req, res, next) {
  //Write your code here
}

module.exports = isLoggedIn;
