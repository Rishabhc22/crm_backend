const userHandler = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMiddleware");
const ticketHandler = require("../controllers/ticketController");

module.exports = function (app) {
  app
    .route("/crm/api/v1/admin/users")
    .get(userMiddleware.isAdmin, userHandler.getUsers);
  app
    .route("/crm/api/v1/admin/update/:userId")
    .put(
      userMiddleware.isAdmin,
      userMiddleware.validateUpdate,
      userHandler.adminUpdate
    );
  app
    .route("/crm/api/v1/user/update")
    .put(userMiddleware.validateUpdate, userHandler.userUpdate);
  app
    .route("/crm/api/v1/admin/ticket.update/:ticketId")
    .put(
      userMiddleware.isAdmin,
      userMiddleware.validateUpdate,
      ticketHandler.updateTicketAdmin
    );
};
