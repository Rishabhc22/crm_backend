const Ticket = require("../models/ticketModel");
const constants = require("../utils/constants");
const User = require("../models/userModel");

// Logic to generate the ticket

async function generateTicket() {
  const highestTicket = await Ticket.findOne(
    {},
    {},
    { sort: { ticketId: -1 }, limit: 1 }
  );

  let serialNumber = 10001;
  if (highestTicket) {
    const parts = highestTicket.ticketId.split("-");
    serialNumber = parseInt(parts[parts.length - 1]);
  }

  serialNumber += 1;
  const ticketId = "T-${serialNumber}";
  return ticketId;
}

// Creating the ticket

exports.createTicket = async (req, res) => {
  var newTicket = new Ticket(req.body);
  newTicket.ticketId = await generateTicket();
  newTicket.reporter = req.user.userId;

  try {
    const result = await newTicket.save();
    res.status(200).send(result);
  } catch (ex) {
    console.log(ex);
    res.statuss(500).send({ message: "Ticket could not be logger" });
  }
};

// Admin updation of tickets

exports.updateTicket = async (req, res) => {
  const ticketAssignee = req.body.assignee;
  const ticketStatus = constants.ticketStatus.assigned;
  const ticketTicketId = req.params.ticketId;

  if (req.body.priority) {
    var ticketPriority = req.body.priority;
  }

  try {
    const result = await Ticket.findOneAndUpdate(
      {
        ticketId: ticketTicketId,
      },
      {
        assignee: ticketAssignee,
        status: ticketStatus,
        priority: ticketPriority,
        updatedAt: Date.now(),
      }
    );

    res.status(200).send(result);
  } catch (ex) {
    res.status(500).send({
      message: `Data couldn't be updated. Some internal error occured.`,
    });
  }
};

// Updation of Tickets

exports.updateTicket = async (req, res) => {
  const ticketTitle = req.body.title;
  const ticketDescription = req.body.description;
  const ticketStatus = req.body.status;

  if (req.body.assignee) {
    if (req.user.userId[0] == "C") {
      res.status(200).send({
        message: `You are not authorized to assign tickets. Please contact Admin.`,
      });
    } else {
      const user = await User.findOne({ userId: req.body.assignee });
      if (user) {
        const ticketAssignee = req.body.assignee;
      } else {
        res.status(500).send({ message: "Invalid Assignee ID" });
      }
    }
  }

  if (req.body.reporter) {
    if (req.user.userId[0] == "E") {
      res.status(200).send({
        message:
          "Youe are not authorized to change reporter. Please contact Admin.",
      });
    } else {
      const user = await User.findOne({ userId: req.body.userId });
      if (user) {
        const ticketReporter = req.body.reporter;
      } else {
        res.status(500).send({ message: "Invalid Reporter ID" });
      }
    }
  }

  try {
    const result = await Ticket.findOneAndUpdate(
      {
        ticketId: req.params.ticketId,
      },
      {
        title: ticketTitle,
        description: ticketDescription,
        status: ticketStatus,
        assingee: ticketAssignee,
        reporter: tickerReporter,
      }
    );
    res
      .status(200)
      .send({ message: `Data has been updated successfully ${result}` });
  } catch (ex) {
    res.status(500).send({
      message: `Data couldn't be updated. Some internal error occured.`,
    });
  }
};
