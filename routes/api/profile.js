const router = require('express').Router();
const profileCtrl = require('../../controllers/profile');

// GET /profile/new
router.post('/:id/profile', profileCtrl.create);

module.exports = router;
