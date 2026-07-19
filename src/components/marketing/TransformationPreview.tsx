export function TransformationPreview() {
  return (
    <div className="transformation-preview" role="group" aria-label="Business brief becomes a complete website">
      <div className="transformation-preview__topbar"><span><i /> Live website build</span><strong>PressPilot Studio</strong></div>
      <div className="transformation-canvas">
        <section className="brief-card">
          <div className="brief-card__heading"><span>01</span><div><small>Business brief</small><strong>Ritual Clay Studio</strong></div></div>
          <dl><div><dt>Business</dt><dd>Handmade ceramics</dd></div><div><dt>Logo</dt><dd><i className="brief-logo">R</i> Attached</dd></div><div><dt>Language</dt><dd>English</dd></div></dl>
          <p><span /><span /><span /></p>
        </section>
        <div className="transformation-rail" aria-hidden="true"><span className="is-complete">Brief</span><i /><span className="is-current">Build</span><i /><span>Website</span></div>
        <section className="result-site">
          <div className="result-site__browser"><span /><span /><span /><strong>ritualclay.example</strong></div>
          <div className="result-site__nav"><b>RITUAL / CLAY</b><span>SHOP&nbsp;&nbsp; STORY&nbsp;&nbsp; JOURNAL</span><i>Bag 0</i></div>
          <div className="result-site__hero"><div><small>OBJECTS FOR DAILY RITUAL</small><strong>Made slowly.<br />Kept for years.</strong><p>Wheel-thrown ceramics shaped for quiet mornings and shared tables.</p><span>EXPLORE THE COLLECTION</span></div><div className="clay-visual"><i /><b /><span /></div></div>
        </section>
        <div className="transformation-proof"><span>Pages <b>6</b></span><span>Images <b>12</b></span><span>Language <b>English</b></span><strong><i /> Website ready</strong></div>
      </div>
    </div>
  );
}
