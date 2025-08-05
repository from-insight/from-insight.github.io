import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "From-Insight Inc." },
    { name: "description", content: "Welcome to From-Insight Inc." },
  ];
}

export default function Home() {
  return <Welcome />;
}
