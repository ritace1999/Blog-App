import express from "express";
import ProfileController from "../../controllers/profile.controller.js";
const router = express.Router();

router.get("/", ProfileController.user);
router.put("/edit", ProfileController.update);
router.put("/edit-password", ProfileController.passwordUpdate);
router.put("/edit-avatar", ProfileController.updateProfilePic);

export default router;
