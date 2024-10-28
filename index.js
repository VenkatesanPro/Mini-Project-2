const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();

const prisma = new PrismaClient();

app.use(express.json())

// 1.Data from Frontend/Client
// 2.DB Logic
// 3.Data To Frontend

/** [ R ]
 * GET : http://localhost:3000/ --> GET ALL CARD DATA [ Frontend ]
 * **/
app.get("/cards", async (req, res) => {
  // 1.Data from Frontend/Client

  // 2.DB Logic
  const cardData = await prisma.card.findMany();

  // 3.Data to Frontend
  res
    .status(200)
    .json({ message: "Card Data Retived Sccuessfully", data: cardData });
});

/** [ R ]
 * GET : http://localhost:3000/ --> GET a CARD DATA By Id [ Frontend ]
 * **/
app.get("/", async (req, res) => {
  // 1.Data from Frontend/Client [ Params (/:) , Query (q=) , Headers ]
  const data = req.query;

  console.log(data);

  // 2.DB Logic
  const cardData = await prisma.card.findUnique({
    where: {
      id: data.id,
    },
  });

  // 3.Data to Frontend
  res
    .status(200)
    .json({ message: "Card Data Retived Sccuessfully", data: cardData });
});

/** [ C ]
 * POST : http://localhost:3000/ --> Create a Card [ Admin DashBoard ]
 * **/
app.post("/", async (req, res) => {
  // 1.Data from Frontend/Client
  const data = req.body;

  // 2.DB Logic
  const newCardData = await prisma.card.create({
    data: {
      image_url: data.image_url,
      title: data.title,
      rating: data.rating,
      location: data.location,
    },
  });

  // 3.Data To Frontend
  res.json({ message: "Card Createed Sccuessfully", data: newCardData });
});

/** [ U ]
 * PUT : http://localhost:3000/ --> Update a Card [ Admin DashBoard ]
 * **/
app.put("/", async (req, res) => {
  // 1.Data from Frontend/Client
  const data = req.body;

  // 2.DB Logic
  const updateData = await prisma.card.update({
    where: {
      id: data.id,
    },
    data: {
      id: data.id,
      image_url: data.image_url,
      title: data.title,
      rating: data.rating,
      location: data.location,
    },
  });

  // 3.Data To Frontend
  res.json({ message: "Updated Data Sccuessfully", data: updateData });
});

/** [ D ]
 * DELETE : http://localhost:3000/ --> Delete a Card [ Admin DashBoard ]
 * **/
app.delete("/", async (req, res) => {
  // 1.Data from Frontend/Client
  const data = req.body;

  // 2.DB Logic
  await prisma.card.delete({
    where: {
      id: data.id,
    },
  });

  // 3.Data To Frontend
  res.json({ message: "Card Deleted Sccuessfully" });
});

app.listen(3000);