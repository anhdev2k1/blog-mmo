import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Navbar/navbar";
import { Providers } from "@/redux/provider";
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
        <Navbar />
        <Providers>
          <div className="container" style={{ marginTop: "80px" }}>
            {children}
          </div>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
