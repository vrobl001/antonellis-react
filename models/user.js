const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const profileSchema = new Schema(
  {
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
    signUpDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    userName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: String,
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (tryPassword, callback) {
  bcrypt.compare(tryPassword, this.password, callback);
};

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
  },
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
