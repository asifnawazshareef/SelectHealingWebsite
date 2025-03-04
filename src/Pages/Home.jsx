import DashboardCards from "../Components/DashboardCards";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="px-5 mb-10">
      <h2 className="text-2xl font-bold">Welcome back, .</h2>
      <DashboardCards />
    </section>
  );
};

export default Home;
