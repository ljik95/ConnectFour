const router = require('express').Router();

router.use('/kittens', require('./kittens')); // matches all requests to  /api/kittens/

// Handle 404s
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
