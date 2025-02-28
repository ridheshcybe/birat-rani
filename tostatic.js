const fs = require("fs");
const ejs = require("ejs");

const xml = [
  "index",
  "about",
  "appointment",
  "contact",
  "service",
  "team",
  "testimonial",
];
xml.forEach(async (e) => {
  const file = await ejs.renderFile(`./views/${e}.ejs`, {
    count: {
      doc: 12,
      pat: 12345,
    },
  });
  fs.writeFileSync(`./static/${e}.html`, file);
});
