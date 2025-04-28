import { useEffect, useState } from "react";

export function useScript(src: string): "idle" | "loading" | "ready" | "error" {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    if (!src) return;

    setStatus("loading");

    let script = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const handleLoad = () => setStatus("ready");
    const handleError = () => setStatus("error");

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    return () => {
      script?.removeEventListener("load", handleLoad);
      script?.removeEventListener("error", handleError);
    };
  }, [src]);

  return status;
}