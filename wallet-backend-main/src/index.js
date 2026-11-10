import "dotenv/config";
import express from "express";
import cors from "cors";

import { initDb } from "./configs/db.js";
import userRoutes from "./routes/user.routes.js";
import transectionsRoutes from "./routes/transections.routes.js";
import { rateLimitMiddleware } from "./middleware/ratelimite.middleware.js";
import { job } from "./configs/cron.js";

const app = express();
const PORT = process.env.PORT || 5001;

// cron job
if (process.env.NODE_ENV === "production") job.start();

// middleware
// ratlimiter
// app.use(rateLimitMiddleware);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// helth routes
app.get("/api/helth", (req, res) => {
  return res.status(200).json({ message: "Server Is Live!" });
});

// user routes
app.use("/api/user", userRoutes);

// transections routes
app.use("/api/transections", transectionsRoutes);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server Is Running On Port ", PORT);
  });
});
