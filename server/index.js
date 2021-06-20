const express = require("express"),
   userCtrl = require("./controllers/auth"),
   contCtrl = require("./controllers/contact");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { sendEmail } = require("./verifyMailer");

const locCtrl = require("./controllers/locationController");
const crseCtrl = require("./controllers/courseController");
const actCtrl = require("./controllers/activityController");

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT, EMAIL, PASSWORD } =
   process.env;

const app = express();

const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: EMAIL,
      pass: PASSWORD,
   },
});
app.set("transporter", transporter);

app.use(express.json());
app.use(
   session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
   })
);

massive({
   connectionString: CONNECTION_STRING,
   ssl: { rejectUnauthorized: false },
})
   .then((db) => {
      app.set("db", db);
      console.log("database connected successfully");
      app.listen(SERVER_PORT, () => {
         console.log(`Server is listening on pizzaport ${SERVER_PORT}`);
      });
   })
   .catch((err) => console.log(err));

// AUTH ENDPOINTS

app.post("/auth/register", userCtrl.register);
app.post("/auth/login", userCtrl.login);
app.get("/auth/account", userCtrl.getUser);
app.post("/auth/logout", userCtrl.logout);
app.get("/auth/verify/:email/:username", userCtrl.verify);

// EMAIL
app.post("/api/sendMail", (req, res) => {
   console.log(req.body);

   sendEmail(req, "hello");
});

// Location Endpoints
app.get("/locations/:location_id", locCtrl.getLocation);
app.post("/locations/add", locCtrl.addLocation);
app.get("/locations", locCtrl.getLocations);
app.get("/locations/start/find", locCtrl.getCourseStartLocations);
app.get("/locations/courses/:course_id", locCtrl.getAllCourseLocations);
app.get("/locations/segments/:seg1/:seg2", locCtrl.getSegmentLocations);

// Course Endpoints
app.get("/courses/:course_id", crseCtrl.getCourse);
app.get("/courses", crseCtrl.getCourses);
app.post("/courses/add", crseCtrl.createCourse);
app.post("/courses/:course_id/locations/:location_id/:location_num",crseCtrl.createCourseLoc)
app.put("/courses/update/:course_id", crseCtrl.updateCompTime);

// Activity Endpoints
app.get("/leaderboard/:course_id", actCtrl.getCourseLeaderboard);
app.get("/leaderboard/:location_id/:course_id", actCtrl.getSegmentLeaderboard);
app.post("/activity/start/:course_id/:user_id", actCtrl.startActivity);
app.put("/activity/update/:activity_id/:cloc_id", actCtrl.performActivity);
app.put("/activity/complete/:activity_id", actCtrl.completeActivity);

// Contact Endpoints

app.post("/contact", contCtrl.submitEmail);
