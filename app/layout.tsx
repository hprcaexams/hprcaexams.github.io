import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  "https://hprca-joa-it-preparation.rahulllthaaakur.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Himachal Recruitment Exam Academy | HPRCA Quiz & Courses",
    template: "%s | HREA",
  },
  description:
    "Learn and practise for HPRCA and Himachal government exams with subject-wise quizzes, topic filters, detailed solutions, free topics and Premium question banks.",
  keywords: [
    "HPRCA online quiz",
    "Himachal exam academy",
    "HPRCA mock test",
    "HPRCA Teacher preparation",
    "JOA IT quiz",
    "Himachal Pradesh GK questions",
    "DBMS MCQ",
    "HPRCA exam preparation",
  ],
  applicationName: "Himachal Recruitment Exam Academy",
  authors: [{ name: "Himachal Recruitment Exam Academy" }],
  creator: "Himachal Recruitment Exam Academy",
  publisher: "Himachal Recruitment Exam Academy",
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_IN",
    siteName: "Himachal Recruitment Exam Academy",
    title: "Himachal Recruitment Exam Academy | HPRCA Quiz & Courses",
    description:
      "Subject-wise lessons, free topic quizzes, Premium question banks and detailed solutions for Himachal recruitment exams.",
    images: [
      {
        url: "/mountain-ridges.webp",
        width: 1672,
        height: 941,
        alt: "Himachal Recruitment Exam Academy online learning portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himachal Recruitment Exam Academy",
    description:
      "Free and Premium subject-wise quizzes for HPRCA and Himachal government exams.",
    images: ["/mountain-ridges.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
