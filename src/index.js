import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";

config();

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT;

  app.use("/api/auth", authRoutes);

  try {
    app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
