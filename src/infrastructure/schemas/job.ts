import mongoose, { Schema } from "mongoose";

// define shape of the job object
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;