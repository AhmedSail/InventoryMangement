"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/components/ui/resizable";
import { StackProvider, StackTheme, UserButton } from "@stackframe/stack";
import { stackClientApp } from "@/stack/client";
import { BarChart3 } from "lucide-react";
import { navigation } from "@/src/data";
import { usePathname, useRouter } from "next/navigation";

export default function Side({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="md:h-screen max-sm:w-full bg-gray-900 w-64 text-white p-4 sm:p-6 shadow-md">
      <div className="flex items-center gap-3 mb-10">
        <BarChart3 className="w-6 h-6 text-white" />
        <span className="text-base sm:text-lg font-semibold uppercase truncate">
          Inventory App
        </span>
      </div>

      <nav className="space-y-1">
        <div className="text-xs sm:text-sm font-semibold text-gray-400 uppercase">
          Inventory
        </div>
        <ul className="flex flex-col gap-4 mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className={`py-2 px-2 rounded-md transition-colors ${
                  isActive ? "bg-gray-600" : ""
                } hover:bg-gray-600 cursor-pointer`}
                onClick={() => router.push(item.href)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm sm:text-base">{item.name}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-10 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 p-4 sm:p-6">
        <UserButton />
      </div>
    </div>
  );
}
