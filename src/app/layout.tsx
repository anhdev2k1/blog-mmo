'use client'
import { userApi } from "@/api-client";
import "@/styles/global.css";
import type { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Tiến Long Media",
  description: "Cung cấp các dịch vụ mạng xã hội",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await userApi.getMe()
      console.log(data);
    }
    getCurrentUser()
 },[])
  return (
    
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
