import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth";
export async function POST(request: Request) {
  const user = await getCurrentUser();
  const userId = user.id;
  try {
    const body = await request.json();
    const { name, sku, price, quantity, lowStockAt } = body;

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        quantity,
        lowStockAt,
        userId, // ✅ الحقل المطلوب
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
