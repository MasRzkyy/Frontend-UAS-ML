"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const menu = [
    { name: "Home", path: "/" },
    // { name: "Neural Network", path: "/nn" },
    { name: "Random Forest", path: "/rf" },
    { name: "XGBoost", path: "/xgboost" },
  ];

  return (
    <nav className=" fixed top-0 left-0 right-0 my-2 mx-10 rounded-sm bg-transparent backdrop-blur-md shadow-sm   ">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center">
        <div className="flex gap-6">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium ${
                pathname === item.path
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
