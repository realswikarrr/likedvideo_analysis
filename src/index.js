import express from "express";
import { config } from "dotenv";
import passport from "passport";
import connectDB from "./db/db.js";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import detailsRoute from "./routes/detail.js";

import("./strategies/google.js");

config();

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT;

  connectDB();

  app.use(session({ secret: "somesecret" }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api/auth", authRoutes);
  app.use("/api", profileRoutes);
  app.use("/api", detailsRoute);

  try {
    app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
