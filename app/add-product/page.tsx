"use client";

import { useState } from "react";
import Side from "@/src/components/Side";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
    lowStockAt: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        sku: form.sku,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity),
        lowStockAt: form.lowStockAt ? parseInt(form.lowStockAt) : null,
      }),
    });

    if (res.ok) {
      await Swal.fire({
        title: "Success!",
        text: "Product added successfully.",
        icon: "success",
        confirmButtonColor: "#6366f1", // Tailwind purple-600
      });

      setForm({ name: "", sku: "", price: "", quantity: "", lowStockAt: "" });
      redirect("/inventory");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to add product.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      <div className="order-1 w-full sm:w-64">
        <Side currentPath="/add-product" />
      </div>

      <main className="order-2 flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
          <p className="text-sm text-gray-500">
            Use the form below to add new products to your inventory. Fill in
            the details and save to keep your stock updated.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            name="lowStockAt"
            placeholder="Low Stock At"
            value={form.lowStockAt}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 font-semibold"
          >
            Save Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
