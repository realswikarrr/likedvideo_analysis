import express from "express";
import { config } from "dotenv";
import passport from "passport";
import authRoutes from "./routes/auth.js";

import("./strategies/google.js");

config();

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT;

  app.use(passport.initialize());

  app.use("/api/auth", authRoutes);

  try {
    app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
