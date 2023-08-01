const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: Number,
    length: 5,
    unqiue: true,
    requied: true,
  },

  priority: {
    type: Number,
    required: true,
    default: 4,
  },

  title: {
    type: String,
    required: true,
  },

  decscription: {
    type: String,
    required: true,
  },

  assignee: {
    type: String,
  },

  reporter: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: "OPEN",
  },

  createdAt: {
    type: Date,
    immutabe: true,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

ticketSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });
module.exports = mongoose.model("Ticket", ticketSchema);
