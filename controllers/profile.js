const User = require('../models/user');

module.exports = {
  create,
  index,
  update,
  delete: deleteProfile,
};

async function create(req, res) {
  try {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    User.findById(req.params.id, function (err, user) {
      user.profile.push(req.body);
      user.save();
    });
  } catch (error) {
    throw new Error('unable to create profile');
  }
}

async function index(req, res) {
  try {
    const profile = await Profile.find({});
    res.json(profile);
  } catch (error) {
    throw new Error('unable to retrieve profiles');
  }
}

async function update(req, res) {
  try {
    const profile = await Profile.findById(req.params.id);
    Profile.updateOne(profile, req.body);
  } catch (error) {
    throw new Error('unable to update profile');
  }
}

async function deleteProfile(req, res) {
  try {
    const profile = Profile.findById(req.params.id);
    Profile.deleteOne(profile);
  } catch (error) {
    throw new Error('unable to delete profile');
  }
}
