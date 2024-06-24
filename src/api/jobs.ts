import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../application/jobs";

const jobsRouter = express.Router();

jobsRouter
  .route("/")
  .get(getAllJobs)
  .post(ClerkExpressRequireAuth({}), createJob);
jobsRouter
  .route("/:id")
  .get(ClerkExpressRequireAuth({}), getJobById)
  .put(updateJob)
  .delete(deleteJob);

export default jobsRouter;
