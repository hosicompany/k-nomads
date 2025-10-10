import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/animations/PageTransition";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CompareBar from "@/components/compare/CompareBar";
import SkipLink from "@/components/accessibility/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "K-NOMADS - 한국 디지털 노마드 플랫폼",
    template: "%s | K-NOMADS",
  },
  description:
    "한국에서 시작하는 디지털 노마드 라이프. 도시별 생활 정보, 코워킹 스페이스, 커뮤니티를 한눈에.",
  keywords: [
    "디지털 노마드",
    "한국",
    "코워킹",
    "원격근무",
    "워케이션",
    "제주도",
    "부산",
    "서울",
  ],
  authors: [{ name: "K-NOMADS" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://k-nomads.com",
    siteName: "K-NOMADS",
    title: "K-NOMADS - 한국 디지털 노마드 플랫폼",
    description:
      "한국에서 시작하는 디지털 노마드 라이프. 도시별 생활 정보, 코워킹 스페이스, 커뮤니티를 한눈에.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "K-NOMADS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "K-NOMADS - 한국 디지털 노마드 플랫폼",
    description:
      "한국에서 시작하는 디지털 노마드 라이프. 도시별 생활 정보, 코워킹 스페이스, 커뮤니티를 한눈에.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkipLink />
        <Header />
        <PageTransition>
          <main id="main-content">{children}</main>
        </PageTransition>
        <Footer />
        <ScrollToTop />
        <CompareBar />
      </body>
    </html>
  );
}
