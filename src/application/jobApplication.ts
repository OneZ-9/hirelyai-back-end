import JobApplication from "../infrastructure/schemas/jobApplication";
import { NextFunction, Request, Response } from "express";

export const createJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobApplication = req.body;
    const createdJobApplication = await JobApplication.create(jobApplication);
    // console.log(jobApplication);
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getJobApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const jobId = req.query.jobId;
    const { jobId } = req.query;
    // console.log(jobId);

    if (!jobId) {
      const jobApplications = await JobApplication.find()
        .populate("job")
        .exec();

      return res.status(200).json(jobApplications);
    }

    const jobApplications = await JobApplication.find({ job: jobId });
    return res.status(200).json(jobApplications);
  } catch (error) {
    next(error);
  }
};
