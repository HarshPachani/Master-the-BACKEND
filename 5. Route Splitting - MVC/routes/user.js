import express from "express";
import { deleteUserDetails, getAllUsers, getUserDetails, putUserDetails, registerUser, specialFunc } from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", registerUser);

router.get("/userid/special", specialFunc);

// router.get("/userid/:id", getUserDetails);
// router.put("/userid/:id", putUserDetails);
// router.delete("/userid/:id", deleteUserDetails);

//This is an optimal way than the upper one.
router
    .route("/userid/:id")
    .get(getUserDetails)
    .put(putUserDetails)
    .delete(deleteUserDetails);

export default router;