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
    return 0;
  } finally {
    await database.$disconnect();
  }
}
main();
