module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return listErrors(401, res);
  }
};