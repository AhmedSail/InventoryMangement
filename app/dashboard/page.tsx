import ProductChart from "@/src/components/ProductChart";
import Side from "@/src/components/Side";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { TrendingUp } from "lucide-react";
import React from "react";

const Dashboard = async () => {
  const user = await getCurrentUser();
  const userId = user.id;

  const totalProduct = await prisma.product.count({ where: { userId } });
  const lowOfStock = await prisma.product.count({ where: { userId } });

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const allProduct = await prisma.product.findMany({
    where: { userId },
    select: { price: true, quantity: true, createdAt: true },
  });
  const now = new Date();
  const weeklyProductData = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${weekStart.getDate().toString().padStart(2, "0")}/${(
      weekStart.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    const count = allProduct.filter((p) => {
      const productDate = new Date(p.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductData.push({ week: weekLabel, products: count.length });
  }
  const totalValue = allProduct.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  );
  const inStockCount = allProduct.filter((p) => Number(p.quantity) > 5).length;
  const lowStockCount = allProduct.filter(
    (p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 5
  ).length;
  const outOfStockCount = allProduct.filter(
    (p) => Number(p.quantity) === 0
  ).length;
  const inStockPercentage =
    totalProduct > 0 ? Math.round((inStockCount / totalProduct) * 100) : 0;
  const lowStockPercentage =
    totalProduct > 0 ? Math.round((lowStockCount / totalProduct) * 100) : 0;
  const outOfStockPercentage =
    totalProduct > 0 ? Math.round((outOfStockCount / totalProduct) * 100) : 0;
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - يظهر فوق في الموبايل وعلى اليسار في الديسكتوب */}
      <div className="order-1  w-full sm:w-64">
        <Side currentPath="/dashboard" />
      </div>

      {/* Main Content */}
      <main className="order-2 flex-1 h-screen px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back! Here is an overview of your inventory
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 mb-8">
          {/* Key matrices*/}
          {/* text */}
          <div className=" gap-8 mb-8 bg-white shadow rounded-xl border-gray-500">
            <h1 className="font-bold text-xl p-5 capitalize">Key matrices</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 ">
              <div className="p-5 text-center flex flex-col gap-5">
                <p className="text-2xl font-bold text-gray-900">
                  {totalProduct}
                </p>

                <div className="">
                  <h2 className="text-sm font-semibold text-gray-600">
                    Total Products
                  </h2>
                  <div className="flex justify-center items-center">
                    <span className="text-green-600 text-xs">
                      +{totalProduct}
                    </span>
                    <TrendingUp className="w-3 text-green-600 " />
                  </div>
                </div>
              </div>
              <div className="p-5 text-center flex flex-col gap-5">
                <p className="text-2xl font-bold text-gray-900">{lowOfStock}</p>

                <div className="">
                  <h2 className="text-sm font-semibold text-gray-600">
                    Low Stock
                  </h2>
                  <div className="flex justify-center items-center">
                    <span className="text-green-600 text-xs">
                      +{lowOfStock}
                    </span>
                    <TrendingUp className="w-3 text-green-600 " />
                  </div>
                </div>
              </div>
              <div className="p-5 text-center flex flex-col gap-5">
                <p className="text-2xl font-bold text-gray-900">
                  ${totalValue.toFixed(2)}
                </p>

                <div className="">
                  <h2 className="text-sm font-semibold text-gray-600">
                    Total Value
                  </h2>
                  <div className="flex justify-center items-center">
                    <span className="text-green-600 text-xs">
                      ${totalValue.toFixed(2)}
                    </span>
                    <TrendingUp className="w-3 text-green-600 " />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="gap-8 mb-8 bg-white shadow rounded-xl border-gray-500">
            <div className="flex items-center justify-between mb-6 ">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 p-5">
                New products per Week
              </h2>
            </div>
            <div>
              <ProductChart data={weeklyProductData} />
            </div>
          </div>
        </div>

        {/* Stock Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Stock Level
              </h2>
            </div>
            <ul className="space-y-4">
              {recent.map((product) => {
                const stock =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                    ? 1
                    : 2;
                const bgColor = ["bg-red-600", "bg-yellow-600", "bg-green-600"];
                const textColor = [
                  "text-red-600",
                  "text-yellow-600",
                  "text-green-600",
                ];
                return (
                  <li key={product.id} className="bg-white p-4 rounded-lg ">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                      <div className="flex justify-start items-center gap-3">
                        <div
                          className={`${bgColor[stock]} w-3 h-3 rounded-full`}
                        />
                        <span className="text-gray-700 font-medium">
                          {product.name}
                        </span>
                      </div>
                      <div>
                        <h1
                          className={`${textColor[stock]} text-sm text-gray-500`}
                        >
                          {product.quantity} units
                        </h1>
                        <span className="text-sm text-gray-500">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* {efficiency} */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Efficiency
              </h2>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-purple-600 "
                  style={{
                    clipPath:
                      "polygon(50% 50%,50% 0%,100% 0%,100% 1000%,0% 100% ,0% 50%)",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {inStockPercentage}%
                    </div>
                    <div className="text-sm text-gray-600">In Stock</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <h1>In Stock</h1>
                <h1 className="font-bold">({inStockPercentage}%)</h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <h1>Low Stock</h1>
                <h1 className="font-bold">({lowStockPercentage}%)</h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <h1>Out of Stock</h1>
                <h1 className="font-bold">({outOfStockPercentage}%)</h1>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
