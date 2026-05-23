import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Compass,
  Database,
  GraduationCap,
  Layers,
  Lightbulb,
  Network,
  Play,
  Quote,
  Rocket,
  Search,
  TerminalSquare,
  Timer,
  Trophy,
  Users,
} from 'lucide-react';
import { getAllWords, bookStructure } from '../../data/wordsIndex';

const chapterIcons = [BrainCircuit, Database, Network, Code2, Layers, BarChart3];

const learningSteps = [
  {
    icon: Quote,
    title: 'গল্প দিয়ে শুরু',
    desc: 'প্রতিটি কঠিন শব্দ আগে পরিচিত বাস্তব দৃশ্য দিয়ে ধরা হয়।',
  },
  {
    icon: Lightbulb,
    title: 'ধারণা পরিষ্কার',
    desc: 'তারপর সহজ বাংলায় মূল ধারণা, সূত্র আর ব্যবহার বুঝানো হয়।',
  },
  {
    icon: TerminalSquare,
    title: 'লাইভ ল্যাব',
    desc: 'শেষে নিজে ক্লিক করে সিমুলেশনে ফলাফল দেখে নেওয়ার সুযোগ।',
  },
  {
    icon: Trophy,
    title: 'আত্মবিশ্বাস',
    desc: 'শব্দ শেখা শেষ হলে পুরো AI আলোচনাই কম ভয়ংকর লাগে।',
  },
];

const featureList = [
  'প্রতিটি কনসেপ্ট গল্প, ছবি ও বাস্তব উদাহরণ দিয়ে সাজানো',
  'বাংলায় লেখা, কিন্তু টেকনিক্যাল গভীরতা রাখা হয়েছে',
  'প্রতিটি অধ্যায়ের সাথে শব্দভিত্তিক ল্যাব ও অনুশীলন',
  'শুরুয়াতি শিক্ষার্থী থেকে কৌতূহলী প্রফেশনাল সবার জন্য',
];

const audienceList = [
  { icon: GraduationCap, text: 'স্কুল-কলেজের AI কৌতূহলী শিক্ষার্থী' },
  { icon: Code2, text: 'ডেটা সায়েন্স শুরু করতে চাওয়া নতুনরা' },
  { icon: Users, text: 'শিক্ষক, গবেষক ও বাংলা কনটেন্ট নির্মাতা' },
  { icon: BrainCircuit, text: 'যারা কঠিন textbook পড়ে আটকে গেছেন' },
];

function StatTile({ icon: Icon, label, value, note }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-100/[0.08] bg-[#071521] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{label}</p>
          <h3 className="mt-2 text-4xl font-black leading-none text-white">{value}</h3>
          <p className="mt-2 text-xs font-semibold text-slate-400">{note}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-400/10 text-teal-300">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, desc, icon: Icon }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
          <Icon size={14} />
          {eyebrow}
        </div>
        <h2 className="text-2xl font-black leading-tight text-white md:text-4xl">{title}</h2>
        {desc && <p className="mt-3 text-sm leading-7 text-slate-400 md:text-base">{desc}</p>}
      </div>
    </div>
  );
}

