import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { WaterTransition } from "@/components/WaterTransition";
import { Courses } from "@/components/Courses";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Header />
      </main>
      <Intro />
      <WaterTransition />
      <Courses />
      <FAQ />
    </>
  );
}
