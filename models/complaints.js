const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const complaintsSchema = new Schema({
  ticketID: { type: String, required: true },
  raisedDate: { type: String, required: true },
  issueCategory: { type: String, required: true },
  issueRelatedID: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },

});

const Complaint = mongoose.model("raiseTicket", complaintsSchema);

module.exports = Complaint;