function ChapterCard({ chapter, index }) {
  const totalParts = chapter.parts.length;
  const totalWords = chapter.parts.reduce((count, part) => count + part.words.length, 0);
  const firstWordPath = chapter.parts[0]?.words[0]?.path;
  const Icon = chapterIcons[index % chapterIcons.length];
  const featuredWords = chapter.parts.flatMap((part) => part.words).slice(0, 3);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-cyan-100/[0.08] bg-[#071521] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/30 hover:shadow-[0_26px_80px_rgba(20,184,166,0.12)]">
      <div className="absolute -right-14 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -bottom-14 left-8 h-28 w-28 rounded-full bg-emerald-400/8 blur-3xl" />

      <div className="relative flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-400/10 text-teal-300">
              <Icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/75">অধ্যায় {chapter.chapterNo}</p>
              <h3 className="mt-2 text-xl font-black leading-snug text-white">{chapter.chapterTitle}</h3>
            </div>
          </div>
          <span className="rounded-full border border-cyan-100/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-bold text-slate-400">
            {totalWords} শব্দ
          </span>
        </div>

        <p className="mb-5 text-sm leading-7 text-slate-400">
          এই অধ্যায়ে {totalParts}টি পর্বে {totalWords}টি গুরুত্বপূর্ণ ML শব্দ সহজ ভাষা, গল্প আর ল্যাবের মাধ্যমে শেখানো হয়েছে।
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {featuredWords.map((word) => (
            <span key={word.id} className="rounded-full border border-cyan-100/[0.08] bg-[#06111d] px-3 py-1.5 text-xs font-semibold text-slate-300">
              {word.title}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-cyan-100/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Timer size={14} className="text-teal-300" />
            গল্প + ল্যাব + অনুশীলন
          </div>
          <Link to={firstWordPath ? `/word/${firstWordPath}` : '/start'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-300 px-5 py-2.5 text-sm font-black text-[#06111d] transition-all duration-300 hover:bg-teal-200">
            শুরু করি
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const allWords = getAllWords();
  const totalParts = bookStructure.reduce((count, chapter) => count + chapter.parts.length, 0);
  const firstWordPath = bookStructure[0]?.parts[0]?.words[0]?.path;

  return (
    <div className="h-screen flex-1 overflow-y-auto bg-[#050b12] p-4 font-sans text-slate-200 selection:bg-teal-400/30 custom-scrollbar sm:p-6 md:p-8 lg:p-10">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[12%] top-[-16%] h-[520px] w-[520px] rounded-full bg-teal-500/[0.08] blur-[120px]" />
        <div className="absolute right-[-12%] top-[24%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-[2%] left-[28%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-10">
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-cyan-100/[0.08] bg-[#061421] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
            <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_18%_32%,rgba(20,184,166,0.34),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(135deg,rgba(6,20,33,0.35),rgba(5,15,27,0.96)_64%)]" />
            <div className="absolute inset-0 opacity-25 bg-[linear-gradient(115deg,transparent_0_16%,rgba(45,212,191,0.22)_16.2%,transparent_16.5%_34%,rgba(34,211,238,0.16)_34.2%,transparent_34.5%_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#061421] to-transparent" />
            <div className="absolute -right-20 top-16 hidden h-80 w-80 rounded-full border border-teal-300/10 bg-teal-300/[0.03] blur-sm lg:block" />
            <div className="absolute bottom-10 right-12 hidden h-28 w-64 -skew-x-12 rounded-xl border border-cyan-100/10 bg-gradient-to-br from-cyan-50/10 via-slate-900/60 to-black shadow-[0_28px_80px_rgba(0,0,0,0.35)] lg:block" />

            <div className="relative flex h-full items-center">
              <div className="max-w-4xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
                  </span>
                  ইন্টারেক্টিভ AI লার্নিং বুক
                </div>

                <h1 className="max-w-3xl text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-7xl">
                  শব্দে শব্দে
                  <span className="block text-teal-300">মেশিন লার্নিং</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-300 md:text-lg">
                  কঠিন অ্যালগরিদম, ডেটা আর মডেলের ভাষাকে গল্পের মতো সহজ করে শেখার জায়গা। পড়ুন, বুঝুন, তারপর একই জায়গায় ল্যাবে পরীক্ষা করুন।
                </p>

                <div className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { icon: BrainCircuit, label: 'সহজ ব্যাখ্যা' },
                    { icon: TerminalSquare, label: 'লাইভ ল্যাব' },
                    { icon: Database, label: 'শব্দভাণ্ডার' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-cyan-100/[0.08] bg-white/[0.035] px-4 py-3 text-sm font-bold text-slate-200">
                        <Icon size={18} className="text-teal-300" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to={firstWordPath ? `/word/${firstWordPath}` : '/start'} className="inline-flex items-center justify-center gap-3 rounded-xl bg-teal-300 px-7 py-4 text-base font-black text-[#06111d] transition-all duration-300 hover:bg-teal-200 hover:shadow-[0_0_32px_rgba(45,212,191,0.28)]">
                    <Play size={19} className="fill-[#06111d]" />
                    শেখা শুরু করুন
                    <ArrowRight size={19} />
                  </Link>
                  <Link to="/books" className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 px-7 py-4 text-base font-bold text-white transition-all duration-300 hover:border-teal-300/40 hover:bg-white/[0.05]">
                    <BookOpen size={19} />
                    বই সম্পর্কে দেখুন
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <aside className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <StatTile icon={Layers} label="অধ্যায়" value={bookStructure.length} note="গাইডেড লেসন" />
            <StatTile icon={BookOpen} label="পর্ব" value={totalParts} note="ধাপে ধাপে শেখা" />
            <StatTile icon={Database} label="শব্দ" value={allWords.length} note="AI/ML কনসেপ্ট" />
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-cyan-100/[0.08] bg-[#06111d] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:p-8">
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">আপনার পথ</p>
                <h2 className="mt-2 text-2xl font-black text-white">শেখার রোডম্যাপ</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-400/10 text-teal-300">
                <Compass size={23} />
              </div>
            </div>

            <div className="space-y-5">
              {learningSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative flex gap-4">
                    {index < learningSteps.length - 1 && <div className="absolute left-5 top-11 h-[calc(100%-14px)] w-px bg-cyan-100/[0.08]" />}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-300/20 bg-[#071521] text-teal-300">
                      <Icon size={18} />
                    </div>
                    <div className="pb-2">
                      <h3 className="font-black text-white">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-100/[0.08] bg-[#06111d] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h2 className="flex items-center gap-3 text-2xl font-black text-white">
                  <Rocket size={24} className="text-teal-300" />
                  কেন আলাদা?
                </h2>
                <ul className="mt-6 space-y-4">
                  {featureList.map((text) => (
                    <li key={text} className="flex items-start gap-3 text-sm font-semibold leading-7 text-slate-300">
                      <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-300" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-cyan-100/[0.06] pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <h2 className="flex items-center gap-3 text-2xl font-black text-white">
                  <Users size={24} className="text-cyan-300" />
                  কার জন্য?
                </h2>
                <ul className="mt-6 space-y-4">
                  {audienceList.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.text} className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-100/[0.08] bg-[#071521] text-cyan-300">
                          <Icon size={17} />
                        </span>
                        {item.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="সূচিপত্র"
            title="যেখান থেকে ইচ্ছা শুরু করুন"
            desc="অধ্যায়গুলো এমনভাবে সাজানো, যেন আপনি প্রথম দিন থেকেই AI/ML শব্দগুলোকে ভয় না পেয়ে ব্যবহার করতে শুরু করতে পারেন।"
            icon={Search}
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {bookStructure.map((chapter, index) => (
              <ChapterCard key={chapter.chapterId} chapter={chapter} index={index} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 pb-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-3xl border border-teal-300/20 bg-gradient-to-br from-teal-400/16 via-cyan-400/10 to-emerald-400/10 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:p-10">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-teal-300/10 blur-[80px]" />
            <div className="relative">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-300 text-[#06111d]">
                <Network size={24} />
              </div>
              <h2 className="max-w-2xl text-3xl font-black leading-tight text-white md:text-4xl">
                বই নয়, এটা আপনার ছোট্ট AI learning cockpit
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                প্রতিটি শব্দকে আপনি শুধু পড়বেন না, হাতে ধরে দেখবেন। একেকটা chapter শেষ হলে পুরো machine learning vocabulary অনেক বেশি পরিচিত লাগবে।
              </p>
              <Link to={firstWordPath ? `/word/${firstWordPath}` : '/start'} className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-teal-300 px-7 py-4 text-base font-black text-[#06111d] transition-all duration-300 hover:bg-teal-200">
                প্রথম lesson খুলুন
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-100/[0.08] bg-[#06111d] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
              <Quote size={23} />
            </div>
            <p className="text-lg font-semibold leading-8 text-slate-200">
              “মেশিন লার্নিং কোনো ম্যাজিক নয়। ঠিকভাবে গল্পে ভাঙলে, এটা যুক্তি আর প্যাটার্ন দেখার এক সুন্দর অভ্যাস।”
            </p>
            <p className="mt-5 text-sm font-bold text-teal-300">চলুন, সহজভাবে AI শেখা শুরু করি।</p>
          </div>
        </section>
      </div>
    </div>
  );
}
