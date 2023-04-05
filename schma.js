const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  left_child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node'
  },
  right_child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node'
  }
});

const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;
