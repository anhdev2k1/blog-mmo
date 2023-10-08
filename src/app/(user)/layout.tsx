import "@/styles/global.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tiến Long Media",
  description: "Cung cấp các dịch vụ mạng xã hội",
};
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }