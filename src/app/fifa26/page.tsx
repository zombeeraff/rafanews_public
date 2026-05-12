import fs from "fs";
import path from "path";

export default function FIFA26() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "src/content/fifa26-tracker.html"),
    "utf8"
  );

  return (
    <div style={{ height: "calc(100dvh - 64px)" }}>
      <iframe
        srcDoc={html}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Panini FIFA World Cup 2026 Tracker"
      />
    </div>
  );
}
