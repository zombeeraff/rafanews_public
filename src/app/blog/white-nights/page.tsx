"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/formatDate";

export default function WhiteNights() {
  const { t, language } = useLanguage();

  return (
    <article className="max-w-2xl mx-auto px-6 py-12 sm:py-20 prose prose-gray prose-lg">
      <Link href="/blog" className="not-prose text-sm text-gray-400 hover:text-gray-600 transition-colors">
        ← {t.blog.title}
      </Link>

      <div className="not-prose mt-6 mb-8 flex gap-6 items-start">
        <div className="shrink-0 w-28 rounded-md overflow-hidden shadow-md">
          <Image
            src="https://vtupbkrc2ny02vy6.public.blob.vercel-storage.com/whitenights.jpg"
            alt="White Nights book cover"
            width={619}
            height={1000}
            className="w-full h-auto"
            quality={90}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mt-0">{language === "es" ? "Noches Blancas" : "White Nights"}</h1>
          <p className="text-gray-400 text-sm mt-1 mb-0">{formatDate("2026-01-06", language)} · {t.blog.categories.reads}</p>
          <p className="text-gray-500 text-sm mt-2 mb-0">Fyodor Dostoevsky · 1848</p>
          <p className="text-gray-500 text-sm mt-1 mb-0">Original: {language === "es" ? "Ruso" : "Russia"}</p>
          <p className="text-gray-500 text-sm mt-1 mb-0">{t.blog.edition}: {language === "es" ? "Traducción al inglés" : "English Translation"}</p>
        </div>
      </div>

      <p>White Nights was not an easy book to read. I found myself re-reading passages over and over again to try to understand the mindset of the Dreamer (narrator). I reckon it has to do with the fact that it is a work originally in Russian and they must have a speaking cadence much different than what I am used to in English and Spanish. As I progressed through the story though, I gathered that this cadence that I am speaking of is really there to show the intensity of the moodswings that dreamer and Nastenka live through in the span of a very short time. Not a whole lot happens in the book. Really the thought I am left with is how significant even the smallest interactions can be when one feels as though life is happening for everyone but themselves. I still feel like I did not fully grasp what Dostoevsky wanted to share and I intend to read this book again in Spanish to see what else I can gather from that translation.</p>

    </article>
  );
}
