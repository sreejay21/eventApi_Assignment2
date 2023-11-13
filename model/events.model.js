var mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: 250,
    trim: true,
    required: true,
  },
  Details: {
    type: String,
    maxLength: 1000,
    trim: true,
    required: true
  },
  on: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    maxLength: 100,
    trim: true,
  },
  RegistrationLink: {
    type: String,
    maxLength: 250,
    trim: true,
  },
});

module.exports=mongoose.model("Event",eventSchema)