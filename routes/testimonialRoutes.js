const express = require("express");
const { getTestimonials } = require("../services/testimonialService.js");

const router = express.Router();

router.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await getTestimonials();
    res.send(testimonials);
  } catch (error) {
    console.error("Error in testimonial route:", error);
    res.status(500).send("Error loading testimonials");
  }
});

module.exports = router;
