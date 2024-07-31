const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Engineering" },
        { name: "Filming" },
        { name: "Fitness" },
        { name: "Graphiic" },
        { name: "Information Technology" },
        { name: "Logic" },
      ],
    });
  } catch (error) {
    console.log("this error from seeding the database category ", error);
  } finally {
    await database.$disconnect();
  }
}
main();
