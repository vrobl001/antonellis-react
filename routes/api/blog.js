const router = require('express').Router();
const blogCtrl = require('../../controllers/blog');

router.use(require('../../config/auth'));

// GET /blog/new
router.get('/', blogCtrl.index);
router.post('/', blogCtrl.create);

// Update
router.put('/:id', blogCtrl.update);

// Delete
router.delete('/:id', blogCtrl.delete);

function isAuthenticated(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({
    message: 'not authorized',
  });
}

module.exports = router;
