import "./globals.css";
import Navbar from "./components/navbar";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata = {
  title: "Kanding",
  description: "Search engine for goats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
