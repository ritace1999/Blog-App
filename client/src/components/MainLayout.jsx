import { CTA } from "./CTA";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <CTA />
      <Footer />
    </div>
  );
};
