import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sessions = await prisma.gameSession.findMany({
      where: { playerId: "22586555" },
      orderBy: { startedAt: "desc" }
    });

    return Response.json(sessions);
  } catch (err) {
    console.error("RESULTS ERROR:", err);
    return new Response("Failed to fetch results", { status: 500 });
  }
}
