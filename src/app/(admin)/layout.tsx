"use client";
import NavbarDashboard from "@/components/DashboardNavbar";
import SidebarDashboard from "@/components/sidebarDashboard";
import "@/styles/global.css";
import style from "../(admin)/dashboard/dashboard.module.css";
import type { Metadata } from "next";
import { Providers } from "@/redux/provider";
import ContainerProvider from "@/components/ContainerProvider";
export const metadata: Metadata = {
  title: "Tiến Long Media",
  description: "Cung cấp các dịch vụ mạng xã hội",
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ContainerProvider>
            <NavbarDashboard />
            <div
              className="container-flex"
              style={{ display: "flex", marginTop: "10px", gap: "10px" }}
            >
              <SidebarDashboard />
              <div className={style.container}>{children}</div>
            </div>
          </ContainerProvider>
        </Providers>
      </body>
    </html>
  );
}
