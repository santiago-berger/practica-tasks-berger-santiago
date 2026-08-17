import { Router } from "express";
import { createProfile, getProfiles } from "../controllers/profile.controller.js";

export const profileRouter = Router();

profileRouter.post("/", createProfile);   // POST /api/profiles
profileRouter.get("/", getProfiles);      // GET  /api/profiles