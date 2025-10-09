const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.getLogIn);
indexRouter.post("/", indexController.postLogIn);

indexRouter.get("/log-out", indexController.getLogOut);

module.exports = indexRouter;