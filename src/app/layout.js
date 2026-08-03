import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Harsha — Portfolio",
  description: "Designer & developer building sharp digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${dmSans.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
