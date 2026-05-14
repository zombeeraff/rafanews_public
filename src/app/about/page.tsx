"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <article className="max-w-2xl mx-auto px-6 py-12 sm:py-20 prose prose-gray prose-lg">
      <h1>{t.about.title}</h1>

      <p>{t.about.intro}</p>

      <p>
        <a
          href="https://boxd.it/jOKqr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 no-underline hover:opacity-80"
        >
          <Image
            src="/letterboxd-icon.png"
            alt="Letterboxd"
            width={28}
            height={28}
            className="rounded-lg not-prose"
          />
          <span>{t.about.letterboxd}</span>
        </a>
      </p>

      <p>
        <a href="https://www.discogs.com/user/raguirre/collection" target="_blank" rel="noopener noreferrer">
          {t.about.discogs}
        </a>
      </p>

      <h2>{t.about.whatIDoTitle}</h2>
      <p>{t.about.whatIDoBody}</p>

      <h2>{t.about.photographyTitle}</h2>
      <p>
        {t.about.photographyBody}{" "}
        <a href="/gallery">{t.about.galleryLink}</a>{" "}
        {t.about.photographyBody2}
      </p>

      <h2>{t.about.contactTitle}</h2>
      <p>{t.about.contactBody}</p>

    </article>
  );
}
