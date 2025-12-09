import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/session/:id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = Number(idString);

  const session = await prisma.gameSession.findUnique({
    where: { id },
  });

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(session);
}

// PATCH /api/session/:id
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = Number(idString);
  const { sessionName } = await req.json();

  const updated = await prisma.gameSession.update({
    where: { id },
    data: { 
      sessionName: sessionName as string | null 
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/session/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = Number(idString);

  await prisma.gameSession.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Session deleted" });
}