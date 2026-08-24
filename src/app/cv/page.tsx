import type { Metadata } from "next";
import { CvDocument } from "./cv-document";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae for Isaack Joshua Lukumay — machine learning engineer and software developer.",
  robots: { index: false, follow: false },
};

export default function CvPage() {
  return <CvDocument />;
}
