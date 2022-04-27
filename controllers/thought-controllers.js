const { Thought, User } = require('../models');

const thoughtController = {
  thoughtNew({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then(dataThoughtRes => {
        if (!dataThoughtRes) {
          res.status(404).json({ message: 'Thought not found. Invalid thought id' });
          return;
        }
        res.json(dataThoughtRes)
      })
      .catch(err => res.json(err));
  },

  thoughtFindAll(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then(dataThoughtRes => res.json(dataThoughtRes))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  thoughtFindByID({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then(dataThoughtRes => {
        if (!dataThoughtRes) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dataThoughtRes)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      });
  },

  thoughtUpdate({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .populate({path: 'reactions', select: '-__v' })
      .select('-___v')
      .then(dataThoughtRes => {
        if (!dataThoughtRes) {
          res.status(404).json({ message: 'Thought not found. Invalid thought id' });
          return;
        }
        res.json(dataThoughtRes);
      })
      .catch(err => res.status(400).json(err));

  },

  thoughtRemove({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dataThoughtRes => {
        if (!dataThoughtRes) {
          res.status(404).json({ message: 'Thought not found. Invalid thought id' });
          return;
        }
        res.json(dataThoughtRes);
      })
      .catch(err => res.status(400).json(err));
  },

  reactionNew({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then(dataThoughtRes => {
        if (!dataThoughtRes) {
          res.status(404).json({ message: 'Thought not found. Invalid thought id' });
          return;
        }
        res.json(dataThoughtRes);
      })
      .catch(err => res.status(400).json(err))

  },

  reactionRemove({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dataThoughtRes => {
        if (!dataThoughtRes) {
          res.status(404).json({ message: 'Thought not found. Invalid thought id' });
          return;
        }
        res.json(dataThoughtRes);
      })
      .catch(err => res.status(400).json(err));
  }


}

module.exports = thoughtController;