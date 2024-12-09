// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       User.hasMany(models.Post, {foreignKey: 'userId', as: 'user'});
//       User.hasMany(models.Follower, {foreignKey: 'followerId', as: 'user'}); 
//       User.hasMany(models.Follower, {foreignKey: 'followingId', as: 'user'});
//       User.hasMany(models.Comment, {foreignKey: 'userId', as: 'user'});
//       User.hasMany(models.Like, {foreignKey: 'userId', as: 'user'}); 
//       User.hasMany(models.Storie, {foreignKey: 'userId', as: 'user'});
//     }
//   }
//   User.init({
//     userName: DataTypes.STRING,
//     fullName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     bio: DataTypes.STRING,
//     avatar: DataTypes.STRING,
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };
const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  id: {
    type: String,
    // required: true,
    unique: true,
  },
  fullname: {
    type: String,
    // required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String,
  },
  otp: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  otpAttempts: {
    type: Number,
    default: 0
  },
  url: {
    type: String,
    require: true
  },
  // followersCount: {
  //   type: Number,
  //   default: 0,
  // },
  // followsCount: {
  //   type: Number,
  //   default: 0,
  // },
  followersCountArr: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],
  followsCountArr: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],
  likePostId: [{
    type: mongoose.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = bcrypt.genSaltSync(10)
  this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password)
  },

}
//Export the model
module.exports = mongoose.model('User', userSchema);