module.exports = (req, res, next) => {
      if (req.cookies.color && !req.session.color) {
            req.session.color = req.cookies.color;
      }
      next();
};
