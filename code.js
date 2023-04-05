const express = require('express');
const mongoose = require('mongoose');
const Node = require('./schma.js');

const app = express();

// Connect to the database
mongoose.connect('mongodb://localhost:27017/binary_tree', { useNewUrlParser: true,
serverSelectionTimeoutMS: 30000, 
socketTimeoutMS: 45000 })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
app.get('/bfs', async (req, res) => {
  const startingNodeId = req.query.starting_node_id;


  const queue = [startingNodeId];
  const visited = [];

  while (queue.length > 0) {
  
    const currentNodeId = queue.shift();

    const currentNode = await Node.findById(currentNodeId).populate('left_child right_child');
    if (currentNode.left_child) {
      queue.push(currentNode.left_child._id);
    }
    if (currentNode.right_child) {
      queue.push(currentNode.right_child._id);
    }

        visited.push(currentNode.value);
  }

  res.json({ visited });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
