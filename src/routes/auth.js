import { Router } from "express";

const router = Router();

router.get("/google", (req, res) => {
  res.send(200);
});

router.get("/google/redirect", (req, res) => res.send(200));

export default router;
