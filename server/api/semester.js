// server/api/semester.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  switch (method) {
    case 'GET':
      // Get all semesters
      const semesters = await prisma.semester.findMany();
      return semesters;

    case 'POST':
      // Create a new semester
      const body = await readBody(event);
      const newSemester = await prisma.semester.create({
        data: {
          Name: body.Name,
          Course: body.Course,
          African_American: body.African_American,
          Hispanic: body.Hispanic,
          International: body.International,
          Two_or_More: body.Two_or_More,
          Other: body.Other,
          Unknown: body.Unknown,
          White: body.White,
          Male: body.Male,
          Female: body.Female,
          Total: body.Total,
        },
      });
      return newSemester;

    default:
      // Method Not Allowed
      event.node.res.statusCode = 405;
      return { error: 'Method Not Allowed' };
  }
});
