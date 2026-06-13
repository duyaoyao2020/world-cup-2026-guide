import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MessageSquareText, Send, ShieldCheck } from "lucide-react";
import { AppHeader } from "../components/AppHeader";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((value, key) => body.append(key, String(value)));

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <main className="contact-page">
      <div className="contact-backdrop" />
      <AppHeader />

      <section className="contact-shell">
        <aside className="contact-intro">
          <span className="section-kicker"><Mail size={14} /> STAY CONNECTED</span>
          <h1>让观赛指南<br /><em>听见你的声音</em></h1>
          <p>发现赛程信息需要修正，或希望加入新的球队与比赛功能？留下邮箱和留言，我们会通过邮件与你联系。</p>

          <div className="contact-points">
            <div>
              <MessageSquareText size={18} />
              <span><b>每条反馈都会被阅读</b><small>赛程纠错、功能建议与合作交流</small></span>
            </div>
            <div>
              <ShieldCheck size={18} />
              <span><b>邮箱仅用于回复</b><small>不会在页面公开，也不会用于营销</small></span>
            </div>
          </div>
        </aside>

        <div className="contact-panel">
          <div className="contact-panel-head">
            <span>CONTACT FORM</span>
            <strong>发送邮件留言</strong>
            <small>通常会在看到邮件后尽快回复</small>
          </div>

          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="subject" value="世界杯观赛指南收到新留言" />
            <p className="form-honeypot" aria-hidden="true">
              <label>请勿填写此项<input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
            </p>

            <div className="contact-form-row">
              <label>
                <span>你的称呼</span>
                <input name="name" type="text" placeholder="怎么称呼你？" maxLength={60} required />
              </label>
              <label>
                <span>回复邮箱</span>
                <input name="email" type="email" placeholder="name@example.com" maxLength={120} required />
              </label>
            </div>

            <label>
              <span>留言主题</span>
              <select name="topic" defaultValue="功能建议" required>
                <option>功能建议</option>
                <option>赛程或数据纠错</option>
                <option>使用问题</option>
                <option>合作交流</option>
                <option>其他</option>
              </select>
            </label>

            <label>
              <span>留言内容</span>
              <textarea name="message" placeholder="请告诉我们你的想法……" minLength={10} maxLength={2000} required />
            </label>

            <div className="contact-form-actions">
              <small>提交后，你留下的邮箱将随留言发送给站点管理员。</small>
              <button type="submit" disabled={submitState === "submitting"}>
                <span><Send size={16} /> {submitState === "submitting" ? "正在发送…" : "发送留言"}</span>
                <ArrowRight size={17} />
              </button>
            </div>

            {submitState === "success" && (
              <p className="form-status form-status--success" role="status">
                <CheckCircle2 size={16} /> 留言已发送。感谢你的反馈，我们会通过邮件与你联系。
              </p>
            )}
            {submitState === "error" && (
              <p className="form-status form-status--error" role="alert">
                发送失败，请稍后重试。
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
