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
  const title = "생성형 AI·실무 교육과 컨설팅 | 프롬인사이트";
  const description =
    "프롬인사이트(from-insight)는 업무 현장에서 검증된 핀테크 실무 경험과 서울대 공학박사와 회계사의 학문적 깊이를 결합한 AI 교육·컨설팅 브랜드입니다. 생성형 AI 도입 컨설팅, 최적화·머신러닝·핀테크 실무 교육을 제공합니다.";
  const url = "https://www.from-insight.com/";
  return [
    { title },
    {
      name: "description",
      content: description,
    },
    { name: "robots", content: "index, follow" },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    {
      property: "og:image",
      content: "https://www.from-insight.com/frominsight_ci.png",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    {
      name: "twitter:image",
      content: "https://www.from-insight.com/frominsight_ci.png",
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
