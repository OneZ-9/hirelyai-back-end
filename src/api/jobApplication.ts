import express from "express";
import {
  createJobApplication,
  getJobApplicationById,
  getJobApplications,
} from "../application/jobApplication";

const jobApplicationRouter = express.Router();

jobApplicationRouter
  .route("/")
  .get(getJobApplications)
  .post(createJobApplication);
jobApplicationRouter.route("/:applicationId").get(getJobApplicationById);

export default jobApplicationRouter;
