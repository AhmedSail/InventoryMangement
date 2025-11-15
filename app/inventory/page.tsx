import Side from "@/src/components/Side";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import InventoryTable from "@/src/components/InventoryTable";

const Inventory = async ({
  searchParams,
}: {
  searchParams: { q?: string };
}) => {
  const user = await getCurrentUser();
  const userId = user.id;
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const allProduct = await prisma.product.findMany({
    where: { userId, name: { contains: q } },
    select: {
      id: true,
      price: true,
      quantity: true,
      createdAt: true,
      name: true,
      sku: true,
      lowStockAt: true,
    },
  });

  const products = allProduct.map((p) => ({
    ...p,
    price: p.price.toNumber(),
  }));

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-50">
      <div className="order-1 w-full sm:w-64">
        <Side currentPath="/inventory" />
      </div>
      <main className="order-2 flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500">
            Manage your product and track inventory levels.
          </p>
        </div>
        <InventoryTable products={products} />
      </main>
    </div>
  );
};

export default Inventory;
