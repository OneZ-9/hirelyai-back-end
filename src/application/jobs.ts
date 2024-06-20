import { NextFunction, Request, Response } from "express";
// import jobs from "../infrastructure/jobsdata";
import Job from "../infrastructure/schemas/job";

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
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find(); // find all the jobs which are inside in DB that have shape of Job
    return res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    return res.status(500).send(); // handle unknown errors
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = req.body;
    if (
      typeof job.title === "undefined" ||
      typeof job.description === "undefined" ||
      typeof job.type === "undefined" ||
      typeof job.location === "undefined"
    )
      return res.status(400).send();

    await Job.create(job);
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    // console.log(req.params.id);
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).send();
    }
    return res.status(200).json(job);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const jobToDelete = await Job.findById(req.params.id);

    if (!jobToDelete) {
      return res.status(404).send();
    }
    await Job.findByIdAndDelete(jobToDelete);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const jobToUpdate = await Job.findById(req.params.id);

    if (!jobToUpdate) {
      return res.status(404).send();
    }

    await Job.findByIdAndUpdate(jobToUpdate, {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      location: req.body.location,
      questions: req.body.questions,
    });
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
