// import TEST from '../components/TEST';
import { useState } from 'react';
import SignIn from '../components/SignIn';
import Sidebar from '../components/Sidebar';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen font-[family-name:var(--font-geist-sans)]`}>
      {isAuthenticated ? (
        <Sidebar />
      ) : (
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
            <SignIn onSignIn={setIsAuthenticated} />
          </div>
        </div>
      )}
    </div>
  );
}
