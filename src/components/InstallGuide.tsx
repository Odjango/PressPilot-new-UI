import { ChevronDown, Info } from "lucide-react";

export function InstallGuide() {
  return (
    <details className="install-guide">
      <summary><span><Info size={16} /> How to install your website</span><span className="install-guide__hint">3 simple steps <ChevronDown size={15} /></span></summary>
      <ol>
        <li><span>1</span><p><strong>Download the ZIP</strong><small>Save the PressPilot website package to your computer.</small></p></li>
        <li><span>2</span><p><strong>Open WordPress</strong><small>Go to Appearance → Themes → Add New → Upload Theme.</small></p></li>
        <li><span>3</span><p><strong>Upload and activate</strong><small>Select the ZIP, install it, and activate your new website.</small></p></li>
      </ol>
    </details>
  );
}
