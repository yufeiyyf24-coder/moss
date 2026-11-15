import type { Metadata } from "next";
import "./career.css";

export const metadata: Metadata = {
  title: "包欣如 · AI 产品 / 交互 / 用研 / 视觉",
  description:
    "上海理工大学工业设计本科 2027 届。AI 产品、交互设计、用户研究与视觉设计（UI / IP 设计等）。",
};

export default function CareerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
