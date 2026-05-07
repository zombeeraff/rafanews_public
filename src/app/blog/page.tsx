"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/formatDate";

type Category = "musicChats" | "travel" | "tech" | "reads" | "space";

const posts: { href: string; title: string; titleEs?: string; date: string; categories: Category[]; thumbnail?: string; thumbnailClass?: string }[] = [
  { href: "/blog/mexico-city-mourning-doves", title: "Mourning Dove to Mexico City", titleEs: "Paloma de Luto a la Ciudad de México", date: "2026-04-10", categories: ["travel"], thumbnail: "https://vtupbkrc2ny02vy6.public.blob.vercel-storage.com/IMG_49jhyvjyh49.jpg", thumbnailClass: "w-28" },
  { href: "/blog/andromeda-strain", title: "The Andromeda Strain", titleEs: "La amenaza de Andrómeda", date: "2026-02-15", categories: ["reads", "space"], thumbnail: "/photos/TheAndromedaStrain.jpg", thumbnailClass: "w-16" },
  { href: "/blog/berlin", title: "Berlin", titleEs: "Berlín", date: "2026-01-21", categories: ["travel"], thumbnail: "https://vtupbkrc2ny02vy6.public.blob.vercel-storage.com/berlin.png", thumbnailClass: "w-28" },
  { href: "/blog/white-nights", title: "White Nights", titleEs: "Noches Blancas", date: "2026-01-06", categories: ["reads"], thumbnail: "https://vtupbkrc2ny02vy6.public.blob.vercel-storage.com/whitenights.jpg", thumbnailClass: "w-16" },
];

const categories: Category[] = ["musicChats", "travel", "tech", "reads", "space"];

export default function Blog() {
  const { t, language } = useLanguage();
  const [active, setActive] = useState<Category | null>(null);

  const filtered = active ? posts.filter((p) => p.categories.includes(active)) : posts;

  return (
    <article className="max-w-2xl mx-auto px-6 py-12 sm:py-20 prose prose-gray prose-lg">
      <h1>{t.blog.title}</h1>
      <p className="not-prose text-sm text-gray-900 mt-1">{t.blog.noteLine1}</p>
      <p className="not-prose text-sm text-gray-900 mt-0">{t.blog.noteLine2}</p>
      <p className="not-prose text-sm text-gray-400 mt-6 text-center">- {t.blog.disclaimer}</p>

      {/* Category filters */}
      <div className="not-prose flex flex-wrap gap-2 mt-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
              active === cat
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {t.blog.categories[cat]}
          </button>
        ))}
      </div>

      {/* Post list */}
      <ul className="not-prose space-y-4 mt-8">
        {filtered.length === 0 ? (
          <li className="text-gray-400 text-sm">{t.blog.empty}</li>
        ) : (
          filtered.map((post) => (
            <li key={post.href}>
              <Link href={post.href} className="flex items-center gap-4 group">
                {post.thumbnail && (
                  <div className={`shrink-0 ${post.thumbnailClass ?? "w-20"} rounded overflow-hidden shadow-sm`}>
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={619}
                      height={1000}
                      className="w-full h-auto"
                      quality={90}
                    />
                  </div>
                )}
                <div className="flex-1 flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-gray-900 group-hover:text-gray-600 font-medium transition-colors">
                      {language === "es" && post.titleEs ? post.titleEs : post.title}
                    </span>
                    {post.categories.map((cat) => (
                      <span key={cat} className="text-xs text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">
                        {t.blog.categories[cat]}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400 shrink-0">{formatDate(post.date, language)}</span>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
      <p className="not-prose text-sm text-gray-400 mt-8 text-center">- {t.blog.disclaimer}</p>
    </article>
  );
}
