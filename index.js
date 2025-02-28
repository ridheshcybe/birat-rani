const express = require("express");
const teamRoutes = require("./routes/teamRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const app = express();

app.use("/public", express.static("./public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/appointment", (req, res) => {
  res.render("appointment.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/facilities", (req, res) => {
  res.render("service.ejs");
});

app.get("/facilities/lasik", (req, res) => {
  res.render("facilites/lasik.ejs");
});

app.get("/facilities/cataract", (req, res) => {
  res.render("facilites/cataract.ejs");
});

app.get("/facilities/glaucoma", (req, res) => {
  res.render("facilites/galucoma.ejs");
});

app.get("/facilities/dryeye", (req, res) => {
  res.render("facilites/dryeye.ejs");
});

app.get("/facilities/e&t", (req, res) => {
  res.render("facilites/e&t.ejs");
});

app.get("/facilities/lab", (req, res) => {
  res.render("facilites/lab.ejs");
});

app.get("/team", (req, res) => {
  res.render("team.ejs");
});

app.get("/testimonial", (req, res) => {
  res.render("testimonial.ejs");
});

app.use(teamRoutes, testimonialRoutes);

app.use((req, res, next) => {
  res.render("404.ejs");
});

app.listen(process.env.PORT || 8080);
