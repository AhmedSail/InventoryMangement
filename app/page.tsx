import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-purple-300 flex justify-center items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 uppercase">
              Inventory Management
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Streamline your inventory tracking with our powerfull, easy-to-use
              management system. Track products, monitor stock levels, and gain
              valuble insights
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/signIn"
                className="bg-purple-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-purple-700 hoverEffect"
              >
                Sign In
              </Link>
              <Link
                href="#"
                className="bg-white  font-bold px-8 py-4 rounded-lg text-purple-600 hover:bg-purple-300 hoverEffect"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
