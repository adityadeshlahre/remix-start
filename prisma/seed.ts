import { db } from "./index.ts";

export const jokes = [
  // {
  //   name: "Road worker",
  //   content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
  // },
  // {
  //   name: "Frisbee",
  //   content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
  // },
  {
    name: "Trees",
    content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
  },
  {
    name: "Skeletons",
    content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
  },
  {
    name: "Hippos",
    content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
  },
  // {
  //   name: "Dinner",
  //   content: `What did one plate say to the other plate? Dinner is on me!`,
  // },
  // {
  //   name: "Elevator",
  //   content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
  // },
];

async function seed() {
  try {
    for (const joke of jokes) {
      await db.joke.create({
        data: joke,
      });
    }

    console.log("Seed data has been inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await db.$disconnect();
  }
}

async function seed2(test: string, test2: string) {
  try {
    for (const joke of jokes) {
      await db.joke.create({
        data: joke,
      });
    }

    console.log("Seed data has been inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await db.$disconnect();
  }
}

seed();
