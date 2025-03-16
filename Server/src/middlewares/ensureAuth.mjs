const ensureAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ msg: 'User is not authenticated' });
    }
    next();
}

export default ensureAuth