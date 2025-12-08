import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import errorHandler from "./middlewares/common/errorHandler.js";
import userRoute from "./router/user.route.js";
import companyRoute from "./router/company.route.js";
import jobRoute from "./router/job.route.js";
import applicationRoute from "./router/application.route.js";

const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

// api's
app.use("/user", userRoute);
app.use("/company", companyRoute);
app.use("/job", jobRoute);
app.use("/application", applicationRoute);

// common error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
