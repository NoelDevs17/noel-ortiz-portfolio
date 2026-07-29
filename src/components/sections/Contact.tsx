import type { ReactNode } from "react";
import { Check, Copy, Github, Linkedin, Send } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { uiTranslations } from "../../constants/translations";
import { personalInfo } from "../../data";
import type { Language } from "../../types";

interface ContactProps {
  lang: Language;
  isDark: boolean;
  copiedEmail: boolean;
  onCopyEmail: () => void;
}

export function Contact({
  lang,
  isDark,
  copiedEmail,
  onCopyEmail,
}: ContactProps) {
  const t = uiTranslations[lang];
  const [emailUser, emailDomain] = personalInfo.email.split("@");

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-4 py-24 print:hidden sm:px-6 md:py-32"
    >
      <Reveal>
        <div
          className={`relative overflow-hidden rounded-[2rem] border p-7 sm:p-10 md:p-14 ${
            isDark
              ? "border-slate-800 bg-slate-900/45"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${
              isDark ? "bg-blue-600/12" : "bg-blue-500/10"
            }`}
            aria-hidden="true"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2
                className={`text-4xl font-bold tracking-[-0.05em] sm:text-5xl md:text-6xl ${
                  isDark ? "text-slate-100" : "text-slate-950"
                }`}
              >
                {t.contact.title}
              </h2>
              <p
                className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {t.contact.subtitle}
              </p>

              <p
                className={`mt-10 break-words text-[clamp(1.6rem,5vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.055em] ${
                  isDark ? "text-slate-100" : "text-slate-950"
                }`}
              >
                {emailUser}
                <wbr />
                <span className={isDark ? "text-blue-400" : "text-blue-700"}>
                  @{emailDomain}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-blue-600 px-5 font-mono text-sm font-bold text-white transition-colors hover:bg-blue-500 active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                {t.contact.sendBtn}
              </a>
              <button
                type="button"
                onClick={onCopyEmail}
                className={`inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-5 font-mono text-sm font-semibold transition-colors active:scale-[0.98] ${
                  isDark
                    ? "border-slate-700 bg-slate-950/50 text-slate-200 hover:border-blue-500/60"
                    : "border-slate-300 bg-slate-50 text-slate-800 hover:border-blue-500/50"
                }`}
              >
                {copiedEmail ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copiedEmail ? t.contact.copiedBtn : t.contact.copyBtn}
              </button>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <SocialLink
                  href={personalInfo.github}
                  label="GitHub"
                  icon={<Github className="h-4 w-4" />}
                  isDark={isDark}
                />
                <SocialLink
                  href={personalInfo.linkedin}
                  label="LinkedIn"
                  icon={<Linkedin className="h-4 w-4" />}
                  isDark={isDark}
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SocialLink({
  href,
  label,
  icon,
  isDark,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  isDark: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 font-mono text-xs transition-colors ${
        isDark
          ? "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-950"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
