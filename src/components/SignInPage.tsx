import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { PublicPageShell } from "./PublicPageShell";

export function SignInPage() {
  return <PublicPageShell mainId="signin-content" skipLabel="Skip to sign in" footer={false}>
    <section className="signin-layout">
      <div className="signin-context">
        <p className="page-eyebrow">PressPilot account</p>
        <h1>Welcome back</h1>
        <p>Sign in to continue a website, review a finished direction, or download an install-ready package.</p>
        <ul><li><CheckCircle2 size={16} /> Your projects stay organized</li><li><CheckCircle2 size={16} /> Continue from the last completed step</li><li><CheckCircle2 size={16} /> Re-download completed websites</li></ul>
      </div>
      <div className="signin-card">
        <span className="signin-card__icon"><LockKeyhole size={21} /></span>
        <div><span>Secure account access</span><h2>Sign in to PressPilot</h2></div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="signin-email">Email address</label>
          <input id="signin-email" type="email" autoComplete="email" placeholder="you@example.com" />
          <div className="signin-card__password-label"><label htmlFor="signin-password">Password</label><a href="#forgot-password">Forgot password?</a></div>
          <input id="signin-password" type="password" autoComplete="current-password" placeholder="Enter your password" />
          <button className="marketing-button" type="submit">Sign in <ArrowRight size={17} /></button>
        </form>
        <p>New to PressPilot? <a href="/studio?step=details">Start a new website</a></p>
      </div>
    </section>
  </PublicPageShell>;
}
