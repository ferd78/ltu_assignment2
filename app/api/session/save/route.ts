import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { duration, sessionName } = await req.json();

    if (!sessionName) {
      return new Response("Session name is required.", { status: 400 });
    }

    const endedAt = new Date();
    const startedAt = new Date(endedAt.getTime() - duration * 1000);

    const saved = await prisma.gameSession.create({
      data: {
        playerId: "22586555",
        startedAt,
        endedAt,
        duration,
        sessionName,  
      },
    });

    return Response.json({
      success: true,
      session: saved,  
    });

  } catch (err) {
    console.error("SAVE RESULT ERROR:", err);
    return new Response("Failed to save result", { status: 500 });
  }
}
