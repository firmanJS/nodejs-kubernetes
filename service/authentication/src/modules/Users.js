const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 15,
    unique: true,
    index: true
  },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  role: {
    type: String, required: true, enum: ['User', 'Admin'],
    default: 'user'
  },
}, { timestamps: true })

module.exports = mongoose.model('Users', UserSchema)