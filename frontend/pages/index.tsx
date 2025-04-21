import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import hljs from "highlight.js";
import { toast } from "sonner";

const Btn = (p: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
    {...p}
  />
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-lg rounded-2xl p-6 w-full">{children}</div>
);

export default function Home() {
  const [idea, setIdea] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    hljs.highlightAll();
  }, [code]);

  const handleSubmit = async (e: FormEvent) => {
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
      const d = await r.json();
      setCode(
        d.message
          .replace(/^```[\\s\\S]*?\\n/, "") // ` ```python\\n` を削除
          .replace(/```$/, "")             // 末尾 ```
      );
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      className="min-h-screen bg-slate-100 flex flex-col items-center p-6 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-extrabold text-blue-700">AI MVP Builder β</h1>

      <Card>
        <h2 className="text-xl font-semibold mb-4">あなたのアイデアを入力</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="例) CSV をアップロードして平均値を返す Flask API"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <Btn type="submit" disabled={loading}>
            {loading ? "生成中…" : "生成"}
          </Btn>
        </form>
      </Card>

      {error && <div className="text-red-600 font-semibold">🚨 {error}</div>}

      {code && (
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">生成コード</h2>
              <Btn
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  toast.success("コピーしました！");
                }}
              >
                コピー
              </Btn>
            </div>
            <pre className="hljs rounded-lg overflow-x-auto text-sm">
              <code className="language-python">{code}</code>
            </pre>
          </Card>
        </motion.div>
      )}
    </motion.main>
  );
}