import "./globals.css";
import { Inter } from 'next/font/google';
import Header from "./header/page";

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: "NextTodoApp",
  description: "NextTodoApp",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className}>
        <div>
          <Header />
          <main>
            {children}
          </main>
          <footer className="py-5">
            <div className="text-center text-sm">
              Copyrighting ©︎ ---
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
