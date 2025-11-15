"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import Swal from "sweetalert2";

type Product = {
  id: string;
  name: string;
  sku: string | null;
  price: number;
  quantity: number;
  lowStockAt: number | null;
  createdAt: Date;
};

export default function InventoryTable({ products }: { products: Product[] }) {
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
      if (res.ok) {
        await Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
        });
        window.location.reload();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete product.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form action="/inventory" method="GET" className="flex gap-2">
          <input
            type="text"
            name="q"
            placeholder="Search product..."
            className="flex-1 px-4 py-2 rounded-lg focus:border-transparent border border-gray-300"
          />
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800 hoverEffect font-bold  ">
            Search
          </button>
        </form>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="text-gray-600">
            <TableHead className="text-gray-400 text-sm">NAME</TableHead>
            <TableHead className="text-gray-400 text-sm">SKU</TableHead>
            <TableHead className="text-gray-400 text-sm">PRICE</TableHead>
            <TableHead className="text-gray-400 text-sm">QUANTITY</TableHead>
            <TableHead className="text-gray-400 text-sm">
              LOW STOCK AT
            </TableHead>
            <TableHead className="text-gray-400 text-sm">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.sku ?? "—"}</TableCell>
              <TableCell>${p.price.toFixed(2)}</TableCell>
              <TableCell>{p.quantity}</TableCell>
              <TableCell>{p.lowStockAt ?? "—"}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-700 hover:underline"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
