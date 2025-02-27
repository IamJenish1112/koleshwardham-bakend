const express = require("express");

// Import all routers
const userRouter = require("./user/user.routes");

// Create a new router to handle a  ll routes
const router = express.Router();

// Use the imported routers in the router
router.use("/user", userRouter);
// Export the router
exports.router = router;
