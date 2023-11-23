import express from "express";
import { config } from "dotenv";
import passport from "passport";
import connectDB from "./db/db.js";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import detailsRoute from "./routes/detail.js";
import cors from "cors";

import("./strategies/google.js");

config();

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT;

  connectDB();

  app.use(
    cors({
      origin: "http://localhost:3001", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // allow session cookie from browser to pass through
    })
  );

  app.use(session({ secret: "somesecret" }));
  app.use(passport.initialize());
  app.use(passport.session({ resave: true, saveUninitialized: true }));

  app.set("view engine", "jade");

  app.get("/", (req, res) => {
    res.render("default");
    res.status(200);
  });

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
