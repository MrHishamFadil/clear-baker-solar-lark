import type { Observation } from "./types";

export type RewardKind = "star" | "mastery";

export type StudentMedal = {
  id: string;
  minStars: number;
  minMastered: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
};

export const STUDENT_MEDALS: StudentMedal[] = [
  {
    id: "first-star",
    minStars: 1,
    minMastered: 0,
    titleAr: "نجمة الالتزام الأولى",
    titleEn: "First Commitment Star",
    descAr: "أُرصد له نجمُ التزامٍ واحد في مهارة حياتية.",
    descEn: "Earned a first observed commitment star on a life skill.",
  },
  {
    id: "first-mastery",
    minStars: 0,
    minMastered: 1,
    titleAr: "وسام الإتقان",
    titleEn: "Mastery Medal",
    descAr: "أتقن مهارة حياتية واحدة باعتماد المعلم.",
    descEn: "Mastered one life skill with teacher certification.",
  },
  {
    id: "five-stars",
    minStars: 5,
    minMastered: 0,
    titleAr: "فارس الالتزام",
    titleEn: "Knight of Commitment",
    descAr: "جمع خمس نجوم التزام في سجل الصف.",
    descEn: "Collected five commitment stars on the class roll.",
  },
  {
    id: "three-skills",
    minStars: 0,
    minMastered: 3,
    titleAr: "قائد المهارات",
    titleEn: "Skills Leader",
    descAr: "أتقن ثلاث مهارات حياتية مستقلة.",
    descEn: "Mastered three independent life skills.",
  },
  {
    id: "ten-stars",
    minStars: 10,
    minMastered: 0,
    titleAr: "نجمة الإحسان",
    titleEn: "Star of Ihsan",
    descAr: "بلغ عشر نجوم التزام، قدوة حسنة لزملائه.",
    descEn: "Reached ten commitment stars as a peer model.",
  },
  {
    id: "seven-skills",
    minStars: 0,
    minMastered: 7,
    titleAr: "منارة الصف",
    titleEn: "Class Beacon",
    descAr: "أتقن سبع مهارات، وصار منارة إحسان للفصل.",
    descEn: "Mastered seven skills and became a class beacon of Ihsan.",
  },
];

export function isSkillMastered(obs: Pick<Observation, "stars" | "mastered" | "tier">) {
  return Boolean(obs.mastered || obs.stars >= 5 || obs.tier === "tier3");
}

export function masteryTier(masteredCount: number, stars: number) {
  if (masteredCount >= 4) return { ar: "إتقان مستقل", en: "Independent", tone: "ok" as const };
  if (stars > 0) return { ar: "قيد التدريب", en: "Practising", tone: "mid" as const };
  return { ar: "جديد", en: "New", tone: "muted" as const };
}

export function medalsFor(stars: number, mastered: number) {
  return STUDENT_MEDALS.filter((m) => stars >= m.minStars && mastered >= m.minMastered);
}

export function newestMedal(prevStars: number, prevMastered: number, stars: number, mastered: number) {
  const before = new Set(medalsFor(prevStars, prevMastered).map((m) => m.id));
  return medalsFor(stars, mastered).find((m) => !before.has(m.id)) ?? medalsFor(stars, mastered).at(-1) ?? STUDENT_MEDALS[0];
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function printMarkup(inner: string, title: string) {
  const dir = document.documentElement.dir || "rtl";
  const lang = document.documentElement.lang || "ar";
  return `<!doctype html>
<html dir="${dir}" lang="${lang}">
<head>
<meta charset="utf-8"/>
<title>${title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap"/>
<style>
  @page { size: A4; margin: 12mm; }
  html, body { margin: 0; background: #fff; color: #1A1814; font-family: "IBM Plex Sans Arabic", "Amiri", serif; }
  body { padding: 16px; }
  img { max-height: 88px; object-fit: contain; }
  .print-sheet, .honor-sheet { border: 2px solid #0F3D32 !important; background: #FBF8F1 !important; }
  .no-print { display: none !important; }
  @media print { body { padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>${inner}
<script>
  window.addEventListener("load", function () {
    setTimeout(function () { window.focus(); window.print(); }, 400);
  });
</script>
</body>
</html>`;
}

async function htmlForSheet(node: HTMLElement, title: string) {
  const clone = node.cloneNode(true) as HTMLElement;
  clone.querySelectorAll(".no-print").forEach((el) => el.remove());
  try {
    const res = await fetch("/jps-crest.png");
    const data = await blobToDataUrl(await res.blob());
    clone.querySelectorAll("img").forEach((img) => img.setAttribute("src", data));
  } catch {
    clone.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src");
      if (src) img.setAttribute("src", new URL(src, window.location.origin).href);
    });
  }
  return printMarkup(clone.outerHTML, title);
}

function triggerDownload(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  try {
    window.open(url, "_blank", "noopener,noreferrer");
  } catch {
    /* preview iframe may block popups */
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

function runPrint(flag: "printing-certificate" | "printing-honor") {
  document.documentElement.classList.add(flag);
  const restore = () => document.documentElement.classList.remove(flag);
  window.addEventListener("afterprint", restore, { once: true });
  window.setTimeout(() => {
    try {
      window.print();
    } catch {
      restore();
    }
    window.setTimeout(restore, 2500);
  }, 80);
}

export async function saveCertificateFile(sheet?: HTMLElement | null) {
  if (typeof document === "undefined") return;
  const node =
    sheet ??
    document.querySelector<HTMLElement>(".print-overlay .print-sheet") ??
    document.querySelector<HTMLElement>(".print-sheet");
  if (!node) return;
  triggerDownload(await htmlForSheet(node, "JPIS Certificate"), "JPIS-certificate.html");
}

export async function printCertificate(sheet?: HTMLElement | null) {
  if (typeof document === "undefined") return;
  const node =
    sheet ??
    document.querySelector<HTMLElement>(".print-overlay .print-sheet") ??
    document.querySelector<HTMLElement>(".print-sheet");
  runPrint("printing-certificate");
  if (node) await saveCertificateFile(node);
}

export async function printHonorReport(sheet?: HTMLElement | null) {
  if (typeof document === "undefined") return;
  const node = sheet ?? document.querySelector<HTMLElement>(".honor-sheet");
  runPrint("printing-honor");
  if (!node) return;
  triggerDownload(await htmlForSheet(node, "JPIS Honor Roll"), "JPIS-honor-roll.html");
}
