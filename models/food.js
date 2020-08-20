const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'STARTERS & SIDES',
        'WINGS',
        'SALADS',
        'DRESSINGS',
        'PIZZA',
        'TURNOVERS',
        'PASTAS',
        'WRAPS',
        'COLD SUBS',
        'HOT SUBS',
        'SANDWICHES',
        'KIDS',
        'DESSERTS',
        'BEVERAGES',
        'BEER & WINE',
      ],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    catering: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Food', foodSchema);
