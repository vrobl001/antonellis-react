const router = require('express').Router();
const foodCtrl = require('../../controllers/food');

// GET /foods/new
router.get('/', foodCtrl.index);
router.post('/', foodCtrl.create);

// Update
router.put('/:id', foodCtrl.update);

// Delete
router.delete('/:id', foodCtrl.delete);

function isAuthenticated(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({
    message: 'not authorized',
  });
}

module.exports = router;
