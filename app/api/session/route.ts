import { prisma } from "@/lib/prisma";

export async function GET() {
  console.log("[GET] Fetching sessions...");

  const sessions = await prisma.gameSession.findMany();

  console.log("[GET] Sessions fetched:", sessions.length);

  return Response.json(sessions);
}

export async function POST(req: Request) {
  console.log("[POST] Creating session...");

  const body = await req.json();
  console.log("[POST] Payload received:", body);

  const session = await prisma.gameSession.create({
    data: body,
  });

  console.log("[POST] Created session with ID:", session.id);

  return Response.json(session);
}
