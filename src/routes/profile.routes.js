import { Router } from "express";
import { createProfile, getProfiles } from "../controllers/profile.controller.js";
import { createProfileValidation } from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validate.js";

export const profileRouter = Router();

profileRouter.post("profiles/", createProfileValidation, validate, createProfile);   // POST /api/profiles
profileRouter.get("profiles/", getProfiles);      // GET  /api/profiles