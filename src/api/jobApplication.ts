import express from "express";
import {
  createJobApplication,
  getJobApplications,
} from "../application/jobApplication";

const jobApplicationRouter = express.Router();

jobApplicationRouter
  .route("/")
  .get(getJobApplications)
  .post(createJobApplication);

export default jobApplicationRouter;
