import { Router } from "express";
import { createProfile, deleteProfile, getProfiles, updateProfile } from "../controllers/profile.controller.js";
import { createProfileValidation, profileIdValidation, updateProfileValidation } from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validate.js";

export const profileRouter = Router();

profileRouter.post("/profiles", createProfileValidation, validate, createProfile);
profileRouter.get("/profiles", getProfiles);
profileRouter.put("/profiles/:id", updateProfileValidation, validate, updateProfile);
profileRouter.delete("/profiles/:id", profileIdValidation, validate, deleteProfile);