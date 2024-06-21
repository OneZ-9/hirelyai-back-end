import { NextFunction, Request, Response } from "express";
// import jobs from "../infrastructure/jobsdata";
import Job from "../infrastructure/schemas/job";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";

// RESTful api

/* export const createJob = (req: Request, res: Response) => {
  // console.log(req.body);
  const job = req.body;

  // check the shape of the post request body
  if (
    !(
      typeof job._id === "string" &&
      typeof job.title === "string" &&
      typeof job.type === "string" &&
      typeof job.location === "string"
    )
  ) {
    return res.status(400).send();
  }

  jobs.push(req.body);
  return res.status(201).send();
};

export const getJobById = (req: Request, res: Response) => {
  // console.log(req.params);
  const job = jobs.find((el) => el._id === req.params.id);

  if (!job) {
    const error = new Error("Requested id doesnt match, retry again");
    return res.status(404).send(error.message);
  }

  return res.status(200).json(job);
};

export const deleteJob = (req: Request, res: Response) => {
  const indexToRemove = jobs.findIndex((el) => el._id === req.params.id);

  if (indexToRemove === -1) {
    const error = new Error("Requested id doesnt match, retry again");
    return res.status(404).send(error.message);
  }

  jobs.splice(indexToRemove, 1);
  return res.status(204).send();
};

export const updateJob = (req: Request, res: Response) => {
  const indexToUpdate = jobs.findIndex((el) => el._id === req.params.id);

  if (indexToUpdate === -1) {
    const error = new Error("Requested id doesnt match, retry again");
    return res.status(404).send(error.message);
  }

  jobs[indexToUpdate].title = req.body.title;
  jobs[indexToUpdate].location = req.body.location;
  jobs[indexToUpdate].type = req.body.type;

  return res.status(204).send();
};


*/
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobs = await Job.find(); // find all the jobs which are inside in DB that have shape of Job
    // throw new Error("Manually created err");

    return res.status(200).json(jobs);
  } catch (error) {
    next(error); // handle unknown errors
  }
};

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const job = req.body;
    if (
      typeof job.title === "undefined" ||
      typeof job.description === "undefined" ||
      typeof job.type === "undefined" ||
      typeof job.location === "undefined"
    )
      throw new ValidationError("Unable to validate missing data");

    await Job.create(job);
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.params.id);
    const job = await Job.findById(req.params.id);

    if (!job) {
      throw new NotFoundError("Job not found!");
    }
    return res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobToDelete = await Job.findById(req.params.id);

    if (!jobToDelete) {
      throw new NotFoundError("Job not found!");
    }
    await Job.findByIdAndDelete(jobToDelete);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobToUpdate = await Job.findById(req.params.id);

    if (!jobToUpdate) {
      throw new NotFoundError("Job not found!");
    }
    const job = req.body;
    if (
      typeof job.title === "undefined" ||
      typeof job.description === "undefined" ||
      typeof job.type === "undefined" ||
      typeof job.location === "undefined"
    )
      throw new ValidationError("Unable to validate missing data");

    await Job.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      location: req.body.location,
      questions: req.body.questions,
    });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
