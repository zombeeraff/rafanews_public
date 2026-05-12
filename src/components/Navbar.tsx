"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useLanguage } from "@/contexts/LanguageContext";

const PROTECTED = ["/gallery", "/blog"];

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingHref, setPendingHref] = useState("/gallery");
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/about", label: t.nav.about },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/blog", label: t.nav.blog },
    ...(session ? [{ href: "/fifa26", label: t.nav.fifa26 }] : []),
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLinkClick(e: React.MouseEvent, href: string) {
    if (!session && PROTECTED.some((p) => href.startsWith(p))) {
      e.preventDefault();
      setPendingHref(href);
      setShowModal(true);
      setOpen(false);
    } else {
      setOpen(false);
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Image src="/umbrella-logo.svg" alt="Umbrella logo" width={44} height={44} />
            Rafa
          </Link>

          <div className="flex items-center gap-4">
            {/* Hamburger / dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Toggle menu"
              >
                <span className="font-medium">{open ? "Close" : "Menu"}</span>
                <div className="flex flex-col justify-center items-center gap-1.5 w-5">
                  <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
                </div>
              </button>

              {open && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg py-1 overflow-hidden">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          pathname === link.href
                            ? "text-gray-900 font-medium bg-gray-50"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {session && (
                    <>
                      <li className="mx-3 my-1 border-t border-gray-100" />
                      <li>
                        <button
                          onClick={() => { signOut(); setOpen(false); }}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          Sign out
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sign-in modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.293 3.293a1 1 0 011.414 0L9 7.586l4.293-4.293a1 1 0 111.414 1.414L10.414 9l4.293 4.293a1 1 0 01-1.414 1.414L9 10.414l-4.293 4.293a1 1 0 01-1.414-1.414L7.586 9 3.293 4.707a1 1 0 010-1.414z" />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign in to continue</h2>
              <p className="text-sm text-gray-500 mb-8">This section is private.</p>
              <button
                onClick={() => signIn("google", { callbackUrl: pendingHref })}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                  <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
