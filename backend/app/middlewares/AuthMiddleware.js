const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../../config/config');
module.exports = async function (req, res, next) {
  let idToken = req.headers.token

  if (!idToken) {
      return res.status(401).send("Authorization required")
  }

  try {
    jwt.verify(idToken, SECRET_KEY, (err, verifiedJwt) => {
      if(err){
        return res.status(401).send("Authorization failed");
      }else{
        return next();
      }
    });
  } catch (e) {

      return res.status(401).send("sAuthorization failed")
      //console.log(e);
  }
}