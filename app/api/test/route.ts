import { prisma } from '../../../lib/prisma';

export async function GET() {

  console.log("DATABASE_URL =", process.env.DATABASE_URL);
  console.log("TYPE =", typeof process.env.DATABASE_URL);

  const sessions = await prisma.gameSession.findMany();
  return Response.json(sessions);
}
