import type { Route } from "./+types/home";
import { Nav } from "~/components/Nav";
import { Hero } from "~/components/Hero";
import { Marquee } from "~/components/Marquee";
import { Services } from "~/components/Services";
import { Story } from "~/components/Story";
import { Experts } from "~/components/Experts";
import { Community } from "~/components/Community";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "from-insight corp. — AI Education & Consulting" },
    {
      name: "description",
      content:
        "실전 핀테크 창업 경험과 학문적 깊이를 결합한 AI 교육. 프론트엔드, 핀테크, 머신러닝, 생성형 AI 컨설팅.",
    },
  ];
}

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Story />
      <Experts />
      <Community />
      <Footer />
    </div>
  );
}
