const { Schema, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: 'Field cannot be left empty',
      maxlength: 280
    },
    username: {
      type: String,
      required: 'Field cannot be left empty',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => formatDate(createdAtVal)
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = reactionSchema;