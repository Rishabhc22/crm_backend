const ticketHandler = require("../controllers/ticketController");
const authMiddleware = require("../require/authMiddlerware");

app
  .route("/crm/api/v1/ticket/create")
  .post(authMiddleware.isLoginrequired, ticketHandler.createTicket);
app
  .route("crm/api/v1/ticket/update/:ticketId")
  .post(authMiddleware.isLoginRequired, ticketHandler.updateTicket);
