const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const dotenv = require("dotenv");
dotenv.config();

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    //Connexion à la BDD
    await prisma.$connect();

    // Création de faux users
    for (let i = 0; i < 10; i++) {
      const user = await prisma.user.create({
        data: {
          nickname: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          profilePicture: faker.image.url(),
        },
      });

      //Création de fausses annonces
      for (let j = 0; j < 3; j++) {
        await prisma.ads.create({
          data: {
            title: faker.lorem.words(),
            description: faker.lorem.paragraph(),
            address: faker.location.streetAddress(),
            bookable_dates: faker.date.betweens({
              from: "2020-01-01T00:00:00.000Z",
              to: "2030-01-01T00:00:00.000Z",
              count: 2,
            }),
            pictures: [faker.image.url()],
            nightly_price: parseFloat(faker.commerce.price()),
            renterId: user.id,
          },
        });
      }
    }
    console.log("Base de données peuplée !");
  } catch (error) {
    console.error("Erreur : ", error);
  }
}

seedDatabase();
