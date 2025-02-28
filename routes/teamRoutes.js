const express = require("express");
const { getTeamMembers } = require("../services/teamService.js");

const router = express.Router();

router.get("/api/team", async (req, res) => {
  try {
    const team = await getTeamMembers();
    res.send(team);
  } catch (error) {
    console.error("Error in team route:", error);
    res.status(500).send("Error loading team members");
  }
});

module.exports = router;
