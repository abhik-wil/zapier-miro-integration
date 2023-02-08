const { default: axios } = require("axios");
const express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();
// import img from "./images/angry-pakistani-fan.jpg";

const app = express();
const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/images/angry-pakistani-fan.jpg");
});

app.post("/", (req, res) => {
  const auth = req.headers.authorization;
  const { title, description, profileUrl } = req.body;

  axios
    .post(
      `https://api.miro.com/v2/boards/${process.env.BOARD_ID}/app_cards`,
      {
        data: {
          title,
          description,
          fields: [
            {
              iconShape: "round",
              iconUrl: profileUrl,
            },
          ],
        },
        position: {
          origin: "center",
          x: 0,
          y: 0,
        },
      },
      {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${process.env.MIRO_AUTH_TOKEN}`,
          "content-type": "application/json",
        },
      }
    )
    .then((response) => res.json(response.data))
    .catch((err) => res.status(500).send(err));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
