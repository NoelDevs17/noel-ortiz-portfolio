import { useState } from "react";

export function useCopyClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), resetAfter);
  };

  return { copied, copy };
}
