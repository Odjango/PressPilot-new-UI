import { Play } from "lucide-react";

export function ProductDemoSection() {
  return (
    <section className="marketing-section product-demo" id="product-demo">
      <div className="marketing-section__intro">
        <div><span className="section-index">Product demo</span><h2>Watch PressPilot build a website</h2></div>
        <p>See the path from a short business brief to a complete WordPress website.</p>
      </div>
      <div className="demo-placeholder">
        <div className="demo-placeholder__bar"><span /><span /><span /><strong>PressPilot Studio · Website preview</strong></div>
        <div className="demo-placeholder__body"><span>Business details</span><i /><strong>Website ready to review</strong></div>
        <button type="button" aria-label="Play product demo"><Play size={21} fill="currentColor" /></button>
      </div>
    </section>
  );
}
