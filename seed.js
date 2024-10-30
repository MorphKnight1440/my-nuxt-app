import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Generate fake semesters
  for (let i = 0; i < 10; i++) {
    const africanAmerican = faker.number.int({ min: 0, max: 20 });
    const hispanic = faker.number.int({ min: 0, max: 20 });
    const international = faker.number.int({ min: 0, max: 70 });
    const twoOrMore = faker.number.int({ min: 0, max: 20 });
    const other = faker.number.int({ min: 0, max: 20 });
    const unknown = faker.number.int({ min: 0, max: 20 });
    const white = faker.number.int({ min: 0, max: 60 });
    const male = faker.number.int({ min: 0, max: 50 });
    const female = faker.number.int({ min: 0, max: 50 });
    const total = male + female;

    await prisma.semester.create({
      data: {
        Name: `${faker.helpers.arrayElement(['F', 'S', 'U'])}${faker.number.int({ min: 10, max: 24 })}`,
        Course: `EPCS${faker.helpers.arrayElement(['2100', '3100', '2200', '3200'])}`,
        African_American: africanAmerican,
        Hispanic: hispanic,
        International: international,
        Two_or_More: twoOrMore,
        Other: other,
        Unknown: unknown,
        White: white,
        Male: male,
        Female: female,
        Total: total,
      },
    });
  }

  console.log('Semesters seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
