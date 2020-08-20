const router = require('express').Router();
const profileCtrl = require('../../controllers/profile');

// GET /profile/new
router.get('/', profileCtrl.index);
router.post('/', profileCtrl.create);

// Update
router.put('/:id', profileCtrl.update);

// Delete
router.delete('/:id', profileCtrl.delete);

function isAuthenticated(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({
    message: 'not authorized',
  });
}

module.exports = router;
