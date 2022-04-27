
const { User } = require('../models');

const userControllers = {
  userNew({ body }, res) {
    User.create(body)
      .then(dataUserRes => res.json(dataUserRes))
      .catch(err => res.status(400).json(err));
  },


  userFindAll(req, res) {
    User.find({})
      .populate({path: 'thoughts', select: '-__v'})
      .populate({path: 'friends', select: '-__v'})
      .select('-__v')
      .then(dataUserRes => res.json(dataUserRes))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  userFindByID({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({path: 'thoughts', select: '-__v'})
      .populate({path: 'friends', select: '-__v'})
      .select('-__v')
      .then(dataUserRes => {
        if (!dataUserRes) {
          res.status(404).json({ message: 'User not found. Invalid user id.' });
          return;
        }
        res.json(dataUserRes)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      })
  },


  userUpdate({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dataUserRes => {
        if (!dataUserRes) {
          res.status(404).json({ message: 'User not found. Invalid user id.' });
          return;
        }
        res.json(dataUserRes);
      })
      .catch(err => res.status(400).json(err))
  },


  userRemove({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dataUserRes => {
        if (!dataUserRes) {
          res.status(404).json({ message: 'User not found. Invalid user id.' });
          return;
        }
        res.json(dataUserRes);
      })
      .catch(err => res.status(400).json(err));
  },


  friendNew({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
      .then(dataUserRes => {
        if (!dataUserRes) {
          res.status(404).json({ message: 'User not found. Invalid user id.' });
          return;
        }
        res.json(dataUserRes);
      })
      .catch(err => res.json(err));

  },


  friendRemove({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({path: 'friends', select: '-__v'})
      .select('-__v')
      .then(dataUserRes => {
        if (!dataUserRes) {
          res.status(404).json({ message: 'User not found. Invalid user id.' });
          return;
        }
        res.json(dataUserRes);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = userControllers; 