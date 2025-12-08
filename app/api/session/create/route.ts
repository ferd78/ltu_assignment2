import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await prisma.gameSession.create({
      data: {
        playerId: "22586555",
        startedAt: new Date(),
        endedAt: null,
        duration: null
      }
    });

    return Response.json(session);
  } catch (err) {
    console.error("CREATE SESSION ERROR:", err);
    return new Response("Failed to create session", { status: 500 });
  }
}
