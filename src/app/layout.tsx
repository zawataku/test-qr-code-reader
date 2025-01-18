import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QRコードリーダー（テスト用）",
  description: "QRコードリーダー（テスト用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}