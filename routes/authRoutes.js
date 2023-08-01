module.exports = function (app) {
  const authHandler = require("../controllers/authController");
  const middleware = require("../middlewares/authMiddleware");
  app.route("/crm/api/v1/auth/signup").post(authHandler.sign_up);
  app.route("/crm/api/v1/auth/signin").post(authHandler.sign_in);
  app
    .route("/crm/api/v1/home")
    .post(middleware.isLogiRequired, middleware.get_profile);
  // .post(authMiddleware.isLoginRequired, authMiddleware.get_profile);
};
