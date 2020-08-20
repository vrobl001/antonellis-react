const router = require('express').Router();
const foodsCtrl = require('../../controllers/food');

// GET /foods/new
router.get('/', foodsCtrl.index);
router.post('/', foodsCtrl.create);

// Update
router.put('/:id', foodsCtrl.update);

// Delete
router.delete('/:id', foodsCtrl.delete);

function isAuthenticated(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({
    message: 'not authorized',
  });
}

module.exports = router;
