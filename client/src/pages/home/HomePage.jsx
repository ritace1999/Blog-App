import { MainLayout } from "../../components/MainLayout";
import { Articles } from "./container/Articles";

import { Hero } from "./container/Hero";

const HomePage = () => {
  return (
    <div>
      <MainLayout>
        <Hero />
        <Articles />
      </MainLayout>
    </div>
  );
};

export default HomePage;
