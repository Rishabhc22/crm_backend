const express = require('express');
const mongoose = require('mongoose');
const app = express();

const auth_routes = require("./routes/authRoutes");
const { setDriver } = require('mongoose');
const user_routes = requires("./routes/userRoutes");

mongoose.set("strictquery", false);

mongoose.connect("mongodb://localhost/crm_backend", false)
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log("Connection Failed"))

app.use(express.json());
auth_routes(app);

app.listen(3000, () => console.log("Server started on port..."))

module.exports = function(app) {
    const authHandler = require("./controllers/authController");
    const middleWare = require('./middlewares/authMiddleware');

    app.route("/crm/api/v1/auth/signup").post(authHandler.sign_up);
    app.route("/crm/api/v1/home").post(authHandler.sign_in);
}

module.exports.sign_in = async (req, res) => {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    console.log(newUser);

    if (newUser.userId[0] == "A") {
        newUser.userType = constants.userTypes.admin;
    }   
}

exports.isTokenValid = (req, res, next) => {
    if (auth[0] == "JWT") {
        jwt.verify(auth[1], "jwtPrivateKey", function(err, decode) {

        })
    }

    if (req.user) {
        res.status(200).send(req.user);
        next();
    }
    else {
        return res.status(401).send("Unauthorized access");
    }
}

const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true;
    },

    userId : String,

    password : {
        type : String,
        required : true
    },

    contact : Number,
    createdAt : {
        type : Date,
        immutable : true,
        default : () => {
            return Date.now();
        }
    }
})

const result = await Course.update({id : id}, {
    $set : {
        author : 'Mosh',
        isPublished : false;
    }
})

await Course.findById(id).select({name : 1});

await Course.findByIdAndUpdate(id, {
    $set {
        author : 
    }
})

await.Course.findOne()

await Course.deleteOne({ id : id});
await Course.deleteMany({id : id});
Course.findByIdAndRemove(id);
const result = await course.save();
const Course.find({id : id}).sort({name : 1}).select({name : 1, tags : 1});

function MessageChannel() {
    return <h1>Hello World</h1>
}

export default Message;

import Message from './Message';

import React from 'react'

const App = () => {
    const arr = [1, 2, 3, 4, 5];
    function message() {
        return item.length;
    }

    useEffect(() => {
        Axios.get("httt")
        .then(res => console.log(res.data[0].name));
    }, []);

  return (
    <div>
      arr.map(item => <li onCLick = {}>{item}</li>)}
      {message()}
      <ListGroup items = {items} heading = {"Cities"}/>
    </div>
  )
}

export default App;
