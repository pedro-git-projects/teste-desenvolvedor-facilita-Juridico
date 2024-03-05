import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-200">
      <Header />
      <main className="flex-grow m-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
