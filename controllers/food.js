const Food = require('../models/food');

module.exports = {
  create,
  index,
  update,
  delete: deleteFood,
};

async function create(req, res) {
  try {
    const food = await Food.create(req.body);
    res.json({ food });
  } catch (error) {
    throw new Error('unable to create food');
  }
}

async function index(req, res) {
  try {
    const food = await Food.find({});
    res.json(food);
  } catch (error) {
    throw new Error('unable to retrieve foods');
  }
}

async function update(req, res) {
  try {
    const food = await Food.findById(req.params.id);
    Food.updateOne(food, req.body);
  } catch (error) {
    throw new Error('unable to update food');
  }
}

async function deleteFood(req, res) {
  try {
    const food = Food.findById(req.params.id);
    Food.deleteOne(food);
  } catch (error) {
    throw new Error('unable to delete food');
  }
}
