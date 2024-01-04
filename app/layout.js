import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navabar";
import { getServerSession } from "next-auth";
import SessionProvider from "./util/SessionProvider";
import ReactToast from "./components/react-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextAuth",
  description: "NextAuth Login and Signup",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <ReactToast />
        </SessionProvider>
      </body>
    </html>
  );
}
