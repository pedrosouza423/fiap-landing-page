import { Header } from "@/components/Header/Header";
import { Intro } from "@/components/Intro/Intro";
import { Navbar } from "@/components/Navbar/Navbar"

export default function Home() {
  return (
    <main>
      <Navbar />
      <main>
        <Header />
      </main>
      <Intro />
      <h1>FIAP Landing Page</h1>
      <p>Setup: Next.js + TypeScript + SCSS</p>
      <p>asd</p>
    </main>
  );
}
