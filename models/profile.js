const userSchema = require('./user');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user: [userSchema],
    phone: {
      number: String,
      classification: {
        type: String,
        enum: ['House', 'Mobile'],
      },
    },
    address: {
      classification: {
        type: String,
        enum: ['Apartment', 'Hotel', 'House', 'Work'],
      },
      street: String,
      apt: Number,
      city: String,
      state: String,
      zip: Number,
    },
    deliveryNotes: String,
    signUpDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
