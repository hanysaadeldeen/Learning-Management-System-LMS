const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Logic" },
        { name: "Information Technology" },
        { name: "Filming" },
        { name: "Graphiic" },
        { name: "Engineering" },
        { name: "Fitness" },
      ],
    });
  } catch (error) {
    console.log("this error from seeding the database category ", error);
  } finally {
    await database.$disconnect();
  }
}
main();
