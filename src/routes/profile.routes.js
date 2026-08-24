import { Router } from "express";
import { createProfile, getProfiles } from "../controllers/profile.controller.js";

export const profileRouter = Router();

profileRouter.post("profiles/", createProfile);   // POST /api/profiles
profileRouter.get("profiles/", getProfiles);      // GET  /api/profiles