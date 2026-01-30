import { Courses } from "@/components/Courses/Courses";
import { Header } from "@/components/Header/Header";
import { Intro } from "@/components/Intro/Intro";
import { Navbar } from "@/components/Navbar/Navbar"
import { WaterTransition } from "@/components/WaterTransition";

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
    </>
  );
}
