import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("This is the root end point");
});

// get(ENDPOINT, METHOD)
app.get("/work", (req, res) => {
  console.log(req);
  res.json("This is the work end point");
});

// Method
// const aboutEndpointService = (req, res) => {
//   res.status(200).json("About Endpoint");
// };

// app.get("/about", aboutEndpointService);

app.listen(8000, () => console.log("Server is listening on port 8000."));
