import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return new Response("sessionId missing", { status: 400 });
    }

    
    const session = await prisma.gameSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return new Response("Session not found", { status: 404 });
    }

    const endTime = new Date();
    const duration = Math.floor(
      (endTime.getTime() - session.startedAt.getTime()) / 1000
    );

    const updated = await prisma.gameSession.update({
      where: { id: sessionId },
      data: {
        endedAt: endTime,
        duration
      }
    });

    return Response.json(updated);
  } catch (err) {
    console.error("END SESSION ERROR:", err);
    return new Response("Failed to end session", { status: 500 });
  }
}
