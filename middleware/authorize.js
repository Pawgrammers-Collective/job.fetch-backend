const jwt = require('jsonwebtoken'); // auth
const jwksClient = require('jwks-rsa'); // auth
const { getMaxListeners } = require('../models/jobs');

// This is a special function for express called "Middleware"
// We can simply "use()" this in our server
// When a user is validated, request.user will contain their information
// Otherwise, this will force an error
function verifyUser(request, response, next) {

  function valid(err, user) {
    if(err){
      next(err);
    }
    request.user = user;
    next();
  }

  try {
    // const token = request.headers.authorization.split(' ')[1];
    // jwt.verify(token, getKey, {}, valid);
    valid(null, {email: 'kylealeman18@gmail.com'})
  } catch (error) {
    next('Not Authorized');
  }
}


// =============== HELPER METHODS, pulled from the jsonwebtoken documentation =================== //
//                 https://www.npmjs.com/package/jsonwebtoken                                     //

// Define a client, this is a connection to YOUR auth0 account, using the URL given in your dashboard
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard
  jwksUri: process.env.JWKS_URI,
});

// Match the JWT's key to your Auth0 Account Key so we can validate it
function getKey(header, callback) {
  // console.log(callback, header)
  client.getSigningKey(header.kid, function (err, key) {
    // console.log(key, err)
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(err, signingKey);
  });
}
// console.log(client)
// console.log(client.getSigningKey())



module.exports = verifyUser;
