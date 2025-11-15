import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // آخر جزء من المسار

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing product ID" },
        { status: 400 }
      );
    }

    const deleted = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("Delete error:", error);
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
