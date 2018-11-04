const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

TodoSchema.plugin(timeStamp);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
