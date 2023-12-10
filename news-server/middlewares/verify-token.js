module.exports = async function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json([]);

  next();
};
