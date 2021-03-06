const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// to enable CORS
app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  if (err) {
    res
      .status(400)
      .send({ error: "Could not decode request: JSON parsing failed" });
  } else {
    next()
  }
})

// API call to filter
app.post("/", (req, res) => {
  try {
    res.status(200).send({
      response: req.body.payload
        .filter(data => data.drm && data.episodeCount > 0)
        .map(data => {
          const {
            image: { showImage },
            slug,
            title
          } = data;
          return { image: showImage, slug, title };
        })
    });
  } catch (error) {
    // sending 400 in case of error
    res
      .status(400)
      .send({ error: "Could not decode request: JSON parsing failed" });
  }
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;