import { type ReactNode } from "react";
import { Mail, Check, Copy, Send } from "lucide-react";
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
      className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 print:hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Sticky sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-4">
          <div
            className={`flex items-center space-x-2 ${
              isDark ? "text-blue-400" : "text-blue-600 font-semibold"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider">
              05. {t.nav.contact}
            </span>
          </div>
          <h2
            className={`text-3xl font-bold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {t.contact.title}
          </h2>
          <p
            className={`text-xs font-sans leading-relaxed ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact cards */}
        <div className="lg:col-span-8">
          <div
            className={`p-6 md:p-8 rounded-3xl border transition-all relative overflow-hidden ${
              isDark
                ? "bg-slate-950/40 border-slate-900"
                : "bg-slate-50/50 border-slate-200/80 shadow-xs"
            }`}
          >
            {/* Grid pattern overlay */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                isDark ? "opacity-[0.05]" : "opacity-[0.02]"
              }`}
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 max-w-md mx-auto">
              {/* Email card */}
              <ContactCard
                isDark={isDark}
                icon={<Mail className="w-5 h-5" />}
                label={t.contact.emailLabel}
                valuePrimary={emailUser}
                valueSecondary={`@${emailDomain}`}
                copied={copiedEmail}
                onCopy={onCopyEmail}
                copyLabel={t.contact.copyBtn}
                copiedLabel={t.contact.copiedBtn}
                actionLabel={t.contact.sendBtn}
                actionHref={`mailto:${personalInfo.email}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactCardProps {
  isDark: boolean;
  icon: ReactNode;
  label: string;
  valuePrimary: string;
  valueSecondary: string;
  copied: boolean;
  onCopy: () => void;
  copyLabel: string;
  copiedLabel: string;
  actionLabel: string;
  actionHref: string;
}

function ContactCard({
  isDark,
  icon,
  label,
  valuePrimary,
  valueSecondary,
  copied,
  onCopy,
  copyLabel,
  copiedLabel,
  actionLabel,
  actionHref,
}: ContactCardProps) {
  const cardCls = `p-6 md:p-8 rounded-2xl border flex flex-col justify-between transition-all group ${
    isDark
      ? "bg-surface-card/90 border-slate-800/60 hover:border-slate-700/80 hover:shadow-lg hover:shadow-black/20"
      : "bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md"
  }`;

  const iconWrapCls = `p-3 rounded-xl border flex items-center justify-center shrink-0 ${
    isDark
      ? "bg-slate-900 border-slate-800/80 text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors"
      : "bg-slate-50 border-slate-200 text-slate-700 group-hover:text-blue-600 group-hover:border-blue-300 transition-colors"
  }`;

  const copyBtnCls = `flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
    isDark
      ? "bg-surface-raised hover:bg-surface-raised-hover border-slate-800 text-slate-300 active:bg-slate-950"
      : "bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700 active:bg-slate-200"
  }`;

  const actionCls = `flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
    isDark
      ? "bg-blue-600 hover:bg-blue-500 text-white active:bg-blue-700"
      : "bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800"
  }`;

  return (
    <div className={cardCls}>
      <div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className={iconWrapCls}>{icon}</div>
          <span className="font-mono text-[10px] tracking-widest text-slate-500 font-bold uppercase">
            {label}
          </span>
        </div>

        <div className="space-y-1 mb-8">
          <h3
            className={`text-2xl font-extrabold tracking-tight leading-none ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {valuePrimary}
          </h3>
          <p className="text-xs font-mono font-medium text-slate-500">{valueSecondary}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onCopy} className={copyBtnCls}>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? copiedLabel : copyLabel}</span>
        </button>

        <a href={actionHref} className={actionCls}>
          <Send className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </a>
      </div>
    </div>
  );
}
