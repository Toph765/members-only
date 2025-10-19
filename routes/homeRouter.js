const { Router } = require("express");
const homeController = require("../controllers/homeController");
const isAuth = require("../lib/authMiddleware").isAuth;
const homeRouter = Router();

homeRouter.get("/", isAuth, homeController.getHomePage);
homeRouter.get("/new-message", isAuth, homeController.getNewMessage);
homeRouter.post("/new-message", isAuth, homeController.postNewMessage);
homeRouter.get("/membership", isAuth, homeController.getMembership);
homeRouter.post("/membership", isAuth, homeController.postMembership);
homeRouter.post("/:messageId/delete", isAuth, homeController.postDeleteMessage);

module.exports = homeRouter;