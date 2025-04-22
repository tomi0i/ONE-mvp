import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import hljs from "highlight.js";
import { toast } from "sonner";
import { CircleArrowUp, Terminal, Zap, Layers3 } from "lucide-react";

/* ------------------ reusable UI ------------------ */
const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-3xl bg-white/70 backdrop-blur-sm ring-1 ring-slate-200 shadow-xl p-8">
    {children}
  </div>
);

const IconBtn = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: React.ReactNode }
) => (
  <button
    {...props}
    className={[
      "inline-flex h-14 w-14 items-center justify-center rounded-full",
      "border-0 outline-none transition-transform active:scale-95 hover:scale-105",
    
      props.className,
    ].join(" ")}
  >
    {props.icon}
  </button>
);
/* -------------------------------------------------- */

export default function Home() {
  const [idea, setIdea] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => hljs.highlightAll(), [code]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!idea.trim()) return;
    setLoading(true);
    setError(null);
    setCode("");
    try {
      const r = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      if (!r.ok) throw new Error(`Server ${r.status}`);
      const { message } = await r.json();
      setCode(message.replace(/^```[\s\S]*?\n/, "").replace(/```$/, ""));
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center gap-14 px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* 左上ロゴ → 黒 */}
      <header className="w-full max-w-7xl">
        <h1 className="text-xl font-extrabold text-slate-800">AI MVP Builder β</h1>
      </header>

      {/* Feature カード（ブランドカラー） */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
        {[
          {
            title: "瞬時にコード生成",
            icon: <Zap className="h-8 w-8 text-indigo-600" />,
            desc: "アイデアを投げるだけで実行可能なスターターコードを生成。",
          },
          {
            title: "FastAPI × Next.js",
            icon: <Layers3 className="h-8 w-8 text-indigo-600" />,
            desc: "バックエンドは FastAPI、フロントは Next 15 & Tailwind。",
          },
          {
            title: "開発者フレンドリー",
            icon: <Terminal className="h-8 w-8 text-indigo-600" />,
            desc: "生成されたプロジェクトはそのまま Git でプッシュ可能。",
          },
        ].map((c) => (
          <GlassCard key={c.title}>
            <div className="flex items-center gap-4">
              {c.icon}
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </section>

      {/* 入力フォーム（ボタン黒） */}
      <GlassCard>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end w-full max-w-3xl">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-lg font-semibold text-slate-700">
              あなたのアイデアを入力
            </label>
            <input
              className="w-full rounded-xl border-none bg-slate-100 px-4 py-3 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-brand"
              placeholder="生成してみましょう！"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
          </div>

          <IconBtn
            type="submit"
            disabled={loading}
            icon={
              loading ? (
                <svg
                  className="animate-spin h-6 w-6 text-slate-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="4" />
                </svg>
              ) : (
                <CircleArrowUp className="h-7 w-7 text-slate-700" strokeWidth={2.4} />
              )
            }
          />
        </form>
      </GlassCard>

      {/* 出力 */}
      {error && <p className="text-red-600 font-semibold">🚨 {error}</p>}
      {code && (
        <motion.div
          className="w-full max-w-5xl"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <GlassCard>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">生成コード</h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  toast.success("コピーしました！");
                }}
                className="text-sm font-medium text-brand hover:underline"
              >
                コピー
              </button>
            </div>
            <pre className="hljs rounded-xl bg-slate-900/90 p-6 overflow-x-auto text-sm leading-relaxed">
              <code className="language-python">{code}</code>
            </pre>
          </GlassCard>
        </motion.div>
      )}
    </motion.main>
  );
}