import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as ArrowRight, S as BookOpen, _ as Flag, b as ChevronDown, c as Star, d as Search, f as Menu, g as LayoutGrid, h as LoaderCircle, i as Users, l as Square, m as Medal, n as VolumeX, o as Timer, p as Megaphone, r as Volume2, s as Swords, t as X, u as Sparkles, v as Compass, w as ArrowLeft, x as Check, y as ChevronUp } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle$1, r as DialogContent$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DRDdQtzB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function todayISO() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function uid() {
	return crypto.randomUUID();
}
function shuffle(list) {
	const next = [...list];
	for (let i = next.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[next[i], next[j]] = [next[j], next[i]];
	}
	return next;
}
function Crest({ className = "size-11" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/jps-crest.png",
		alt: "",
		width: 64,
		height: 64,
		className: cn("object-contain", className),
		"aria-hidden": "true"
	});
}
function ConfettiLayer() {
	const ref = (0, import_react.useRef)(null);
	const [live, setLive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onBurst = () => setLive(true);
		window.addEventListener("fursan:confetti", onBurst);
		return () => window.removeEventListener("fursan:confetti", onBurst);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!live) return;
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const surface = canvas;
		const draw = ctx;
		let raf = 0;
		let particles = [];
		const colors = [
			"#0F3D32",
			"#14644A",
			"#3D7A66",
			"#F4EFE4",
			"#1A1814",
			"#C9B89A"
		];
		function resize() {
			surface.width = window.innerWidth;
			surface.height = window.innerHeight;
		}
		resize();
		window.addEventListener("resize", resize);
		function spawn() {
			const cx = surface.width / 2;
			const cy = surface.height * .28;
			for (let i = 0; i < 70; i++) {
				const a = Math.random() * Math.PI * 2;
				const s = 4 + Math.random() * 9;
				particles.push({
					x: cx,
					y: cy,
					vx: Math.cos(a) * s,
					vy: Math.sin(a) * s - 4,
					w: 4 + Math.random() * 6,
					h: 6 + Math.random() * 8,
					rot: Math.random() * Math.PI,
					vr: (Math.random() - .5) * .3,
					color: colors[i % colors.length],
					life: 1
				});
			}
		}
		function tick() {
			draw.clearRect(0, 0, surface.width, surface.height);
			particles.forEach((p) => {
				p.vy += .18;
				p.x += p.vx;
				p.y += p.vy;
				p.rot += p.vr;
				p.life -= .012;
				draw.save();
				draw.translate(p.x, p.y);
				draw.rotate(p.rot);
				draw.globalAlpha = Math.max(0, p.life);
				draw.fillStyle = p.color;
				draw.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
				draw.restore();
			});
			particles = particles.filter((p) => p.life > 0 && p.y < surface.height + 20);
			if (particles.length) raf = requestAnimationFrame(tick);
			else {
				raf = 0;
				setLive(false);
			}
		}
		spawn();
		tick();
		const onBurst = () => {
			spawn();
			if (!raf) tick();
		};
		window.addEventListener("fursan:confetti", onBurst);
		return () => {
			window.removeEventListener("fursan:confetti", onBurst);
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(raf);
		};
	}, [live]);
	if (!live) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "pointer-events-none fixed inset-0 z-[80]",
		"aria-hidden": "true"
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-sm hover:bg-crest",
			secondary: "bg-crest/8 text-crest hover:bg-crest/14",
			outline: "bg-card text-fg shadow-[var(--shadow-border)] hover:bg-paper",
			ghost: "text-fg hover:bg-crest/8",
			danger: "bg-danger text-primary-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	className: cn(buttonVariants({
		variant,
		size,
		className
	})),
	...props
}));
Button.displayName = "Button";
var PAIRS = [
	[/\bSalman and Rayan\b/g, "Sarah and Noura"],
	[/\bSalman & Rayan\b/g, "Sarah & Noura"],
	[/\bAbdullah and Tariq\b/g, "Lulwah and Reem"],
	[/\bHamza and Ziyad\b/g, "Leen and Hind"],
	[/\bNawaf and Sultan\b/g, "Shahad and Jana"],
	[/\bSaud and Faisal\b/g, "Reem and Jouri"],
	[/\bSaud & Fahad\b/g, "Reem & Rowan"],
	[/\bSalman\b/g, "Sarah"],
	[/\bRayan\b/g, "Noura"],
	[/\bAbdullah\b/g, "Lulwah"],
	[/\bTariq\b/g, "Reem"],
	[/\bHamza\b/g, "Leen"],
	[/\bZiyad\b/g, "Hind"],
	[/\bNawaf\b/g, "Shahad"],
	[/\bSultan\b/g, "Jana"],
	[/\bSaud\b/g, "Reem"],
	[/\bFaisal\b/g, "Jouri"],
	[/\bOmar\b/g, "Maryam"],
	[/\bKhaled\b/g, "Fatima"],
	[/\bKhalid\b/g, "Fatima"],
	[/\bAhmed\b/g, "Yasmin"],
	[/\bFaris\b/g, "Renad"],
	[/\bBadr\b/g, "Dima"],
	[/\bRakan\b/g, "Tala"],
	[/\bYousef\b/g, "Hanaa"],
	[/\bTamim\b/g, "Joud"],
	[/\bAli\b/g, "Dana"],
	[/\bFahad\b/g, "Rowan"],
	[/\bNasser\b/g, "Yara"],
	[/\bIbrahim\b/g, "Lama"],
	[/\bHussain\b/g, "Ghala"],
	[/\bMajed\b/g, "Amira"],
	[/\bWaleed\b/g, "Ghala"],
	[/سلمان وريان/g, "سارة ونورة"],
	[/عبدالله وطارق/g, "لولوة وريم"],
	[/حمزة وزياد/g, "لين وهند"],
	[/نواف وسلطان/g, "شهد وجنى"],
	[/سعود وفيصل/g, "ريم وجوري"],
	[/سعود وفهد/g, "ريم وروان"],
	[/سلمان/g, "سارة"],
	[/ريان/g, "نورة"],
	[/عبدالله/g, "لولوة"],
	[/طارق/g, "ريم"],
	[/حمزة/g, "لين"],
	[/زياد/g, "هند"],
	[/نواف/g, "شهد"],
	[/سلطان/g, "جنى"],
	[/سعود/g, "ريم"],
	[/فيصل/g, "جوري"],
	[/عمر/g, "مريم"],
	[/خالد/g, "فاطمة"],
	[/أحمد/g, "ياسمين"],
	[/فارس/g, "ريناد"],
	[/بدر/g, "ديما"],
	[/راكان/g, "تالا"],
	[/يوسف/g, "هناء"],
	[/تميم/g, "جود"],
	[/علي/g, "دانة"],
	[/فهد/g, "روان"],
	[/ناصر/g, "يارا"],
	[/إبراهيم/g, "لمى"],
	[/حسين/g, "غلا"],
	[/ماجد/g, "أميرة"],
	[/وليد/g, "غلا"],
	[/\bbrotherhood\b/gi, "sisterhood"],
	[/\bbrothers\b/gi, "sisters"],
	[/\bbrother\b/gi, "sister"],
	[/\bhimself\b/gi, "herself"],
	[/\bhis classmates\b/gi, "her classmates"],
	[/\bhis peers\b/gi, "her peers"],
	[/\bhis friends\b/gi, "her friends"],
	[/\bhis friend\b/gi, "her friend"],
	[/أخوته/g, "أخواتها"],
	[/زملائه/g, "زميلاتها"],
	[/زميله/g, "زميلتها"],
	[/الطالب/g, "الطالبة"],
	[/الطلاب/g, "الطالبات"],
	[/الفارس/g, "الفارسة"],
	[/فرسان/g, "فارسات"],
	[/بطل/g, "بطلة"],
	[/أبطال/g, "بطلات"],
	[/\bchampion\b/gi, "champion"],
	[/\bboy\b/gi, "girl"],
	[/\bBoys\b/g, "Girls"]
];
function adapt(text, section) {
	if (!text || section !== "girls") return text;
	let out = text;
	for (const [re, to] of PAIRS) out = out.replace(re, to);
	return out;
}
var ACTION_POINTS = {
	play: 10,
	practise: 10,
	partner: 10,
	group: 10,
	mission: 15,
	reflect: 10,
	mastery: 20
};
var TABS = [
	"today",
	"skills",
	"values",
	"spiral",
	"ihsan",
	"scenarios",
	"wheel",
	"toolkit",
	"agency",
	"charter"
];
var STUDENT_MEDALS = [
	{
		id: "first-star",
		minStars: 1,
		minMastered: 0,
		titleAr: "نجمة الالتزام الأولى",
		titleEn: "First Commitment Star",
		descAr: "أُرصد له نجمُ التزامٍ واحد في مهارة حياتية.",
		descEn: "Earned a first observed commitment star on a life skill."
	},
	{
		id: "first-mastery",
		minStars: 0,
		minMastered: 1,
		titleAr: "وسام الإتقان",
		titleEn: "Mastery Medal",
		descAr: "أتقن مهارة حياتية واحدة باعتماد المعلم.",
		descEn: "Mastered one life skill with teacher certification."
	},
	{
		id: "five-stars",
		minStars: 5,
		minMastered: 0,
		titleAr: "فارس الالتزام",
		titleEn: "Knight of Commitment",
		descAr: "جمع خمس نجوم التزام في سجل الصف.",
		descEn: "Collected five commitment stars on the class roll."
	},
	{
		id: "three-skills",
		minStars: 0,
		minMastered: 3,
		titleAr: "قائد المهارات",
		titleEn: "Skills Leader",
		descAr: "أتقن ثلاث مهارات حياتية مستقلة.",
		descEn: "Mastered three independent life skills."
	},
	{
		id: "ten-stars",
		minStars: 10,
		minMastered: 0,
		titleAr: "نجمة الإحسان",
		titleEn: "Star of Ihsan",
		descAr: "بلغ عشر نجوم التزام، قدوة حسنة لزملائه.",
		descEn: "Reached ten commitment stars as a peer model."
	},
	{
		id: "seven-skills",
		minStars: 0,
		minMastered: 7,
		titleAr: "منارة الصف",
		titleEn: "Class Beacon",
		descAr: "أتقن سبع مهارات، وصار منارة إحسان للفصل.",
		descEn: "Mastered seven skills and became a class beacon of Ihsan."
	}
];
function isSkillMastered(obs) {
	return Boolean(obs.mastered || obs.stars >= 5 || obs.tier === "tier3");
}
function masteryTier(masteredCount, stars) {
	if (masteredCount >= 4) return {
		ar: "إتقان مستقل",
		en: "Independent",
		tone: "ok"
	};
	if (stars > 0) return {
		ar: "قيد التدريب",
		en: "Practising",
		tone: "mid"
	};
	return {
		ar: "جديد",
		en: "New",
		tone: "muted"
	};
}
function medalsFor(stars, mastered) {
	return STUDENT_MEDALS.filter((m) => stars >= m.minStars && mastered >= m.minMastered);
}
function newestMedal(prevStars, prevMastered, stars, mastered) {
	const before = new Set(medalsFor(prevStars, prevMastered).map((m) => m.id));
	return medalsFor(stars, mastered).find((m) => !before.has(m.id)) ?? medalsFor(stars, mastered).at(-1) ?? STUDENT_MEDALS[0];
}
function printCertificate() {
	if (typeof document === "undefined") return;
	document.documentElement.classList.add("printing-certificate");
	const restore = () => document.documentElement.classList.remove("printing-certificate");
	window.addEventListener("afterprint", restore, { once: true });
	window.print();
	window.setTimeout(restore, 1200);
}
function printHonorReport() {
	if (typeof document === "undefined") return;
	document.documentElement.classList.add("printing-honor");
	const restore = () => document.documentElement.classList.remove("printing-honor");
	window.addEventListener("afterprint", restore, { once: true });
	window.print();
	window.setTimeout(restore, 1200);
}
var boys_ar_default = [
	"سعود",
	"فيصل",
	"ريان",
	"سلمان",
	"عمر",
	"خالد",
	"فهد",
	"عبدالله",
	"طارق",
	"حمزة",
	"زياد",
	"يوسف",
	"نواف",
	"بدر",
	"سلطان",
	"راكان",
	"عبدالعزيز",
	"مشعل",
	"نايف",
	"تميم",
	"إبراهيم",
	"وليد",
	"ماجد",
	"حسام",
	"ياسر",
	"تركي",
	"معاذ",
	"أنس",
	"مصعب",
	"إلياس"
];
var boys_en_default = [
	"Saud",
	"Faris",
	"Ziyad",
	"Omar",
	"Sultan",
	"Hamza",
	"Badr",
	"Rakan",
	"Salman",
	"Yousef",
	"Tamim",
	"Ali",
	"Khaled",
	"Fahad",
	"Nasser",
	"Ibrahim",
	"Tariq",
	"Hussain",
	"Majed",
	"Waleed",
	"Faisal",
	"Rayan",
	"Abdullah",
	"Nawaf",
	"Abdulaziz",
	"Meshal",
	"Nayef",
	"Hussam",
	"Yasser",
	"Turki"
];
var girls_ar_default = [
	"سارة",
	"نورة",
	"لولوة",
	"ريم",
	"لين",
	"مريم",
	"هناء",
	"تالا",
	"جود",
	"دانة",
	"شهد",
	"روان",
	"يارا",
	"لمى",
	"غلا",
	"جنى",
	"ريناد",
	"أميرة",
	"فاطمة",
	"ديما",
	"حلا",
	"سلمى",
	"ميس",
	"رغد",
	"زينة",
	"هيفاء",
	"ليان",
	"أسيل",
	"بيان",
	"كادي"
];
var girls_en_default = [
	"Sarah",
	"Noura",
	"Lulwah",
	"Reem",
	"Leen",
	"Maryam",
	"Hanaa",
	"Tala",
	"Joud",
	"Dana",
	"Shahad",
	"Rowan",
	"Yara",
	"Lama",
	"Ghala",
	"Jana",
	"Renad",
	"Amira",
	"Fatima",
	"Dima",
	"Hala",
	"Salma",
	"Mays",
	"Raghad",
	"Zeina",
	"Haifa",
	"Layan",
	"Aseel",
	"Bayan",
	"Cady"
];
var classes_default = {
	"1": [],
	"2": [],
	"3": [],
	"4": [
		"4A",
		"4B",
		"4C"
	],
	"5": [
		"5A",
		"5B",
		"5C"
	],
	"6": ["6A", "6B"],
	"7": [
		"7A",
		"7B",
		"7C"
	],
	"8": ["8A", "8B"],
	"9": ["9A"],
	"10": ["10A"],
	"11": ["11-AMR", "11-IB"],
	"12": ["12A"]
};
var BOYS_ROSTERS = {
	"4A": [
		{
			"nameEn": "Abdulaziz Alolayan",
			"nameAr": "عبدالعزيز العليان",
			"code": "JPS1187"
		},
		{
			"nameEn": "Abdulkader Khawaja",
			"nameAr": "عبدالقادر خواجه",
			"code": "JPS1205"
		},
		{
			"nameEn": "Abdulmhsin Binmahfouz",
			"nameAr": "عبدالمحسن بن محفوظ",
			"code": "JPS1191"
		},
		{
			"nameEn": "Adnan Khan",
			"nameAr": "عدنان خان",
			"code": "JPS1194"
		},
		{
			"nameEn": "Ali Azouz",
			"nameAr": "علي عزوز",
			"code": "JPS1188"
		},
		{
			"nameEn": "Faris Hazem M Alahwal",
			"nameAr": "فارس حازم محمود الاحول",
			"code": "JPS1506"
		},
		{
			"nameEn": "Faris Abdulaziz N Algain",
			"nameAr": "فارس عبدالعزيز نبيل القين",
			"code": "JPS1509"
		},
		{
			"nameEn": "Ghaleb Thamer G Daiwali",
			"nameAr": "غالب ثامر غالب ديولي",
			"code": "JPS1547"
		},
		{
			"nameEn": "Hamza Albalaa",
			"nameAr": "حمزه البلعة",
			"code": "JPS1183"
		},
		{
			"nameEn": "Hamza Saleh",
			"nameAr": "حمزه صالح",
			"code": "JPS1210"
		},
		{
			"nameEn": "Khaled Alhamdan",
			"nameAr": "خالد الحمدان",
			"code": "JPS1185"
		},
		{
			"nameEn": "Nahar Khalil A Alyoubi",
			"nameAr": "نهار خليل عباد اليوبي",
			"code": "JPS1585"
		},
		{
			"nameEn": "Saif Baghlaf",
			"nameAr": "سيف بغلف",
			"code": "JPS1189"
		},
		{
			"nameEn": "Salman Faisal Muhannad Almaleh",
			"nameAr": "سلمان المالح",
			"code": "JPS1452"
		},
		{
			"nameEn": "Salman Bafarat",
			"nameAr": "سلمان بافرط",
			"code": "JPS1202"
		},
		{
			"nameEn": "Salman Kawthar",
			"nameAr": "سلمان كوثر",
			"code": "JPS1204"
		},
		{
			"nameEn": "Salman Nomane",
			"nameAr": "سلمان نعماني",
			"code": "JPS1209"
		},
		{
			"nameEn": "Yazan Mohamed Elsayed Elsaman",
			"nameAr": "يزن محمد السيد السمان",
			"code": "JPS1667"
		},
		{
			"nameEn": "Abdulmalik Alaa T Shaikh",
			"nameAr": "عبد الملك علاء طلال شيخ",
			"code": "JPS1741"
		}
	],
	"4B": [
		{
			"nameEn": "Abdulaziz Alsaggaf",
			"nameAr": "عبدالعزيز السقاف",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Attallah",
			"nameAr": "عبدالعزيز عطالله",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Nassief",
			"nameAr": "عبدالعزيز نصيف",
			"code": ""
		},
		{
			"nameEn": "Abdulelah Abuzinadah",
			"nameAr": "عبدالاله ابوزناده",
			"code": ""
		},
		{
			"nameEn": "Abdullah Abu Hikmah",
			"nameAr": "عبدالله ابوحكمه",
			"code": ""
		},
		{
			"nameEn": "Abdulmalik Abuznadah",
			"nameAr": "عبدالملك ابوزناده",
			"code": ""
		},
		{
			"nameEn": "Abdulmalik Alamoudi",
			"nameAr": "عبدالملك العمودي",
			"code": ""
		},
		{
			"nameEn": "Abdulrazaq Alkhereiji",
			"nameAr": "عبدالرزاق الخريجي",
			"code": ""
		},
		{
			"nameEn": "Ahmed Alukayli",
			"nameAr": "احمد العقيلي",
			"code": ""
		},
		{
			"nameEn": "Ahmed Almarzouki",
			"nameAr": "احمد المرزوقي",
			"code": ""
		},
		{
			"nameEn": "Bader Almarzouki",
			"nameAr": "بدر المرزوقي",
			"code": ""
		},
		{
			"nameEn": "Badr Sallam",
			"nameAr": "بدر سلام",
			"code": ""
		},
		{
			"nameEn": "Khalid Othman",
			"nameAr": "خالد عثمان",
			"code": ""
		},
		{
			"nameEn": "Mohammed Kaki",
			"nameAr": "محمد كعكي",
			"code": ""
		},
		{
			"nameEn": "Omar Alfelali",
			"nameAr": "عمر الفيلالي",
			"code": ""
		},
		{
			"nameEn": "Salman Mosally",
			"nameAr": "سلمان مصلي",
			"code": ""
		},
		{
			"nameEn": "Sultan Binmahfouz",
			"nameAr": "سلطان بن محفوظ",
			"code": ""
		},
		{
			"nameEn": "Yousef Badr Y Alhazmi",
			"nameAr": "يوسف بدر يوسف الحازمي",
			"code": ""
		},
		{
			"nameEn": "Omar Mutaz M Atallah",
			"nameAr": "عمر معتز معاذ عطا الله",
			"code": ""
		},
		{
			"nameEn": "Abdullah Hasan Alaidrous",
			"nameAr": "عبد الله حسن العيدروس",
			"code": ""
		}
	],
	"4C": [
		{
			"nameEn": "Abdulaziz Amjad",
			"nameAr": "عبدالعزيز امجد",
			"code": ""
		},
		{
			"nameEn": "Abdulrahman Bakheet",
			"nameAr": "عبدالرحمن بخيت",
			"code": ""
		},
		{
			"nameEn": "Ahmed Alaamri",
			"nameAr": "احمد العامري",
			"code": ""
		},
		{
			"nameEn": "Ahmed Baeshen",
			"nameAr": "أحمد باعشين",
			"code": ""
		},
		{
			"nameEn": "Ali Salman",
			"nameAr": "علي سلمان",
			"code": ""
		},
		{
			"nameEn": "Ammar Alamoudi",
			"nameAr": "عمار العمودي",
			"code": ""
		},
		{
			"nameEn": "Fahad Alghamdi",
			"nameAr": "فهد الغامدي",
			"code": ""
		},
		{
			"nameEn": "Hamza Bawazeer",
			"nameAr": "حمزه باوزير",
			"code": ""
		},
		{
			"nameEn": "Ibrahim Rayes",
			"nameAr": "ابراهيم ريس",
			"code": ""
		},
		{
			"nameEn": "Khalid Abdalaziz S Mandili",
			"nameAr": "خالد عبدالعزيز سعود منديلي",
			"code": ""
		},
		{
			"nameEn": "Mohammed Almaghrabi",
			"nameAr": "محمد المغربي",
			"code": ""
		},
		{
			"nameEn": "Muhanna Aljohani",
			"nameAr": "مهنا الجهني",
			"code": ""
		},
		{
			"nameEn": "Muhannad Almarghalani",
			"nameAr": "مهند المرغلاني",
			"code": ""
		},
		{
			"nameEn": "Omar Khan",
			"nameAr": "عمر خان",
			"code": ""
		},
		{
			"nameEn": "Sultan Alsolami",
			"nameAr": "سلطان السلمي",
			"code": ""
		},
		{
			"nameEn": "Yaman Mousa",
			"nameAr": "يامن موسى",
			"code": ""
		},
		{
			"nameEn": "Yousef Alhowaish",
			"nameAr": "يوسف الهويش",
			"code": ""
		},
		{
			"nameEn": "Moatasem Moaayad M Abuzaid",
			"nameAr": "معتصم مؤيد محمد أبو زيد",
			"code": ""
		},
		{
			"nameEn": "Mohammad Ammar F Alsayrafi",
			"nameAr": "محمد عمار فواز العفيفي الصيرفي",
			"code": ""
		},
		{
			"nameEn": "Adnan Ibrahim A Alsulaimani",
			"nameAr": "عدنان ابراهيم علي السليماني",
			"code": ""
		}
	],
	"5A": [
		{
			"nameEn": "Bader Mohammed Saad Alshehri",
			"nameAr": "بدر محمد سعد الشهري",
			"code": ""
		},
		{
			"nameEn": "Hashim Hussain M Mogharbel",
			"nameAr": "هاشم حسين محمد مغربل",
			"code": ""
		},
		{
			"nameEn": "Hashim Ahmed H Almadoudi",
			"nameAr": "هاشم احمد هاشم المدودي",
			"code": ""
		},
		{
			"nameEn": "Faris Sari M Linjawi",
			"nameAr": "فارس لنجاوي",
			"code": ""
		},
		{
			"nameEn": "Hamzah Faris ALQurashi",
			"nameAr": "حمزة فارس القرشي",
			"code": ""
		},
		{
			"nameEn": "Adam Maan K Jamjoom",
			"nameAr": "آدم معن خالد جمجوم",
			"code": ""
		},
		{
			"nameEn": "Muhammad Abdulaziz A Alnoman",
			"nameAr": "محمد عبدالعزيز عبدالرحمن النعمان",
			"code": ""
		},
		{
			"nameEn": "Faisal Ahmed B Albogami",
			"nameAr": "فيصل احمد بجاد البقمي",
			"code": ""
		},
		{
			"nameEn": "Zohair Rayan Z Arab",
			"nameAr": "زهير ريان زهير عرب",
			"code": ""
		},
		{
			"nameEn": "Yamin Khalid Y Assim",
			"nameAr": "يامن خالد يسلم عصم",
			"code": ""
		},
		{
			"nameEn": "Ibrahim Abdulmajeed M Almouhana",
			"nameAr": "ابراهيم عبدالمجيد مهنا المهنا",
			"code": ""
		},
		{
			"nameEn": "Waleed Khaled W Khalifa",
			"nameAr": "وليد خالد وليد خليفه",
			"code": ""
		},
		{
			"nameEn": "Tamim Walid E Akkad",
			"nameAr": "تميم وليد عقاد",
			"code": ""
		},
		{
			"nameEn": "Saleem Rayan S Ajina",
			"nameAr": "سليم ريان سليم عجينه",
			"code": ""
		},
		{
			"nameEn": "Omar Noureldine A Almadah",
			"nameAr": "عمر نورالدين عبدالعزيز المداح",
			"code": ""
		},
		{
			"nameEn": "Ahmad ALi Ahmad el Rifai",
			"nameAr": "أحمد علي أحمد الرفاعي",
			"code": ""
		}
	],
	"5B": [
		{
			"nameEn": "Feher Mohammed M Saleh",
			"nameAr": "فهر محمد مجدي صالح",
			"code": ""
		},
		{
			"nameEn": "Mohammed Alaa T Aqeel",
			"nameAr": "محمد علاء طلال عقيل",
			"code": ""
		},
		{
			"nameEn": "Muhammad Rai M Reda",
			"nameAr": "محمد ري محمد رضا",
			"code": ""
		},
		{
			"nameEn": "Qais Ashraf A Yamani",
			"nameAr": "قيس أشرف يماني",
			"code": ""
		},
		{
			"nameEn": "Yazan Raed Hamed ALRajhi",
			"nameAr": "يزن رائد حامد الراجحي",
			"code": ""
		},
		{
			"nameEn": "Faisal Ahmed F Baghlaf",
			"nameAr": "فيصل احمد فيصل بغلف",
			"code": ""
		},
		{
			"nameEn": "Faisal Al Ghalayini",
			"nameAr": "فيصل خالد الغلايني",
			"code": ""
		},
		{
			"nameEn": "Hashim Shadi A Ismail",
			"nameAr": "هاشم شادي عادل اسماعيل",
			"code": ""
		},
		{
			"nameEn": "Salman Ahmed I Bahrawi",
			"nameAr": "سلمان احمد ابراهيم بحراوي",
			"code": ""
		},
		{
			"nameEn": "Ibrahim Fesel M Elchybany",
			"nameAr": "ابراهيم فيصل محمدمعروف الشيباني",
			"code": ""
		},
		{
			"nameEn": "Talal Abdurahman H Alsadi",
			"nameAr": "طلال عبدالرحمن حمود الصعدي",
			"code": ""
		},
		{
			"nameEn": "Abdelelah Almarghlani",
			"nameAr": "عبد الاله عمار المرغلاني",
			"code": ""
		},
		{
			"nameEn": "Majd Jad ALNoweisser",
			"nameAr": "مجد جاد عائد النويصر",
			"code": ""
		},
		{
			"nameEn": "Odi Waseem Abdulrazaq Hasanein",
			"nameAr": "عدي وسيم عبد الرزاق حسنين",
			"code": ""
		},
		{
			"nameEn": "Ahmed Mansour S Alhemayed",
			"nameAr": "أحمد منصور سعود الحميد",
			"code": ""
		},
		{
			"nameEn": "Omar Abdulaziz M. Almadoudi",
			"nameAr": "عمر عبدالعزيز محفوظ المدودي",
			"code": ""
		}
	],
	"5C": [
		{
			"nameEn": "Ibrahim Obai B Ainousah",
			"nameAr": "ابراهيم أبي باسم عينوسه",
			"code": ""
		},
		{
			"nameEn": "Ibrahim Muhammed F Abulkhair",
			"nameAr": "إبراهيم محمد فؤاد أبوالخير",
			"code": ""
		},
		{
			"nameEn": "Abdulmajeed Bawazir",
			"nameAr": "عبد المجيد محمد علي باوزير",
			"code": ""
		},
		{
			"nameEn": "Assaf Fahad ALQurashi",
			"nameAr": "عساف فهد القرشي",
			"code": ""
		},
		{
			"nameEn": "Mohammed Haetham H Madani",
			"nameAr": "محمد هيثم حمزه مدني",
			"code": ""
		},
		{
			"nameEn": "Talal Saati",
			"nameAr": "طلال معتز ساعاتي",
			"code": ""
		},
		{
			"nameEn": "Adam Ahmad I Khaberi",
			"nameAr": "ادم احمد ابراهيم خبيري",
			"code": ""
		},
		{
			"nameEn": "Sulaiman Abdulrahman Hesham Alfelali",
			"nameAr": "سليمان عبدالرحمن الفيلالي",
			"code": ""
		},
		{
			"nameEn": "Hamza Bassam A Alsadik",
			"nameAr": "حمزة بسام علي الصادق",
			"code": ""
		},
		{
			"nameEn": "Salman Zuhair M Aytah",
			"nameAr": "سلمان زهير محمد عيطة",
			"code": ""
		},
		{
			"nameEn": "Yousef Omar AlSharif",
			"nameAr": "يوسف عمر مساعد الشريف",
			"code": ""
		},
		{
			"nameEn": "Mohammed Abdullah M Jelaidan",
			"nameAr": "محمد عبدالله جليدان",
			"code": ""
		},
		{
			"nameEn": "Abdulhannan Balbey",
			"nameAr": "عبدالحنان بالباي",
			"code": ""
		},
		{
			"nameEn": "Yousef Adnan Abdulrazzag Khoja",
			"nameAr": "يوسف عدنان عبد الرزاق خوجة",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Nebrass A Taibah",
			"nameAr": "عبد العزيز نبراس عبد العزيز طيبه",
			"code": ""
		}
	],
	"6A": [
		{
			"nameEn": "Saud Mandili",
			"nameAr": "سعود عبد العزيز منديلي",
			"code": ""
		},
		{
			"nameEn": "Fahad Naief F Alolayan",
			"nameAr": "فهد نايف فهد احمد العليان",
			"code": ""
		},
		{
			"nameEn": "Saif Abdulrahman A Haddad",
			"nameAr": "سيف عبدالرحمن عبدالرزاق حداد",
			"code": ""
		},
		{
			"nameEn": "Ahmed Faisal M Alhaidari",
			"nameAr": "أحمد فيصل محمد الحيدري",
			"code": ""
		},
		{
			"nameEn": "Abdallah Ibrahim H Alnoamy",
			"nameAr": "عبدالله ابراهيم هاشم النعمي",
			"code": ""
		},
		{
			"nameEn": "Abdullah Hashem A Alhoothy",
			"nameAr": "عبدالله هاشم عباس الحوثي",
			"code": ""
		},
		{
			"nameEn": "Anmar Hussam H Tulba",
			"nameAr": "أنمار حسام حسين طلبه",
			"code": ""
		},
		{
			"nameEn": "Hassan Khalid M Bajnaid",
			"nameAr": "حسن خالد محمد باجنيد",
			"code": ""
		},
		{
			"nameEn": "Mouhana Abdulmajeed M Almouhana",
			"nameAr": "مهنا عبدالمجيد مهنا المهنا",
			"code": ""
		},
		{
			"nameEn": "Omar Waad R Bin Himd",
			"nameAr": "عمر وعد رياض احمد بن حمد",
			"code": ""
		},
		{
			"nameEn": "Suhaib Mohammed S Alamoudi",
			"nameAr": "صهيب محمد سعيد العامودي",
			"code": ""
		},
		{
			"nameEn": "Yousef Talal A Tayeb",
			"nameAr": "يوسف طلال عبدالسلام طيب",
			"code": ""
		},
		{
			"nameEn": "Mohammed Rakan M Khan",
			"nameAr": "محمد راكان محمد كمال خان",
			"code": ""
		},
		{
			"nameEn": "Ahmed Hatim A Alomari",
			"nameAr": "أحمد حاتم احمد العمرى",
			"code": ""
		},
		{
			"nameEn": "Talal Abdulhamid Al Ghafari",
			"nameAr": "طلال عبدالحميد الغفاري",
			"code": ""
		},
		{
			"nameEn": "Malek Nezar G Alem",
			"nameAr": "مالك نزار غالب عالم",
			"code": ""
		},
		{
			"nameEn": "Naif Abdulrahman Mohammed AlShareef",
			"nameAr": "نايف عبد الرحمن محمد الشريف",
			"code": ""
		},
		{
			"nameEn": "Yusuf Khalid Y Assim",
			"nameAr": "يوسف خالد يسلم عصم",
			"code": ""
		},
		{
			"nameEn": "Yousef Mazen N Zidan",
			"nameAr": "يوسف مازن نور الدين زيدان",
			"code": ""
		},
		{
			"nameEn": "Saleh Abdullah S Alsorayai",
			"nameAr": "صالح عبدالله صالح السريع",
			"code": ""
		},
		{
			"nameEn": "Yousef Fahad A Abalkhail",
			"nameAr": "يوسف فهد عبد الله أبا الخيل",
			"code": ""
		},
		{
			"nameEn": "Ahmed Mohammed A Barasain",
			"nameAr": "أحمد محمد عبد الرحمن باراسين",
			"code": ""
		}
	],
	"6B": [
		{
			"nameEn": "Essam Wael I Alakil",
			"nameAr": "عصام وائل عصام العاقل",
			"code": ""
		},
		{
			"nameEn": "Yousef Hamza A Redwan",
			"nameAr": "يوسف حمزه عابد رضوان",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Ahmad M Asaad",
			"nameAr": "عبدالعزيز احمد محمد اسعد",
			"code": ""
		},
		{
			"nameEn": "Hashem Reda H Jamalalleil",
			"nameAr": "هاشم رضا هاني جمل الليل",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Rayyan A Abulhamayel",
			"nameAr": "عبدالعزيز ريان عبدالعزيز ابوالحمائل",
			"code": ""
		},
		{
			"nameEn": "Ibrahim Mohamad Chreiteh",
			"nameAr": "إبراهيم محمد شريتح",
			"code": ""
		},
		{
			"nameEn": "Hamdan Abdullah H Alsorayai",
			"nameAr": "حمدان عبدالله حمدان السريع",
			"code": ""
		},
		{
			"nameEn": "Ibrahim Ahmed I Bahrawi",
			"nameAr": "ابراهيم احمد ابراهيم بحراوي",
			"code": ""
		},
		{
			"nameEn": "Khalid Hani M Aburas",
			"nameAr": "خالد هاني محمد ابوراس",
			"code": ""
		},
		{
			"nameEn": "Nezar Mardini",
			"nameAr": "نزار فراس مارديني",
			"code": ""
		},
		{
			"nameEn": "Sanad Hassan S Mufti",
			"nameAr": "سند حسن سامي مفتي",
			"code": ""
		},
		{
			"nameEn": "Houssam Ahmad Houalla",
			"nameAr": "حسام احمد حولا",
			"code": ""
		},
		{
			"nameEn": "Taha Ammar T Basrawi",
			"nameAr": "طه عمار طارق بصراوي",
			"code": ""
		},
		{
			"nameEn": "Jassar Hani A Bahashwan",
			"nameAr": "جسار هاني عبدالله باحشوان",
			"code": ""
		},
		{
			"nameEn": "Yusuf Rayan M Sherbeny",
			"nameAr": "يوسف ريان محمد شربيني",
			"code": ""
		},
		{
			"nameEn": "Faris Talal S Alsorayai",
			"nameAr": "فارس طلال صالح السريع",
			"code": ""
		},
		{
			"nameEn": "Adam Yahya I Kashkash",
			"nameAr": "آدم يحيى اسماعيل كشكش",
			"code": ""
		},
		{
			"nameEn": "Abdulelah Naif A Salama",
			"nameAr": "عبد الاله نايف عبد العزيز سلامة",
			"code": ""
		},
		{
			"nameEn": "Jameel Ahmad N Jamjoom",
			"nameAr": "جميل أحمد نبيل جمجوم",
			"code": ""
		},
		{
			"nameEn": "Yousef Wasam Y Kenani",
			"nameAr": "يوسف وسام يوسف كناني",
			"code": ""
		},
		{
			"nameEn": "Omar Adnan Z Hijazi",
			"nameAr": "عمر عدنان زكي حجازي",
			"code": ""
		},
		{
			"nameEn": "Yousef Ibrahim Y Almimani",
			"nameAr": "يوسف ابراهيم يعقوب الميمنى",
			"code": ""
		}
	],
	"7A": [
		{
			"nameEn": "Suleman Ahmed A Alnamlah",
			"nameAr": "سليمان احمد عبدالرحمن النمله",
			"code": ""
		},
		{
			"nameEn": "Hamza Abdulrahman F Jamjoum",
			"nameAr": "حمزه عبدالرحمن فيصل جمجوم",
			"code": ""
		},
		{
			"nameEn": "Faisal Waad R Binhimd",
			"nameAr": "فيصل وعد رياض بن حمد",
			"code": ""
		},
		{
			"nameEn": "Waseem Bassim S Khayyat",
			"nameAr": "وسيم باسم سليمان خياط",
			"code": ""
		},
		{
			"nameEn": "Omar Mohammed B Alsayed",
			"nameAr": "عمر محمد بشير السيد",
			"code": ""
		},
		{
			"nameEn": "Ismael Reda S Sejeny",
			"nameAr": "اسماعيل رضا سعود سجيني",
			"code": ""
		},
		{
			"nameEn": "Mohammad Abdulrahman H Alfelali",
			"nameAr": "محمد عبدالرحمن هشام الفيلالي",
			"code": ""
		},
		{
			"nameEn": "Hamza Mahmood F Badr",
			"nameAr": "حمزه محمود فيصل بدر",
			"code": ""
		},
		{
			"nameEn": "Zaki Ahmad Z Hafiz",
			"nameAr": "زكي احمد زكي حافظ",
			"code": ""
		},
		{
			"nameEn": "Jad Mahmoud Kabbara",
			"nameAr": "جاد محمود كباره",
			"code": ""
		},
		{
			"nameEn": "Yahya Abdulaziz T Alsharif",
			"nameAr": "يحى عبدالعزيز طلال الشريف",
			"code": ""
		},
		{
			"nameEn": "Hassan Majed H Kayal",
			"nameAr": "حسن ماجد حسن كيال",
			"code": ""
		},
		{
			"nameEn": "Mohammed Hussam A Sukkar",
			"nameAr": "محمد حسام عدنان سكر",
			"code": ""
		},
		{
			"nameEn": "Ghali Mahmood A Saeed",
			"nameAr": "غالي محمود عبدالخالق سعيد",
			"code": ""
		},
		{
			"nameEn": "Khalid Alanouty",
			"nameAr": "خالد عبد الوهاب العانوتي",
			"code": ""
		},
		{
			"nameEn": "Tariq Motaz B Assas",
			"nameAr": "طارق معتز بكري عساس",
			"code": ""
		}
	],
	"7B": [
		{
			"nameEn": "Abdullah Abdulaziz M Kaki",
			"nameAr": "عبدالله عبدالعزيز مروان كعكي",
			"code": ""
		},
		{
			"nameEn": "Issa Hassan Bouadar",
			"nameAr": "عيسى حسن بوادار",
			"code": ""
		},
		{
			"nameEn": "Hamza Ammar F Alsayrafi",
			"nameAr": "حمزة عمار فواز حمزه الصيرفي",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Ahmed A Alghamdi",
			"nameAr": "عبدالعزيز أحمد عبدلله الغامدي",
			"code": ""
		},
		{
			"nameEn": "Qusi Rami I Almadhoun",
			"nameAr": "قصي رامي ابراهيم المدهون",
			"code": ""
		},
		{
			"nameEn": "Yousef Saeed M Alamoudi",
			"nameAr": "يوسف سعيد محمد العمودي",
			"code": ""
		},
		{
			"nameEn": "Alawi Hashim A Albaiti",
			"nameAr": "علوي هاشم علوي البيتي",
			"code": ""
		},
		{
			"nameEn": "Omar Adeeb Y Alaama",
			"nameAr": "عمر أديب يوسف الأعمى",
			"code": ""
		},
		{
			"nameEn": "Abdulelah Ayman M Shams",
			"nameAr": "عبدالاله ايمن محمدسعيد شمس",
			"code": ""
		},
		{
			"nameEn": "Ahmed Banjer",
			"nameAr": "احمد بندر بنجر",
			"code": ""
		},
		{
			"nameEn": "Ghaleb Hamza F Khomaies",
			"nameAr": "غالب حمزه فوزي خميس",
			"code": ""
		},
		{
			"nameEn": "Ali Hassan A Barasheed",
			"nameAr": "علي حسن علي بارشيد",
			"code": ""
		},
		{
			"nameEn": "Elias Ahmed H Almadoudi",
			"nameAr": "الياس احمد هاشم المدودي",
			"code": ""
		},
		{
			"nameEn": "Talal Abdullah Abu Sido",
			"nameAr": "طلال عبدالله طلال ابوسيدو",
			"code": ""
		},
		{
			"nameEn": "Mohammed Bader M Nooh",
			"nameAr": "محمد بدر محمد نوح",
			"code": ""
		}
	],
	"7C": [
		{
			"nameEn": "Abdullah Tameem A Jad",
			"nameAr": "عبدالله تميم عبدالله جاد",
			"code": ""
		},
		{
			"nameEn": "Anmar Hani A Bahashwan",
			"nameAr": "أنمار هاني عبدالله باحشوان",
			"code": ""
		},
		{
			"nameEn": "Sultan Abdullah A Allukhmy",
			"nameAr": "سلطان عبدالله علي اللخمي",
			"code": ""
		},
		{
			"nameEn": "Ahmed Abdulaziz H Binladin",
			"nameAr": "أحمد عبدالعزيز حسن بن لادن",
			"code": ""
		},
		{
			"nameEn": "Hashim Adim Alabdalilsharif",
			"nameAr": "هاشم أديم العبدلي الشريف",
			"code": ""
		},
		{
			"nameEn": "Khalid Sultan M Alhomoud",
			"nameAr": "خالد سلطان مزاحم الحمود",
			"code": ""
		},
		{
			"nameEn": "Hashem Al Mehdar",
			"nameAr": "هاشم رائد المحضار",
			"code": ""
		},
		{
			"nameEn": "Omar Eyad S Jamalallail",
			"nameAr": "عمر اياد شيخ جمل الليل",
			"code": ""
		},
		{
			"nameEn": "Hamza Hattan K Ujaimi",
			"nameAr": "حمزة هتان خالد عجيمي",
			"code": ""
		},
		{
			"nameEn": "Fahad Salem Fahed Althakafi",
			"nameAr": "فهد سالم فهد الثقفي",
			"code": ""
		},
		{
			"nameEn": "Malik Moaayad M Abuzaid",
			"nameAr": "مالك موءيد محمد ابوزيد",
			"code": ""
		},
		{
			"nameEn": "Khalid Waleed K Bawazeer",
			"nameAr": "خالد وليد خالد باوزير",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Hussam A Hijazi",
			"nameAr": "عبدالعزيز حسام عبدالعزيز حجازي",
			"code": ""
		},
		{
			"nameEn": "Obai Shadi H Khomeis",
			"nameAr": "أبي شادي هاني خميس",
			"code": ""
		},
		{
			"nameEn": "Abdulmalik Hassan A Almadhoun",
			"nameAr": "عبدالمالك حسن عبدالعزيز المدهون",
			"code": ""
		}
	],
	"8A": [
		{
			"nameEn": "Nasser Majed N Alsorayai",
			"nameAr": "ناصر ماجد ناصر السريع",
			"code": ""
		},
		{
			"nameEn": "Hamoud Abdurahman H AlSadi",
			"nameAr": "حمود عبدالرحمن حمود الصعدي",
			"code": ""
		},
		{
			"nameEn": "Hamza Ezzat O Alzaini",
			"nameAr": "حمزة عزت عمر الزيني",
			"code": ""
		},
		{
			"nameEn": "Mohammed Naif Y Jumah",
			"nameAr": "محمد نايف يحي جمعه",
			"code": ""
		},
		{
			"nameEn": "Salman Hani Mohammed Aburas",
			"nameAr": "سلمان هاني محمد ابوراس",
			"code": ""
		},
		{
			"nameEn": "Yousef Waleed M Asaad",
			"nameAr": "يوسف وليد محمدمحسن اسعد",
			"code": ""
		},
		{
			"nameEn": "Yousef Bashar R Reda",
			"nameAr": "يوسف بشار رحاب رضا",
			"code": ""
		},
		{
			"nameEn": "Mohammed Samer M Alhalabi",
			"nameAr": "محمد سامر محمد الحلبي",
			"code": ""
		},
		{
			"nameEn": "Tirad Amro A Bakhsh",
			"nameAr": "طراد عمرو عبدالقادر بخش",
			"code": ""
		},
		{
			"nameEn": "Abdullah Wail A Alamoudi",
			"nameAr": "عبدالله وائل عبدالله العمودي",
			"code": ""
		},
		{
			"nameEn": "Badr Mohsen O Bamujally",
			"nameAr": "بدر محسن عمر بامجلي",
			"code": ""
		},
		{
			"nameEn": "Hashem Abdulrahman Habbal",
			"nameAr": "هاشم عبدالرحمن حبال",
			"code": ""
		},
		{
			"nameEn": "Khalid Shalan H Alaamri",
			"nameAr": "خالد شعلان حامد العامري",
			"code": ""
		},
		{
			"nameEn": "Hisham Abdulmalik Maghrabi",
			"nameAr": "هشام عبد الملك مغربي",
			"code": ""
		},
		{
			"nameEn": "Ziad Moaz Rayess",
			"nameAr": "زياد رايس",
			"code": ""
		},
		{
			"nameEn": "Abdulhamid Bahaauldeen T Najdi",
			"nameAr": "عبدالحميد بهاء الدين نجدي",
			"code": ""
		},
		{
			"nameEn": "Abdulwahab Mazin A Kurdi",
			"nameAr": "عبدالوهاب مازن كردي",
			"code": ""
		},
		{
			"nameEn": "Abdulmalik Muhammad A Basha",
			"nameAr": "عبدالملك محمد عدنان باشا",
			"code": ""
		},
		{
			"nameEn": "Firas Mohamad Chreiteh",
			"nameAr": "فراس محمد شريتح",
			"code": ""
		}
	],
	"8B": [
		{
			"nameEn": "Abdulaziz Ahmed F Rahaim",
			"nameAr": "عبدالعزيز احمد فيصل رحيم",
			"code": ""
		},
		{
			"nameEn": "Abdulmalik Hisham A Alhowaish",
			"nameAr": "عبدالملك هشام عبدالرحمن الهويش",
			"code": ""
		},
		{
			"nameEn": "Adnan Majid A Khodary",
			"nameAr": "عدنان ماجد عدنان خضري",
			"code": ""
		},
		{
			"nameEn": "Ahmed Abdullah A Ashour",
			"nameAr": "احمد عبدالله احمد عاشور",
			"code": ""
		},
		{
			"nameEn": "Eissa Abdulelah S Kaki",
			"nameAr": "عيسى بن عبدالاله بن سمير كعكي",
			"code": ""
		},
		{
			"nameEn": "Elyas Eyad M Hussain",
			"nameAr": "الياس بن اياد بن محمد بن صالح حسين",
			"code": ""
		},
		{
			"nameEn": "Hashim Hasan A Alaidrous",
			"nameAr": "هاشم بن حسن بن عبدالله العيدروس",
			"code": ""
		},
		{
			"nameEn": "Ibrahim Kamil A Salah",
			"nameAr": "ابراهيم كامل عدنان صلاح",
			"code": ""
		},
		{
			"nameEn": "Mohammed Abdullah M Abulkhair",
			"nameAr": "محمد عبدالله محمد ابوالخير",
			"code": ""
		},
		{
			"nameEn": "Omar Mohammed E Mufti",
			"nameAr": "عمر محمد عصام مفتى",
			"code": ""
		},
		{
			"nameEn": "Talha Rakan S Jamjoom",
			"nameAr": "طلحه بن راكان بن سامي جمجوم",
			"code": ""
		},
		{
			"nameEn": "Yousef Khalid B Alghamdi",
			"nameAr": "يوسف خالد بريك الغامدي",
			"code": ""
		},
		{
			"nameEn": "Mohammed Mamdouh M Sobaihi",
			"nameAr": "محمد ممدوح محمد صبيحي",
			"code": ""
		},
		{
			"nameEn": "Saleh Battar",
			"nameAr": "صالح سلطان بتار",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Ahmed A Alghamdi",
			"nameAr": "عبدالعزيز احمد عبدالعزيز الغامدي",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Fayad F Alhashidi",
			"nameAr": "عبدالعزيز فياض فيضي الحاشدي",
			"code": ""
		},
		{
			"nameEn": "Badr Waseem Abdulrazaq Hasanein",
			"nameAr": "بدر وسيم عبد الرزاق حسنين",
			"code": ""
		},
		{
			"nameEn": "Salman Ghassan A AlSyari",
			"nameAr": "سلمان غسان علي الصيعري",
			"code": ""
		},
		{
			"nameEn": "Faisal Hani Mohammed Aburas",
			"nameAr": "فيصل هاني محمد ابوراس",
			"code": ""
		}
	],
	"9A": [
		{
			"nameEn": "Ahmed Abdullah A Allukhmy",
			"nameAr": "أحمد بن عبدالله بن علي اللخمي",
			"code": ""
		},
		{
			"nameEn": "Bassam Bassim S Khayyat",
			"nameAr": "بسام باسم سليمان خياط",
			"code": ""
		},
		{
			"nameEn": "Fares Abdullah J Dohaithem",
			"nameAr": "فارس عبدالله جميل دهيثم",
			"code": ""
		},
		{
			"nameEn": "Hasan Abdulaziz H Binladin",
			"nameAr": "حسن عبدالعزيز حسن بن لادن",
			"code": ""
		},
		{
			"nameEn": "Marwan Mahmoud Nazer",
			"nameAr": "مروان ناظر",
			"code": ""
		},
		{
			"nameEn": "Moayad Hassan A Damanhory",
			"nameAr": "مؤيد حسن اسعد دمنهوري",
			"code": ""
		},
		{
			"nameEn": "Mohammed Haitham A Attar",
			"nameAr": "محمد هيثم احمد عطار",
			"code": ""
		},
		{
			"nameEn": "Omar Ismail K Bukhary",
			"nameAr": "عمر اسماعيل كمال بخاري",
			"code": ""
		},
		{
			"nameEn": "Rayes Abdulrhman R Binmahfooz",
			"nameAr": "ريس بن عبدالرحمن بن ريس بن محفوظ",
			"code": ""
		},
		{
			"nameEn": "Yahya Nizar Y Mousa",
			"nameAr": "يحيى نزار يحى موسى",
			"code": ""
		},
		{
			"nameEn": "Yousef Sami K Alghamdi",
			"nameAr": "يوسف سامي كمال الغامدي",
			"code": ""
		},
		{
			"nameEn": "Yousuf Rayan Z Arab",
			"nameAr": "يوسف ريان عرب",
			"code": ""
		},
		{
			"nameEn": "Osama Taher T Taher",
			"nameAr": "أسامة طاهر تردي طاهر",
			"code": ""
		},
		{
			"nameEn": "Abdulelah Salem T Baothman",
			"nameAr": "عبدالاله سالم طلال باعثمان",
			"code": ""
		},
		{
			"nameEn": "Abdulrahman Ghassan A AlGhifari",
			"nameAr": "عبدالرحمن غسان اسعد الغفاري",
			"code": ""
		}
	],
	"10A": [
		{
			"nameEn": "Ahmad Khalid A Noli",
			"nameAr": "أحمد خالد ابكر نولي",
			"code": ""
		},
		{
			"nameEn": "Ghazi Badr G Binhimd",
			"nameAr": "غازي بدر غازي بن حمد",
			"code": ""
		},
		{
			"nameEn": "Mohammed Mahmood F Badr",
			"nameAr": "محمد محمود فيصل بدر",
			"code": ""
		},
		{
			"nameEn": "Talal Hazem Y Alhazmi",
			"nameAr": "طلال حازم يوسف الحازمي",
			"code": ""
		},
		{
			"nameEn": "Tarik Bahaauldeen T Najdi",
			"nameAr": "طارق بهاء الدين نجدي",
			"code": ""
		},
		{
			"nameEn": "Yousef Hashem A Alhoothy",
			"nameAr": "يوسف هاشم عباس الحوثي",
			"code": ""
		},
		{
			"nameEn": "Yousuf Hassan N Alsayyed",
			"nameAr": "يوسف حسن نزيه السيد",
			"code": ""
		},
		{
			"nameEn": "Khaled Wajdi A Sager",
			"nameAr": "خالد وجدي احمد صقر",
			"code": ""
		},
		{
			"nameEn": "Abdul Hamid Abdelaziz Jardine",
			"nameAr": "عبد الحميد عبد العزيز جارديني",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Deyab W Aljohar",
			"nameAr": "عبدالعزيز ذياب وادى الجوهر",
			"code": ""
		},
		{
			"nameEn": "Abdulelah Shahd A Redwan",
			"nameAr": "عبدالاله شهد عابد رضوان",
			"code": ""
		},
		{
			"nameEn": "Abdulrahman Ali F Almarzouki",
			"nameAr": "عبدالرحمن علي فهد المرزوقي",
			"code": ""
		},
		{
			"nameEn": "Adnan Omer A Halabi",
			"nameAr": "عدنان عمر عدنان حلبي",
			"code": ""
		},
		{
			"nameEn": "Bader Hatim A Alomari",
			"nameAr": "بدر حاتم احمد العمرى",
			"code": ""
		},
		{
			"nameEn": "Mohammed Hajaj M Althanayan",
			"nameAr": "محمد حجاج محمد الثنيان",
			"code": ""
		},
		{
			"nameEn": "Osama Zaid M Alnahdi",
			"nameAr": "اسامه زيد محمد النهدي",
			"code": ""
		},
		{
			"nameEn": "Sulaiman Azzam",
			"nameAr": "سليمان عزام",
			"code": ""
		},
		{
			"nameEn": "Yousef Loai M Abdulkareem",
			"nameAr": "يوسف لؤي محمد عبدالكريم",
			"code": ""
		},
		{
			"nameEn": "Abdullah Turki A Alamoudi",
			"nameAr": "عبدالله تركي عبدالله العمودي",
			"code": ""
		},
		{
			"nameEn": "Abdullah Faisal A Almuhana",
			"nameAr": "عبدالله فيصل عبدالله المهنا",
			"code": ""
		},
		{
			"nameEn": "Anmar Rayan Mousa",
			"nameAr": "أنمار ريان حسين موسى",
			"code": ""
		},
		{
			"nameEn": "Shahid Hussain",
			"nameAr": "شاهد عمران حسين",
			"code": ""
		},
		{
			"nameEn": "Jasser Hussam H Bahabri",
			"nameAr": "جاسر حسام حسان باهبري",
			"code": ""
		}
	],
	"11-AMR": [
		{
			"nameEn": "Ammar Waleed M Asaad",
			"nameAr": "عمار وليد محمدمحسن اسعد",
			"code": "الدبلوما الأمريكية"
		},
		{
			"nameEn": "Khalid Jameel Asaad Allaf",
			"nameAr": "خالد جميل اسعد علاف",
			"code": "الدبلوما الأمريكية"
		},
		{
			"nameEn": "Mohammed Dhaifallah M Alanazi",
			"nameAr": "محمد ضيف الله محمد العنزي",
			"code": "الدبلوما الأمريكية"
		},
		{
			"nameEn": "Faisal Musaab F Jamjoom",
			"nameAr": "فيصل بن مصعب بن فيصل جمجوم",
			"code": "الدبلوما الأمريكية"
		},
		{
			"nameEn": "Ibrahim Ahmad I Khaberi",
			"nameAr": "ابراهيم احمد ابراهيم خبيري",
			"code": "الدبلوما الأمريكية"
		},
		{
			"nameEn": "Maan Ahmed M Shamsan",
			"nameAr": "معن احمد محمد شمسان",
			"code": "الدبلوما الأمريكية"
		},
		{
			"nameEn": "Mishal Turki M Alshareef",
			"nameAr": "مشعل تركي مشعل الشريف",
			"code": "الدبلوما الأمريكية"
		},
		{
			"nameEn": "Mohammad Eyad M Hussain",
			"nameAr": "محمد اياد محمد حسين",
			"code": "الدبلوما الأمريكية"
		},
		{
			"nameEn": "Yonus Ahmed A Alsaggaf",
			"nameAr": "يونس احمد علي السقاف",
			"code": "الدبلوما الأمريكية"
		},
		{
			"nameEn": "Hussain Abdulgader H Alamoudi",
			"nameAr": "حسين عبد القادر العامودي",
			"code": "الدبلوما الأمريكية"
		}
	],
	"11-IB": [
		{
			"nameEn": "Abdulaziz Hassan A Almadhoun",
			"nameAr": "عبدالعزيز حسن عبدالعزيز المدهون",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Abdullah Asim A Ayyash",
			"nameAr": "عبدالله عاصم عبدالله عياش",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Abdulrahman Maher T Alwaber",
			"nameAr": "عبدالرحمن ماهر طالب الوبر",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Ahmed Mohamed A Kensarah",
			"nameAr": "أحمد محمد احمد كنساره",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Hani Shadi H Khomeis",
			"nameAr": "هاني شادي هاني خميس",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Eyad Mohammed S Al Ghamdi",
			"nameAr": "اياد محمد سالم الغامدي",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Faris Hythum I Alam",
			"nameAr": "فارس هيثم ابراهيم عالم",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Fawzi Hamza F Khomaies",
			"nameAr": "فوزي حمزه فوزي خميس",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Nawaf Fahad A Aljomaih",
			"nameAr": "نواف فهد عبدالعزيز الجميح",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Mohammed Moaayad M Abuzaid",
			"nameAr": "محمد موءيد محمد ابوزيد",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Yousef Eyad S Jamalallail",
			"nameAr": "يوسف اياد شيخ جمل الليل",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Omar Ahmed Z Karkanawi",
			"nameAr": "عمر احمد زهدي قرقناوي",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Youssef Kamel A Salah",
			"nameAr": "يوسف كامل عدنان صلاح",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Abdulbadie Firas M Aljifri",
			"nameAr": "عبد البديع فراس محمدالباقر الجفري",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Ahmed Abdullah A Alabdali",
			"nameAr": "احمد عبدالله احمد العبدلي",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Ilyas Hamed M Siraj",
			"nameAr": "الياس حامد محمد سراج",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Mohamed Shaher A Radhwan",
			"nameAr": "محمد شاهر عابد رضوان",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Mohammed Suleiman M Bataweel",
			"nameAr": "محمد سليمان محمد باطويل",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Yazan Hattan Ahmed Katoua",
			"nameAr": "يزن هتان أحمد كتوعة",
			"code": "( IBDP )"
		},
		{
			"nameEn": "Yazeed AlAmoudi",
			"nameAr": "يزيد محمد العمودي",
			"code": "( IBDP )"
		}
	],
	"12A": [
		{
			"nameEn": "Mohammed Alsharif",
			"nameAr": "محمد الشريف",
			"code": ""
		},
		{
			"nameEn": "Qusai Saleh",
			"nameAr": "قصي صالح",
			"code": ""
		},
		{
			"nameEn": "Abdullah Huwait",
			"nameAr": "عبد الله حويت",
			"code": ""
		},
		{
			"nameEn": "Abdulrhman Huwait",
			"nameAr": "عبد الرحمن حويت",
			"code": ""
		},
		{
			"nameEn": "Anas Shata",
			"nameAr": "أنس شطا",
			"code": ""
		},
		{
			"nameEn": "Faisal Alrowaithi",
			"nameAr": "فيصل الرويثي",
			"code": ""
		},
		{
			"nameEn": "Faisal Asaad",
			"nameAr": "فيصل أسعد",
			"code": ""
		},
		{
			"nameEn": "Marwan Habbal",
			"nameAr": "مروان حبال",
			"code": ""
		},
		{
			"nameEn": "Saif Linjawi",
			"nameAr": "سيف لنجاوي",
			"code": ""
		},
		{
			"nameEn": "Sultan Aquil",
			"nameAr": "سلطان بن عقيل",
			"code": ""
		},
		{
			"nameEn": "Abdulaziz Amer A Tashkandi",
			"nameAr": "عبدالعزيز عامر عباس طاشكندي",
			"code": ""
		},
		{
			"nameEn": "Wail Madani",
			"nameAr": "وائل مدني",
			"code": ""
		},
		{
			"nameEn": "Youssef Mousa",
			"nameAr": "يوسف موسى",
			"code": ""
		},
		{
			"nameEn": "Bader Assiri",
			"nameAr": "بدر العسيري",
			"code": ""
		},
		{
			"nameEn": "Nihad Imran Hussain",
			"nameAr": "نهاد عمران حسين",
			"code": ""
		}
	]
};
var DUMMY_BOYS = new Set(boys_ar_default);
function officialBoys(grade, classId) {
	if (classId && BOYS_ROSTERS[classId]) return BOYS_ROSTERS[classId];
	return (classes_default[String(grade)] || []).flatMap((id) => BOYS_ROSTERS[id] || []);
}
function seedId(classId, seed) {
	const code = (seed.code || "").replace(/\s+/g, "");
	const base = /^JPS/i.test(code) ? code : seed.nameEn || seed.nameAr;
	return `${classId || "all"}:${base.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/gi, "-")}`;
}
var EMPTY_ROSTER = [];
var EMPTY_OBS = {
	stars: 0,
	mastered: false,
	notes: "",
	criteria: [],
	tier: ""
};
function makeRosterKey(grade, section, classId) {
	return `${grade}-${section}-${classId || "all"}`;
}
var DEFAULT_SQUADS = [
	{
		id: "s1",
		nameAr: "حماة السكينة",
		nameEn: "Keepers of Sakinah",
		stars: 0
	},
	{
		id: "s2",
		nameAr: "أهل الأمانة",
		nameEn: "People of Amanah",
		stars: 0
	},
	{
		id: "s3",
		nameAr: "فرسان اليمين",
		nameEn: "Knights of the Right",
		stars: 0
	},
	{
		id: "s4",
		nameAr: "نجوم الإحسان",
		nameEn: "Stars of Ihsan",
		stars: 0
	}
];
function emptyObs() {
	return {
		stars: 0,
		mastered: false,
		notes: "",
		criteria: [],
		tier: ""
	};
}
var useApp = create()(persist((set, get) => ({
	lang: "ar",
	dualLang: false,
	section: "boys",
	grade: 5,
	classId: "5A",
	tab: "today",
	role: "teacher",
	score: 0,
	sound: true,
	focusMode: false,
	selectedSkillId: null,
	studioOpen: false,
	classPanelOpen: false,
	completed: {},
	observations: {},
	rosters: {},
	squads: DEFAULT_SQUADS,
	pollVotes: [
		0,
		0,
		0,
		0
	],
	votedToday: "",
	checkoutToday: "",
	streakMarks: {},
	checklist: {},
	voiceLevel: 1,
	ttsVoice: "auto",
	pendingCredit: null,
	celebration: null,
	setLang: (lang) => set({ lang }),
	toggleDual: () => set({ dualLang: !get().dualLang }),
	setSection: (section) => {
		set({ section });
		get().ensureOfficialRoster();
	},
	setGrade: (grade) => {
		set({
			grade,
			classId: (classes_default[String(grade)] || [])[0] || ""
		});
		get().ensureOfficialRoster();
	},
	setClassId: (classId) => {
		set({ classId });
		get().ensureOfficialRoster();
	},
	setTab: (tab) => set({ tab }),
	setRole: (role) => set({ role }),
	setSound: (sound) => set({ sound }),
	toggleFocus: () => set({ focusMode: !get().focusMode }),
	openStudio: (skillId) => set({
		selectedSkillId: skillId,
		studioOpen: true,
		tab: "skills"
	}),
	closeStudio: () => set({ studioOpen: false }),
	setClassPanel: (classPanelOpen) => set({ classPanelOpen }),
	addScore: (n) => set({ score: get().score + n }),
	isActionDone: (skillId, kind) => {
		const key = `${todayISO()}:${skillId}:${kind}`;
		return Boolean(get().completed[key]);
	},
	completeAction: (skillId, kind) => {
		const key = `${todayISO()}:${skillId}:${kind}`;
		if (get().completed[key]) return {
			ok: false,
			points: 0
		};
		const points = ACTION_POINTS[kind];
		set({
			completed: {
				...get().completed,
				[key]: todayISO()
			},
			score: get().score + points
		});
		return {
			ok: true,
			points
		};
	},
	rosterKey: () => {
		const { grade, section, classId } = get();
		return `${grade}-${section}-${classId || "all"}`;
	},
	getRoster: () => get().rosters[get().rosterKey()] ?? [],
	addStudent: (nameAr, nameEn) => {
		const key = get().rosterKey();
		const list = get().rosters[key] ?? [];
		const student = {
			id: uid(),
			nameAr: nameAr.trim(),
			nameEn: (nameEn || nameAr).trim()
		};
		set({ rosters: {
			...get().rosters,
			[key]: [...list, student]
		} });
	},
	fillRoster: () => {
		const { section, grade, classId } = get();
		const key = get().rosterKey();
		if (section === "boys") {
			const seeds = officialBoys(grade, classId);
			if (seeds.length) {
				set({ rosters: {
					...get().rosters,
					[key]: seeds.map((seed) => ({
						id: seedId(classId, seed),
						nameAr: seed.nameAr,
						nameEn: seed.nameEn
					}))
				} });
				return;
			}
		}
		const ar = section === "girls" ? girls_ar_default : boys_ar_default;
		const en = section === "girls" ? girls_en_default : boys_en_default;
		const existing = new Set((get().rosters[key] ?? []).map((s) => s.nameAr));
		const picked = [];
		for (let i = 0; i < ar.length && picked.length < 12; i++) {
			if (existing.has(ar[i])) continue;
			picked.push({
				id: uid(),
				nameAr: ar[i],
				nameEn: en[i] || ar[i]
			});
		}
		set({ rosters: {
			...get().rosters,
			[key]: [...get().rosters[key] ?? [], ...picked]
		} });
	},
	ensureOfficialRoster: () => {
		if (get().section !== "boys") return;
		if (!officialBoys(get().grade, get().classId).length) return;
		const current = get().getRoster();
		if (current.length === 0 || current.every((s) => DUMMY_BOYS.has(s.nameAr) && !s.nameAr.includes(" "))) get().fillRoster();
	},
	clearRoster: () => {
		const key = get().rosterKey();
		set({ rosters: {
			...get().rosters,
			[key]: []
		} });
	},
	obsKey: (studentId, skillId) => `${get().rosterKey()}:${studentId}:${skillId}`,
	getObs: (studentId, skillId) => get().observations[get().obsKey(studentId, skillId)] ?? emptyObs(),
	saveObs: (studentId, skillId, patch) => {
		const key = get().obsKey(studentId, skillId);
		const prev = get().observations[key] ?? emptyObs();
		set({ observations: {
			...get().observations,
			[key]: {
				...prev,
				...patch
			}
		} });
	},
	awardStudentStar: (studentId, skillId) => {
		get().creditStudent(studentId, skillId, "star");
	},
	askWhoAchieved: (skillId, kind) => set({ pendingCredit: {
		skillId,
		kind
	} }),
	clearPendingCredit: () => set({ pendingCredit: null }),
	clearCelebration: () => set({ celebration: null }),
	creditStudent: (studentId, skillId, kind, opts) => {
		const key = get().obsKey(studentId, skillId);
		const prev = get().observations[key] ?? emptyObs();
		if (!get().getRoster().some((s) => s.id === studentId)) return;
		const prefix = get().rosterKey() + ":";
		let prevStars = 0;
		let prevMastered = 0;
		for (const [obsKey, obs] of Object.entries(get().observations)) {
			if (!obsKey.startsWith(prefix + studentId)) continue;
			prevStars += obs.stars;
			if (isSkillMastered(obs)) prevMastered += 1;
		}
		const starGain = kind === "mastery" ? 5 : 1;
		const nextObs = {
			...prev,
			stars: prev.stars + starGain,
			mastered: kind === "mastery" ? true : prev.mastered,
			tier: kind === "mastery" ? "tier3" : prev.tier
		};
		const masteredDelta = isSkillMastered(nextObs) && !isSkillMastered(prev) ? 1 : 0;
		const medal = newestMedal(prevStars, prevMastered, prevStars + starGain, prevMastered + masteredDelta);
		set({
			observations: {
				...get().observations,
				[key]: nextObs
			},
			score: get().score + starGain * 5,
			pendingCredit: null,
			studioOpen: opts?.closeStudio ? false : get().studioOpen,
			celebration: {
				studentId,
				skillId,
				kind,
				medalAr: medal.titleAr,
				medalEn: medal.titleEn
			}
		});
	},
	showCertificate: (studentId, skillId) => {
		if (!get().getRoster().some((s) => s.id === studentId)) return;
		const prefix = get().rosterKey() + ":";
		let stars = 0;
		let mastered = 0;
		for (const [obsKey, obs] of Object.entries(get().observations)) {
			if (!obsKey.startsWith(prefix + studentId)) continue;
			stars += obs.stars;
			if (isSkillMastered(obs)) mastered += 1;
		}
		const medal = newestMedal(0, 0, stars, mastered);
		set({ celebration: {
			studentId,
			skillId: skillId || "",
			kind: mastered > 0 ? "mastery" : "star",
			medalAr: medal.titleAr,
			medalEn: medal.titleEn
		} });
	},
	resetStudentSkill: (studentId, skillId) => {
		const key = get().obsKey(studentId, skillId);
		const prev = get().observations[key] ?? emptyObs();
		set({ observations: {
			...get().observations,
			[key]: {
				...prev,
				stars: 0,
				mastered: false,
				tier: prev.tier === "tier3" ? "tier2" : prev.tier
			}
		} });
	},
	changeSquad: (id, delta) => {
		set({ squads: get().squads.map((s) => s.id === id ? {
			...s,
			stars: Math.max(0, s.stars + delta)
		} : s) });
	},
	resetSquads: () => set({ squads: DEFAULT_SQUADS.map((s) => ({
		...s,
		stars: 0
	})) }),
	castVote: (idx) => {
		const votes = [...get().pollVotes];
		votes[idx] = (votes[idx] || 0) + 1;
		const first = get().votedToday !== todayISO();
		set({
			pollVotes: votes,
			votedToday: todayISO(),
			score: first ? get().score + 5 : get().score
		});
	},
	resetPoll: () => set({
		pollVotes: [
			0,
			0,
			0,
			0
		],
		votedToday: ""
	}),
	markCheckout: () => {
		if (get().checkoutToday === todayISO()) return;
		set({
			checkoutToday: todayISO(),
			score: get().score + 10
		});
	},
	toggleStreak: (id) => {
		const key = `${todayISO()}:${id}`;
		set({ streakMarks: {
			...get().streakMarks,
			[key]: !get().streakMarks[key]
		} });
	},
	toggleCheck: (id) => {
		const key = `${todayISO()}:${id}`;
		set({ checklist: {
			...get().checklist,
			[key]: !get().checklist[key]
		} });
	},
	setVoice: (voiceLevel) => set({ voiceLevel }),
	setTtsVoice: (ttsVoice) => set({ ttsVoice }),
	studentTotals: () => {
		const roster = get().getRoster();
		const observations = get().observations;
		const prefix = get().rosterKey() + ":";
		return roster.map((student) => {
			let stars = 0;
			let mastered = 0;
			for (const [key, obs] of Object.entries(observations)) {
				if (!key.startsWith(prefix + student.id)) continue;
				stars += obs.stars;
				if (isSkillMastered(obs)) mastered += 1;
			}
			return {
				student,
				stars,
				mastered
			};
		}).sort((a, b) => b.stars - a.stars || b.mastered - a.mastered);
	}
}), {
	name: "fursan-qiyam-v1",
	skipHydration: true,
	partialize: (s) => ({
		lang: s.lang,
		dualLang: s.dualLang,
		section: s.section,
		grade: s.grade,
		classId: s.classId,
		tab: s.tab,
		role: s.role,
		score: s.score,
		sound: s.sound,
		completed: s.completed,
		observations: s.observations,
		rosters: s.rosters,
		squads: s.squads,
		pollVotes: s.pollVotes,
		votedToday: s.votedToday,
		checkoutToday: s.checkoutToday,
		streakMarks: s.streakMarks,
		checklist: s.checklist,
		voiceLevel: s.voiceLevel,
		ttsVoice: s.ttsVoice
	})
}));
function Dual({ ar, en, className, as: Tag = "span", block }) {
	const lang = useApp((s) => s.lang);
	const dual = useApp((s) => s.dualLang);
	const section = useApp((s) => s.section);
	const a = adapt(ar, section);
	const e = adapt(en, section);
	const primary = lang === "ar" ? a : e;
	const secondary = lang === "ar" ? e : a;
	if (!dual) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className,
		children: primary
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, {
		className: cn(block ? "block" : "", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block",
			children: primary
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-[0.82em] font-normal leading-snug text-muted",
			children: secondary
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var MAX_CHARS = 4e3;
function parseInput(input) {
	if (!input || typeof input !== "object") throw new Error("invalid tts input");
	const rec = input;
	const text = typeof rec.text === "string" ? rec.text.trim() : "";
	if (!text) throw new Error("text required");
	if (rec.lang !== "ar" && rec.lang !== "en") throw new Error("lang required");
	if (rec.voice !== "male" && rec.voice !== "female") throw new Error("voice required");
	return {
		text: text.slice(0, MAX_CHARS),
		lang: rec.lang,
		voice: rec.voice
	};
}
var synthesizeSpeech = createServerFn({ method: "POST" }).validator(parseInput).handler(createSsrRpc("daef94b3928363e7cc8c18cfd62b2ecf03ea36ddb53468b4a634d0117c53daa3"));
var MAX_MEM = 40;
var CHUNK = 1400;
var blobCache = /* @__PURE__ */ new Map();
var currentAudio = null;
var currentToken = 0;
var snapshot = {
	key: null,
	phase: "idle"
};
var listeners = /* @__PURE__ */ new Set();
function emit(next) {
	snapshot = next;
	listeners.forEach((fn) => fn());
}
function resolveTtsGender(section, ttsVoice) {
	if (ttsVoice === "male" || ttsVoice === "female") return ttsVoice;
	return section === "girls" ? "female" : "male";
}
function voiceCaption(lang, gender) {
	if (lang === "ar") return gender === "female" ? {
		name: "زارية",
		locale: "لهجة سعودية"
	} : {
		name: "حامد",
		locale: "لهجة سعودية"
	};
	return gender === "female" ? {
		name: "Jenny",
		locale: "American English"
	} : {
		name: "Andrew",
		locale: "American English"
	};
}
function joinSpeak(parts) {
	return parts.flatMap((p) => Array.isArray(p) ? p : [p]).map((p) => (p || "").replace(/\s+/g, " ").trim()).filter(Boolean).join(" [pause] ");
}
function chunkSpeak(text, max = CHUNK) {
	const clean = text.trim();
	if (clean.length <= max) return [clean];
	const out = [];
	let buf = "";
	for (const piece of clean.split(/\s*\[pause\]\s*/i)) {
		const next = buf ? `${buf} [pause] ${piece}` : piece;
		if (next.length <= max) {
			buf = next;
			continue;
		}
		if (buf) out.push(buf);
		if (piece.length <= max) {
			buf = piece;
			continue;
		}
		let rest = piece;
		while (rest.length > max) {
			const window = rest.slice(0, max);
			let cut = Math.max(window.lastIndexOf("."), window.lastIndexOf("。"), window.lastIndexOf("؟"), window.lastIndexOf("!"));
			if (cut < max * .35) cut = Math.max(window.lastIndexOf("،"), window.lastIndexOf(","));
			if (cut < max * .35) cut = window.lastIndexOf(" ");
			if (cut < 40) cut = max;
			out.push(rest.slice(0, cut).trim());
			rest = rest.slice(cut).trim();
		}
		buf = rest;
	}
	if (buf) out.push(buf);
	return out.filter(Boolean);
}
function useSpeakStatus() {
	return (0, import_react.useSyncExternalStore)((cb) => {
		listeners.add(cb);
		return () => listeners.delete(cb);
	}, () => snapshot, () => snapshot);
}
function rememberBlob(key, url) {
	if (blobCache.has(key)) {
		const prev = blobCache.get(key);
		if (prev && prev !== url) URL.revokeObjectURL(prev);
		blobCache.delete(key);
	}
	blobCache.set(key, url);
	while (blobCache.size > MAX_MEM) {
		const oldest = blobCache.keys().next().value;
		if (oldest === void 0) break;
		const stale = blobCache.get(oldest);
		blobCache.delete(oldest);
		if (stale) URL.revokeObjectURL(stale);
	}
}
function stopAudio() {
	if (currentAudio) {
		currentAudio.pause();
		currentAudio.src = "";
		currentAudio = null;
	}
	if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}
function stopSpeak() {
	currentToken += 1;
	stopAudio();
	emit({
		key: null,
		phase: "idle"
	});
}
function pickBrowserVoice(lang, gender) {
	const voices = window.speechSynthesis?.getVoices() ?? [];
	const wantFemale = gender === "female";
	const ranked = voices.map((v) => {
		const tag = `${v.name} ${v.lang}`.toLowerCase();
		let score = 0;
		const isFemale = /female|zariyah|jenny|samantha|aria|ava|eve|woman|girl/.test(tag);
		const isMale = /male|hamed|andrew|guy|david|daniel|alex\b|man\b/.test(tag);
		if (wantFemale && isFemale) score += 12;
		if (!wantFemale && isMale) score += 12;
		if (wantFemale && isMale) score -= 8;
		if (!wantFemale && isFemale) score -= 8;
		if (lang === "ar") {
			if (v.lang.toLowerCase().startsWith("ar-sa")) score += 50;
			else if (v.lang.toLowerCase().startsWith("ar")) score += 22;
			if (tag.includes("saudi") || tag.includes("hamed") || tag.includes("zariyah")) score += 28;
		} else {
			if (v.lang.toLowerCase().startsWith("en-us")) score += 50;
			else if (/en-gb|en-au|en-in/.test(v.lang.toLowerCase())) score -= 35;
			if (tag.includes("us english") || tag.includes("american") || tag.includes("google us")) score += 24;
			if (tag.includes("british") || tag.includes("uk english")) score -= 40;
		}
		return {
			v,
			score
		};
	});
	ranked.sort((a, b) => b.score - a.score);
	return ranked[0] && ranked[0].score > 0 ? ranked[0].v : void 0;
}
function fallbackSpeak(text, lang, gender, key, token) {
	if (typeof window === "undefined" || !window.speechSynthesis) {
		if (token === currentToken) emit({
			key: null,
			phase: "idle"
		});
		return;
	}
	const utter = new SpeechSynthesisUtterance(text.replace(/\s*\[pause\]\s*/gi, ". "));
	utter.lang = lang === "ar" ? "ar-SA" : "en-US";
	utter.rate = lang === "ar" ? .9 : .96;
	const voice = pickBrowserVoice(lang, gender);
	if (voice) utter.voice = voice;
	utter.onend = () => {
		if (token === currentToken) emit({
			key: null,
			phase: "idle"
		});
	};
	utter.onerror = () => {
		if (token === currentToken) emit({
			key: null,
			phase: "idle"
		});
	};
	window.speechSynthesis.cancel();
	window.speechSynthesis.speak(utter);
	emit({
		key,
		phase: "playing"
	});
}
function bytesFromBase64(b64) {
	const bin = atob(b64);
	const out = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
	return out;
}
function playBlob(url, token) {
	return new Promise((resolve) => {
		const audio = new Audio(url);
		currentAudio = audio;
		const finish = (result) => {
			audio.onended = null;
			audio.onerror = null;
			resolve(result);
		};
		audio.onended = () => {
			if (currentAudio === audio) currentAudio = null;
			finish(token === currentToken ? "ok" : "cancel");
		};
		audio.onerror = () => finish(token === currentToken ? "err" : "cancel");
		audio.play().catch(() => finish(token === currentToken ? "err" : "cancel"));
	});
}
async function fetchPart(text, lang, gender) {
	const cacheKey = `${gender}:${lang}:${text}`;
	const cached = blobCache.get(cacheKey);
	if (cached) return cached;
	const res = await synthesizeSpeech({ data: {
		text,
		lang,
		voice: gender
	} });
	if (!res.ok) return null;
	const blob = new Blob([bytesFromBase64(res.audio)], { type: res.mime || "audio/mpeg" });
	const url = URL.createObjectURL(blob);
	rememberBlob(cacheKey, url);
	return url;
}
async function speak(text, lang, gender) {
	const trimmed = text.trim();
	if (!trimmed || typeof window === "undefined") return;
	const key = `${gender}:${lang}:${trimmed}`;
	if (snapshot.phase !== "idle" && snapshot.key === key) {
		stopSpeak();
		return;
	}
	const token = ++currentToken;
	stopAudio();
	emit({
		key,
		phase: "loading"
	});
	try {
		const parts = chunkSpeak(trimmed);
		for (let i = 0; i < parts.length; i += 1) {
			if (token !== currentToken) return;
			const url = await fetchPart(parts[i], lang, gender);
			if (token !== currentToken) return;
			if (!url) {
				fallbackSpeak(trimmed, lang, gender, key, token);
				return;
			}
			if (i === 0) emit({
				key,
				phase: "playing"
			});
			const result = await playBlob(url, token);
			if (token !== currentToken || result === "cancel") return;
			if (result === "err") {
				fallbackSpeak(trimmed, lang, gender, key, token);
				return;
			}
		}
		if (token === currentToken) emit({
			key: null,
			phase: "idle"
		});
	} catch {
		if (token === currentToken) fallbackSpeak(trimmed, lang, gender, key, token);
	}
}
var STR = {
	brand: {
		ar: "فُرسان القِيَم",
		en: "Fursan Al-Qiyam"
	},
	brandSub: {
		ar: "منصة مهارات الحياة والآداب · مدارس جدة الخاصة العالمية",
		en: "JPIS Noble Life Skills · Jeddah Private International School"
	},
	ibLine: {
		ar: "القيم الإسلامية · ملامح متعلم البكالوريا (PYP / MYP / DP)",
		en: "Islamic character · IB learner profile (PYP / MYP / DP)"
	},
	stars: {
		ar: "نجوم الإحسان",
		en: "Ihsan stars"
	},
	langToEn: {
		ar: "English",
		en: "English"
	},
	langToAr: {
		ar: "العربية",
		en: "العربية"
	},
	dual: {
		ar: "عرض اللغتين",
		en: "Show both languages"
	},
	teacher: {
		ar: "معلم",
		en: "Teacher"
	},
	student: {
		ar: "طالب",
		en: "Student"
	},
	boys: {
		ar: "البنين",
		en: "Boys"
	},
	girls: {
		ar: "البنات",
		en: "Girls"
	},
	grade: {
		ar: "الصف",
		en: "Grade"
	},
	class: {
		ar: "الفصل",
		en: "Class"
	},
	search: {
		ar: "ابحث عن مهارة أو قيمة…",
		en: "Search a skill or value…"
	},
	todayKicker: {
		ar: "حصة اليوم",
		en: "Today's lesson"
	},
	todayTitle: {
		ar: "نرتقي معاً: عادة واحدة، صفٌّ واحد، إحسانٌ واحد",
		en: "We rise together: one habit, one class, one standard of Ihsan"
	},
	featuredSkill: {
		ar: "مهارة اليوم",
		en: "Skill of the day"
	},
	startPractice: {
		ar: "ابدأ التدريب",
		en: "Start practice"
	},
	openStudio: {
		ar: "استوديو المهارة",
		en: "Open skill studio"
	},
	nextMilestone: {
		ar: "المرحلة التالية",
		en: "Next milestone"
	},
	classPulse: {
		ar: "نبض الصف",
		en: "Class pulse"
	},
	actionsDone: {
		ar: "مهام منجزة اليوم",
		en: "Actions completed today"
	},
	listen: {
		ar: "استمع",
		en: "Listen"
	},
	close: {
		ar: "إغلاق",
		en: "Close"
	},
	save: {
		ar: "حفظ",
		en: "Save"
	},
	confirm: {
		ar: "تأكيد",
		en: "Confirm"
	},
	reset: {
		ar: "إعادة",
		en: "Reset"
	},
	print: {
		ar: "طباعة",
		en: "Print"
	},
	exportCsv: {
		ar: "تصدير CSV",
		en: "Export CSV"
	},
	addStudent: {
		ar: "إضافة طالب",
		en: "Add student"
	},
	randomRoster: {
		ar: "تحميل كشف الصف",
		en: "Load class list"
	},
	honorRoll: {
		ar: "لوحة الشرف",
		en: "Honor roll"
	},
	rewards: {
		ar: "رصد ومكافأة",
		en: "Observe & reward"
	},
	certificate: {
		ar: "شهادة التميز",
		en: "Certificate"
	},
	mastered: {
		ar: "متقن",
		en: "Mastered"
	},
	objective: {
		ar: "هدف التعلم",
		en: "Learning objective"
	},
	criteria: {
		ar: "معايير النجاح",
		en: "Success criteria"
	},
	hadith: {
		ar: "الهدي النبوي",
		en: "Prophetic guidance"
	},
	pyp: {
		ar: "ملامح البكالوريا",
		en: "IB learner profile"
	},
	scaffold: {
		ar: "سقالة الصف",
		en: "Grade scaffold"
	},
	play: {
		ar: "العب",
		en: "Play"
	},
	practise: {
		ar: "تدرّب",
		en: "Practise"
	},
	partner: {
		ar: "شريك",
		en: "Partner"
	},
	group: {
		ar: "مجموعة",
		en: "Group"
	},
	mission: {
		ar: "مهمة",
		en: "Mission"
	},
	reflect: {
		ar: "تأمل",
		en: "Reflect"
	},
	mastery: {
		ar: "إتقان",
		en: "Mastery"
	},
	checkSequence: {
		ar: "تحقق من الترتيب",
		en: "Check the order"
	},
	sequenceOk: {
		ar: "ترتيب الفرسان صحيح",
		en: "Champion sequence"
	},
	sequenceBad: {
		ar: "حاول مرة أخرى بترتيب أوضح",
		en: "Try a clearer order"
	},
	spotPrompt: {
		ar: "لاحظ · فكّر · تساءل",
		en: "See · Think · Wonder"
	},
	markObserved: {
		ar: "رصدت الملاحظة",
		en: "I noticed this"
	},
	chooseRespectful: {
		ar: "أي الحوار أليق بفارس JPIS؟",
		en: "Which line fits a JPIS champion?"
	},
	whichValue: {
		ar: "أي قيمة تجسدها هذا الموقف؟",
		en: "Which value does this moment live?"
	},
	writeReflection: {
		ar: "اكتب جملة تأمل واحدة",
		en: "Write one reflection sentence"
	},
	shareReflection: {
		ar: "مشاركة التأمل",
		en: "Share reflection"
	},
	certify: {
		ar: "اعتماد الإتقان",
		en: "Certify mastery"
	},
	alreadyDone: {
		ar: "سُجّل هذا النشاط اليوم — أحسنتم الاستمرار",
		en: "Already credited today — keep practising"
	},
	awarded: {
		ar: "أُضيفت النجوم لرصيد الصف",
		en: "Stars added to the class"
	},
	spin: {
		ar: "دَوِّر",
		en: "Spin"
	},
	spinning: {
		ar: "تدور…",
		en: "Spinning…"
	},
	completeChallenge: {
		ar: "أتممت التحدي",
		en: "Challenge done"
	},
	pickStudent: {
		ar: "سحب اسم",
		en: "Draw a name"
	},
	timer: {
		ar: "مؤقت الروتين",
		en: "Routine timer"
	},
	startTimer: {
		ar: "بدء",
		en: "Start"
	},
	pauseTimer: {
		ar: "إيقاف",
		en: "Pause"
	},
	voice: {
		ar: "مستوى الصوت",
		en: "Voice level"
	},
	silence: {
		ar: "صمت تام",
		en: "Silence"
	},
	whisper: {
		ar: "همس الشريك",
		en: "Partner whisper"
	},
	table: {
		ar: "صوت الطاولة",
		en: "Table voice"
	},
	speaker: {
		ar: "صوت العرض",
		en: "Speaker voice"
	},
	squads: {
		ar: "نجوم المجموعات",
		en: "Squad stars"
	},
	checklist: {
		ar: "متابعة اليوم",
		en: "Daily checklist"
	},
	poll: {
		ar: "تصويت اليوم",
		en: "Today's inquiry"
	},
	checkout: {
		ar: "بطاقة المغادرة",
		en: "Exit ticket"
	},
	submitTicket: {
		ar: "تسليم البطاقة",
		en: "Submit ticket"
	},
	goalTomorrow: {
		ar: "التزام واحد للغد",
		en: "One commitment for tomorrow"
	},
	warmup: {
		ar: "إحماء سريع",
		en: "Quick warm-up"
	},
	rollWarmup: {
		ar: "اختر إحماءً عشوائياً",
		en: "Roll a warm-up"
	},
	orientation: {
		ar: "الأيام التمهيدية",
		en: "Orientation days"
	},
	charterPledge: {
		ar: "نتعهد كمجلس صف",
		en: "As a class we pledge"
	},
	printCharter: {
		ar: "طباعة الميثاق",
		en: "Print charter"
	},
	more: {
		ar: "المزيد",
		en: "More"
	},
	focus: {
		ar: "تركيز",
		en: "Focus"
	},
	soundOn: {
		ar: "الصوت",
		en: "Sound"
	},
	emptyRoster: {
		ar: "لا طلاب بعد — أضف أسماء أو ولّد قائمة",
		en: "No students yet — add names or fill the roster"
	},
	selectStudent: {
		ar: "اختر الطالب",
		en: "Select student"
	},
	selectSkill: {
		ar: "المهارة",
		en: "Skill"
	},
	awardStar: {
		ar: "نجمة للطالب",
		en: "Award a star"
	},
	notes: {
		ar: "ملاحظة المعلم",
		en: "Teacher note"
	},
	topAchiever: {
		ar: "البطل الأول",
		en: "Top achiever"
	},
	noData: {
		ar: "لا بيانات بعد",
		en: "Nothing here yet"
	},
	correct: {
		ar: "قرار الفرسان",
		en: "Champion choice"
	},
	rethink: {
		ar: "تأمل من جديد",
		en: "Reflect and rethink"
	},
	previous: {
		ar: "السابق",
		en: "Previous"
	},
	next: {
		ar: "التالي",
		en: "Next"
	},
	caseOf: {
		ar: "موقف",
		en: "Case"
	},
	valuesSuite: {
		ar: "منظومة القيم الخمس",
		en: "Five core values"
	},
	liveIt: {
		ar: "نعيشها في كل موقف",
		en: "Lived in every choice"
	},
	streaks: {
		ar: "سلاسل الالتزام",
		en: "Class streaks"
	},
	badges: {
		ar: "أوسمة الصف",
		en: "Class badges"
	},
	stages: {
		ar: "رحلة الإحسان",
		en: "Ihsan journey"
	},
	juniorOn: {
		ar: "نمط الصفوف الأولية",
		en: "Junior mode"
	},
	privacy: {
		ar: "البيانات تُحفظ على هذا الجهاز فقط",
		en: "Data stays on this device"
	},
	missionSignoff: {
		ar: "اعتماد المعلم للمهمة",
		en: "Teacher sign-off"
	},
	stems: {
		ar: "جمل التغذية الراجعة",
		en: "Feedback stems"
	},
	startPartner: {
		ar: "بدء مؤقت الشريك",
		en: "Start partner timer"
	},
	see: {
		ar: "أرى",
		en: "See"
	},
	think: {
		ar: "أفكر",
		en: "Think"
	},
	wonder: {
		ar: "أتساءل",
		en: "Wonder"
	},
	allClasses: {
		ar: "كل الفصول",
		en: "All classes"
	},
	namePlaceholder: {
		ar: "اسم الطالب",
		en: "Student name"
	},
	rating: {
		ar: "تقييم إحسان الصف اليوم",
		en: "Rate class Ihsan today"
	},
	valueToday: {
		ar: "القيمة التي جسدناها",
		en: "Value we lived today"
	},
	votes: {
		ar: "الأصوات",
		en: "votes"
	},
	resetPoll: {
		ar: "إعادة التصويت",
		en: "Reset poll"
	},
	spinAgain: {
		ar: "دور مرة أخرى",
		en: "Spin again"
	},
	selected: {
		ar: "المختار",
		en: "Selected"
	},
	presets: {
		ar: "مهمات سريعة",
		en: "Quick presets"
	},
	add30: {
		ar: "+٣٠ ث",
		en: "+30s"
	},
	bell: {
		ar: "جرس الانتباه",
		en: "Focus bell"
	},
	editNames: {
		ar: "تعديل الأسماء",
		en: "Edit names"
	},
	clearLog: {
		ar: "مسح السجل",
		en: "Clear log"
	},
	week1: {
		ar: "الأسبوع ١",
		en: "Week 1"
	},
	week2: {
		ar: "الأسبوع ٢",
		en: "Week 2"
	},
	day: {
		ar: "اليوم",
		en: "Day"
	},
	newSkills: {
		ar: "مهارات جديدة",
		en: "New skills"
	},
	review: {
		ar: "مراجعة حلزونية",
		en: "Spiral review"
	},
	rehearsal: {
		ar: "تمرين حركي",
		en: "Physical rehearsal"
	},
	activity: {
		ar: "نشاط",
		en: "Activity"
	},
	drill: {
		ar: "تدريب",
		en: "Drill"
	},
	duration: {
		ar: "المدة",
		en: "Duration"
	},
	printCert: {
		ar: "طباعة الشهادة",
		en: "Print certificate"
	},
	awardedTo: {
		ar: "تُمنح بفخر إلى",
		en: "Proudly awarded to"
	},
	school: {
		ar: "مدارس جدة الخاصة العالمية",
		en: "Jeddah Private International School"
	},
	certTitle: {
		ar: "شهادة فخر وإتقان المهارات الحياتية",
		en: "Certificate of Life Skills Mastery"
	},
	signTeacher: {
		ar: "معلم الصف",
		en: "Homeroom teacher"
	},
	signAdmin: {
		ar: "إدارة المدرسة",
		en: "School administration"
	},
	date: {
		ar: "التاريخ",
		en: "Date"
	},
	ready: {
		ar: "جاهزون؟",
		en: "Ready?"
	},
	challenge: {
		ar: "التحدي",
		en: "Challenge"
	},
	checkAnswer: {
		ar: "تحقق",
		en: "Check"
	},
	continue: {
		ar: "متابعة",
		en: "Continue"
	},
	done: {
		ar: "أُنجز",
		en: "Done"
	},
	of: {
		ar: "من",
		en: "of"
	},
	progress: {
		ar: "التقدم",
		en: "Progress"
	},
	narrator: {
		ar: "صوت الراوي",
		en: "Narrator voice"
	},
	narratorHint: {
		ar: "العربية بلهجة سعودية واضحة، والإنجليزية بصوت أمريكي أصيل.",
		en: "Arabic in a clear Saudi dialect; English in a native American voice."
	},
	voiceAuto: {
		ar: "تلقائي حسب القسم",
		en: "Auto by section"
	},
	voiceMale: {
		ar: "صوت رجالي",
		en: "Male voice"
	},
	voiceFemale: {
		ar: "صوت نسائي",
		en: "Female voice"
	},
	previewVoice: {
		ar: "تجربة الصوت",
		en: "Preview voice"
	},
	preparingVoice: {
		ar: "يجهّز الصوت…",
		en: "Preparing voice…"
	},
	stopListen: {
		ar: "إيقاف",
		en: "Stop"
	},
	listenObjective: {
		ar: "استمع لهدف التعلم كاملاً",
		en: "Listen to the full learning objective"
	},
	listenCriteria: {
		ar: "استمع لمعايير النجاح",
		en: "Listen to the success criteria"
	},
	listenSection: {
		ar: "استمع لهذا القسم",
		en: "Listen to this section"
	},
	whoAchieved: {
		ar: "من أنجز هذا؟",
		en: "Who achieved this?"
	},
	whoAchievedHint: {
		ar: "اختر فارس الصف ليمنح النجمة أو وسام الإتقان، فيظهر اسمه في لوحة الشرف.",
		en: "Choose the champion to receive the star or mastery medal on the honor roll."
	},
	awardMastery: {
		ar: "وسام الإتقان",
		en: "Award mastery"
	},
	celebrateTitle: {
		ar: "أحسنتم أيها الفرسان",
		en: "Well done, champions"
	},
	medalEarned: {
		ar: "الوسام المستحق",
		en: "Medal earned"
	},
	printThisCert: {
		ar: "طباعة شهادة هذا الطالب",
		en: "Print this student's certificate"
	},
	honorMetricsStars: {
		ar: "نجوم الالتزام",
		en: "Commitment stars"
	},
	honorMetricsMastered: {
		ar: "مهارات متقنة",
		en: "Skills mastered"
	},
	honorMetricsChampions: {
		ar: "أبطال اليوم",
		en: "Today's champions"
	},
	bySkill: {
		ar: "حسب المهارة",
		en: "By skill"
	},
	overallHonor: {
		ar: "لوحة الشرف العامة",
		en: "Class honor roll"
	},
	podium: {
		ar: "منصة التتويج",
		en: "Podium"
	},
	noChampionsYet: {
		ar: "لم يُرصد إنجاز فردي بعد — أضف الأسماء وامنح نجمة أو وسام إتقان.",
		en: "No individual awards yet — add names and grant a star or mastery medal."
	},
	fillThenAward: {
		ar: "ولّد الأسماء ثم اختر البطل",
		en: "Fill the roster, then pick a champion"
	},
	skipAward: {
		ar: "لاحقاً",
		en: "Later"
	},
	studentMedals: {
		ar: "أوسمة الطالب",
		en: "Student medals"
	},
	certBodyBoy: {
		ar: "تُمنح هذه الشهادة بكل فخر واعتزاز للبطل المتميز تقديراً لالتزامه الاستثنائي بآداب وسلوكيات الفرسان والقيم الإسلامية ومبادئ مدرسة JPIS.",
		en: "This certificate is proudly awarded to our distinguished champion in recognition of exceptional commitment to knightly manners, Islamic values, and the principles of JPIS."
	},
	certBodyGirl: {
		ar: "تُمنح هذه الشهادة بكل فخر واعتزاز للبطلة المتميزة تقديراً لالتزامها الاستثنائي بآداب وسلوكيات الفرسان والقيم الإسلامية ومبادئ مدرسة JPIS.",
		en: "This certificate is proudly awarded to our distinguished champion in recognition of exceptional commitment to knightly manners, Islamic values, and the principles of JPIS."
	},
	certMedal: {
		ar: "وسام التميز والإتقان الأخلاقي",
		en: "Moral Excellence & Character Mastery Medal"
	},
	viewHonor: {
		ar: "لوحة الشرف",
		en: "Honor roll"
	},
	evaluated: {
		ar: "الطلاب المقيمون",
		en: "Evaluated students"
	},
	totalStarsAwarded: {
		ar: "إجمالي النجوم الممنوحة",
		en: "Total stars awarded"
	},
	printTopCert: {
		ar: "شهادة تقدير للبطل الأول",
		en: "Top achiever certificate"
	},
	printHonor: {
		ar: "طباعة تقرير المنجزين",
		en: "Print honor report"
	},
	resetStars: {
		ar: "تصفير نجوم هذه المهارة",
		en: "Reset this skill's stars"
	},
	knightBoy: {
		ar: "الفارس المتميز:",
		en: "Distinguished champion:"
	},
	knightGirl: {
		ar: "الفارسة المتميزة:",
		en: "Distinguished champion:"
	},
	certReasonBoy: {
		ar: "أظهر إتقاناً وتطبيقاً عملياً لمهارات الحياة اليومية وحقق أعلى معايير الإحسان والانضباط الذاتي في بيئة المدرسة والمجتمع.",
		en: "He demonstrated practical mastery of daily life skills and met the highest standards of Ihsan and self-discipline at school and in the community."
	},
	certReasonGirl: {
		ar: "أظهرت إتقاناً وتطبيقاً عملياً لمهارات الحياة اليومية وحققت أعلى معايير الإحسان والانضباط الذاتي في بيئة المدرسة والمجتمع.",
		en: "She demonstrated practical mastery of daily life skills and met the highest standards of Ihsan and self-discipline at school and in the community."
	},
	certIb: {
		ar: "برنامج البكالوريا الدولية (IB PYP / MYP / DP)",
		en: "IB World School (PYP / MYP / DP)"
	},
	rank: {
		ar: "الرتبة",
		en: "Rank"
	},
	masteryTier: {
		ar: "مستوى الإتقان",
		en: "Mastery tier"
	}
};
function tx(lang, key) {
	return STR[key][lang];
}
var TAB_LABEL = {
	today: {
		ar: "اليوم",
		en: "Today",
		shortAr: "اليوم",
		shortEn: "Today"
	},
	skills: {
		ar: "المهارات",
		en: "Skills",
		shortAr: "مهارات",
		shortEn: "Skills"
	},
	values: {
		ar: "القيم",
		en: "Values",
		shortAr: "قيم",
		shortEn: "Values"
	},
	spiral: {
		ar: "الحلزوني",
		en: "Spiral",
		shortAr: "حلزوني",
		shortEn: "Spiral"
	},
	ihsan: {
		ar: "الإحسان",
		en: "Ihsan",
		shortAr: "إحسان",
		shortEn: "Ihsan"
	},
	scenarios: {
		ar: "المواقف",
		en: "Dilemmas",
		shortAr: "مواقف",
		shortEn: "Cases"
	},
	wheel: {
		ar: "العجلة",
		en: "Wheel",
		shortAr: "عجلة",
		shortEn: "Wheel"
	},
	toolkit: {
		ar: "أدوات المعلم",
		en: "Toolkit",
		shortAr: "أدوات",
		shortEn: "Tools"
	},
	agency: {
		ar: "صوت الطالب",
		en: "Agency",
		shortAr: "صوت",
		shortEn: "Voice"
	},
	charter: {
		ar: "الميثاق",
		en: "Charter",
		shortAr: "ميثاق",
		shortEn: "Charter"
	}
};
var POLL_OPTIONS = {
	ar: [
		"طرق الباب والسكينة عند الدخول",
		"تجهيز الطاولة في ستين ثانية",
		"المشي بالسكينة واليمين في الممرات",
		"تنظيف المقعد بعد الفسحة"
	],
	en: [
		"Gentle knocking and peaceful entrance",
		"Desk launchpad ready in 60 seconds",
		"Calm hallway walk, keeping to the right",
		"Leave-no-trace cleanup after break"
	]
};
var VOICE_COPY = [
	{
		ar: "الإنصات التام للمعلم، والاختبار، وسكينة المصلى.",
		en: "Total quiet for instruction, exams, and prayer."
	},
	{
		ar: "الهمس مع زميل المقعد دون أن يسمعكما الجار.",
		en: "Whisper with your partner without the next desk hearing."
	},
	{
		ar: "نقاش المجموعة الصغيرة دون تشويش على الصف.",
		en: "Small-group talk without disturbing neighbouring teams."
	},
	{
		ar: "صوت واضح ومسموع للجميع أثناء العرض.",
		en: "Clear projection when presenting to the room."
	}
];
var CHARTER_POINTS = {
	ar: [
		"نستأذن بثلاث طرقات خفيفة ونغلق الباب برفق.",
		"نمشي في الممرات بسكينة ونلزم اليمين.",
		"نجهز حقائبنا وطاولاتنا في ستين ثانية.",
		"نخفض أصواتنا حسب مستوى الصف المتفق عليه.",
		"نترك المكان أنظف مما كان، ونحفظ الأمانة.",
		"نساعد زملاءنا بلطف، ونحترم المساحة الشخصية.",
		"نتهيأ للصلاة بوقار ونضع أحذيتنا تحت المقاعد.",
		"نصدق في القول والعمل، ونعترف بالخطأ بشجاعة."
	],
	en: [
		"We ask permission with three gentle knocks and close doors softly.",
		"We walk hallways with sakinah and keep to the right.",
		"We launch bags and desks in sixty seconds.",
		"We match our voices to the agreed classroom level.",
		"We leave no trace and protect what is entrusted to us.",
		"We help peers kindly and honour personal space.",
		"We prepare for prayer with reverence and place shoes under desks.",
		"We tell the truth, keep promises, and admit mistakes with courage."
	]
};
function ListenButton({ ar, en, variant = "label", tone = "default", aria }) {
	const lang = useApp((s) => s.lang);
	const section = useApp((s) => s.section);
	const gender = resolveTtsGender(section, useApp((s) => s.ttsVoice));
	const text = adapt(lang === "ar" ? ar : en, section);
	const key = `${gender}:${lang}:${text.trim()}`;
	const status = useSpeakStatus();
	const active = status.key === key;
	const loading = active && status.phase === "loading";
	const playing = active && status.phase === "playing";
	const caption = voiceCaption(lang, gender);
	const label = playing || loading ? tx(lang, "stopListen") : aria || tx(lang, "listen");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center", variant === "label" ? "gap-2" : ""),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: playing || loading ? "secondary" : "ghost",
			size: variant === "icon" ? "icon" : "sm",
			className: cn(variant === "icon" && "size-11 shrink-0", tone === "onDark" && !playing && !loading && "text-primary-fg hover:bg-primary-fg/12"),
			onClick: (e) => {
				e.stopPropagation();
				if (playing || loading) stopSpeak();
				else speak(text, lang, gender);
			},
			"aria-label": label,
			title: label,
			children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {}), variant === "label" ? loading ? tx(lang, "preparingVoice") : playing ? tx(lang, "stopListen") : tx(lang, "listen") : null]
		}), variant === "label" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "hidden text-[11px] text-muted sm:inline",
			children: [
				caption.name,
				" · ",
				caption.locale
			]
		}) : null]
	});
}
function SpeakHeading({ title, ar, en, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("text-xs font-medium", tone === "onDark" ? "text-primary-fg/80" : "text-muted"),
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
			variant: "icon",
			ar,
			en,
			tone,
			aria: title
		})]
	});
}
function WithSpeak({ ar, en, children, tone = "default", aria, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-start gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 flex-1",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
			variant: "icon",
			ar,
			en,
			tone,
			aria
		})]
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("min-h-24 w-full rounded-lg bg-card p-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-muted focus-visible:outline-none", className),
	...props
}));
Textarea.displayName = "Textarea";
function Badge({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full bg-crest/8 px-2.5 py-1 text-[11px] font-medium tracking-wide text-crest", className),
		children
	});
}
var Dialog = Dialog$1;
function DialogContent({ className, children, wide, overlayClassName }) {
	const lang = useApp((s) => s.lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: cn("fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out", overlayClassName) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 max-h-[min(92vh,900px)] w-[min(96vw,720px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-card p-5 shadow-[var(--shadow-border)] outline-none", wide && "w-[min(96vw,980px)]", className),
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			className: "absolute top-3 end-3 inline-flex size-10 items-center justify-center rounded-md text-muted hover:bg-crest/8 hover:text-fg",
			"aria-label": tx(lang, "close"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-semibold text-fg", className),
		...props
	});
}
function burstConfetti() {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent("fursan:confetti"));
}
var skills_default = /*#__PURE__*/ JSON.parse("[{\"badgeColor\":\"emerald\",\"character\":{\"nameAr\":\"سعود وفهد\",\"nameEn\":\"Saud & Fahad\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: صورة كف يد توضح الطرق بثلاث أصابع باليمين، وبطاقة ملونة على يمين الباب توضح مكان الوقوف.\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: 3-finger visual icon on door right-side showing exact standing spot.\",\"grade4TimerSecs\":45,\"groupChallenge\":{\"investigationStepsAr\":[\"١. ما المشكلة المحددة؟ (الباب مغلق والحصة بدأت)\",\"٢. من سيتأثر بهذا الموقف؟ (المعلم، الطلاب المنصتون، وسعود نفسه)\",\"٣. ما العواقب المتوقعة إذا فتح الباب فجأة؟ (تشتيت انتباه الصف وإزعاج الجميع)\",\"٤. ما القيمة الغائبة في تصرف زميل سعود؟ (الاحترام وحفظ السكينة)\",\"٥. اذكر حلين ممكنين للموقف.\",\"٦. ما الحل الأمثل؟ (الطرق الثلاثي الهادئ، الوقوف جانباً، وإلقاء السلام بلطف)\",\"٧. جملة مهذبة يقولها سعود: «عفواً يا أستاذ، أعتذر عن التأخر، هل تأذن لي بالدخول؟»\"],\"investigationStepsEn\":[\"1. What is the specific problem? (Closed door & class already underway)\",\"2. Who is affected? (The teacher, listening peers, and Saud himself)\",\"3. What are possible consequences of barging in? (Disrupting focus and startling the class)\",\"4. What is the missing value? (Respect and personal composure)\",\"5. Brainstorm 2 possible solutions.\",\"6. What is the best solution? (3 gentle knocks, standing to side, greeting politely)\",\"7. Respectful sentence: 'Excuse me teacher, apologies for the delay, may I enter please?'\"],\"scenarioAr\":\"وصل سعود بعد بدء الحصة بثلاث دقائق. وجد الباب مغلقاً والمعلم يشرح، وبجانبه طالب آخر يدفعه ليفتح الباب سريعاً.\",\"scenarioEn\":\"Saud arrives 3 minutes late. The door is closed and the teacher is teaching. Another student pushes him to barge in fast.\",\"titleAr\":\"محقق المواقف: الباب الموصد وسعود المتأخر\",\"titleEn\":\"Scenario Detective: The Closed Door & Late Arrival\",\"type\":\"scenario_detective\"},\"icon\":\"fa-door-open\",\"id\":\"door_knocking\",\"islamicValueAr\":\"قال رسول الله ﷺ: «الاستئذان ثلاث، فإن أذن لك وإلا فارجع» (متفق عليه) — خلق الرفق وحفظ الحرمات.\",\"islamicValueEn\":\"The Prophet ﷺ said: 'Permission is to be asked thrice; if granted enter, otherwise return.' (Agreed upon) — Kindness and respect for privacy.\",\"jpisValue\":\"Respect\",\"jpisValueAr\":\"الاحترام\",\"juniorCriteriaAr\":[\"أقف بجانب الباب وأطرق ٣ طرقات خفيفة بأصابعي.\",\"أنتظر بهدوء حتى يسمح لي معلمي بالدخول.\",\"أدخل بابتسامة وأقول: «السلام عليكم» وأغلق الباب برفق.\"],\"juniorCriteriaEn\":[\"Stand by the door and tap 3 soft times with my fingers.\",\"Wait patiently until my teacher invites me in.\",\"Step in with a smile, say 'Salam', and close the door softly.\"],\"juniorObjectiveAr\":\"أتعلم كيف أطرق باب فصلي بهدوء ٣ مرات وأنتظر معلمي مبتسماً.\",\"juniorObjectiveEn\":\"I learn to tap our classroom door softly 3 times and wait smiling.\",\"learningObjectiveAr\":\"نتعلم كيف نستأذن ونطرق الباب برفق حتى نُظهر قيمة الاحترام والسكينة وحفظ خصوصية الصف.\",\"learningObjectiveEn\":\"We are learning how to knock and enter respectfully so that we can demonstrate Respect, tranquility, and classroom privacy.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أعرف الخطوات الخمس نظرياً وأميز بين الطرق الهادئ والعنيف\",\"en\":\"Learning: Understand the 5 steps and distinguish gentle vs harsh knocking\"},\"tier2\":{\"ar\":\"أتدرب: أطبق الطرق الخفيف وإغلاق الباب بنجاح في نشاط تبادل الأدوار\",\"en\":\"Practising: Demonstrate gentle knock and soft door closure in role-play\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: أمارس الاستئذان وإغلاق الباب برفق طوال اليوم دون تذكير\",\"en\":\"Independent: Consistently practice respectful entry throughout the school day unprompted\"}},\"minigame\":{\"instructionAr\":\"رتب خطوات دخول الفصل بالترتيب الصحيح، ثم نفذها عملياً مع زميلك!\",\"instructionEn\":\"Arrange the classroom entry steps in the correct sequence, then demonstrate physically!\",\"steps\":[{\"id\":1,\"textAr\":\"الوقوف بهدوء على يمين الباب أو يساره وليس في الوسط\",\"textEn\":\"Stand calmly to the right or left of the door, not in the center\"},{\"id\":2,\"textAr\":\"طرق الباب بأطراف الأصابع ٣ طرقات خفيفة ومتباعدة\",\"textEn\":\"Tap gently with fingertips 3 distinct quiet times\"},{\"id\":3,\"textAr\":\"الانتظار بصبر حتى يسمعك المعلم ويأذن لك بالدخول\",\"textEn\":\"Wait patiently for the teacher to grant permission\"},{\"id\":4,\"textAr\":\"الدخول بابتسامة وإلقاء تحية الإسلام: «السلام عليكم»\",\"textEn\":\"Step inside with a smile and greet with 'As-salamu Alaykum'\"},{\"id\":5,\"textAr\":\"إمساك مقبض الباب وإغلاقه برفق تام دون أي تصفيق\",\"textEn\":\"Hold the door handle and close it softly with zero slamming sound\"}],\"titleAr\":\"لعبة ترتيب خطوات الاستئذان\",\"titleEn\":\"Door Etiquette Sequence Challenge\",\"type\":\"put_in_order\"},\"partner\":{\"promptAr\":\"يشرح الطالب لزميله في ٦٠ ثانية: لماذا أمرنا النبي ﷺ بالاستئذان ثلاثاً والوقوف جانباً؟ ثم يلخص الزميل كلامه ويضيف تفصيلاً ناقصاً.\",\"promptEn\":\"Student explains to partner in 60 seconds: Why did the Prophet ﷺ command asking permission 3 times and standing to the side? Partner paraphrases and adds one detail.\",\"titleAr\":\"مدرب الدقيقة الواحدة (One-Minute Coach)\",\"titleEn\":\"One-Minute Coach Protocol\"},\"practise\":{\"promptAr\":\"يتناوب الطالبان (أ) و (ب): يخرج الطالب (أ) ويطبق الطرق الثلاثي والوقوف بالجانب وإغلاق الباب برفق، بينما يلاحظه (ب) وفق معايير النجاح، ثم يتبادلان الأدوار!\",\"promptEn\":\"Partners A & B switch: Student A steps outside to model the 3 gentle taps, standing to side, and quiet door closure while Student B observes against criteria. Then switch!\",\"stemsAr\":[\"«أظهرت قيمة الاحترام عندما طرقت برفق ٣ مرات ولم تدفع الباب بقوة.»\",\"«في المرة القادمة يمكنك تحسين إغلاق الباب من خلال إمساك المقبض حتى النهاية دون تصفيق.»\"],\"stemsEn\":[\"'You demonstrated Respect when you knocked gently 3 times without banging.'\",\"'Next time, you could improve by holding the door handle until it latches quietly without slamming.'\"],\"titleAr\":\"تدريب تبادل الأدوار (Role-Play Switch)\",\"titleEn\":\"Role-Play Switch & Physical Rehearsal\"},\"pypProfile\":[\"Principled\",\"Caring\"],\"pypProfileAr\":[\"ذو مبادئ\",\"مهتم\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"خلال اليوم الدراسي بأكمله: أي طالب يدخل الصف أو غرفة المعلمين يطبق خطوات الاستئذان الثلاث وإغلاق الباب برفق دون أي تذكير من المعلم!\",\"taskEn\":\"Throughout the entire school day: Any student entering the classroom or staffroom demonstrates the 3-knock rule and soft door closure with zero teacher reminders!\",\"titleAr\":\"مهمة فرسان اليوم: الاستئذان الذهبي في كل تنقل\",\"titleEn\":\"Today's Real-Life Mission: Golden Door Etiquette\"},\"reflection\":{\"questionAr\":\"كيف يحمي الاستئذان خصوصية الآخرين وكرامتهم؟ وما الذي ستفعله إذا طرقت ٣ مرات ولم يأذن لك أحد؟\",\"questionEn\":\"How does asking permission protect others' privacy and dignity? What will you do if you knock 3 times and no one answers?\"},\"successCriteriaAr\":[\"أشرح أهمية الاستئذان وحفظ خصوصية الدرس.\",\"أرتب خطوات الاستئذان الخمس ترتيباً صحيحاً.\",\"أطبق الطرق الخفيف الثلاثي والوقوف بالجانب وإغلاق الباب برفق بأمان.\",\"أساعد زميلي في تبادل الأدوار وأعطيه تغذية راجعة مهذبة.\",\"أحدد حديث الاستئذان النبوي وملمحي (ذو مبادئ) و(مهتم).\",\"أتأمل في هدوء دخولي وأحدد خطوة لتحسينه.\"],\"successCriteriaEn\":[\"Explain why respectful entry and privacy matter.\",\"Put the 5 door-entry steps into correct sequence.\",\"Demonstrate the 3 gentle knocks, standing to the side, and quiet door closure safely.\",\"Help a partner improve during role-play using respectful sentence stems.\",\"Identify the Hadith on Isti'dhan and the PYP attributes (Principled & Caring).\",\"Reflect on my calm entrance and commit to a tangible improvement.\"],\"taglineAr\":\"ثلاث طرقات هادئة، وقوف بالجانب، وسلام برفق\",\"taglineEn\":\"3 gentle knocks, standing to side, entering with Salam\",\"titleAr\":\"١. أدب الاستئذان وطرق الباب برفق\",\"titleEn\":\"1. Knocking & Gentle Door Entry\"},{\"badgeColor\":\"amber\",\"character\":{\"nameAr\":\"فيصل\",\"nameEn\":\"Faisal\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: مؤقت ٩٠ ثانية (بدل ٦٠)، وبطاقة ألوان للمواد (الكتاب، المقلمة، الزمزمية).\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: Extended 90-second launchpad timer with color-coded checklist for book, pencil case, bottle.\",\"grade4TimerSecs\":90,\"groupChallenge\":{\"scenarioAr\":\"يقوم المعلم بتمثيل دخول الصباح ويتعمد ارتكاب ٣ أخطاء آمنة (يترك حقيبته في الممر، يترك قارورة الماء مفتوحة فوق الأوراق، ويبحث عن قلمه بعد بدء الشرح). تتنافس المجموعات في رصد الأخطاء الثلاثة وتصحيحها بلباقة!\",\"scenarioEn\":\"Teacher deliberately models morning arrival with 3 safe mistakes (leaving bag in aisle, open water bottle near paper, hunting for marker after talking starts). Groups spot and respectfully correct all 3!\",\"targetMistakesAr\":[\"١. الحقيبة تسد الممر\",\"٢. زجاجة الماء مفتوحة فوق الورق\",\"٣. عدم تجهيز القلم قبل بدء الدرس\"],\"targetMistakesEn\":[\"1. Bag blocking walking aisle\",\"2. Open water bottle on papers\",\"3. Stationery not prepped before class starts\"],\"titleAr\":\"صحح خطأ المعلم (Beat the Teacher)\",\"titleEn\":\"Beat the Teacher Observation Challenge\",\"type\":\"beat_the_teacher\"},\"icon\":\"fa-briefcase\",\"id\":\"bag_routine\",\"islamicValueAr\":\"قال رسول الله ﷺ: «إن الله يحب إذا عمل أحدكم عملاً أن يتقنه» (رواه البيهقي في شعب الإيمان وحسنه الألباني) — قيمة الإتقان والمسؤولية الشخصية.\",\"islamicValueEn\":\"The Prophet ﷺ said: 'Allah loves that when one of you does a deed, he masters it with excellence' (Bayhaqi, Hasan by Al-Albani) — Excellence & personal responsibility.\",\"jpisValue\":\"Responsibility\",\"jpisValueAr\":\"المسؤولية\",\"juniorCriteriaAr\":[\"أعلق حقيبتي وأغلق سحابها حتى لا يسقط شيء.\",\"أخرج كتابي وقلمي وأضعهما مرتبين أمامي.\",\"أتأكد أن قارورة مائي مغلقة جيداً في مكانها الآمن.\"],\"juniorCriteriaEn\":[\"Hang my backpack and zip it completely so nothing drops.\",\"Take out my book and pencil, placing them neatly on my desk.\",\"Check that my water bottle is closed tight in its safe spot.\"],\"juniorObjectiveAr\":\"أتعلم كيف أجهز كتبي ومقلمتي على طاولتي وأعلق حقيبتي بنظام.\",\"juniorObjectiveEn\":\"I learn to place my books on my desk and hang my backpack neatly.\",\"learningObjectiveAr\":\"نتعلم كيف ننظم حقيبتنا وطاولتنا في ٦٠ ثانية حتى نُظهر قيمة المسؤولية والإتقان في طلب العلم.\",\"learningObjectiveEn\":\"We are learning how to organize our backpack and desk in 60 seconds so that we can demonstrate Responsibility and excellence in learning.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أميز الطاولة المنظمة من الطاولة الفوضوية\",\"en\":\"Learning: Distinguish organized desk from cluttered desk\"},\"tier2\":{\"ar\":\"أتدرب: أنظم طاولتي وحقيبتي في أقل من دقيقة بنجاح\",\"en\":\"Practising: Organize desk and bag in under 60s in practice drills\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: طاولتي وممري مرتبان دائماً طوال الأسبوع دون أي تنبيه\",\"en\":\"Independent: Desk and aisle consistently spotless all week without reminders\"}},\"minigame\":{\"sceneAr\":\"وصل فيصل ورمى حقيبته في ممر الصف، وفتح علبة ألوانه مبعثرة على الطاولة، وزجاجة الماء مفتوحة بجانب دفتر الرياضيات المفتوح، وبدأ يبحث عن قلمه بعد رنين الجرس.\",\"sceneEn\":\"Faisal arrives and dumps his backpack in the walking aisle, spills markers across the desk, leaves an open water bottle right next to his math book, and searches frantically for a pencil after the bell.\",\"seeThinkWonderAr\":{\"see\":\"ماذا تلاحظ في الصورة/المشهد؟ (حقيبة تسد الممر، ماء مهدد بالانسكاب، أقلام مبعثرة)\",\"think\":\"ماذا تعتقد أنه سيحدث إذا تعثر زميل بالحقيبة أو انسكب الماء؟ (تلف الدفاتر، تعثر الطلاب، ضياع وقت الحصة)\",\"wonder\":\"ما الأسئلة التي يجب أن يسألها فيصل لنفسه؟ (كيف أجعل طاولتي مرتبة في ٦٠ ثانية؟ أين أضع زجاجة الماء بأمان؟)\"},\"seeThinkWonderEn\":{\"see\":\"What do you observe? (Backpack blocking aisle, open water bottle near notebook, scattered crayons)\",\"think\":\"What could happen if a peer trips or water spills? (Damaged books, hallway injuries, lost learning time)\",\"wonder\":\"What questions should Faisal ask himself? (How can I launch my desk in 60s? Where is the safest spot for my bottle?)\"},\"titleAr\":\"اكتشف الخطأ: طاولة فيصل المزدحمة\",\"titleEn\":\"Spot the Problem: Faisal's Cluttered Launchpad\",\"type\":\"spot_problem\"},\"partner\":{\"promptAr\":\"ينظر كل طالب إلى طاولة زميله: هل الممر خالٍ؟ هل الزجاجة مغلقة؟ هل الأدوات جاهزة؟ يعطي زميله إشارة الإبهام للأعلى 👍 أو نصيحة سريعة.\",\"promptEn\":\"Partners audit each other's desk: Is the aisle clear? Is the bottle capped? Are supplies ready? Give a thumbs-up 👍 or quick polite tip.\",\"titleAr\":\"فحص جاهزية الشريك (Partner Readiness Audit)\",\"titleEn\":\"Partner Readiness Audit\"},\"practise\":{\"promptAr\":\"يطلق المعلم مؤقت الـ ٦٠ ثانية: يعلق كل طالب حقيبته، يخرج الكتاب والدفتر والمقلمة، يؤمن زجاجة الماء، ويغلق سحاب الحقيبة ويجلس بانتصاب!\",\"promptEn\":\"Teacher starts 60-second timer: Every student hangs bag, retrieves book/notebook/pencil case, secures water bottle, zips bag, and sits upright!\",\"stemsAr\":[\"«أظهرت قيمة المسؤولية عندما أغلقت سحاب الحقيبة بالكامل وأمنت زجاجة الماء.»\",\"«في المرة القادمة يمكنك تحسين تنظيمك بإخراج كتاب الحصة فقط وإبقاء باقي الكتب في الحقيبة.»\"],\"stemsEn\":[\"'You demonstrated Responsibility when you zipped your backpack and secured your water bottle.'\",\"'Next time, you could improve by taking out only the current subject book to keep the desk clutter-free.'\"],\"titleAr\":\"تحدي الـ ٦٠ ثانية لتجهيز الطاولة (Faisal's 60s Blitz)\",\"titleEn\":\"Faisal's 60-Second Blitz Rehearsal\"},\"pypProfile\":[\"Balanced\",\"Principled\"],\"pypProfileAr\":[\"متوازن\",\"ذو مبادئ\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"عند بداية كل حصة اليوم: التأكد من خلو جميع ممرات الصف من أي حقيبة أو أداة ملقاة بنسبة ١٠٠٪!\",\"taskEn\":\"At the start of every lesson today: Ensure 100% of classroom aisles are completely free of bags and clutter!\",\"titleAr\":\"مهمة فحص الممرات الصباحية\",\"titleEn\":\"Morning Aisle Safety Mission\"},\"reflection\":{\"questionAr\":\"ما النظام الشخصي الذي ستتبعه في بيتك وحقيبتك لتتأكد أنك أحضرت جميع أدواتك دون أن تنسى شيئاً؟\",\"questionEn\":\"What personal routine can you set at home so you never forget necessary books or stationery?\"},\"successCriteriaAr\":[\"أشرح كيف يوفر تجهيز الطاولة المبكر وقت التعلم ويمنع التشتت.\",\"أرتب أدواتي على الطاولة بنظام دون مبعثرات.\",\"أعلق حقيبتي وأغلق سحابها بالكامل وأؤمن زجاجة الماء.\",\"أساعد زميل طاولتي في فحص جاهزية أدواته باحترام.\",\"أربط مهارة تنظيم الحقيبة بحديث «إن الله يحب إذا عمل أحدكم عملاً أن يتقنه».\",\"أتأمل في سرعة إعداد طاولتي وأضع خطة لأكون أسرع غداً.\"],\"successCriteriaEn\":[\"Explain how early desk setup protects learning time and prevents distraction.\",\"Arrange tools and stationery neatly on the desk without clutter.\",\"Hang backpack, zip it completely, and secure water bottle safely.\",\"Help my table partner audit desk readiness respectfully.\",\"Link desk organization to the Hadith: 'Allah loves when you do a deed, to do it with mastery.'\",\"Reflect on my setup speed and plan to be even more efficient tomorrow.\"],\"taglineAr\":\"تجهيز أدوات الحصة في ٦٠ ثانية والحرص على الأمانة\",\"taglineEn\":\"Readying books and supplies in 60s with full ownership\",\"titleAr\":\"٢. تفقد الحقيبة وتنظيم طاولة التعلم\",\"titleEn\":\"2. Morning Bag Check & Desk Readiness\"},{\"badgeColor\":\"blue\",\"character\":{\"nameAr\":\"سلمان وطارق\",\"nameEn\":\"Salman & Tariq\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: خط بصري أصفر على يمين الممر، وشعار 'أقدام الفهد الهادئة' دون صوت.\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: Visual yellow guide line on right corridor wall, 'Silent Steps' challenge.\",\"grade4TimerSecs\":60,\"groupChallenge\":{\"categoriesAr\":[\"في الممرات: التزام اليمين والسكينة\",\"في الصف: رفع اليد وتجهيز الطاولة\",\"في كل مكان: كف الأذى والابتسامة\"],\"categoriesEn\":[\"In Hallways: Keeping right & composure\",\"In Class: Hand raising & desk launch\",\"Everywhere: Safety & kind smiles\"],\"scenarioAr\":\"تصنف المجموعات بطاقات السلوكيات إلى: (داخل الصف / في الممرات / في الحمام / في كل مكان)، ثم ينفذ ممثل المجموعة حركة المشي الوقور أمام الصف بدقة وأمان!\",\"scenarioEn\":\"Groups sort behavior cards into: (Classroom / Hallway / Restroom / Everywhere), then a squad champion demonstrates serene walking with zero speed-racing!\",\"titleAr\":\"تتابع الروتين (Routine Relay)\",\"titleEn\":\"Routine Relay Categorization\",\"type\":\"routine_relay\"},\"icon\":\"fa-person-walking\",\"id\":\"hallway_sakinah\",\"islamicValueAr\":\"«عليكم بالسكينة والوقار» (متفق عليه)، وقوله تعالى: ﴿وَاقْصِدْ فِي مَشْيِكَ﴾ — أدب المسلم في هيئته ومشيه.\",\"islamicValueEn\":\"The Prophet ﷺ said: 'Adhere to tranquility and dignity.' Also: 'And be moderate in your pace' (Quran 31:19).\",\"jpisValue\":\"Respect\",\"jpisValueAr\":\"الاحترام\",\"juniorCriteriaAr\":[\"أمشي بخطوات هادئة كالفهد الذكي دون صوت.\",\"ألتزم جهة اليمين دائماً لأترك مسافة لأصدقائي.\",\"أبتسم لمن أراه دون لمس الجدران أو الأبواب.\"],\"juniorCriteriaEn\":[\"Walk with quiet, gentle footsteps without noise.\",\"Keep to the right side to leave plenty of room for friends.\",\"Smile at passersby without touching walls or doors.\"],\"juniorObjectiveAr\":\"أتعلم كيف أمشي في ممر مدرستي بهدوء في جهة اليمين دون ركض.\",\"juniorObjectiveEn\":\"I learn to walk quietly on the right side of the hallway without running.\",\"learningObjectiveAr\":\"نتعلم كيف نمشي بسكينة ووقار ونلتزم اليمين حتى نُظهر قيمة الاحترام والرفق بالآخرين وسلامة الجميع.\",\"learningObjectiveEn\":\"We are learning how to walk calmly on the right side so that we can demonstrate Respect, dignity, and safety for everyone in our school.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أعرف قانون اليمين والسكينة نظرياً\",\"en\":\"Learning: Understand right-side rule and tranquility conceptually\"},\"tier2\":{\"ar\":\"أتدرب: أمشي بهدوء والتزم اليمين في تدريبات الصف والممرات\",\"en\":\"Practising: Walk calmly on the right side during class and hallway drills\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: ألتزم بالسكينة التامة في كل تنقل مدرسي طوال الأسبوع\",\"en\":\"Independent: Consistently move with tranquility throughout every school transition\"}},\"minigame\":{\"sceneAr\":\"سلمان يركض بأقصى سرعته في منتصف الممر ليلحق بصديقه، بينما طارق يزحف بيده على جدران الفصول ويطرق الأبواب بصوت مرتفع، وفصل مجاور يجري اختباراً قصيراً.\",\"sceneEn\":\"Salman sprints at top speed down the center of the hallway to catch his friend, while Tariq drags his hands on classroom doors, making loud bangs while a neighboring class takes a quiz.\",\"seeThinkWonderAr\":{\"see\":\"ماذا تلاحظ في المشهد؟ (ركض سريع في المنتصف، ضرب على الأبواب، إزعاج للفصول)\",\"think\":\"ما الخطر المحتمل؟ (اصطدام بشخص يخرج من الباب، انزلاق وسقوط، تشتيت اختبار الفصل المجاور)\",\"wonder\":\"ما التساؤل التربوي؟ (كيف يعكس مشينا بالسكينة صورة المسلم الراقي ذي المبادئ؟)\"},\"seeThinkWonderEn\":{\"see\":\"What do you observe? (Center hallway sprinting, slamming doors, disturbing adjacent rooms)\",\"think\":\"What is the danger? (Colliding with someone exiting, dangerous slips, ruining a quiz)\",\"wonder\":\"What is the reflective question? (How does walking with dignity reflect our Islamic values?)\"},\"titleAr\":\"اكتشف الخطأ: فوضى في ممر المدرسة\",\"titleEn\":\"Spot the Problem: Hallway Commotion\",\"type\":\"spot_problem\"},\"partner\":{\"promptAr\":\"يمشي الطالبان معاً كزميلين: يراقب كل منهما الآخر للتأكد من المشي على اليمين وترك مسافة ذراع واحدة والتزام الصمت التام.\",\"promptEn\":\"Partners walk together: Audit each other to ensure staying on the right, keeping one arm-length distance, and maintaining zero vocal noise.\",\"titleAr\":\"ملاحظة السكينة والمحاذاة\",\"titleEn\":\"Pacing & Spacing Partner Check\"},\"practise\":{\"promptAr\":\"يقف الطلاب في خط مستقيم على الجانب الأيمن من الصف: يمشون مسافة ١٠ أمتار دون إصدار صوت حذاء واحد ودون ملامسة الجدران، مع تبادل ابتسامة السلام!\",\"promptEn\":\"Students line up on the right side: Walk a 10-meter distance in absolute silence with zero foot-stomping and zero wall-touching, offering a warm nod of Salam!\",\"stemsAr\":[\"«أظهرت قيمة الاحترام والسكينة عندما التزمت الجانب الأيمن ومشيت بهدوء تام.»\",\"«في المرة القادمة يمكنك تحسين وقارك بإبقاء يديك جانباً دون ملامسة الأبواب.»\"],\"stemsEn\":[\"'You demonstrated Respect and tranquility when staying on the right side calmly.'\",\"'Next time, you can improve by keeping hands relaxed by your sides without touching doors.'\"],\"titleAr\":\"تحدي السكينة الصامت (The Silent Glide)\",\"titleEn\":\"The Silent Glide Physical Rehearsal\"},\"pypProfile\":[\"Reflective\",\"Principled\"],\"pypProfileAr\":[\"متأمل\",\"ذو مبادئ\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"الانتقال الكامل للصف من الفصل إلى المصلى أو الملعب في طابور أيمن صامت بنسبة ١٠٠٪ دون أي تنبيه من المعلم!\",\"taskEn\":\"Move the entire class to the Musalla or PE field on the right side in 100% serene silence without a single reminder!\",\"titleAr\":\"مهمة الانتقال الصامت إلى حصة التربية البدنية أو المصلى\",\"titleEn\":\"Silent Hallway Transition Mission\"},\"reflection\":{\"questionAr\":\"كيف يحمي المشي الهادئ سلامتي وسلامة زملائي؟ وما أثر خفض الصوت في الممرات على الطلاب المنصتين في الفصول الأخرى؟\",\"questionEn\":\"How does calm walking protect everyone's physical safety? How does lowering hallway noise respect learning in adjacent rooms?\"},\"successCriteriaAr\":[\"أشرح لماذا خُصصت الممرات للمشي الهادئ وليس للركض والسباق.\",\"ألتزم الجانب الأيمن دائماً أثناء الحركة في الممرات والسلالم.\",\"أمشي بخطوات رزينة وصوت صامت (مستوى ٠) دون لمس الجدران.\",\"أساعد زملائي في الطابور على المحافظة على مسافة الأمان دون تدافع.\",\"أربط سكينة المشي بحديث «عليكم بالسكينة والوقار» والآية ﴿وَاقْصِدْ فِي مَشْيِكَ﴾.\",\"أتأمل في هدوء مشيي بعد كل حصة وأصحح حركتي فوراً.\"],\"successCriteriaEn\":[\"Explain why corridors are designated for peaceful walking, not racing.\",\"Always stay strictly to the right side when moving through hallways and stairs.\",\"Walk with calm footsteps at voice level 0 without touching walls or lockers.\",\"Help line peers maintain safe spacing without jostling or shoving.\",\"Connect hallway composure to the Hadith: 'Adhere to tranquility' and Quran 31:19.\",\"Reflect on my walking pace after each transition and self-correct calmly.\"],\"taglineAr\":\"الممرات للمشي لا للسباق، بالسكينة نكسب الأجر\",\"taglineEn\":\"Hallways are for walking, not racing; dignity earns reward\",\"titleAr\":\"٣. سكينة الممرات (المشي بالوقار والتزام اليمين)\",\"titleEn\":\"3. Hallway Sakinah (Walking Calmly & To the Right)\"},{\"badgeColor\":\"indigo\",\"character\":{\"nameAr\":\"عمر وريان\",\"nameEn\":\"Omar & Rayan\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: إشارات يد مبسطة ثلاث: (١ للإذن بالكلام، ٢ للحمام، ٣ للماء)، وتحدي تواصل بصري ٣٠ ثانية.\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: Simplified 3-finger hand signals (1: Speak, 2: Restroom, 3: Water) with 30s eye-contact game.\",\"grade4TimerSecs\":45,\"groupChallenge\":{\"investigationStepsAr\":[\"١. ما المشكلة؟ (الهمس الجانبي وتشتيت القارئ)\",\"٢. من المتأثر؟ (الطالب القارئ، المعلم، والصف بأكمله)\",\"٣. ما العواقب؟ (شعور القارئ بالحرج، ضياع فائدة الدرس)\",\"٤. ما القيمة الغائبة؟ (الاحترام والمسؤولية)\",\"٥. حلان بديلان للموقف.\",\"٦. الحل الأفضل: (إبقاء الدفتر مغلقاً والإنصات للقارئ وتشجيعه بعد الانتهاء)\",\"٧. جملة لبقة: «دعنا نستمع لزميلنا الآن وسأرى رسمك الجميل في وقت الفسحة!»\"],\"investigationStepsEn\":[\"1. What is the problem? (Side whispering distracting the reader)\",\"2. Who is affected? (The reader, teacher, and whole class)\",\"3. Consequences? (Reader feels embarrassed, learning flow ruined)\",\"4. Missing value? (Respect and Responsibility)\",\"5. Two alternative actions.\",\"6. Best solution: (Keep notebook shut, listen attentively, encourage reader afterward)\",\"7. Respectful whisper: 'Let us listen to our brother now; I would love to see your sketch at recess!'\"],\"scenarioAr\":\"أثناء قراءة طالب لنص لغتي، حاول زميله بجانبه أن يهمس له ليعرض عليه رسماً في دفتره، فشعر القارئ بالحرج والتردد.\",\"scenarioEn\":\"While a classmate reads an ELA passage, his partner tries to whisper to show him a sketch in his notebook, making the reader stumble and feel embarrassed.\",\"titleAr\":\"محقق المواقف: الهمس الجانبي أثناء القراءة\",\"titleEn\":\"Scenario Detective: Side Whispering During Reading\",\"type\":\"scenario_detective\"},\"icon\":\"fa-ear-listen\",\"id\":\"attentive_listening\",\"islamicValueAr\":\"من هدي صحابة النبي ﷺ في مجالس العلم: «كأن على رؤوسهم الطير» (رواه أبو داود والترمذي وصححه الألباني) — تعظيم مجالس العلم وتوقير المعلم وحسن الإنصات.\",\"islamicValueEn\":\"From the noble Adab of the Sahabah in gatherings of knowledge: 'Sitting as if birds were perched upon their heads' (Abu Dawud & Tirmidhi) — Reverence for learning and attentive listening.\",\"jpisValue\":\"Respect\",\"jpisValueAr\":\"الاحترام\",\"juniorCriteriaAr\":[\"أنظر باهتمام إلى معلمي وهو يشرح.\",\"أجلس بهدوء وأجعل أذني منصتة دون مقاطعة.\",\"أرفع يدي بأدب وأنتظر دوري عندما أريد التحدث.\"],\"juniorCriteriaEn\":[\"Look attentively at my teacher while they speak.\",\"Sit still and listen carefully without interrupting.\",\"Raise my hand politely and wait for my turn to speak.\"],\"juniorObjectiveAr\":\"أتعلم كيف أنصت لمعلمي بعيني وأذني عندما يتحدث في الفصل.\",\"juniorObjectiveEn\":\"I learn to look at and listen carefully to my teacher when they speak.\",\"learningObjectiveAr\":\"نتعلم كيف ننصت بحضور الذهن ونوقر المتحدث حتى نُظهر قيمة الاحترام وأدب طلب العلم.\",\"learningObjectiveEn\":\"We are learning how to listen with active presence and respect the speaker so that we can demonstrate Respect and the etiquette of seeking knowledge.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أميز الاستماع النشط من الانشغال والتشتت\",\"en\":\"Learning: Distinguish active listening from fidgeting and distraction\"},\"tier2\":{\"ar\":\"أتدرب: أمارس الاستماع المركز وإعادة الصياغة مع زميلي بنجاح\",\"en\":\"Practising: Practice focused listening and paraphrasing with partner\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: أنصت بحضور ذهني ووقار طوال جميع الحصص دون تنبيه\",\"en\":\"Independent: Consistently attentive across all subjects without reminders\"}},\"minigame\":{\"badDialogueAr\":\"«يا أستاذ! اسمعني أنا! هذا سهل جداً ولماذا تشرحه أصلاً؟!»\",\"badDialogueEn\":\"'Teacher! Listen to me! This is so easy, why are you even explaining this?!'\",\"goodDialogueAr\":\"«(يرفع يده بهدوء وينتظر إذن المعلم، ثم يقول بتهذيب): أستاذي الكريم، هل تأذن لي بمشاركة طريقة تفكيري بعد أن تكمل الشرح؟»\",\"goodDialogueEn\":\"'(Raises hand calmly, waits for permission, then speaks respectfully): Teacher, may I share my reasoning once you finish explaining?'\",\"sceneAr\":\"المعلم يشرح مسألة حسابية، فقاطعه ريان بصوت مرتفع دون رفع يده قائلاً: «يا أستاذ، هذا سهل جداً وأنا أعرفه!» مما شتت زميله عمر.\",\"sceneEn\":\"The teacher is explaining a math problem when Rayan loudly shouts without raising his hand: 'Teacher, this is too easy, I already know it!', interrupting Omar's focus.\",\"titleAr\":\"أصلح الحوار: المقاطعة أثناء الشرح\",\"titleEn\":\"Fix the Dialogue: Interrupting Mid-Lesson\",\"type\":\"fix_dialogue\"},\"partner\":{\"promptAr\":\"يتحدث الطالب الأول عن هوايته في ٣ جمل، ويستمع الثاني دون أي مقاطعة، ثم يبدأ جملته بـ: «ما فهمته من كلامك هو...»، ثم يتبادلان الأدوار.\",\"promptEn\":\"Partner A speaks for 3 sentences about a hobby; Partner B listens with zero interruptions, then begins with: 'What I understood from you is...', then switch.\",\"titleAr\":\"الإنصات وإعادة الصياغة (Paraphrase Protocol)\",\"titleEn\":\"Listen & Paraphrase Partner Drill\"},\"practise\":{\"promptAr\":\"دقيقتان من الإنصات التام: يشرح المعلم مفهوماً، يضع الطلاب الأقلام، يتواصلون بالبصر، ولا يقاطع أحد. ثم يُطلب من ريان وعمر تلخيص الفكرة الرئيسية بإتقان!\",\"promptEn\":\"2 minutes of total stillness: Teacher explains a concept, pencils down, full eye contact, zero interruptions. Then Omar & Rayan summarize the core point with precision!\",\"stemsAr\":[\"«أظهرت ملمح المتواصل الواعي عندما استمعت لزميلك دون مقاطعة حتى أنهى فكرته.»\",\"«في المرة القادمة يمكنك تحسين تركيزك بوضع قلمك جانباً وتوجيه بصرك نحو المتحدث.»\"],\"stemsEn\":[\"'You showed Communicator excellence when listening to your peer without interrupting until he finished.'\",\"'Next time, you can enhance your focus by setting your pencil down and directing full eye contact.'\"],\"titleAr\":\"تدريب مجلس العلم الوقور (The Scholar Circle)\",\"titleEn\":\"The Scholar Circle Rehearsal\"},\"pypProfile\":[\"Communicator\",\"Thinker\"],\"pypProfileAr\":[\"متواصل\",\"مفكر\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"تحقيق ٥ جلسات استماع متتالية خلال الحصة بنسبة ١٠٠٪ دون أي مقاطعة ودون أي حديث جانبي!\",\"taskEn\":\"Achieve 5 consecutive listening checks with 100% focus, zero interruptions, and zero side talk!\",\"titleAr\":\"مهمة الـ ٥ علامات استماع متتالية\",\"titleEn\":\"5 Consecutive Perfect Listening Checks\"},\"reflection\":{\"questionAr\":\"لماذا كان كبار العلماء يصفون حسن الاستماع بأنه 'أصل العلم كله'؟ وما الشعور الذي تتركه في قلب زميلك حين تنصت له باهتمام؟\",\"questionEn\":\"Why did great scholars describe active listening as the foundation of all learning? How does listening make a peer feel valued?\"},\"successCriteriaAr\":[\"أشرح كيف يعظم حسن الإنصات العلم ويظهر التقدير للمعلم والزميل.\",\"أوجه بصري وجسدي بالكامل نحو المتحدث وأضع الأقلام جانباً.\",\"أستمع للفكرة كاملة دون مقاطعة وأفكر قبل الإجابة.\",\"أرفع يدي بهدوء وأنتظر دوري باحترام وصبر.\",\"أربط أدب الاستماع بهدي الصحابة: «كأن على رؤوسهم الطير».\",\"أتأمل في قدرتي على التركيز وأحدد عادة تشتت سأتخلص منها.\"],\"successCriteriaEn\":[\"Explain how active listening honors knowledge and shows appreciation for speakers.\",\"Direct posture and eye contact fully to the speaker; set pencils down.\",\"Listen to the full idea without interrupting, thinking deeply before responding.\",\"Raise hand calmly and wait for turn with patience and dignity.\",\"Connect attentive listening to the Companions' posture: 'as if birds were on their heads.'\",\"Reflect on my focus level and eliminate one personal distraction.\"],\"taglineAr\":\"العين ترنو، والأذن تنصت، والعقل يتفكر\",\"taglineEn\":\"Eyes focused, ears attentive, mind inquiring\",\"titleAr\":\"٤. أدب طالب العلم والاستماع اليقظ للمعلم\",\"titleEn\":\"4. Attentive Listening & Scholar Etiquette\"},{\"badgeColor\":\"cyan\",\"character\":{\"nameAr\":\"خالد\",\"nameEn\":\"Khalid\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: بطاقة خطة الـ ٢٠ ثانية لغسل اليدين مع أنشودة الصابون، ومؤشر صنبور الماء المغلق.\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: Visual 20-second handwashing guide with bubble icons and tight-tap indicator.\",\"grade4TimerSecs\":60,\"groupChallenge\":{\"investigationStepsAr\":[\"١. المشكلة: (إهدار نعمة الماء وتشويه نظافة المكان)\",\"٢. المتأثرون: (المدرسة، البيئة، الطلاب الآخرون)\",\"٣. العواقب: (انزلاق الطلاب، هدر الموارد المائية، إثم الإسراف)\",\"٤. القيمة الغائبة: (المسؤولية وحفظ النعمة)\",\"٥. حلان ممكنان.\",\"٦. الحل الأمثل: (إغلاق الصنبور فوراً، التقاط المناديل ورميها في السلة، وإبلاغ المشرف بلطف إذا كان هناك تسريب)\",\"٧. جملة خالد: «نظافة مدرستي وترشيد مائها أمانة في عنقي ابتغاء الأجر»\"],\"investigationStepsEn\":[\"1. Problem: (Wasting water blessing and littering shared facilities)\",\"2. Affected: (School community, environment, peer safety)\",\"3. Consequences: (Slipping hazard, resource depletion, wastefulness)\",\"4. Missing value: (Responsibility and Stewardship)\",\"5. Two solutions.\",\"6. Best solution: (Shut tap firmly, pick up towels into bin, notify staff if leaking)\",\"7. Khalid's statement: 'Conserving water and keeping school spotless is a sacred trust.'\"],\"scenarioAr\":\"دخل خالد المغاسل فوجد صنبور ماء مفتوحاً يتدفق بقوة دون وجود أحد، ووجد مناديل ورقية ملقاة بجانب السلة على الأرض.\",\"scenarioEn\":\"Khalid enters the washroom and discovers a faucet gushing water with no one in sight, and wet paper towels scattered on the floor next to the bin.\",\"titleAr\":\"محقق المواقف: صنبور الماء المسكوب والمناديل على الأرض\",\"titleEn\":\"Scenario Detective: Running Tap & Paper Towels on Floor\",\"type\":\"scenario_detective\"},\"icon\":\"fa-soap\",\"id\":\"restroom_etiquette\",\"islamicValueAr\":\"«الطهور شطر الإيمان» (صحيح مسلم)، وقوله تعالى: ﴿وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ﴾، وهدي النبي ﷺ في الاقتصاد في الماء حيث كان يتوضأ بالمُدّ ويغتسل بالصاع (متفق عليه).\",\"islamicValueEn\":\"The Prophet ﷺ said: 'Purity is half of faith' (Sahih Muslim), and Quran: 'Do not be wasteful, He loves not the wasteful' (7:31). The Sunnah was performing Wudu with a single Mudd of water (Agreed upon).\",\"jpisValue\":\"Responsibility\",\"jpisValueAr\":\"المسؤولية\",\"juniorCriteriaAr\":[\"أدخل بالقدم اليسرى مع الدعاء وأغلق الباب بلطف.\",\"أغسل يدي بالماء والصابون لمدة ٢٠ ثانية.\",\"أغلق صنبور الماء بإحكام وأخرج بالقدم اليمنى شاكراً الله.\"],\"juniorCriteriaEn\":[\"Enter with left foot and close the door gently.\",\"Wash my hands well with soap and water for 20 seconds.\",\"Turn off the faucet firmly and step out with right foot.\"],\"juniorObjectiveAr\":\"أتعلم آداب دورة المياه: النظافة، غسل اليدين بالصابون، وحفظ الماء.\",\"juniorObjectiveEn\":\"I learn restroom manners: cleanliness, washing hands with soap, and saving water.\",\"learningObjectiveAr\":\"نتعلم كيف نلتزم بآداب الطهارة ونظافة المرافق وترشيد الماء حتى نُظهر قيمة المسؤولية والأمانة والنظافة الإسلامية.\",\"learningObjectiveEn\":\"We are learning how to practice restroom hygiene, spotless cleanliness, and water conservation so that we can demonstrate Responsibility and Islamic cleanliness.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أحفظ أذكار الخلاء وخطوات النظافة الست\",\"en\":\"Learning: Memorize restroom Duas and the 6 handwashing steps\"},\"tier2\":{\"ar\":\"أتدرب: أطبق ترشيد الماء وغسل اليدين الصحي بنجاح\",\"en\":\"Practising: Demonstrate water-saving handwash cleanly\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: أحافظ على نظافة الحمام وترشيد مائه في كل استخدام دون تذكير\",\"en\":\"Independent: Consistently maintain spotless hygiene and zero water waste unprompted\"}},\"minigame\":{\"instructionAr\":\"رتب خطوات الذهاب لدورة المياه والوضوء بالترتيب الشرعي والصحي الصحيح:\",\"instructionEn\":\"Arrange the restroom and hygiene steps in the correct healthy and Sunnah order:\",\"steps\":[{\"id\":1,\"textAr\":\"استئذان المعلم بهدوء، أخذ البطاقة، والمشي بسكينة دون ركض\",\"textEn\":\"Ask teacher politely, take the pass, and walk with tranquility\"},{\"id\":2,\"textAr\":\"قول دعاء الدخول وتقديم الرجل اليسرى عند عتبة الباب\",\"textEn\":\"Recite entry Dua and step in with left foot\"},{\"id\":3,\"textAr\":\"استخدام الحمام بنظافة تامة والتأكد من سحب السيفون ونظافة المكان\",\"textEn\":\"Use facility cleanly, flush completely, ensure spotless area\"},{\"id\":4,\"textAr\":\"غسل اليدين بالماء والصابون لمدة ٢٠ ثانية وتجفيفهما بالمناديل\",\"textEn\":\"Wash hands with soap for 20s and dry with paper towel\"},{\"id\":5,\"textAr\":\"إحكام إغلاق صنبور الماء والخروج بالرجل اليمنى قائلاً: «غفرانك»\",\"textEn\":\"Shut tap firmly and exit with right foot saying 'Ghufranak'\"}],\"titleAr\":\"رتب خطوات الطهارة والنظافة\",\"titleEn\":\"Restroom Etiquette Sequence Challenge\",\"type\":\"put_in_order\"},\"partner\":{\"promptAr\":\"يسمع الطالب لزميله دعاء دخول الخلاء ودعاء الخروج، ويراجع معه أهمية ترك الصنبور مغلقاً والمناديل في السلة.\",\"promptEn\":\"Partners test each other on the entry and exit Duas, verifying the importance of closed taps and disposed towels.\",\"titleAr\":\"مراجعة الأذكار والخطوات الصحية\",\"titleEn\":\"Duas & Hygiene Partner Review\"},\"practise\":{\"promptAr\":\"تدريب عملي في الصف: يمثل الطلاب الخطوات الست لغسل اليدين بالصابون (راحة اليد، ظهر اليد، بين الأصابع، الأظافر، والإبهام) لمدة ٢٠ ثانية مع ترشيد الماء تماماً!\",\"promptEn\":\"Classroom simulation: Students practice the 6 steps of hand scrubbing (palms, back of hands, between fingers, fingernails, thumbs) for 20 seconds, ensuring zero water waste!\",\"stemsAr\":[\"«أظهرت ملمح الطالب ذي المبادئ عندما أغلقت الصنبور بإحكام لمنع هدر الماء.»\",\"«في المرة القادمة يمكنك تحسين طهارتك بترديد دعاء الخروج 'غفرانك' بالرجل اليمنى.»\"],\"stemsEn\":[\"'You showed Principled character when firmly shutting the tap to conserve water.'\",\"'Next time, you can enhance your practice by stepping out with right foot reciting 'Ghufranak'.'\"],\"titleAr\":\"محاكاة غسل اليدين وترشيد الماء (20s Scrub Drill)\",\"titleEn\":\"20-Second Clean Scrub Rehearsal\"},\"pypProfile\":[\"Principled\",\"Reflective\"],\"pypProfileAr\":[\"ذو مبادئ\",\"متأمل\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"أي طالب يستخدم دورة المياه اليوم يتأكد أن الصنبور مغلق تماماً وأن المغسلة خالية من أي مناديل أو قطرات فوضوية بنسبة ١٠٠٪!\",\"taskEn\":\"Every student using the washroom today ensures taps are tightly closed and sinks are 100% spotless before leaving!\",\"titleAr\":\"مهمة الصنبور المحكم والمكان الأنظف\",\"titleEn\":\"Tight Tap & Spotless Facility Mission\"},\"reflection\":{\"questionAr\":\"لماذا حذرنا النبي ﷺ من الإسراف في الماء حتى لو كنا على نهر جار؟ وكيف تشعر حين تجد دورة المياه نظيفة ومعتنى بها؟\",\"questionEn\":\"Why did the Prophet ﷺ forbid water waste even beside a flowing river? How does finding a clean facility make you feel?\"},\"successCriteriaAr\":[\"أشرح أهمية الطهارة كشطر من الإيمان والمسؤولية في الحفاظ على المرافق العامة.\",\"أرتب خطوات دخول الحمام والخروج منه بالسنن النبوية الصحيحة.\",\"أغسل يدي بالماء والصابون لمدة ٢٠ ثانية وأجففهما بنظافة.\",\"أغلق صنبور الماء بإحكام تام وأترك المكان أنظف مما كان.\",\"أردد دعاء الدخول ودعاء الخروج «غفرانك».\",\"أتأمل في استهلاكي للماء وأتعهد بعدم الإسراف فيه أبداً.\"],\"successCriteriaEn\":[\"Explain why cleanliness is half of faith and a shared responsibility for school spaces.\",\"Sequence restroom entry, use, and exit steps according to Prophetic Sunnah.\",\"Wash hands thoroughly with soap for 20 seconds and dry them cleanly.\",\"Shut water taps firmly and leave the facility cleaner than I found it.\",\"Recite the entry supplication and exit Dua 'Ghufranak'.\",\"Reflect on my water usage and commit to never wasting a single drop.\"],\"taglineAr\":\"دعاء مأثور، نظافة تامة، وترشيد للنعمة\",\"taglineEn\":\"Sunnah Duas, spotless hygiene, and water conservation\",\"titleAr\":\"٥. طهارة وسكينة دورات المياه وحفظ الماء\",\"titleEn\":\"5. Restroom Etiquette, Taharah & Water Care\"},{\"badgeColor\":\"orange\",\"character\":{\"nameAr\":\"نواف وسلطان\",\"nameEn\":\"Nawaf & Sultan\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: بطاقة فحص 'طاولتي مرآة صفي': فحص الفتات، إغلاق العلبة، ورمي المنديل في السلة.\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: 'My Table is My Class Mirror' 3-point visual check card for crumbs, lunchbox, bin.\",\"grade4TimerSecs\":90,\"groupChallenge\":{\"investigationStepsAr\":[\"١. المشكلة: (بقايا طعام وأغلفة مهملة في الساحة)\",\"٢. المتأثرون: (المدرسة، الطلاب، عمال النظافة)\",\"٣. العواقب: (تجمع الحشرات، تعثر الزملاء، هدر النعمة)\",\"٤. القيمة الغائبة: (الرحمة والشكر والمسؤولية)\",\"٥. حلان ممكنان.\",\"٦. الحل الأمثل: (المبادرة برفعها في سلة المهملات، وتذكير الزميل لاحقاً بلطف ومحبة)\",\"٧. جملة سلطان اللطيفة: «يا أخي، جمعت غلافك لنكسب أجر إماطة الأذى معاً!»\"],\"investigationStepsEn\":[\"1. Problem: (Discarded packaging and food left on field)\",\"2. Affected: (School environment, fellow students, cleaning staff)\",\"3. Consequences: (Litter buildup, slipping hazard, lack of gratitude)\",\"4. Missing value: (Compassion and Responsibility)\",\"5. Two solutions.\",\"6. Best solution: (Proactively toss it in bin, remind classmate privately with warmth)\",\"7. Sultan's kind note: 'Brother, I picked up your wrapper so we share the charity reward together!'\"],\"scenarioAr\":\"شاهد سلطان زميلاً أسقط شطيرته سهواً في الساحة وترك العلبة وذهب مسرعاً لحصة الرياضة دون أن يلتفت.\",\"scenarioEn\":\"Sultan sees a classmate accidentally drop sandwich packaging on the field and dash off to PE without looking back.\",\"titleAr\":\"محقق المواقف: علبة العصير المنسية في الساحة\",\"titleEn\":\"Scenario Detective: Forgotten Juice Box on the Playground\",\"type\":\"scenario_detective\"},\"icon\":\"fa-utensils\",\"id\":\"meal_break_stewardship\",\"islamicValueAr\":\"«يا غلام، سمِّ الله، وكل بيمينك، وكل مما يليك» (متفق عليه)، و«إماطة الأذى عن الطريق صدقة».\",\"islamicValueEn\":\"The Prophet ﷺ said: 'Say Bismillah, eat with your right hand, and eat from what is next to you.' Also: 'Removing harm from the path is charity.'\",\"jpisValue\":\"Compassion\",\"jpisValueAr\":\"الرحمة والتعاطف\",\"juniorCriteriaAr\":[\"أقول: «بسم الله» وآكل بيدي اليمنى بهدوء.\",\"أضع وجبتي فوق مفرشي دون رمي الفتات على الأرض.\",\"أجمع قمامتي في السلة وأترك مكاني نظيفاً وجميلاً.\"],\"juniorCriteriaEn\":[\"Say 'Bismillah' and eat with my right hand calmly.\",\"Keep my snack on my placemat without dropping crumbs.\",\"Toss wrappers in the bin and leave my table spotless.\"],\"juniorObjectiveAr\":\"أتعلم كيف آكل بيدي اليمنى، وأسمي الله، وأنظف طاولتي بعد الأكل.\",\"juniorObjectiveEn\":\"I learn to eat with my right hand, say Bismillah, and clean my table.\",\"learningObjectiveAr\":\"نتعلم كيف نحفظ النعمة ونأكل بآداب الإسلام ونترك مكاننا أنظف مما كان حتى نُظهر قيمة الرحمة والشكر والمسؤولية البيئية.\",\"learningObjectiveEn\":\"We are learning how to honor food blessings, eat with Sunnah manners, and leave our eating area cleaner than we found it to demonstrate Compassion, gratitude, and environmental stewardship.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أعرف سنن الطعام النبوية وقواعد لا تترك أثراً\",\"en\":\"Learning: Know Sunnah eating manners and Leave No Trace rules\"},\"tier2\":{\"ar\":\"أتدرب: أنظف طاولتي وأفرز النفايات بنجاح في تدريب الفسحة\",\"en\":\"Practising: Wipe table and sort trash cleanly during drills\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: أترك منطقة طعامي أنظف مما كانت دائماً دون أي تذكير\",\"en\":\"Independent: Consistently leave eating areas spotless every day unprompted\"}},\"minigame\":{\"sceneAr\":\"رن جرس نهاية الفسحة، فركض الطلاب نحو الصفوف تاركين علب العصير الفارغة وأكياس الشطائر الممزقة والفتات يتناثر على المقاعد وعلى الأرض!\",\"sceneEn\":\"The recess bell rings, and students sprint toward class leaving empty juice cartons, torn sandwich wrappers, and crumbs scattered across benches and ground!\",\"seeThinkWonderAr\":{\"see\":\"ماذا ترى؟ (علب ملقاة، مقاعد متسخة، طعام مهدر، طلاب يركضون)\",\"think\":\"ما أثر ذلك على عمال النظافة وعلى كرامة النعمة؟ (مشقة شديدة، جحود بالنعمة، بيئة ملوثة)\",\"wonder\":\"كيف نطبق شعار 'لا تترك أثراً' كفرسان حقيقيين؟\"},\"seeThinkWonderEn\":{\"see\":\"What do you see? (Discarded juice packs, messy benches, wasted crumbs, rushing students)\",\"think\":\"What is the impact on cleaners and gratitude? (Heavy burden on staff, disrespect for food)\",\"wonder\":\"How can we live the 'Leave No Trace' covenant as true champions?\"},\"titleAr\":\"اكتشف الخطأ: مقاعد الفسحة بعد جرس النهاية\",\"titleEn\":\"Spot the Problem: Recess Benches After the Bell\",\"type\":\"spot_problem\"},\"partner\":{\"promptAr\":\"يتفقد الزميلان مكان جلوسهما معاً: هل تركنا المكان أنظف مما كان؟ إذا وجدا ورقة صغيرة يتعاونان في إماطتها طلباً للصدقة والأجر.\",\"promptEn\":\"Partners audit their bench together: Did we leave it cleaner than before? If any scrap is found, they cooperate to remove it for Sadaqah reward.\",\"titleAr\":\"فحص النظافة الثنائي بعد الفسحة\",\"titleEn\":\"Recess Cleanliness Partner Audit\"},\"practise\":{\"promptAr\":\"تدريب عملي: قبل انتهاء وقت الفسحة بدقيقة، يقف كل طالب ويفحص المقعد والأرض تحته، يمسح الطاولة، ويفرز النفايات في الحاويات بنظام!\",\"promptEn\":\"Practical rehearsal: 1 minute before recess ends, every student inspects bench and ground, wipes table surface, and sorts trash into appropriate bins!\",\"stemsAr\":[\"«أظهرت خلق الرحمة وحفظ النعمة عندما جمعت علبة العصير ومسحت فتات الطاولة.»\",\"«في المرة القادمة يمكنك تحسين شكرك بالجلوس أثناء الشرب وتسمية الله باليمين.»\"],\"stemsEn\":[\"'You demonstrated Compassion and gratitude when gathering wrappers and wiping crumbs.'\",\"'Next time, you can improve by sitting down while drinking and eating with your right hand.'\"],\"titleAr\":\"تحدي الـ ٦٠ ثانية: لا تترك أثراً (Leave No Trace Blitz)\",\"titleEn\":\"The 60-Second Clean Sweep Rehearsal\"},\"pypProfile\":[\"Caring\",\"Balanced\"],\"pypProfileAr\":[\"مهتم\",\"متوازن\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"إنهاء الفسحة اليوم دون أن يترك طلاب صفنا أي غلاف أو علبة أو فتات طعام على المقاعد أو في الساحة!\",\"taskEn\":\"Finish recess today with zero wrappers, cartons, or crumbs left on benches or grounds by our class!\",\"titleAr\":\"مهمة الفسحة النموذجية بنسبة ١٠٠٪ نظافة\",\"titleEn\":\"100% Spotless Recess Zone Mission\"},\"reflection\":{\"questionAr\":\"كيف تكون نظافة مكان طعامك شكراً عملياً لله على نعمة الغذاء؟ وكيف يخفف تعاوننا العبء عن عمال النظافة في مدرستنا؟\",\"questionEn\":\"How is keeping your eating space clean a practical expression of gratitude to Allah? How does our teamwork respect school maintenance staff?\"},\"successCriteriaAr\":[\"أشرح معنى شكر النعمة وكيف أن إماطة الأذى عن الطريق صدقة.\",\"أغسل يدي قبل الأكل وأسمي الله «بسم الله» وآكل بيميني جالساً.\",\"أحافظ على طعامي دون إسقاط أي فتات أو رمي بقايا في الساحة.\",\"أمسح طاولتي ومقعدي وأجمع الأغلفة وأفرزها في الحاويات المخصصة.\",\"أساعد زملائي في ترك منطقة الفسحة نظيفة تحت شعار «لا تترك أثراً».\",\"أتأمل في نعم الله العظيمة وأحمد الله تعالى في ختام الأكل.\"],\"successCriteriaEn\":[\"Explain gratitude for food blessings and why removing litter is a continuous charity.\",\"Wash hands before eating, say 'Bismillah', and eat seated using my right hand.\",\"Keep food secure without spilling crumbs or tossing snacks on the ground.\",\"Wipe table and bench clean, collect wrappers, and sort into proper bins.\",\"Help table peers leave the recess area spotless under 'Leave No Trace'.\",\"Reflect on divine blessings and sincerely thank Allah ('Alhamdulillah') when done.\"],\"taglineAr\":\"سمِّ الله، كُل بيمينك، وشعارنا: «لا تترك أثراً»\",\"taglineEn\":\"Say Bismillah, eat with right hand, Leave No Trace\",\"titleAr\":\"٦. حفظ النعمة وإماطة الأذى وقت الفسحة\",\"titleEn\":\"6. Mealtime Adab & Playground Stewardship\"},{\"badgeColor\":\"teal\",\"character\":{\"nameAr\":\"زياد وحمزة\",\"nameEn\":\"Ziyad & Hamza\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: بطاقات مصورة تحت الطاولة تبين مكان وضع الحذاء، والتدرب على الاصطفاف الصامت في الفصل.\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: Visual card under desks showing shoe placement, and classroom rehearsal for calm, silent lineup.\",\"grade4TimerSecs\":75,\"groupChallenge\":{\"investigationStepsAr\":[\"١. المشكلة المحددة: (التعجل والخروج بالأحذية دون تفقد الوضوء أو تنظيم الأدوات بالفصل)\",\"٢. المتأثرون: (الطلاب في الممر، هدوء الفصول المجاورة، وتنظيم الفصل)\",\"٣. العواقب: (إرباك في الممر، نسيان الوضوء، وضياع السكينة قبل الصلاة)\",\"٤. القيمة الغائبة: (الاحترام، السكينة، والمسؤولية الشخصية)\",\"٥. حلان ممكنان: (أ: التوقف الفوري والعودة لتنظيم الأدوات، ب: تذكير الزملاء بلطف بروتين الفصل)\",\"٦. الحل الأمثل لمدرسة JPIS: (الالتزام بخطوات روتين الصلاة: حفظ الأدوات، تفقد الوضوء، خلع الحذاء تحت الطاولة، والمشي بسكينة)\",\"٧. الاستشهاد بالحديث النبوي: قال رسول الله ﷺ: «إذا أتيتم الصلاة فعليكم بالسكينة والوقار» (متفق عليه: رواه البخاري ومسلم)\"],\"investigationStepsEn\":[\"1. Specific problem: (Rushing into hallway with shoes on without checking Wudu or packing supplies)\",\"2. Affected: (Peers in hallway, quietness of adjacent classes, classroom order)\",\"3. Consequences: (Hallway clutter, forgotten Wudu, loss of Sakinah before prayer)\",\"4. Missing value: (Respect, Sakinah, and Personal Responsibility)\",\"5. Two possible solutions: (A: Immediate pause and return to pack supplies, B: Gentle peer reminders of classroom routine)\",\"6. Best JPIS solution: (Follow the 12-step routine: pack supplies, check Wudu, place shoes under desks, and walk with Sakinah)\",\"7. Prophetic Hadith: The Prophet ﷺ said: \\\"When you come to prayer, come with tranquility and dignity: pray whatever you catch and complete whatever you missed!\\\" (Agreed upon: Bukhari & Muslim)\"],\"scenarioAr\":\"أعلن المعلم وقت الاستعداد لصلاة الظهر، فتعجل بعض الطلاب وخرجوا نحو الممر بأحذيتهم دون تفقد الوضوء أو ترتيب الأدوات، مما أحدث إرباكاً في الممر. كيف نحل هذا الموقف وفق روتين JPIS؟\",\"scenarioEn\":\"The teacher announced preparation for Dhuhr prayer. Some students rushed into the corridor with shoes on without checking Wudu or packing books, creating hallway commotion. How should we solve this using the JPIS routine?\",\"titleAr\":\"محقق المواقف: الاستعداد المنظم لصلاة الظهر بالفصل\",\"titleEn\":\"Scenario Detective: Orderly Classroom-to-Prayer Preparation\",\"type\":\"scenario_detective\"},\"icon\":\"fa-mosque\",\"id\":\"prayer_shoe_harmony\",\"islamicValueAr\":\"قال رسول الله ﷺ: «إِذَا أُقِيمَتِ الصَّلَاةُ فَلَا تَأْتُوهَا تَسْعَوْنَ، وَأْتُوهَا تَمْشُونَ وَعَلَيْكُمُ السَّكِينَةُ...» (متفق عليه: رواه البخاري ٦٣٦ ومسلم ٦٠٢) — الحث على السكينة والوقار في التوجه للصلاة. (ملاحظة: المراجع وإجراءات الصلاة في انتظار المراجعة النهائية من قسم الدراسات الإسلامية بمدرسة JPIS).\",\"islamicValueEn\":\"Prophet Muhammad ﷺ said: \\\"When the prayer is called, do not come to it running, but come walking with calmness and tranquility...\\\" (Agreed upon: Bukhari 636 & Muslim 602) — Walking with Sakinah. (Note: Islamic references and prayer procedures are pending final review by the JPIS Islamic Studies Department).\",\"jpisValue\":\"Respect\",\"jpisValueAr\":\"الاحترام\",\"juniorCriteriaAr\":[\"أحفظ كتبي في حقيبتي وأخلع حذائي بهدوء تحت طاولتي في الفصل.\",\"أمشي مع صفي بسكينة إلى المصلى دون ركض أو لمس للجدران.\",\"أصلي بانتباه وهدوء ثم أعود مع معلمي لألبس حذائي بنظام.\"],\"juniorCriteriaEn\":[\"Pack my books into my bag and take off my shoes calmly under my classroom desk.\",\"Walk with my class calmly to the prayer room without running or touching walls.\",\"Pray attentively with the Imam, then return orderly to put my shoes back on.\"],\"juniorObjectiveAr\":\"أتعلم كيف أحفظ أدواتي، وأضع حذائي بهدوء تحت طاولتي بالفصل، وأمشي بسكينة لأصلي مع صفي وأعود بنظام.\",\"juniorObjectiveEn\":\"I learn to pack my supplies, place my shoes calmly under my desk in class, walk with Sakinah to prayer, and return in order.\",\"learningObjectiveAr\":\"نتعلم ونطبق روتين الاستعداد للصلاة بدقة: التوقف بهدوء، حفظ الأدوات بالحقيبة، تفقد الوضوء (من يحتاج الحمام يُبقي حذاءه)، خلع الحذاء بالفصل ووضعه مرتباً تحت الطاولة، الاصطفاف الصامت، المشي للمصلى بسكينة، أداء الصلاة بانتباه، والعودة المنظمة لارتداء الحذاء.\",\"learningObjectiveEn\":\"We master the complete JPIS classroom-to-prayer procedure: stopping work calmly, packing supplies, checking Wudu (toilet users keep shoes on), removing shoes in class and placing them under desks, silent lineup, walking with Sakinah, praying attentively, and returning in an orderly line to collect shoes.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أعرف الخطوات الـ ١٢ لروتين الصلاة من حفظ الأدوات وخلع الحذاء بالفصل إلى المشي بسكينة والعودة المنظمة.\",\"en\":\"Learning: Understand the 12 procedural steps from classroom pack-up to classroom shoe placement, calm walk, and orderly return.\"},\"tier2\":{\"ar\":\"أتدرب: أتقن حفظ أدواتي ووضع حذائي بهدوء تحت الطاولة والمشي بسكينة بدقة وأمان دون استعجال.\",\"en\":\"Practising: Master packing supplies, neat classroom shoe placement under desk, and calm hallway walking with care and poise without rushing.\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: ألتزم بروتين الصلاة الكامل من الفصل إلى المصلى والعودة يومياً بسكينة وهدوء تام دون الحاجة لتذكير.\",\"en\":\"Independent: Consistently demonstrate the full classroom-to-prayer routine daily with calm Sakinah unprompted.\"}},\"minigame\":{\"instructionAr\":\"رتب الخطوات الإجرائية الرسمية للاستعداد للصلاة من الفصل حتى العودة بالترتيب الصحيح:\",\"instructionEn\":\"Arrange the official procedural steps from classroom prep to prayer and orderly return in exact sequence:\",\"steps\":[{\"id\":1,\"textAr\":\"التوقف عن العمل بهدوء عند إعلان المعلم وقت الصلاة\",\"textEn\":\"Stop work calmly when the teacher announces prayer time\"},{\"id\":2,\"textAr\":\"إعادة الكتب والأدوات إلى الحقائب أو الخزائن المخصصة\",\"textEn\":\"Return books and supplies to bags or designated lockers\"},{\"id\":3,\"textAr\":\"تفقد الحاجة لدورة المياه أو تجديد الوضوء\",\"textEn\":\"Check whether needing the restroom or renewing Wudu\"},{\"id\":4,\"textAr\":\"الطالب الذي يحتاج دورة المياه أو الوضوء يُبقي حذاءه في قدميه\",\"textEn\":\"Students needing the restroom or Wudu keep their shoes on\"},{\"id\":5,\"textAr\":\"الطالب المستعد للمصلى يخلع حذاءه بهدوء داخل الفصل\",\"textEn\":\"Students ready for prayer remove their shoes calmly in the classroom\"},{\"id\":6,\"textAr\":\"وضع الحذاء مرتباً تحت الطاولة أو بجانب الجدار المخصص بالفصل\",\"textEn\":\"Place shoes neatly under desks or along designated classroom wall\"},{\"id\":7,\"textAr\":\"الاصطفاف الصامت والآمن عند باب الفصل\",\"textEn\":\"Line up silently and safely at the classroom door\"},{\"id\":8,\"textAr\":\"المشي بسكينة للمصلى دون ركض أو تدافع أو صراخ أو لمس الجدران\",\"textEn\":\"Walk calmly to the prayer room without running, pushing, shouting, or touching walls\"},{\"id\":9,\"textAr\":\"دخول المصلى والاستعداد للصلاة باحترام ووقار\",\"textEn\":\"Enter and prepare for Salah respectfully\"},{\"id\":10,\"textAr\":\"أداء الصلاة بهدوء وانتباه تام خلف الإمام\",\"textEn\":\"Perform Salah quietly and attentively following the Imam\"},{\"id\":11,\"textAr\":\"العودة إلى الفصل في صف منتظم ومنضبط\",\"textEn\":\"Return to the classroom in an orderly line\"},{\"id\":12,\"textAr\":\"أخذ الحذاء وارتداؤه بهدوء داخل الفصل\",\"textEn\":\"Collect and put on shoes calmly inside the classroom\"}],\"titleAr\":\"ترتيب خطوات روتين الاستعداد والصلاة في مدرسة JPIS\",\"titleEn\":\"JPIS Classroom-to-Prayer Routine Sequencing Challenge\",\"type\":\"put_in_order\"},\"partner\":{\"promptAr\":\"يتأكد الرفيقان (أ) و(ب): ١. حفظ الأدوات في الحقيبة، ٢. وضع الحذاء مرتباً تحت الطاولة في الفصل، ٣. السير بسكينة دون لمس الجدران، ٤. العودة المنظمة بعد الصلاة.\",\"promptEn\":\"Partners A & B verify: 1. Supplies packed, 2. Shoes placed neatly under classroom desk, 3. Walking with Sakinah without touching walls, 4. Orderly return.\",\"titleAr\":\"فحص رفيق روتين الصلاة (Prayer Routine Buddy Check)\",\"titleEn\":\"Prayer Routine Buddy Check\"},\"practise\":{\"promptAr\":\"تدريب عملي داخل الفصل: التوقف الهادئ، إغلاق الحقائب، خلع الحذاء وترتيبه تحت الطاولة، والاصطفاف الصامت للسير بسكينة دون لمس الجدران.\",\"promptEn\":\"Classroom rehearsal: Calm stop, packing bags, placing shoes neatly under desks, and silent lineup for walking with Sakinah without touching walls.\",\"stemsAr\":[\"«أحسنت في حفظ أدواتك ووضع حذائك بهدوء تحت طاولتك بالفصل والمشي بوقار.»\",\"«في المرة القادمة، تأكد من التزام المشي بسكينة دون لمس الجدران لحفظ النظام والسلامة.»\"],\"stemsEn\":[\"\\\"You demonstrated excellence by packing supplies and placing shoes neatly under your desk.\\\"\",\"\\\"Next time, remember to walk with calm Sakinah without touching the walls to protect safety.\\\"\"],\"titleAr\":\"محاكاة روتين الاستعداد للصلاة في الفصل (Classroom-to-Prayer Drill)\",\"titleEn\":\"Classroom-to-Prayer Routine Rehearsal Drill\"},\"pypProfile\":[\"Principled\",\"Caring\"],\"pypProfileAr\":[\"ذو مبادئ\",\"مهتم\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"في صلاة الظهر اليوم: ١٠٠٪ من الأدوات محفوظة بالحقائب، الأحذية موضوعة بانتظام تحت الطاولات بالفصل، مشي بسكينة دون لمس الجدران، وعودة منظمة!\",\"taskEn\":\"During Dhuhr prayer today: Desks packed, 100% of shoes placed neatly under classroom desks, walking with Sakinah without touching walls, and an orderly return!\",\"titleAr\":\"مهمة صلاة الظهر لمدرسة JPIS: فصل مرتب وسكينة تامة\",\"titleEn\":\"JPIS Dhuhr Prayer Mission: Orderly Class & Serene Sakinah\"},\"reflection\":{\"questionAr\":\"كيف يساعدنا ترتيب الفصل ووضع الأحذية بنظام والمشي بسكينة على تهيئة قلوبنا للخشوع والسكينة في الصلاة؟\",\"questionEn\":\"How does calm classroom preparation, neat shoe placement under desks, and walking with Sakinah prepare our hearts for reverence and focus in Salah?\"},\"successCriteriaAr\":[\"أتوقف عن العمل بهدوء وأعيد كتبي وأدواتي إلى حقيبتي أو مكاني المخصص.\",\"أتفقد وضوئي: إن احتجت دورة المياه أُبقي حذائي، وإن كنت جاهزاً أخلع حذائي بهدوء داخل الفصل.\",\"أضع حذائي مرتباً تحت طاولتي أو بجانب الجدار المخصص وفق توجيه المعلم.\",\"أصطف صامتاً وأمشي إلى المصلى بسكينة دون ركض أو تدافع أو لمس للجدران.\",\"أدخل المصلى باحترام وأؤدي الصلاة بهدوء وخشوع وانتباه تام.\",\"أعود إلى الفصل في صف منظم وآخذ حذائي وأرتديه بهدوء.\"],\"successCriteriaEn\":[\"Stop work calmly and return books and supplies to my bag, locker, or designated space.\",\"Check Wudu and restroom: If needing the toilet keep shoes on; otherwise remove shoes calmly in the classroom.\",\"Place shoes neatly under my desk or beside the designated classroom wall per teacher guidance.\",\"Line up silently and walk to the prayer room calmly without running, pushing, or touching walls.\",\"Enter respectfully and perform Salah quietly, reverently, and attentively.\",\"Return to the classroom in an orderly line and calmly collect and put on my shoes.\"],\"taglineAr\":\"حفظ الأدوات، خلع الحذاء بالفصل، المشي بسكينة، أداء الصلاة بانتباه، والعودة المنظمة\",\"taglineEn\":\"Packing supplies, classroom shoe placement, calm hallway walk, attentive prayer, and orderly return\",\"titleAr\":\"٧. روتين الاستعداد والصلاة في المصلى\",\"titleEn\":\"7. Classroom-to-Prayer Routine & Reverent Worship\"},{\"badgeColor\":\"red\",\"character\":{\"nameAr\":\"راكان وبدر\",\"nameEn\":\"Rakan & Badr\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: تمرين 'فقاعة الفضاء' بمد الذراعين يمنة ويسرة للتأكد من عدم ملامسة الزميل.\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: 'Space Bubble' arm-span exercise ensuring arm's-length clearance from peers.\",\"grade4TimerSecs\":45,\"groupChallenge\":{\"investigationStepsAr\":[\"١. المشكلة: (المزاح الجسدي والدفع في الطوابير)\",\"٢. المتأثرون: (بدر، الطلاب أمامه، راكان نفسه)\",\"٣. العواقب: (سقوط وإصابات جسدية، شجار، عقوبات)\",\"٤. القيمة الغائبة: (الشجاعة في ضبط النفس، كف الأذى)\",\"٥. حلان بديلان لتفريغ الطاقة.\",\"٦. الحل الأمثل: (ضبط النفس والانتظار حتى بدء التمارين الرياضية في الملعب)\",\"٧. جملة راكان لنفسه: «القوة الحقيقية هي قدرتي على التحكم في جسدي ومشاعري»\"],\"investigationStepsEn\":[\"1. Problem: (Physical pranks and pushing in lineups)\",\"2. Affected: (Badr, peers ahead, Rakan himself)\",\"3. Consequences: (Falls, severe bruises, conflict, discipline calls)\",\"4. Missing value: (Courageous self-control, Safety)\",\"5. Two alternatives to channel energy.\",\"6. Best solution: (Exercise restraint and release energy during active sports drills)\",\"7. Rakan's self-talk: 'True strength is the power to master my own body and impulses.'\"],\"scenarioAr\":\"أثناء الوقوف في طابور التربية البدنية، شعر راكان بطاقة عالية، وأراد أن يدفع زميله بدر للأمام من باب المزاح ليضحك الآخرين.\",\"scenarioEn\":\"While lining up for PE class, Rakan feels energetic and is tempted to shove Badr forward as a playful prank to make others laugh.\",\"titleAr\":\"محقق المواقف: الحماس في طابور حصة التربية البدنية\",\"titleEn\":\"Scenario Detective: PE Line Pranks\",\"type\":\"scenario_detective\"},\"icon\":\"fa-shield-halved\",\"id\":\"personal_space_safety\",\"islamicValueAr\":\"«المسلم من سلم المسلمون من لسانه ويده» (متفق عليه)، و«ليس الشديد بالصُّرَعَة، إنما الشديد الذي يملك نفسه عند الغضب».\",\"islamicValueEn\":\"The Prophet ﷺ said: 'A Muslim is one from whose tongue and hand others are safe.' Also: 'The strong is the one who controls himself.'\",\"jpisValue\":\"Courage\",\"jpisValueAr\":\"الشجاعة وضبط النفس\",\"juniorCriteriaAr\":[\"أترك مسافة ذراع واحدة بيني وبين زميلي في الطابور والصف.\",\"أحافظ على يدي وقدمي بلطف دون دفع أو سحب.\",\"أستخدم الكلمات الطيبة والابتسامة عند التعامل مع أصدقائي.\"],\"juniorCriteriaEn\":[\"Keep one arm's distance between myself and my friend.\",\"Keep my hands and feet calm with zero pushing or pulling.\",\"Use kind words and smiles whenever interacting with friends.\"],\"juniorObjectiveAr\":\"أتعلم كيف أحافظ على مساحتي ومساحة أصدقائي وأبقي يدي وقدمي آمنتين.\",\"juniorObjectiveEn\":\"I learn to keep my hands and feet safe and respect my friends' personal space.\",\"learningObjectiveAr\":\"نتعلم كيف نتحكم في أيدينا وأقدامنا ونحترم المساحة الشخصية للآخرين حتى نُظهر قيمة الشجاعة وضبط النفس وكف الأذى.\",\"learningObjectiveEn\":\"We are learning how to control our hands, feet, and personal boundaries so that we can demonstrate Courage, self-discipline, and protection of others.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أميز بين المزاح المقبول والمزاح الجسدي الخطير\",\"en\":\"Learning: Distinguish playful conversation from unsafe physical touch\"},\"tier2\":{\"ar\":\"أتدرب: أضبط مسافة الأمان ويدي وقدمي في تدريبات الطابور\",\"en\":\"Practising: Maintain arm's-length buffer and still hands in drills\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: أمارس كف الأذى التام طوال الأسبوع في كل مرافق المدرسة\",\"en\":\"Independent: Consistently protect physical boundaries everywhere without reminders\"}},\"minigame\":{\"badDialogueAr\":\"«ابتعد! أنت بطيء وتسد طريقي!» (مع الدفع باليد)\",\"badDialogueEn\":\"'Get out of the way! You are slow and blocking me!' (accompanied by shoving)\",\"goodDialogueAr\":\"«(يقف بهدوء على مسافة أمان ويقول بابتسامة): عفواً يا أخي، هل تسمح لي بالمرور بلطف؟»\",\"goodDialogueEn\":\"'(Stands calmly at safe distance and says with a smile): Excuse me brother, may I please pass?'\",\"sceneAr\":\"أثناء الخروج، وجد راكان طالباً أمامه يمشي بتمهل، فدفعه بيده في ظهره قائلاً: «تحرك بسرعة، أنت تسد الباب!» فكاد الطالب يسقط.\",\"sceneEn\":\"During dismissal, Rakan finds a student walking slowly ahead and pushes him in the back saying: 'Move fast, you are blocking the door!', almost causing him to fall.\",\"titleAr\":\"أصلح الحوار: الازدحام عند باب الفصل\",\"titleEn\":\"Fix the Dialogue: Doorway Congestion\",\"type\":\"fix_dialogue\"},\"partner\":{\"promptAr\":\"يتأكد كل طالب مع زميله المقابل من احترام الفقاعة الشخصية، والاتفاق على كلمة سر مهذبة: «فضلاً، مسافة أمان» للتذكير اللطيف.\",\"promptEn\":\"Partners calibrate personal space bubbles and agree on a polite reminder cue: 'Safe bubble please' for gentle reminders.\",\"titleAr\":\"معايرة مسافة الاحترام الثنائية\",\"titleEn\":\"Respectful Spacing Partner Calibration\"},\"practise\":{\"promptAr\":\"يقف الطلاب في الطابور: يمد كل طالب ذراعه للأمام ليتأكد من وجود مسافة ذراع كاملة تفصله عن زميله دون أي تلامس، ثم يضع يديه جانباً بثبات ووقار!\",\"promptEn\":\"Lineup drill: Every student extends an arm forward to calibrate an arm's-length safe bubble from the peer ahead, then drops hands quietly to the sides!\",\"stemsAr\":[\"«أظهرت شجاعة وضبط نفس عندما سيطرت على حماسك ولم تدفع زميلك في الطابور.»\",\"«في المرة القادمة يمكنك تحسين مساحتك الشخصية بالرجوع خطوة صغيرة للخلف لترك مسافة ذراع.»\"],\"stemsEn\":[\"'You showed courage and self-discipline when managing excitement without pushing in line.'\",\"'Next time, you can improve by taking one small half-step back to preserve an arm's-length buffer.'\"],\"titleAr\":\"تدريب دائرة الأمان والذراع (The Safety Shield Drill)\",\"titleEn\":\"The Arm's-Length Safety Shield Drill\"},\"pypProfile\":[\"Caring\",\"Principled\"],\"pypProfileAr\":[\"مهتم\",\"ذو مبادئ\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"قضاء اليوم الدراسي كاملاً في الطابور والفسحة والرياضة بـ صفر تدافع وصفر ملامسات مزاح جسدية!\",\"taskEn\":\"Spend the entire school day with zero pushing, zero shoving, and zero physical horseplay!\",\"titleAr\":\"مهمة اليوم الخالي من المزاح الجسدي بنسبة ١٠٠٪\",\"titleEn\":\"Zero Physical Horseplay Mission\"},\"reflection\":{\"questionAr\":\"لماذا اعتبر النبي ﷺ أن الشديد الحقيقي هو من يملك نفسه عند الغضب والحماس وليس المصارع القوي؟\",\"questionEn\":\"Why did the Prophet ﷺ teach that true strength is self-mastery when excited or angry, rather than physical force?\"},\"successCriteriaAr\":[\"أشرح مفهوم 'الفقاعة الشخصية' ومسافة الأمان (طول الذراع).\",\"أبقي يدي وقدمي لنفسي في الطابور والمقاعد وممرات المدرسة.\",\"أمتنع تماماً عن المزاح الجسدي (الدفع، الضرب، أو شد الملابس).\",\"أستخدم الكلمات المهذبة لطلب المرور: «عفواً يا أخي، هل تسمح بالمرور؟».\",\"أربط سلامة الجوارح بحديث «المسلم من سلم المسلمون من لسانه ويده».\",\"أتأمل في انفعالاتي وأمارس ضبط النفس والشجاعة عند الحماس أو الغضب.\"],\"successCriteriaEn\":[\"Explain the 'personal bubble' concept and safe spacing (arm's length).\",\"Keep hands, feet, and objects to myself in lineups, desks, and hallways.\",\"Refrain completely from physical horseplay (pushing, hitting, pulling clothes).\",\"Use polite verbal requests: 'Excuse me brother, may I please pass?'.\",\"Connect physical boundaries to the Hadith: 'A Muslim is one from whose tongue and hand others are safe.'\",\"Reflect on emotional control and practice courageous restraint when excited or upset.\"],\"taglineAr\":\"المسلم من سلم الناس من يده ولسانه، أمان للجميع\",\"taglineEn\":\"A Muslim harms none with hand or tongue; safety for all\",\"titleAr\":\"٨. كف الأذى وحفظ الجوارح (سلامة اليدين والقدمين)\",\"titleEn\":\"8. Personal Space & Safe Hands and Feet\"},{\"badgeColor\":\"purple\",\"character\":{\"nameAr\":\"عبدالعزيز وسعود\",\"nameEn\":\"Abdulaziz & Saud\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: بطاقة دور 'الفارس المعين' لكل طاولة، يوزع الأوراق ويجمع الأقلام برفق.\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: 'Helper Knight' lanyard role rotating daily for paper and supply distribution.\",\"grade4TimerSecs\":60,\"groupChallenge\":{\"investigationStepsAr\":[\"١. المشكلة: (ثقل الصندوق وخطورة سقوطه وتجاهل الزملاء)\",\"٢. المتأثرون: (زياد، الأدوات المعرضة للتلف، المعلم)\",\"٣. العواقب: (سقوط الصندوق، كسر الأدوات، شعور زياد بالخذلان)\",\"٤. القيمة الغائبة: (الرحمة والتعاطف والمبادرة)\",\"٥. حلان بديلان.\",\"٦. الحل الأمثل: (المبادرة السريعة بحمل الصندوق من الجانب الآخر مشاركة للجهد)\",\"٧. جملة حمزة: «أبشر يا أخي زياد، دعني أحمل معك ونتقاسم الثقل معاً!»\"],\"investigationStepsEn\":[\"1. Problem: (Heavy box about to drop, peers ignoring distress)\",\"2. Affected: (Ziyad, art supplies, class schedule)\",\"3. Consequences: (Spilled supplies, broken materials, feeling abandoned)\",\"4. Missing value: (Compassion and Proactive Teamwork)\",\"5. Two solutions.\",\"6. Best solution: (Step up immediately, grip the opposite side, share load)\",\"7. Hamza's words: 'I've got you Ziyad, let us carry this together as brothers!'\"],\"scenarioAr\":\"شاهد حمزة زميله زياد يحمل صندوقاً كرتونياً ثقيلاً يحتوي على أدوات التربية الفنية وكان يكاد يسقط منه، فمر طالبان بجانبه مسرعين متجاهلين تعبه.\",\"scenarioEn\":\"Hamza sees his classmate Ziyad struggling to carry a heavy box of art supplies that is slipping from his hands, while two peers run past pretending not to see.\",\"titleAr\":\"محقق المواقف: صناديق التربية الفنية الثقيلة\",\"titleEn\":\"Scenario Detective: Heavy Art Supplies in Hallway\",\"type\":\"scenario_detective\"},\"icon\":\"fa-handshake-angle\",\"id\":\"helping_teamwork\",\"islamicValueAr\":\"قوله تعالى: ﴿وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ﴾، وقال ﷺ: «والله في عون العبد ما كان العبد في عون أخيه».\",\"islamicValueEn\":\"Quran: 'Cooperate in righteousness and piety' (5:2). The Prophet ﷺ said: 'Allah aids the servant as long as he aids his brother.'\",\"jpisValue\":\"Compassion\",\"jpisValueAr\":\"الرحمة والتعاطف\",\"juniorCriteriaAr\":[\"أشارك أقلامي وألواني مع زميلي بلطف عندما يحتاج إليها.\",\"أستمع لفكرة زميلي وأشجعه بكلمة طيبة.\",\"نساعد بعضنا في تنظيف طاولتنا كفريق عمل واحد.\"],\"juniorCriteriaEn\":[\"Share pencils and crayons with my peer kindly when needed.\",\"Listen to my partner's idea and encourage them with kind words.\",\"Help each other clean our group table as one team.\"],\"juniorObjectiveAr\":\"أتعلم كيف أساعد زملائي في مجموعتي ونعمل معاً بحب وفرح.\",\"juniorObjectiveEn\":\"I learn to help my group friends and share our supplies kindly.\",\"learningObjectiveAr\":\"نتعلم كيف نبادر بمساعدة زملائنا ونعمل كبنيان مرصوص حتى نُظهر قيمة الرحمة والإيثار والتعاون الإيجابي.\",\"learningObjectiveEn\":\"We are learning how to proactively support our classmates and work as one united team so that we can demonstrate Compassion, brotherhood, and cooperative teamwork.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أميز مواقف التعاون الإيجابي من التفرج السلبي\",\"en\":\"Learning: Distinguish helpful cooperation from bystander apathy\"},\"tier2\":{\"ar\":\"أتدرب: أشارك الأدوات وأبادر بالعون في التدريبات الصفية\",\"en\":\"Practising: Share tools and initiate assistance during drills\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: أكون سفيراً دائماً للعون والإيثار في كل يوم مدرسي\",\"en\":\"Independent: Consistently proactive and supportive across all daily moments\"}},\"minigame\":{\"justificationRequiredAr\":\"لماذا اخترت الرحمة والتعاطف؟ لأن المسلم الصادق يشعر بألم أخيه ويبادر بإعانته فوراً بدلاً من التفرج والضحك!\",\"justificationRequiredEn\":\"Why Compassion? Because a caring Muslim feels his brother's distress and immediately stoops to assist rather than standing as a laughing bystander!\",\"scenarioAr\":\"اصطدم مقعد سعود بمقلمة عبدالعزيز سهواً وتناثرت أقلامه ودفاتره على الأرض. وقف الطلاب في الطاولة يتفرجون ويضحكون دون أن ينحني أحد لمساعدته، وشعر عبدالعزيز بالضيق الشديد.\",\"scenarioEn\":\"Saud's desk accidentally bumps Abdulaziz's pencil case, sending crayons across the floor. Table peers stand staring and giggling without helping, leaving Abdulaziz frustrated.\",\"targetValue\":\"Compassion\",\"targetValueAr\":\"الرحمة والتعاطف (Compassion)\",\"titleAr\":\"ما القيمة الغائبة؟ المقلمة المتناثرة والوقوف متفرجاً\",\"titleEn\":\"Which Value Is Missing? Spilled Stationery Bystander\",\"type\":\"which_value\"},\"partner\":{\"promptAr\":\"يتفق الزميلان على فحص المقلمة: من لديه قلم رصاص إضافي أو ممحاة يضعها في وسط الطاولة كـ 'صندوق إحسان مشترك' عند حاجة أي منهما.\",\"promptEn\":\"Partners establish a 'shared supply station' between desks: spare pencils or erasers kept ready to lend generously whenever needed.\",\"titleAr\":\"مشاركة الأدوات الكريمة\",\"titleEn\":\"Generous Supply Sharing Protocol\"},\"practise\":{\"promptAr\":\"تدريب تفاعلي: يسقط المعلم أو طالب قلماً أو مسطرة سهواً، يتسابق الطلاب المجاورون بهدوء لالتقاطه وتسليمه لزميلهم بابتسامة: «تفضل يا أخي» دون إحداث جلبة!\",\"promptEn\":\"Interactive drill: A pencil is dropped accidentally; neighboring students quietly stoop to pick it up and return it with a smile: 'Here you go, brother!' without disruption!\",\"stemsAr\":[\"«أظهرت خلق الرحمة والإيثار عندما بادرت بمساعدة زميلك في جمع أقلامه دون تردد.»\",\"«في المرة القادمة يمكنك تحسين عونك بالاستئذان أولاً: 'هل تسمح لي بمساعدتك؟'.»\"],\"stemsEn\":[\"'You demonstrated Compassion and selflessness when swiftly assisting your peer.'\",\"'Next time, you can refine your help by asking first: 'May I assist you with this?'.'\"],\"titleAr\":\"تحدي الالتقاط الفوري (The Instant Assist Drill)\",\"titleEn\":\"The Instant Assist Practical Rehearsal\"},\"pypProfile\":[\"Caring\",\"Open-minded\"],\"pypProfileAr\":[\"مهتم\",\"منفتح\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"يقدم كل طالب اليوم ٣ مساعدات حقيقية وصادقة لزملائه أو معلمه دون أن يُطلب منه ذلك ودون مباهاة!\",\"taskEn\":\"Every student performs 3 genuine, spontaneous acts of assistance for peers or teacher unprompted!\",\"titleAr\":\"مهمة سفراء الإحسان: ٣ مساعدات غير متوقعة\",\"titleEn\":\"Ihsan Ambassadors: 3 Spontaneous Acts of Help\"},\"reflection\":{\"questionAr\":\"من استفاد من تصرفي اليوم؟ هل استأذنت قبل تقديم المساعدة؟ ومتى تتحول المساعدة إلى تدخل سلبي إذا استوليت على عمل زميلي؟\",\"questionEn\":\"Who benefited from my action? Did I ask before helping? How can help become unhelpful if I take over my partner's task?\"},\"successCriteriaAr\":[\"أشرح كيف يجعل التعاون الصف مجتمعاً قوياً يحب فيه المسلم لأخيه ما يحب لنفسه.\",\"أبادر فوراً بمساعدة زميلي إذا سقطت أدواته دون انتظار أن يطلب.\",\"أشارك أدواتي الإضافية بكرم ولطف وأشجع من يحتاج مساعدة.\",\"أستأذن زميلي بلطف قبل تقديم المساعدة ولا أستولي على عمله.\",\"أربط التعاون بالحديث الشريف: «المؤمن للمؤمن كالبنيان يشد بعضه بعضاً».\",\"أتأمل في أثر المساعدة الخفية في نشر المحبة بين الزملاء.\"],\"successCriteriaEn\":[\"Explain how cooperation strengthens our class community and brotherly love.\",\"Proactively assist a peer immediately when books spill without waiting to be asked.\",\"Generously share spare supplies and encourage classmates needing support.\",\"Ask permission politely before helping and never take over their learning task.\",\"Connect teamwork to the Hadith: 'Believers are like a solid structure strengthening each other.'\",\"Reflect on the positive ripple effect of unnoticed acts of kindness.\"],\"taglineAr\":\"الله في عون العبد ما كان العبد في عون أخيه\",\"taglineEn\":\"Allah aids His servant as long as he aids his brother\",\"titleAr\":\"٩. التعاون والإيثار (عون الأخ لأخيه كفريق واحد)\",\"titleEn\":\"9. Brotherly Teamwork & Helping Classmates\"},{\"badgeColor\":\"rose\",\"character\":{\"nameAr\":\"ريان وفهد\",\"nameEn\":\"Rayan & Fahad\"},\"grade4ScaffoldAr\":\"سقالة الصف ٤: مؤقت ٩٠ ثانية للانصراف مع فحص 'الأرضية النظيفة كالثلج' ودعاء المجلس المكتوب بخط عريض.\",\"grade4ScaffoldEn\":\"Grade 4 Scaffold: 90-second pack-up countdown with 'Floor Clear' buddy badge and large-font Dua card.\",\"grade4TimerSecs\":90,\"groupChallenge\":{\"investigationStepsAr\":[\"١. المشكلة: (العثور على أداة مفقودة والإغراء بأخذها)\",\"٢. المتأثرون: (صاحب القلم، فهد، أمانة الصف)\",\"٣. العواقب: (خيانة الأمانة، حزن الزميل، فقدان الثقة)\",\"٤. القيمة الغائبة في نصيحة الزميل: (الأمانة والصدق)\",\"٥. حلان بديلان.\",\"٦. الحل الأمثل: (تسليمه فوراً للمعلم أو وضعه في صندوق المفقودات)\",\"٧. جملة فهد الصادقة: «المسلم أمين لا يأخذ ما ليس له؛ سأسلمه للمعلم ليعود لصاحبه!»\"],\"investigationStepsEn\":[\"1. Problem: (Finding lost property and peer pressure to steal)\",\"2. Affected: (Owner of marker, Fahad, classroom trust)\",\"3. Consequences: (Breach of trust, owner's distress, guilt)\",\"4. Missing value: (Honesty and Integrity)\",\"5. Two solutions.\",\"6. Best solution: (Hand directly to teacher or place in Lost & Found box)\",\"7. Fahad's words: 'A Muslim is honest; I will give this to the teacher so it returns to its brother!'\"],\"scenarioAr\":\"أثناء فحص فهد لأرضية مقعده قبل الخروج، وجد قلماً جميلاً وباهظ الثمن لا يخصه، فقال له زميله: 'خذه في جيبك فهو من نصيبك!'.\",\"scenarioEn\":\"While scanning under his desk at dismissal, Fahad finds a shiny, expensive marker that belongs to someone else. A classmate whispers: 'Pocket it, finders keepers!'.\",\"titleAr\":\"محقق المواقف: القلم الغالي الثمن تحت المقعد\",\"titleEn\":\"Scenario Detective: The Lost Expensive Marker\",\"type\":\"scenario_detective\"},\"icon\":\"fa-clock\",\"id\":\"packup_dismissal\",\"islamicValueAr\":\"«أدِّ الأمانة إلى من ائتمنك» (أبو داود والترمذي)، ودعاء كفارة المجلس: «سبحانك اللهم وبحمدك، أشهد أن لا إله إلا أنت، أستغفرك وأتوب إليك».\",\"islamicValueEn\":\"The Prophet ﷺ said: 'Fulfill the trust to those who entrusted you.' And Kaffarat Al-Majlis Dua for seeking forgiveness.\",\"jpisValue\":\"Honesty\",\"jpisValueAr\":\"الصدق والأمانة\",\"juniorCriteriaAr\":[\"أفحص أرضية طاولتي وأتأكد أنها نظيفة وخالية من الأقلام والأوراق.\",\"أضع كتبي في حقيبتي وأغلق سحابها بهدوء.\",\"أدخل كرسيي برفق وأصطف في طابور الانصراف بانتظام.\"],\"juniorCriteriaEn\":[\"Check under my desk to make sure the floor is clean and clear.\",\"Pack my books into my bag and zip it gently.\",\"Push my chair in softly and join the dismissal line safely.\"],\"juniorObjectiveAr\":\"أتعلم كيف أرتب طاولتي وأدخل كرسيي وأستعد للعودة للبيت بنظام.\",\"juniorObjectiveEn\":\"I learn to pack my bag, push in my chair, and prepare to go home safely.\",\"learningObjectiveAr\":\"نتعلم كيف نحزم أدواتنا وننظف مقاعدنا ونحفظ أمانة الصف حتى نُظهر قيمة الأمانة والمسؤولية وحسن الختام.\",\"learningObjectiveEn\":\"We are learning how to pack our belongings, scan under desks, and guard classroom property so that we can demonstrate Honesty, Responsibility, and honorable closure.\",\"mastery\":{\"tier1\":{\"ar\":\"أتعلم: أعرف خطوات الانصراف الخمس ودعاء كفارة المجلس\",\"en\":\"Learning: Know the 5 pack-up steps and Kaffarat Al-Majlis Dua\"},\"tier2\":{\"ar\":\"أتدرب: أنفذ فحص الطاولة وإدخال الكرسي في ٩٠ ثانية بنجاح\",\"en\":\"Practising: Complete desk scan and silent chair tuck in 90s\"},\"tier3\":{\"ar\":\"أطبق باستقلالية: أترك مقعدي أنظف مما كان وأصطف بسكينة كل يوم دون تذكير\",\"en\":\"Independent: Consistently leave space spotless and line up with dignity\"}},\"minigame\":{\"instructionAr\":\"رتب خطوات ختام اليوم الدراسي بالترتيب المنظم لترك الصف كالفرسان:\",\"instructionEn\":\"Arrange the end-of-day pack-up steps in the correct orderly sequence:\",\"steps\":[{\"id\":1,\"textAr\":\"التوقف الفوري عند جرس المعلم والاستماع للتعليمات الختامية\",\"textEn\":\"Freeze upon teacher's chime and listen to final instructions\"},{\"id\":2,\"textAr\":\"ترتيب الدفاتر والأقلام داخل الحقيبة وإغلاق السحاب بالكامل\",\"textEn\":\"Pack books and stationery into bag and zip completely\"},{\"id\":3,\"textAr\":\"فحص درج الطاولة والأرضية تحت المقعد والتقاط أي قصاصة ورقية\",\"textEn\":\"Scan desk drawer and floor under seat for scraps\"},{\"id\":4,\"textAr\":\"إدخال الكرسي برفق تحت الطاولة دون صوت صرير مزعج\",\"textEn\":\"Push chair gently under table without floor screeching\"},{\"id\":5,\"textAr\":\"الاصطفاف بسكينة في طابور الخروج وترديد دعاء كفارة المجلس\",\"textEn\":\"Line up calmly reciting Kaffarat Al-Majlis supplication\"}],\"titleAr\":\"رتب خطوات حزم الأمتعة والانصراف الذهبي\",\"titleEn\":\"End-of-Day Pack-Up Sequence Challenge\",\"type\":\"put_in_order\"},\"partner\":{\"promptAr\":\"ينظر الطالب إلى مقعد زميله وينظر الزميل إلى مقعده: هل هناك قلم منسي؟ هل الأرضية نظيفة؟ هل الكرسي في مكانه؟ يمنحان بعضهما إشارة الاعتماد!\",\"promptEn\":\"Partners cross-audit desks: Any forgotten markers? Floor spotless? Chair tucked? They give each other the thumbs-up sign of clearance!\",\"titleAr\":\"الفحص المتبادل للأمانة قبل الخروج\",\"titleEn\":\"Mutual Floor & Desk Audit\"},\"practise\":{\"promptAr\":\"تدريب عملي: يطلق المعلم مؤقت الـ ٩٠ ثانية، وينتهي الصف بأكمله من الترتيب، فحص الأرضيات، إدخال الكراسي، والاصطفاف الصامت كفرسان حقيقيين!\",\"promptEn\":\"Classroom rehearsal: 90-second countdown; whole class completes desk tidy, floor scan, chair push-in, and silent lineup like true champions!\",\"stemsAr\":[\"«أظهرت قيمة الأمانة والمسؤولية عندما تفقدت أرضية مقعدك وتأكدت من خلوها من المهملات.»\",\"«في المرة القادمة يمكنك تحسين هدوء انصرافك برفع الكرسي قليلاً عند إدخاله لمنع الصرير.»\"],\"stemsEn\":[\"'You showed Honesty and Responsibility when scanning your floor thoroughly.'\",\"'Next time, you can improve by lifting your chair slightly to prevent floor screeches.'\"],\"titleAr\":\"تحدي الـ ٩٠ ثانية للصف المثالي (The 90-Second Reset)\",\"titleEn\":\"The 90-Second Reset Practical Rehearsal\"},\"pypProfile\":[\"Reflective\",\"Principled\"],\"pypProfileAr\":[\"متأمل\",\"ذو مبادئ\"],\"realLifeMission\":{\"requiresTeacherSignoff\":true,\"taskAr\":\"عند جرس الانصراف الأخير اليوم: يغادر الفصل بأكمله بنسبة ١٠٠٪ كراسي مدخلة وأرضية تلمع من النظافة دون ورقة واحدة ملقاة!\",\"taskEn\":\"At final dismissal bell today: 100% of chairs tucked, floor shining spotless, with zero forgotten supplies!\",\"titleAr\":\"مهمة الانصراف الذهبي: صفر مهملات وصفر كراسي مائلة\",\"titleEn\":\"Golden Dismissal Mission: Zero Trash & Tucked Chairs\"},\"reflection\":{\"questionAr\":\"كيف تكون الأمانة تاج الفارس المسلم؟ وكيف يشهد المكان لنا يوم القيامة بما فعلنا فيه من خير ونظافة؟\",\"questionEn\":\"How is honesty and integrity the crown of a Muslim student? How will our learning spaces testify to our care and righteousness?\"},\"successCriteriaAr\":[\"أشرح كيف أن نظافة الصف وحفظ أدواته أمانة استودعنا الله إياها.\",\"أتوقف فوراً عند إشارة المعلم وأجمع أدواتي الشخصية في حقيبتي.\",\"أفحص الدرج والأرضية تحت المقعد للتأكد من خلوها من أي ورقة أو قلم.\",\"أدخل الكرسي برفق تحت الطاولة دون صرير أو عرقلة للممر.\",\"أصطف في طابور الانصراف بسكينة وأردد دعاء كفارة المجلس.\",\"أتأمل في إنجازي اليومي وأعزم على بدء الغد بنشاط وهمة.\"],\"successCriteriaEn\":[\"Explain how classroom furniture and cleanliness are a sacred trust (Amanah).\",\"Freeze upon dismissal signal and pack all personal supplies neatly.\",\"Scan drawer and floor under desk thoroughly: zero trash, zero left stationery.\",\"Push chair gently under table without dragging or screeching on floor.\",\"Form calm dismissal line reciting the Kaffarat Al-Majlis Dua.\",\"Reflect on today's learning and commit to starting tomorrow with high energy.\"],\"taglineAr\":\"ترك الصف أنظف مما كان، والعودة إلى البيت برضا\",\"taglineEn\":\"Leaving class spotless, heading home with proud hearts\",\"titleAr\":\"١٠. الاستعداد للانصراف وحفظ الأمانة\",\"titleEn\":\"10. Pack-Up Mastery & End-of-Day Amanah\"}]");
var scenarios_default = /*#__PURE__*/ JSON.parse("[{\"id\":1,\"character\":\"سعود\",\"characterEn\":\"Saud\",\"titleAr\":\"الباب مغلق وسعود متأخر دقيقتين\",\"titleEn\":\"Closed Door & Saud is 2 Minutes Late\",\"contextAr\":\"وصل سعود إلى باب الفصل بعد بدء الحصة بدقيقتين، ووجد الباب مغلقاً والمعلم يشرح في الداخل. ماذا يفعل سعود ليتصرف كبطل حقيقي؟\",\"contextEn\":\"Saud arrives at the classroom door 2 minutes after class began. The door is shut and the teacher is teaching inside. What should Saud do?\",\"optionsAr\":[{\"text\":\"يطرق الباب بقوة بيده وقدمه ليسمعه المعلم سريعاً ويدخل مسرعاً.\",\"correct\":false,\"feedback\":\"غير صحيح! الطرق العنيف يفزع الطلاب والمعلم ويخالف أدب الاستئذان.\"},{\"text\":\"يطرق ٣ طرقات خفيفة بأطراف أصابعه، يقف جانباً، وينتظر الإذن بسلام وابتسامة.\",\"correct\":true,\"feedback\":\"ممتاز ومبهر! طبق سعود هدي النبي ﷺ في الاستئذان ثلاثاً والوقوف جانباً ثم إلقاء السلام والدخول برفق.\"},{\"text\":\"يفتح الباب فوراً دون أي استئذان ويتسلل إلى مقعده بهدوء.\",\"correct\":false,\"feedback\":\"غير صحيح! الدخول المباغت دون إذن يشتت انتباه الصف وينتهك خصوصية الدرس.\"}],\"optionsEn\":[{\"text\":\"Bang on the door with fists and kick it so the teacher hears him quickly.\",\"correct\":false,\"feedback\":\"Incorrect! Banging startles the class and violates the Adab of Isti'dhan.\"},{\"text\":\"Tap gently 3 times with fingertips, stand to the side, and wait for permission with Salam.\",\"correct\":true,\"feedback\":\"Brilliant champion! Saud followed the Sunnah of asking permission thrice and standing to the side.\"},{\"text\":\"Turn the knob directly without knocking and sneak in toward his seat.\",\"correct\":false,\"feedback\":\"Incorrect! Bursting in without permission disrupts learning and violates classroom respect.\"}],\"hadithAnchorAr\":\"«الاستئذان ثلاث، فإن أذن لك وإلا فارجع» — الأدب النبوي في الاستئذان.\",\"hadithAnchorEn\":\"'Permission is to be asked thrice; if granted enter, otherwise return.' — Sunnah Adab.\",\"pypProfileAr\":\"ذو مبادئ (Principled)\",\"pypProfileEn\":\"Principled & Caring\"},{\"id\":2,\"character\":\"فيصل\",\"characterEn\":\"Faisal\",\"titleAr\":\"فيصل في الممر متجهاً لدورة المياه\",\"titleEn\":\"Faisal in the Hallway Heading to the Restroom\",\"contextAr\":\"أخذ فيصل بطاقة الخروج للحمام، ووجد الممر فارغاً ومغرياً للركض والقفز. ماذا يفعل فيصل؟\",\"contextEn\":\"Faisal received the restroom pass. The hallway is completely empty and tempting for a fast sprint. How should Faisal behave?\",\"optionsAr\":[{\"text\":\"ينطلق بأقصى سرعة كلاعب كرة قدم ليوفر الوقت ويتسلى في الممر.\",\"correct\":false,\"feedback\":\"خطر! الركض في الممرات قد يسبب انزلاقاً خطيراً واصطداماً بأبواب الفصول.\"},{\"text\":\"يمشي بهدوء وسكينة ويلتزم الجانب الأيمن محافظاً على وقاره واحترام الفصول المجاورة.\",\"correct\":true,\"feedback\":\"رائع وبطل! التزم فيصل بحديث النبي ﷺ: «عليكم بالسكينة والوقار» وعكس صورة الطالب ذي المبادئ.\"},{\"text\":\"يمشي وهو يضرب بيده على كل باب يمر بجانبه ليعرف من في الداخل.\",\"correct\":false,\"feedback\":\"سلوك خاطئ! هذا إزعاج شديد وإيذاء للطلاب المعلمين في الفصول المجاورة.\"}],\"optionsEn\":[{\"text\":\"Sprint at full speed like a striker to have fun and test his speed.\",\"correct\":false,\"feedback\":\"Danger! Hallway running causes severe slips, collisions, and breaks school safety.\"},{\"text\":\"Walk with calm serenity on the right side, maintaining dignity and quietness.\",\"correct\":true,\"feedback\":\"Splendid! Faisal embodies the Prophet's instruction: 'Adhere to tranquility' and acts as a Principled learner.\"},{\"text\":\"Walk while slapping every classroom door he passes to hear the echo.\",\"correct\":false,\"feedback\":\"Disruptive! Banging on hallway doors startles students and interrupts lessons.\"}],\"hadithAnchorAr\":\"«عليكم بالسكينة والوقار» — السكينة والهدوء عبادة وأمان.\",\"hadithAnchorEn\":\"'Adhere to tranquility and dignity' — Calmness is worship and safety.\",\"pypProfileAr\":\"متأمل (Reflective)\",\"pypProfileEn\":\"Reflective & Principled\"},{\"id\":3,\"character\":\"سلمان وريان\",\"characterEn\":\"Salman & Rayan\",\"titleAr\":\"انتهاء الفسحة وبقايا العصير على المقعد\",\"titleEn\":\"Break Ends: Juice Box & Crumbs on the Bench\",\"contextAr\":\"دق جرس انتهاء الفسحة، ولاحظ سلمان أن صديقه ريان نسي علبة عصير فارغة ومنديلاً على المقعد الذي كانا يجلسان عليه. ماذا يفعل سلمان؟\",\"contextEn\":\"The bell rings ending break. Salman notices his friend Rayan forgot an empty juice box and wrapper on their bench. What should Salman do?\",\"optionsAr\":[{\"text\":\"يتجاهل الأمر ويركض للصف، قائلاً في نفسه: هذه ليست قمامتي بل قمامة ريان!\",\"correct\":false,\"feedback\":\"تصرف سلبي! المؤمن يحب لأخيه ما يحب لنفسه ويحرص على نظافة بيئته.\"},{\"text\":\"ينبه ريان بلطف ويساعده فوراً في رميها في سلة المهملات ومسح المقعد: «لا تترك أثراً».\",\"correct\":true,\"feedback\":\"ما شاء الله! طبق سلمان قيمة التعاون والإحسان ونال أجر إماطة الأذى عن الطريق وحفظ جمال مدرسته.\"},{\"text\":\"يصرخ على ريان أمام الطلاب في الساحة ويعنفه بصوت مرتفع.\",\"correct\":false,\"feedback\":\"خاطئ! النصيحة على الملأ فضيحة؛ الأدب النبوي هو الرفق والستر والتعاون.\"}],\"optionsEn\":[{\"text\":\"Ignore it and dash to class, thinking: 'Not my garbage, Rayan left it!'\",\"correct\":false,\"feedback\":\"Selfish choice! Caring stewards take collective responsibility for their school environment.\"},{\"text\":\"Kindly remind Rayan, help him toss it in the bin, and wipe the bench clean.\",\"correct\":true,\"feedback\":\"True hero! Salman showed brotherly teamwork and earned the reward of removing harm.\"},{\"text\":\"Yell loudly at Rayan in front of everyone in the schoolyard to embarrass him.\",\"correct\":false,\"feedback\":\"Wrong! The Sunnah teaches gentle guidance, privacy, and kind brotherly support.\"}],\"hadithAnchorAr\":\"«إماطة الأذى عن الطريق صدقة» — حفظ البيئة عبادة وصدقة جارية.\",\"hadithAnchorEn\":\"'Removing harm from the pathway is an act of charity.'\",\"pypProfileAr\":\"مهتم (Caring)\",\"pypProfileEn\":\"Caring & Balanced\"},{\"id\":4,\"character\":\"خالد\",\"characterEn\":\"Khalid\",\"titleAr\":\"الاستعداد لصلاة الظهر وتنظيم الحذاء في الفصل\",\"titleEn\":\"Dhuhr Prayer Prep & Classroom Shoe Placement\",\"contextAr\":\"حان وقت صلاة الظهر وأعلن المعلم بدء الاستعداد. لاحظ خالد أن زميلاً ترك كتبه مبعثرة على الطاولة وأسرع نحو الباب بحذائه دون تفقد وضوئه أو وضع الحذاء بهدوء تحت الطاولة. ماذا يفعل خالد؟\",\"contextEn\":\"Dhuhr prayer time arrives and the teacher instructs everyone to prepare. Khalid notices a classmate left books scattered and rushed toward the door with shoes on without checking Wudu or placing shoes neatly under the desk. What should Khalid do?\",\"optionsAr\":[{\"text\":\"يتجاهل الأمر ويركض ليتجاوزه في الصف عند الباب ليكون الأول.\",\"correct\":false,\"feedback\":\"غير مناسب: الاستعجال والتدافع يعطلان السكينة، والتصرف البناء هو التذكير الهادئ بروتين الصف.\"},{\"text\":\"يذكره بلطف بحفظ كتبه ووضع حذائه مرتباً تحت طاولته ثم الاصطفاف بهدوء.\",\"correct\":true,\"feedback\":\"بارك الله فيك! ذكر زميله بروتين الفصل للصلاة، وساعد على حفظ النظام والسير بسكينة.\"},{\"text\":\"يصرخ عليه بصوت مرتفع أمام الجميع ليوبخه.\",\"correct\":false,\"feedback\":\"غير ملائم: النصيحة والتذكير يكونان بالرفق والهدوء لتعزيز روح الفريق والتعاون.\"}],\"optionsEn\":[{\"text\":\"Ignore him and sprint to beat him to the front of the line at the door.\",\"correct\":false,\"feedback\":\"Unhelpful choice: Rushing and racing disrupt Sakinah; the constructive path is gentle peer coaching.\"},{\"text\":\"Calmly remind him to pack his books, place his shoes neatly under his desk, and line up safely together.\",\"correct\":true,\"feedback\":\"Excellent! Khalid modeled the classroom prayer routine and supported his peer with gentle teamwork.\"},{\"text\":\"Shout loudly at him across the classroom to call him out.\",\"correct\":false,\"feedback\":\"Ineffective approach: Respectful reminders given with kindness build a supportive classroom community.\"}],\"hadithAnchorAr\":\"«إِذَا أُقِيمَتِ الصَّلَاةُ فَلَا تَأْتُوهَا تَسْعَوْنَ، وَأْتُوهَا تَمْشُونَ وَعَلَيْكُمُ السَّكِينَةُ» (متفق عليه) — السكينة في التوجه للصلاة.\",\"hadithAnchorEn\":\"'When prayer is called, do not come running, but walk with calmness and tranquility.' (Agreed upon) — Walking with Sakinah.\",\"pypProfileAr\":\"ذو مبادئ (Principled)\",\"pypProfileEn\":\"Principled & Caring\"},{\"id\":5,\"character\":\"عبدالله وطارق\",\"characterEn\":\"Abdullah & Tariq\",\"titleAr\":\"سقوط المقلمة أثناء شرح الدرس\",\"titleEn\":\"Spilled Pencil Case During the Lesson\",\"contextAr\":\"بينما المعلم يشرح مفهوماً مهماً، تحرك عبدالله فاصطدمت يده سهواً بمقلمة طارق وتناثرت أقلامه على الأرض. ماذا يفعل الاثنان؟\",\"contextEn\":\"While the teacher is explaining a key concept, Abdullah accidentally bumps Tariq's pencil case, sending crayons across the floor. What should they do?\",\"optionsAr\":[{\"text\":\"يبدأ طارق في الصراخ ولوم عبدالله بصوت مرتفع يعطل الدرس.\",\"correct\":false,\"feedback\":\"غير مناسب: رفع الصوت يعطل تركيز الصف؛ والتصرف البناء هو تفهم أن الحادث غير مقصود.\"},{\"text\":\"يعتذر عبدالله بهمس، ويساعده بهدوء وسرعة في جمع الأقلام دون مقاطعة المعلم.\",\"correct\":true,\"feedback\":\"قمة النضج والأدب! اعتذار فوري، تعاون صامت، واحترام كامل لوقت الدرس.\"},{\"text\":\"يضحك عبدالله ويترك الأقلام على الأرض مبعثرة لطارق وحده.\",\"correct\":false,\"feedback\":\"غير ملائم: التعاون الفوري وتحمل مسؤولية الخطأ العفوي يقويان روابط الصداقة والأخوة.\"}],\"optionsEn\":[{\"text\":\"Tariq shouts at Abdullah in anger, disrupting the entire classroom lesson.\",\"correct\":false,\"feedback\":\"Raising one's voice interrupts everyone's learning; accepting honest accidents with patience preserves harmony.\"},{\"text\":\"Abdullah whispers a sincere apology and immediately helps gather pencils quietly.\",\"correct\":true,\"feedback\":\"Exemplary maturity! Swift apology, quiet teamwork, and deep respect for the teacher's lesson.\"},{\"text\":\"Abdullah laughs and walks away, leaving Tariq to crawl for his pencils alone.\",\"correct\":false,\"feedback\":\"Unhelpful reaction; taking gentle responsibility and helping a friend shows true sportsmanship.\"}],\"hadithAnchorAr\":\"«والله في عون العبد ما كان العبد في عون أخيه» — التعاون والتسامح.\",\"hadithAnchorEn\":\"'Allah assists His servant as long as he assists his companion.'\",\"pypProfileAr\":\"متواصل ومتعاون (Communicator & Caring)\",\"pypProfileEn\":\"Communicator & Caring\"},{\"id\":6,\"character\":\"فهد\",\"characterEn\":\"Fahad\",\"titleAr\":\"قلم غالي الثمن تحت المقعد وقت الانصراف\",\"titleEn\":\"An Expensive Pen Under the Desk at Dismissal\",\"contextAr\":\"أثناء فحص فهد لأرضية مقعده قبل الانصراف، وجد قلماً جميلاً وباهظ الثمن لا يخصه. ماذا يفعل فهد؟\",\"contextEn\":\"While scanning under his desk at dismissal, Fahad spots an expensive, shiny marker that doesn't belong to him. What should Fahad do?\",\"optionsAr\":[{\"text\":\"يضعه في جيبه بسرعة ويقول: «وجدته تحت طاولتي فهو من نصيبي!»\",\"correct\":false,\"feedback\":\"خلاف الأمانة: اللقطة في المدرسة أمانة يجب تسليمها للمعلم أو إعادتها لصاحبها.\"},{\"text\":\"يسلمه فوراً للمعلم قائلاً: «وجدته تحت الطاولة يا أستاذ»، لحفظ الأمانة وإعادته لزميله.\",\"correct\":true,\"feedback\":\"أمانة الفرسان! طبق فهد وصية النبي ﷺ: «أدِّ الأمانة إلى من ائتمنك» واستحق ثقة الجميع.\"},{\"text\":\"يدوس عليه أو يرميه في سلة المهملات لأنه لا يحتاجه.\",\"correct\":false,\"feedback\":\"غير مسؤول: حفظ ممتلكات الزملاء أمانة، ورميها يسبب إهداراً وضيقاً للغير.\"}],\"optionsEn\":[{\"text\":\"Shove it secretly into his pocket, thinking: 'Finders keepers!'\",\"correct\":false,\"feedback\":\"Inconsistent with integrity; school belongings found must be returned or handed to staff.\"},{\"text\":\"Hand it straight to the teacher: 'I found this under the desk', guarding the trust.\",\"correct\":true,\"feedback\":\"Integrity champion! Fahad upheld the Hadith: 'Fulfill the trust to those who trust you'.\"},{\"text\":\"Step on it or toss it into the trash can because he doesn't need it.\",\"correct\":false,\"feedback\":\"Disregard for property; safeguarding others' stationery shows care and high character.\"}],\"hadithAnchorAr\":\"«أدِّ الأمانة إلى من ائتمنك» — الأمانة تاج المسلم وفخره.\",\"hadithAnchorEn\":\"'Fulfill the trust to those who entrusted you.' — Integrity.\",\"pypProfileAr\":\"ذو مبادئ (Principled)\",\"pypProfileEn\":\"Principled & Reflective\"},{\"id\":7,\"character\":\"حمزة وزياد\",\"characterEn\":\"Hamza & Ziyad\",\"titleAr\":\"صناديق الأدوات الفنية الثقيلة\",\"titleEn\":\"Heavy Art Supplies in the Hallway\",\"contextAr\":\"شاهد حمزة زميله زياد يحمل صندوقاً كرتونياً ثقيلاً يحتوي على أدوات التربية الفنية وكان يكاد يسقط منه. ماذا يفعل حمزة؟\",\"contextEn\":\"Hamza sees his classmate Ziyad struggling to carry a heavy cardboard box of art supplies that is about to slip from his hands. What should Hamza do?\",\"optionsAr\":[{\"text\":\"يسرع للمساعدة قائلاً: «يا زياد، دعني أحمل معك من هذا الجانب»، ويتقاسمان الثقل.\",\"correct\":true,\"feedback\":\"إيثار ومروءة! جسد حمزة قول النبي ﷺ: «المؤمن للمؤمن كالبنيان يشد بعضه بعضاً» وخفف عن أخيه.\"},{\"text\":\"يقف يراقبه ويضحك عندما يرى الصندوق يتأرجح بين يديه.\",\"correct\":false,\"feedback\":\"سلوك يحتاج تقويماً: الضحك عند تعب الزميل يضعف روح التعاون؛ والواجب المسارعة بالعون.\"},{\"text\":\"يمر بجانبه مسرعاً متظاهراً بأنه لم يره حتى لا يتعب نفسه.\",\"correct\":false,\"feedback\":\"سلبية: المبادرة الكريمة ومساعدة الزميل تزرعان المحبة والمروءة في مدرستنا.\"}],\"optionsEn\":[{\"text\":\"Rush forward saying: 'Let me take this side Ziyad!' and share the weight together.\",\"correct\":true,\"feedback\":\"Heroic kindness! Hamza lived the Prophet's teaching of believers supporting each other like a solid structure.\"},{\"text\":\"Stand watching and laugh as the box wobbles precariously in Ziyad's hands.\",\"correct\":false,\"feedback\":\"Unconstructive reaction: Watching a peer struggle without helping misses an opportunity for kindness.\"},{\"text\":\"Walk briskly past, pretending he didn't see him so he doesn't have to carry anything.\",\"correct\":false,\"feedback\":\"Missed opportunity: Proactive peer support builds a strong and caring classroom community.\"}],\"hadithAnchorAr\":\"«المؤمن للمؤمن كالبنيان يشد بعضه بعضاً» — التكاتف والقوة.\",\"hadithAnchorEn\":\"'Believers are like a solid building, each part strengthening the other.'\",\"pypProfileAr\":\"مهتم (Caring)\",\"pypProfileEn\":\"Caring & Inquirer\"},{\"id\":8,\"character\":\"راكان وبدر\",\"characterEn\":\"Rakan & Badr\",\"titleAr\":\"الحماس في طابور حصة التربية البدنية\",\"titleEn\":\"High Energy in the PE Lineup\",\"contextAr\":\"أثناء الوقوف في طابور حصة التربية البدنية، شعر راكان بحماس وطاقة عالية، وأراد أن يدفع بدر للأمام من باب المزاح. ماذا يفعل راكان؟\",\"contextEn\":\"While lining up for PE class, Rakan feels super energized and is tempted to shove Badr forward as a playful prank. What should Rakan do?\",\"optionsAr\":[{\"text\":\"يدفعه بقوة ليسقط على من أمامه ويضحك الجميع في الطابور.\",\"correct\":false,\"feedback\":\"خطر كبير! الدفع في الطوابير قد يسبب كسوراً وإصابات خطيرة ويجرح كرامة الزميل.\"},{\"text\":\"يضبط نفسه، يضع يديه جانباً، ويفرغ طاقته لاحقاً في التمارين الرياضية بالميدان.\",\"correct\":true,\"feedback\":\"بطل يملك زمام نفسه! «ليس الشديد بالصُّرَعَة، إنما الشديد الذي يملك نفسه عند الغضب والحماس».\"},{\"text\":\"يلمس ظهر بدر مراراً وتكراراً ليزعجه ويشتت انتباهه.\",\"correct\":false,\"feedback\":\"إيذاء وتعدٍّ على المساحة الشخصية! أمرنا النبي ﷺ بكف الأذى واحترام الآخرين.\"}],\"optionsEn\":[{\"text\":\"Give him a hard push so Badr crashes into the boys in front, causing laughs.\",\"correct\":false,\"feedback\":\"Dangerous prank! Shoving in lines leads to severe injuries and violates safety rules.\"},{\"text\":\"Exercise self-control, keep hands to his side, and channel energy into sports drills later.\",\"correct\":true,\"feedback\":\"Champion of self-discipline! The Prophet ﷺ taught that the real strong person controls himself.\"},{\"text\":\"Poke Badr's shoulder repeatedly to annoy him and distract the whole line.\",\"correct\":false,\"feedback\":\"Boundary breach! Annoying peers disrupts classroom harmony and breaks personal space rules.\"}],\"hadithAnchorAr\":\"«ليس الشديد بالصُّرَعَة، إنما الشديد الذي يملك نفسه» — ضبط النفس والقوة الحقيقية.\",\"hadithAnchorEn\":\"'The strong is not the one who overcomes others, but the one who controls himself.'\",\"pypProfileAr\":\"ذو مبادئ ومتزن (Principled & Balanced)\",\"pypProfileEn\":\"Principled & Balanced\"},{\"id\":9,\"character\":\"نواف وسلطان\",\"characterEn\":\"Nawaf & Sultan\",\"titleAr\":\"نسيان قلم الرصاص في اختبار قصير\",\"titleEn\":\"Forgotten Pencil Before a Quick Quiz\",\"contextAr\":\"أعلن المعلم عن نشاط كتابي، فاكتشف سلطان أنه نسي مقلمته في البيت وشعر بالقلق والإحراج. لاحظه نواف، ماذا يفعل؟\",\"contextEn\":\"The teacher announces an interactive writing task. Sultan realizes he left his pencil case at home and feels stressed and embarrassed. Nawaf notices. What should Nawaf do?\",\"optionsAr\":[{\"text\":\"يبتسم له بلطف ويخرج قلماً وممحاة إضافيين من مقلمته ويعيرهما له قائلاً: «أبشر، نحن فريق واحد!»\",\"correct\":true,\"feedback\":\"كرم وروح تعاون رائعة! فرّج نواف عن زميله، «ومن فرج عن مسلم كربة من كرب الدنيا فرج الله عنه كربة من كرب يوم القيامة».\"},{\"text\":\"يقول له بصوت عالٍ: «لماذا لا تتذكر أدواتك؟ لن أعطيك شيئاً!»\",\"correct\":false,\"feedback\":\"التصرف اللطيف والدعم الهادئ يقويان التعاون والمحبة، والتوجيه يكون بالرفق والكلمة الطيبة بعيداً عن الإحراج.\"},{\"text\":\"يخفي أقلامه الإضافية حتى لا يستعيرها أحد.\",\"correct\":false,\"feedback\":\"المبادرة الكريمة ومشاركة الأدوات تنشران المودة وروح التعاون بين الجميع.\"}],\"optionsEn\":[{\"text\":\"Smiles warmly, takes out a spare pencil and eraser, and lends them: 'Don't worry, we are a team!'\",\"correct\":true,\"feedback\":\"Exemplary team spirit and compassion! The Prophet ﷺ said: 'Whoever relieves a believer's hardship, Allah relieves his hardship.'\"},{\"text\":\"Loudly announces: 'Why did you forget your tools? I am not lending you anything!'\",\"correct\":false,\"feedback\":\"Public embarrassment disrupts classroom harmony. Gentle support and polite communication build mutual trust.\"},{\"text\":\"Quickly hides his spare pencils inside his desk so no one asks to borrow them.\",\"correct\":false,\"feedback\":\"Holding back needed help misses an opportunity for kindness and supportive teamwork.\"}],\"hadithAnchorAr\":\"«من فرج عن مسلم كربة من كرب الدنيا فرج الله عنه كربة من كرب يوم القيامة» — الإحسان وتفريج الكرب.\",\"hadithAnchorEn\":\"'Whoever relieves a believer of a hardship, Allah relieves him of a hardship on Judgment Day.'\",\"pypProfileAr\":\"مهتم (Caring)\",\"pypProfileEn\":\"Caring & Open-minded\"},{\"id\":10,\"character\":\"عبدالعزيز\",\"characterEn\":\"Abdulaziz\",\"titleAr\":\"صنبور ماء مفتوح بعد الوضوء\",\"titleEn\":\"Running Water Tap After Wudu\",\"contextAr\":\"بعد انتهاء وقت الوضوء لصلاة الظهر، لاحظ عبدالعزيز أن صنبور ماء بقي مفتوحاً يهدر الماء بغزارة في المغاسل ولا يوجد أحد عنده. ماذا يفعل؟\",\"contextEn\":\"After Wudu for Dhuhr, Abdulaziz notices a faucet left running, wasting gallons of water with nobody around. What should Abdulaziz do?\",\"optionsAr\":[{\"text\":\"يقول في نفسه: «لست أنا من فتحه فلست مسؤولاً عنه!» ويخرج مسرعاً.\",\"correct\":false,\"feedback\":\"سلبية وعدم مبالاة! حفظ نعمة الماء والمرافق العامة مسؤولية كل مسلم في أي مكان.\"},{\"text\":\"يتوجه فوراً للصنبور ويغلقه بإحكام، حماية لنعمة الماء وطلباً للأجر في حفظ البيئة.\",\"correct\":true,\"feedback\":\"بطل استثنائي! مارس عبدالعزيز المسؤولية وحفظ النعمة والنهي عن الإسراف كما علمنا نبينا ﷺ.\"},{\"text\":\"يلعب بالماء المتدفق ويزيد في فتحه أكثر.\",\"correct\":false,\"feedback\":\"إسراف وإفساد في الأرض! قوله تعالى: ﴿وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ﴾.\"}],\"optionsEn\":[{\"text\":\"Shrug and think: 'I didn't turn it on, so not my problem!' and walk away.\",\"correct\":false,\"feedback\":\"Bystander apathy! Conserving water and protecting shared resources is every student's duty.\"},{\"text\":\"Steps forward immediately and shuts it firmly, saving water and honoring the divine blessing.\",\"correct\":true,\"feedback\":\"Eco-steward champion! Abdulaziz acted with principled responsibility, preventing waste.\"},{\"text\":\"Plays with the splashing water and twists it wider to make a bigger splash.\",\"correct\":false,\"feedback\":\"Severe waste! Quran 7:31: 'Eat and drink, but waste not by excess, for Allah loves not the wasters.'\"}],\"hadithAnchorAr\":\"«لا تسرف في الماء ولو كنت على نهرٍ جارٍ» — حفظ النعمة ومسؤولية الأمانة.\",\"hadithAnchorEn\":\"'Do not waste water even if you were at a running stream.' — Environmental stewardship.\",\"pypProfileAr\":\"متأمل وذو مبادئ (Reflective & Principled)\",\"pypProfileEn\":\"Reflective & Principled\"},{\"id\":11,\"character\":\"سلمان\",\"characterEn\":\"Salman\",\"titleAr\":\"من يحتاج مساعدة؟ طالب جديد وحيد في الساحة (تحدي قصة القيم)\",\"titleEn\":\"Who Needs Help? Helping a Friend Challenge (Value Story Challenge)\",\"contextAr\":\"لاحظ سلمان في وقت الفسحة طالباً جديداً يقف وحيداً تماماً في ساحة المدرسة. يبدو الصبي خجولاً وليس لديه أحد ليلعب معه. ماذا يجب على سلمان أن يفعل ليظهر قيمة الرحمة؟\",\"contextEn\":\"Salman notices a new classmate standing all alone in the playground during recess. The boy looks shy and has no one to play with. What should Salman do? What is the best choice that shows Compassion?\",\"optionsAr\":[{\"text\":\"يتجاهله ويستمر في اللعب مع أصدقائه، قائلاً في نفسه: «سيعثر على أصدقاء لاحقاً بمفرده».\",\"correct\":false,\"feedback\":\"تصرف سلبي: التجاهل يترك الزميل الجديد يشعر بالعزلة والغربة؛ وقيمة الرحمة النبوية تحثنا على المبادرة والاحتواء والتآخي.\"},{\"text\":\"يتوجه إليه بابتسامة دافئة، يُلقي عليه السلام: «السلام عليكم ورحمة الله»، ويدعوه بلطف لمشاركتهم اللعب.\",\"correct\":true,\"feedback\":\"ما شاء الله! قمة الرحمة والشهامة النبوية. قال النبي ﷺ: «الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ».\"},{\"text\":\"يصرخ عليه بصوت مرتفع عبر الساحة أمام الجميع: «يا هذا! لماذا تقف وحيداً هكذا؟!»\",\"correct\":false,\"feedback\":\"سلوك خاطئ ومحرج: الصراخ العلني يزيد خجل زميلك؛ والأدب النبوي هو الاقتراب برفق والحديث بلطف ومودة وبشاشة.\"}],\"optionsEn\":[{\"text\":\"Ignore him and keep playing with his friends, thinking: 'He will find friends later.'\",\"correct\":false,\"feedback\":\"Bystander indifference: Leaving a newcomer isolated misses a golden opportunity to show brotherly care and empathy.\"},{\"text\":\"Walk over with a warm smile, say 'As-salamu alaykum', and kindly invite him to join the game.\",\"correct\":true,\"feedback\":\"Outstanding empathy and Sunnah character! The Prophet ﷺ said: 'The merciful are shown mercy by the Most Merciful; show mercy to those on earth'.\"},{\"text\":\"Yell loudly across the yard: 'Hey, why are you standing all by yourself?'\",\"correct\":false,\"feedback\":\"Unkind and embarrassing: Shouting across the yard makes a shy peer feel more exposed. True kindness approaches gently with privacy.\"}],\"hadithAnchorAr\":\"«الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ» (رواه الترمذي وصححه الألباني) — التراحم وبناء الأخوة الإيمانية.\",\"hadithAnchorEn\":\"'The merciful are shown mercy by the Most Merciful. Show mercy to those on earth, and the One in the heavens will show mercy to you.' (Tirmidhi) — Compassion.\",\"pypProfileAr\":\"مهتم ومتواصل (Caring & Communicator)\",\"pypProfileEn\":\"Caring & Communicator\"},{\"id\":12,\"character\":\"طارق\",\"characterEn\":\"Tariq\",\"titleAr\":\"انسكاب وجبة الإفطار في الكافيتريا (تحدي النجدة والعون)\",\"titleEn\":\"Spilled Breakfast Tray in the Cafeteria (Caring & Helping Challenge)\",\"contextAr\":\"أثناء استلام وجبة الإفطار في كافيتريا المدرسة، تعثر طالب في الصفوف الأولية وسقطت صينيته على الأرض وتناثر طعامه وشعر بالحرج والارتباك. كان طارق يقف قريباً منه ومعه وجبته. ماذا يفعل طارق ليظهر روح الإحسان والرحمة؟\",\"contextEn\":\"In the school cafeteria, a younger primary student trips, dropping his breakfast tray with food spilling onto the floor. The younger boy feels shocked and embarrassed. Tariq is standing nearby with his tray. What should Tariq do to embody Ihsan and Compassion?\",\"optionsAr\":[{\"text\":\"يقف جانباً ويضحك مع زملائه ويشير إليه في طابور الكافيتريا.\",\"correct\":false,\"feedback\":\"مرفوض تماماً: السخرية من عثرات الصغار تجرح مشاعرهم وتنافي الرحمة والمروءة التي حثنا عليها ديننا الحنيف.\"},{\"text\":\"يضع صينيته بأمان، يطمئن الصغير بابتسامة: «لا بأس يا بطل»، يساعده على مسح المكان، ويصطحبه لمشرف الكافيتريا لاستبدال وجبته.\",\"correct\":true,\"feedback\":\"فارس شهم ونبيل! قال رسول الله ﷺ: «مَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ»، فجمع بين النجدة والرحمة والمسؤولية.\"},{\"text\":\"يتفادى المكان بسرعة حتى لا يطلب منه أحد المساعدة في التنظيف.\",\"correct\":false,\"feedback\":\"سلبية: التهرب من مساعدة المحتاج يفوت عليك أجر الصدقة وإغاثة الملهوف.\"}],\"optionsEn\":[{\"text\":\"Stand aside and giggle with his friends, pointing at the younger boy in line.\",\"correct\":false,\"feedback\":\"Disrespectful: Laughing at accidents hurts feelings and contradicts the noble Islamic character of brotherhood.\"},{\"text\":\"Set his own tray down safely, comfort the boy: 'It's okay buddy!', help him up, clean the spill, and escort him to staff for a replacement.\",\"correct\":true,\"feedback\":\"True chivalry and compassion! The Prophet ﷺ said: 'Whoever relieves a brother in need, Allah will be in his need'.\"},{\"text\":\"Dodge around the spill quickly to avoid being asked to help clean up.\",\"correct\":false,\"feedback\":\"Selfish passivity: Stepping away from someone in trouble misses an opportunity for rewarded community service.\"}],\"hadithAnchorAr\":\"«مَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ» (متفق عليه) — عون الضعيف وإغاثة الملهوف.\",\"hadithAnchorEn\":\"'Whoever fulfills the needs of his brother, Allah will fulfill his needs.' (Agreed upon) — Mutual Aid.\",\"pypProfileAr\":\"مهتم وذو مبادئ (Caring & Principled)\",\"pypProfileEn\":\"Caring & Principled\"},{\"id\":13,\"character\":\"عمر\",\"characterEn\":\"Omar\",\"titleAr\":\"تمزق صفحة من كتاب المكتبة المدرسية (تحدي الشجاعة وقول الصدق)\",\"titleEn\":\"Torn Library Book Page (Courage & Honesty Challenge)\",\"contextAr\":\"أثناء قراءة عمر لكتاب قيّم في مركز مصادر التعلم (المكتبة)، تمزقت صفحة منه بالخطأ ودون قصد. لم يشاهده أحد من الطلاب أو أمين المكتبة. ماذا يفعل عمر ليتصرف كطالب ذي مبادئ وشجاعة أخلاقية؟\",\"contextEn\":\"While reading a valuable book in the library learning center, Omar accidentally tears a page. Nobody saw him do it. How should Omar act as a Principled student demonstrating moral Courage and Honesty?\",\"optionsAr\":[{\"text\":\"يعيد الكتاب سراً إلى الرف بين الكتب الأخرى وكأن شيئاً لم يحدث.\",\"correct\":false,\"feedback\":\"خيانة للأمانة: إخفاء الخطأ يضر بممتلكات المدرسة وقد يحمل زميلاً آخر المسؤولية ظلماً.\"},{\"text\":\"يتوجه بشجاعة وأدب إلى أمين المكتبة، يوضح له ما حدث باعتذار صادق، ويطلب مساعدته في إصلاح الصفحة بلاصق مخصص للكتب.\",\"correct\":true,\"feedback\":\"شجاعة أخلاقية باهرة! قال رسول الله ﷺ: «عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ». الاعتراف بالخطأ والصدق ميزة الفرسان.\"},{\"text\":\"يمزق الصفحة بالكامل ويرميها في السلة حتى لا يكتشف أحد التمزق.\",\"correct\":false,\"feedback\":\"تفاقم الخطأ: الإتلاف المتعمد ذنب مضاعف يخالف خلق الصدق والأمانة.\"}],\"optionsEn\":[{\"text\":\"Slip the book secretly back onto the shelf among other books as if nothing happened.\",\"correct\":false,\"feedback\":\"Lack of integrity: Hiding an accident harms shared property and might wrongly shift blame onto the next borrower.\"},{\"text\":\"Courageously approach the librarian, politely explain what happened, apologize, and ask to help tape it neatly.\",\"correct\":true,\"feedback\":\"Magnificent moral courage! The Prophet ﷺ said: 'Adhere to truthfulness, for truthfulness leads to righteousness.' Owning mistakes is true leadership.\"},{\"text\":\"Rip the whole page out completely and throw it away so nobody discovers the tear.\",\"correct\":false,\"feedback\":\"Compounding damage: Destroying school property multiplies the mistake and violates honesty.\"}],\"hadithAnchorAr\":\"«عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ» (متفق عليه) — الصدق منجاة وفضيلة.\",\"hadithAnchorEn\":\"'Hold fast to truthfulness, for truthfulness leads to righteousness.' (Agreed upon) — Integrity & Honesty.\",\"pypProfileAr\":\"ذو مبادئ وشجاع (Principled & Courageous)\",\"pypProfileEn\":\"Principled & Courageous\"},{\"id\":14,\"character\":\"حمزة ومعاذ\",\"characterEn\":\"Hamza & Muaath\",\"titleAr\":\"اختلاف الرأي في تصميم مشروع العلوم (تحدي الإنصات والاحترام)\",\"titleEn\":\"Differing Ideas in the Science Team Project (Active Listening & Respect Challenge)\",\"contextAr\":\"أثناء عمل فريق الفرسان في مشروع بحث العلوم، اقترح حمزة فكرة لتصميم النموذج، بينما طرح معاذ فكرة مختلفة تماماً. شعر حمزة برغبة قوية في فرض رأيه ورفض فكرة زميله. كيف يتصرف حمزة باحترام وتفتح ذهني؟\",\"contextEn\":\"During collaborative group research for the Science unit, Hamza suggests a project design, while Muaath proposes an entirely different approach. Hamza feels an urge to insist on his own way and dismiss Muaath's idea. How should Hamza act with Respect and Open-mindedness?\",\"optionsAr\":[{\"text\":\"يصمت ويستمع لمعاذ باهتمام حتى يكمل فكرته، ثم يناقش معه نقاط القوة في كلا الاقتراحين للوصول إلى تصميم يجمع أفضل ما لديهما بروح الفريق.\",\"correct\":true,\"feedback\":\"عقلية علمية وأدب رفيع! الإنصات الفعال وحسن الاستماع لآراء الزملاء من صفات الفارس المسلم المتعلم ذي العقل المتفتح (Open-minded).\"},{\"text\":\"يقاطع معاذاً في منتصف حديثه ويقول: «فكرتي هي الأفضل ولن نستمع لغيرها!»\",\"correct\":false,\"feedback\":\"سوء أدب: مقاطعة المتحدث والاستبداد بالرأي يفسدان روح العمل الجماعي وينتهكان ميثاق الصف.\"},{\"text\":\"ينسحب من المجموعة غاضباً ويرفض المشاركة في المشروع.\",\"correct\":false,\"feedback\":\"سلوك غير ناضج: الاختلاف في وجهات النظر أمر طبيعي ومثمر، والتعاون يبني الحلول المشتركة.\"}],\"optionsEn\":[{\"text\":\"Listen attentively without interrupting until Muaath finishes, then calmly evaluate strengths of both ideas to create a hybrid design together.\",\"correct\":true,\"feedback\":\"Superb collaborative maturity! Active listening and honoring diverse viewpoints embody the IB Open-minded profile and Sunnah respect.\"},{\"text\":\"Interrupt Muaath mid-sentence and insist loudly: 'My idea is the best, we are doing it my way!'\",\"correct\":false,\"feedback\":\"Poor sportsmanship: Cutting off a speaking teammate breaks classroom agreements and undermines mutual respect.\"},{\"text\":\"Storm off angrily in a huff and refuse to contribute to the group assignment.\",\"correct\":false,\"feedback\":\"Immature reaction: Diverse ideas enrich projects. Principled learners solve disagreements through constructive dialogue.\"}],\"hadithAnchorAr\":\"«مَا كَانَ الرِّفْقُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا نُزِعَ مِنْ شَيْءٍ إِلَّا شَانَهُ» (رواه مسلم) — الرفق وأدب الحوار.\",\"hadithAnchorEn\":\"'Gentleness is not in anything except that it beautifies it, and is not removed from anything except that it mars it.' (Muslim) — Respectful Dialogue.\",\"pypProfileAr\":\"منفتح العقل ومتواصل (Open-minded & Communicator)\",\"pypProfileEn\":\"Open-minded & Communicator\"},{\"id\":15,\"character\":\"يوسف\",\"characterEn\":\"Yousef\",\"titleAr\":\"المصاحف وسجادات الصلاة بعد أداء صلاة الظهر (تحدي الإحسان والمسؤولية)\",\"titleEn\":\"Musalla Qurans & Prayer Rugs After Dhuhr (Stewardship & Responsibility Challenge)\",\"contextAr\":\"بعد انتهاء صلاة الظهر وأذكار الصلاة في مصلى المدرسة، لاحظ يوسف أن بعض الطلاب تركوا المصاحف مفتوحة على الأرض وخرجوا مسرعين تاركين سجادات الصف غير مصفوفة. كان يوسف يريد اللحاق بالحصة القادمة. ماذا يفعل ليكون قدوة في الإحسان؟\",\"contextEn\":\"Following Dhuhr prayer and Adhkar in the school Musalla, Yousef notices a couple of Qurans left open on the carpet and a prayer rug bunched up. Yousef wants to get to his next class. How can Yousef act as a role model of Ihsan and Stewardship?\",\"optionsAr\":[{\"text\":\"يتجاهل المصاحف والسجاد قائلاً: «لست أنا من قرأ فيها، ومشرف المصلى سيرتبها لاحقاً».\",\"correct\":false,\"feedback\":\"تفريط في الأجر: تعظيم كتاب الله ونظافة المصلى شرف لكل مسلم وفضيلة عظيمة.\"},{\"text\":\"يتوقف لدقيقة واحدة بكل سكينة، يغلق المصاحف بخشوع ويضعها في مكانها المخصص على الرفوف، ويرتب السجادة برفق ثم يخرج بوقار.\",\"correct\":true,\"feedback\":\"إحسان وخشوع ومسؤولية راقية! قال تعالى: ﴿ذَٰلِكَ وَمَن يُعَظِّمْ شَعَائِرَ اللَّهِ فَإِنَّهَا مِن تَقْوَى الْقُلُوبِ﴾. نال يوسف أجر تعظيم شعائر الله ونظافة مسجده.\"},{\"text\":\"يركض مسرعاً ويدوس فوق السجاد متجاهلاً حرمة المكان.\",\"correct\":false,\"feedback\":\"خطأ جسيم: المشي بسرعة أو إهمال الترتيب في المصلى يتنافى مع أدب المساجد والسكينة.\"}],\"optionsEn\":[{\"text\":\"Ignore the Qurans and rugs, thinking: 'I didn't use them, the custodian will fix it.'\",\"correct\":false,\"feedback\":\"Missed virtue: Revering the Holy Quran and maintaining the prayer hall is a badge of honor for every believer.\"},{\"text\":\"Pause for one minute with reverence, gently close the Qurans and place them on the shelf, straighten the prayer rug, then exit peacefully.\",\"correct\":true,\"feedback\":\"Heartfelt reverence and stewardship! Quran 22:32: 'And whoever honors the symbols of Allah — indeed, it is from the piety of hearts.' Exemplary Ihsan!\"},{\"text\":\"Sprint across the prayer hall stepping on crumpled rugs to reach the door first.\",\"correct\":false,\"feedback\":\"Disrespectful rush: Rushing in the Musalla violates the sacred Adab of prayer spaces and breaks composure.\"}],\"hadithAnchorAr\":\"﴿ذَٰلِكَ وَمَن يُعَظِّمْ شَعَائِرَ اللَّهِ فَإِنَّهَا مِن تَقْوَى الْقُلُوبِ﴾ (سورة الحج: ٣٢) — تعظيم بيوت الله وشعائره.\",\"hadithAnchorEn\":\"'And whoever honors the symbols of Allah — indeed, it is from the piety of hearts.' (Quran 22:32) — Sacred Space Respect.\",\"pypProfileAr\":\"متأمل وذو مبادئ (Reflective & Principled)\",\"pypProfileEn\":\"Reflective & Principled\"}]");
var values_default = /*#__PURE__*/ JSON.parse("[{\"id\":\"compassion\",\"nameAr\":\"الرحمة والتعاطف\",\"nameEn\":\"Compassion\",\"icon\":\"fa-hand-holding-heart\",\"color\":\"emerald\",\"definitionAr\":\"أن تشعر بما يشعر به إخوانك، وتبادر بإعانتهم والرفق بهم، وتحب لهم ما تحب لنفسك.\",\"definitionEn\":\"Feeling what others feel, acting proactively with kindness, and wishing for your brother what you love for yourself.\",\"quranHadithAr\":\"قال رسول الله ﷺ: «الراحمون يرحمهم الرحمن، ارحموا من في الأرض يرحمكم من في السماء» (الترمذي).\",\"quranHadithEn\":\"The Prophet ﷺ said: 'Those who are merciful will be shown mercy by the Most Merciful. Be merciful to those on earth, and the One in the heavens will be merciful to you.'\",\"pypLinkAr\":\"مهتم (Caring) ومنفتح عقلياً (Open-minded)\",\"pypLinkEn\":\"Caring & Open-minded\",\"scenarioGame\":{\"titleAr\":\"لعبة: من يحتاج إلى المساعدة؟ (Who Needs Help?)\",\"titleEn\":\"Who Needs Help? Helping a Friend Challenge\",\"contextAr\":\"لاحظ سلمان زميلاً جديداً يقف وحده في ساحة المدرسة وقت الفسحة خجولاً ومتردداً وليس لديه من يلعب معه. ماذا يجب على سلمان أن يفعل؟\",\"contextEn\":\"Salman notices a new classmate standing all alone in the playground during recess. The boy looks shy and has no one to play with. What should Salman do?\",\"optionsAr\":[{\"text\":\"يتجاهله ويكمل اللعب مع أصدقائه قائلاً: «سيتعرف على أصدقاء لاحقاً».\",\"correct\":false,\"feedback\":\"تصرف غير مناسب! الصديق الصالح ينتبه لزميله الذي يشعر بالوحدة ويبادر بمساعدته.\"},{\"text\":\"يذهب إليه بابتسامة دافئة، يسلّم عليه بلطف، ويدعوه ليلعب مع مجموعتهم.\",\"correct\":true,\"feedback\":\"أحسنت! هذا تصرف رائع يجسد الرحمة واللطف، وجعل الزميل الجديد يشعر بالسعادة والترحيب.\"},{\"text\":\"يناديه بصوت عالٍ من بعيد: «لماذا تقف وحدك هناك؟» أمام الجميع.\",\"correct\":false,\"feedback\":\"هذا التصرف يحرج الزميل! مساعدة الآخرين تكون دائماً باللطف والحديث الهادئ.\"}],\"optionsEn\":[{\"text\":\"Ignore him and keep playing with his friends, thinking: 'He will find friends later.'\",\"correct\":false,\"feedback\":\"Not a good choice! A kind classmate notices when someone feels left out.\"},{\"text\":\"Walk over with a warm smile, say 'As-salamu alaykum', and kindly invite him to join the game.\",\"correct\":true,\"feedback\":\"Great choice! Salman showed true kindness and made his new classmate feel welcome.\"},{\"text\":\"Yell loudly across the yard: 'Hey, why are you standing all by yourself?'\",\"correct\":false,\"feedback\":\"That would hurt his feelings! Kindness is always gentle and polite, never embarrassing.\"}]},\"pairTask\":{\"titleAr\":\"دعوة شريك والاستماع لمشاعره\",\"titleEn\":\"Partner Inclusion & Active Listening\",\"instructionAr\":\"يعمل كل طالب مع زميل لم يتحدث معه كثيراً هذا الأسبوع: يستمع له وهو يتحدث عن أمر يسعده لمدة دقيقة كاملة دون مقاطعة، ثم يعيد صياغة مشاعره بصدق: «أشعر أنك كنت سعيداً جداً عندما...».\",\"instructionEn\":\"Work with a peer you haven't spoken with much: Listen to him share something that brings him joy for 1 minute without interrupting, then paraphrase his feelings with empathy.\"},\"groupChallenge\":{\"titleAr\":\"تحدي المجموعة: متى أساعد ومتى أطلب معلماً؟\",\"titleEn\":\"Group Decision: Independent Help vs Adult Support\",\"instructionAr\":\"تتلقى كل مجموعة ٤ مواقف مدرسية: تحدد المجموعات بوعي متى تتدخل لمساعدة الزميل مباشرة وبشكل آمن، ومتى يجب طلب مساعدة المعلم فوراً لحفظ السلامة.\",\"instructionEn\":\"Groups evaluate 4 school scenarios: Decide when to assist a peer independently and safely, and when to seek immediate adult help for safety.\"},\"realLifeMission\":{\"titleAr\":\"صنيعة معروف غير متوقعة وخفية\",\"titleEn\":\"One Unnoticed Act of Spontaneous Kindness\",\"taskAr\":\"يقوم كل طالب اليوم بعمل معروف خفي لزميل (التقاط قلم سقط، إفساح مقعد، مساعدة في حمل شيء، أو كلمة تشجيع دافئة) دون أن يطلب شكراً من أحد!\",\"taskEn\":\"Perform one unnoticed act of spontaneous kindness today (picking up dropped supplies, making room, warm encouragement) without seeking praise!\",\"requiresTeacherSignoff\":true},\"reflectionQuestionsAr\":[\"من استفاد من تصرفي اليوم؟\",\"هل استأذنت بلطف قبل تقديم المساعدة؟\",\"متى تتحول المساعدة إلى تدخل أو قيام بعمل الآخر بدلاً من إعانته على التعلم؟\"],\"reflectionQuestionsEn\":[\"Who benefited from my action today?\",\"Did I ask respectfully before offering help?\",\"When can help become unhelpful if I take over someone's learning instead of assisting?\"]},{\"id\":\"courage\",\"nameAr\":\"الشجاعة وضبط النفس\",\"nameEn\":\"Courage\",\"icon\":\"fa-shield-heart\",\"color\":\"amber\",\"definitionAr\":\"أن تفعل الصواب وتصدع بالحق وتضبط نفسك عند الانفعال، وتجرؤ على الاعتراف بالخطأ وطلب المساعدة عند الحاجة.\",\"definitionEn\":\"Doing the right thing, speaking truth, mastering self-control, admitting mistakes bravely, and asking for help when needed.\",\"quranHadithAr\":\"قال رسول الله ﷺ: «المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كلٍّ خير» (مسلم).\",\"quranHadithEn\":\"The Prophet ﷺ said: 'The strong believer is better and more beloved to Allah than the weak believer, while there is good in both.'\",\"pypLinkAr\":\"شجاع/مجازف (Risk-taker) وذو مبادئ (Principled)\",\"pypLinkEn\":\"Risk-taker & Principled\",\"scenarioGame\":{\"titleAr\":\"لعبة: السؤال بشجاعة عند عدم الفهم\",\"titleEn\":\"Speaking Up Safely: Asking When Unsure\",\"contextAr\":\"شرح المعلم قاعدة لغوية سريعة، وفهمها معظم الطلاب بينما شعر فهد بأنه لم يفهم نقطة مهمة. خاف فهد أن يضحك عليه زملاؤه إذا رفع يده ليسأل. ماذا يفعل فهد؟\",\"contextEn\":\"The teacher explained a grammar rule. Most understood, but Fahad felt confused about a key step. Fahad worried peers might laugh if he raised his hand. What should he do?\",\"optionsAr\":[{\"text\":\"يبقى صامتاً متظاهراً بالفهم، ويفشل لاحقاً في حل المسألة وحده.\",\"correct\":false,\"feedback\":\"تردد وخوف! الخجل في طلب العلم يحرم صاحبه من الفهم.\"},{\"text\":\"يتحلى بالشجاعة الإيجابية ويرفع يده بهدوء قائلاً: 'أستاذي، هل يمكن إعادة توضيح هذه النقطة؟'\",\"correct\":true,\"feedback\":\"شجاعة الفرسان! لا يتعلم العلم مستحٍ ولا مستكبر؛ الشجاع يسأل ليتعلم ويشجع غيره.\"},{\"text\":\"يغضب ويلقي قلمه على الطاولة ويقول: 'هذا الدرس صعب وغير مفهوم!'\",\"correct\":false,\"feedback\":\"انفعال سلبي! الشجاعة ليست غضباً بل هي طلب المعرفة بأدب ووضوح.\"}],\"optionsEn\":[{\"text\":\"Stay silent pretending to understand, then struggle and fail the exercise alone.\",\"correct\":false,\"feedback\":\"Hesitation and fear! Shy concealment prevents true learning.\"},{\"text\":\"Exercise positive courage, raise hand calmly, and say: 'Teacher, could you clarify that step?'\",\"correct\":true,\"feedback\":\"True courage! A courageous learner asks openly to master knowledge and inspires others.\"},{\"text\":\"Throw his pencil in frustration and shout: 'This lesson makes no sense!'\",\"correct\":false,\"feedback\":\"Negative impulse! True courage is composed and asks respectfully.\"}]},\"pairTask\":{\"titleAr\":\"تدريب الجرأة على قول: «أحتاج مساعدة يا أخي»\",\"titleEn\":\"Courageous Request: 'I Need Help Brother'\",\"instructionAr\":\"يتدرب الزميلان على نطق عبارات الشجاعة: 'أنا لم أفهم هذه النقطة، هل تشرحها لي؟'، و'أنا ارتكبت خطأ صغيراً وأود تصحيحه' بكل ثقة وهدوء.\",\"instructionEn\":\"Partners practice confident phrasing: 'I didn't quite grasp this step, could you explain it to me?' and 'I made a mistake and want to fix it.'\"},\"groupChallenge\":{\"titleAr\":\"تحدي تمثيل الاعتراف بالخطأ وإصلاحه\",\"titleEn\":\"Group Challenge: Admitting a Mistake & Repairing Trust\",\"instructionAr\":\"تمثل كل مجموعة سيناريو قصير لطالب كسر مسطرة زميله بالخطأ: كيف يتقدم بشجاعة ويعتذر بصدق ويصلح الضرر دون خوف أو إنكار؟\",\"instructionEn\":\"Groups role-play an accidental ruler break: How to bravely step forward, apologize sincerely, and repair damage without denial?\"},\"realLifeMission\":{\"titleAr\":\"مهمة رفع اليد والسؤال عن غير المفهوم\",\"titleEn\":\"Brave Questioning Mission\",\"taskAr\":\"إذا مر مفهوم لم تفهمه تماماً اليوم في أي مادة: تحلَّ بالشجاعة وارفع يدك بهدوء واطلب التوضيح دون أي تردد!\",\"taskEn\":\"If you encounter any unclear concept today: Bravely raise your hand calmly and request clarification without hesitation!\",\"requiresTeacherSignoff\":true},\"reflectionQuestionsAr\":[\"هل كان تصرفي اليوم شجاعاً أم متهوراً أم غير آمن؟\",\"ما الذي ساعدني على التصرف بشجاعة وهدوء؟\",\"كيف يكون الاعتراف بالخطأ نوعاً رفيعاً من أنواع الشجاعة؟\"],\"reflectionQuestionsEn\":[\"Was my action today courageous, impulsive, or unsafe?\",\"What helped me act with calm courage?\",\"How is admitting an honest mistake one of the highest forms of courage?\"]},{\"id\":\"respect\",\"nameAr\":\"الاحترام وحسن الأدب\",\"nameEn\":\"Respect\",\"icon\":\"fa-hands-holding-child\",\"color\":\"blue\",\"definitionAr\":\"توقير المعلم، وإكرام الزميل، وحفظ النظام والسكينة، ومراعاة مشاعر الآخرين ومساحتهم الشخصية.\",\"definitionEn\":\"Revering teachers, honoring classmates, maintaining tranquility and order, and valuing others' feelings and personal boundaries.\",\"quranHadithAr\":\"قال رسول الله ﷺ: «ليس منا من لم يرحم صغيرنا، ويعرف شرف كبيرنا» (الترمذي واللفظ له).\",\"quranHadithEn\":\"The Prophet ﷺ said: 'He is not one of us who does not show mercy to our young and respect the honor of our elders.'\",\"pypProfile\":[\"Principled\",\"Communicator\"],\"pypProfileAr\":[\"ذو مبادئ\",\"متواصل\"],\"scenarioGame\":{\"titleAr\":\"لعبة: الاختلاف في الرأي بأدب الفرسان\",\"titleEn\":\"Respectful Disagreement Challenge\",\"contextAr\":\"أثناء عمل جماعي في حصة العلوم، اقترح طارق فكرة لم تعجب عبدالله. كاد عبدالله أن يصرخ: 'فكرتك غبية ولن تنجح أبداً!'، ماذا يفعل عبدالله ليعبر باحترام؟\",\"contextEn\":\"During science group work, Tariq proposed an idea Abdullah disliked. Abdullah almost snapped: 'Your idea is silly and will never work!'. How should Abdullah disagree respectfully?\",\"optionsAr\":[{\"text\":\"يسخر من طارق أمام المجموعة ليثبت أن رأيه هو الأصح.\",\"correct\":false,\"feedback\":\"سلوك جارح يفسد الأخوة وينافي أدب الحوار الإسلامي.\"},{\"text\":\"يقول بلطف: 'أشكرك يا طارق على فكرتك، ما رأيك لو جربنا كذا بدليل كذا؟' مناقشاً الفكرة لا الشخص.\",\"correct\":true,\"feedback\":\"قمة الرقي والاحترام! هاجم الفكرة بأدلة علمية ولم يهاجم شخص زميله.\"},{\"text\":\"ينسحب من المجموعة بغضب ويجلس وحده عابساً.\",\"correct\":false,\"feedback\":\"انسحاب سلبي! المؤمن يخالط الناس ويصبر ويتواصل بحكمة.\"}],\"optionsEn\":[{\"text\":\"Mock Tariq's idea in front of the team to prove his own opinion is superior.\",\"correct\":false,\"feedback\":\"Disrespectful! Attacking a classmate ruins collaboration and breaks brotherhood.\"},{\"text\":\"Say politely: 'Thank you Tariq. What if we also tested this evidence?' debating the idea, not the person.\",\"correct\":true,\"feedback\":\"Exemplary respect! Respectful communicators critique ideas with evidence without humiliating peers.\"},{\"text\":\"Pout angrily, fold arms, and refuse to participate in the group task.\",\"correct\":false,\"feedback\":\"Sullen withdrawal! Principled learners stay engaged and communicate maturely.\"}]},\"pairTask\":{\"titleAr\":\"تحدي مستويات الصوت وضبط الهمس\",\"titleEn\":\"Voice Level Calibration & Respectful Posture\",\"instructionAr\":\"يجلس الطالبان متقابلين: يتحدثان بصوت الهمس (المستوى ١) دون أن يسمعهما المقعد المجاور إطلاقاً، مع المحافظة على استقامة الظهر والتواصل البصري المحترم.\",\"instructionEn\":\"Partners sit facing each other: Talk at voice level 1 (whisper) without neighboring desks hearing a single word, maintaining upright respectful posture.\"},\"groupChallenge\":{\"titleAr\":\"إصلاح الحوارات غير المهذبة (Fix the Dialogue)\",\"titleEn\":\"Dialogue Restoration Workshop\",\"instructionAr\":\"تتلقى كل مجموعة ٣ عبارات جافة (مثل: 'تحرك من مكاني!', 'أعطني قلمك الآن!', 'أنت لا تفهم شيئاً!')، وتعيد صياغتها بجمل إسلامية وأدبية راقية.\",\"instructionEn\":\"Groups rewrite 3 rude phrases ('Move away!', 'Give me your pen!', 'You know nothing!') into polite, Sunnah-inspired sentences.\"},\"realLifeMission\":{\"titleAr\":\"مهمة إلقاء السلام بالابتسامة على ٣ معلمين وعمال\",\"titleEn\":\"Salam, Smile & Door Holding Mission\",\"taskAr\":\"إلقاء تحية الإسلام بابتسامة ناصعة وإمساك الباب بلطف للمارين ٣ مرات على الأقل اليوم!\",\"taskEn\":\"Greet at least 3 teachers and support staff with a warm Salam and hold doors open for others today!\",\"requiresTeacherSignoff\":true},\"reflectionQuestionsAr\":[\"كيف أثر سلوكي اليوم في مشاعر الأشخاص المحيطين بي؟\",\"كيف أختلف مع شخص في الرأي دون أن أقلل من احترامه أو أجرح كرامته؟\",\"كيف يبدو الاستماع باحترام؟ وما صوته في صفنا؟\"],\"reflectionQuestionsEn\":[\"How did my behavior today affect the feelings of those around me?\",\"How can I disagree with someone without disrespecting or humiliating them?\",\"What does respectful listening look and sound like in our classroom?\"]},{\"id\":\"responsibility\",\"nameAr\":\"المسؤولية والإتقان\",\"nameEn\":\"Responsibility\",\"icon\":\"fa-list-check\",\"color\":\"purple\",\"definitionAr\":\"تحمل التزاماتك المدرسية والشخصية، وإتقان العمل، وحفظ الممتلكات والمرافق دون حاجة لرقيب إلا الله.\",\"definitionEn\":\"Owning your personal and academic duties, mastering tasks, and caring for materials without needing reminders.\",\"quranHadithAr\":\"قال رسول الله ﷺ: «كلكم راعٍ وكلكم مسؤول عن رعيته» (متفق عليه).\",\"quranHadithEn\":\"The Prophet ﷺ said: 'Every one of you is a shepherd, and every one of you is responsible for his flock.'\",\"pypProfile\":[\"Principled\",\"Balanced\"],\"pypProfileAr\":[\"ذو مبادئ\",\"متوازن\"],\"scenarioGame\":{\"titleAr\":\"لعبة: زجاجة الماء وقارورة الحبر في الحقيبة\",\"titleEn\":\"Responsibility Challenge: Packed for Success\",\"contextAr\":\"استيقظ فيصل متأخراً قبل المدرسة، وأراد رمي كتبه وقارورة الماء المفتوحة نصف إغلاق داخل الحقيبة مسرعاً للحاق بالحافلة. ماذا يفعل فيصل؟\",\"contextEn\":\"Faisal woke up late. He wanted to toss notebooks and a half-closed water bottle haphazardly into his bag to catch the bus. What should Faisal do?\",\"optionsAr\":[{\"text\":\"يرمي كل شيء في الحقيبة دون إحكام الغطاء ويركض للحافلة.\",\"correct\":false,\"feedback\":\"غير ملائم: عدم إحكام قارورة الماء قد يؤدي لانسكابها وتلف الدفاتر المدرسية؛ والتأني ٥ ثوانٍ يحمي الأدوات.\"},{\"text\":\"يتوقف لـ ٥ ثوانٍ: يشد غطاء الماء بإحكام، ويضعه في الجيب الجانبي المخصص، ويغلق سحاب الحقيبة.\",\"correct\":true,\"feedback\":\"إتقان ومسؤولية! وفر على نفسه ساعات من الحزن على دفاتر تالفة.\"},{\"text\":\"يترك الحقيبة مفتوحة تماماً ويتناولها من يد واحدة تتساقط منها الأقلام.\",\"correct\":false,\"feedback\":\"يحتاج تحسيناً: إغلاق سحاب الحقيبة يحفظ الممتلكات ويمنع ضياع الأدوات المدرسية.\"}],\"optionsEn\":[{\"text\":\"Dump everything in without tightening the lid and dash to the bus.\",\"correct\":false,\"feedback\":\"Careless packing: Leaving water loose can spill and damage notebooks; a 5-second check protects your gear.\"},{\"text\":\"Pause for 5 seconds: Tighten the bottle cap firmly, place it in side pocket, and zip up the bag.\",\"correct\":true,\"feedback\":\"Mastery and Responsibility! A 5-second check prevents ruined books and lost gear.\"},{\"text\":\"Leave backpack unzipped so markers spill out as he runs.\",\"correct\":false,\"feedback\":\"Needs attention: Zipping backpacks keeps personal tools safe and prevents dropping supplies.\"}]},\"pairTask\":{\"titleAr\":\"فحص انصراف الطاولة الثنائي (Pack-up Audit)\",\"titleEn\":\"Mutual Pack-up Audit Protocol\",\"instructionAr\":\"يفحص كل طالب طاولة زميله قبل الخروج: هل الأرضية نظيفة تماماً؟ هل الكرسي مدخل برفق؟ هل الحقيبة مغلقة؟ ثم يوقع له شفوياً بالاعتماد.\",\"instructionEn\":\"Partners cross-audit desks before dismissal: Floor 100% clear? Chair tucked gently? Bag zipped? Give oral certification.\"},\"groupChallenge\":{\"titleAr\":\"لعبة الذاكرة: ما الذي نسيناه؟ (What Did I Forget?)\",\"titleEn\":\"Memory & System Game: What Did I Forget?\",\"instructionAr\":\"يعرض المعلم صورة لصف بعد الانصراف فيها ٤ أخطاء مسؤولية (ممحاة تحت كرسي، نافذة مفتوحة، كرسي يسد الممر، جهاز لوحي غير مشحون). ترصد المجموعات الأخطاء وتضع نظاماً يمنع تكرارها!\",\"instructionEn\":\"Groups inspect a scene containing 4 post-dismissal mistakes (eraser under chair, open window, crooked chair, uncharged device) and design a preventive system!\"},\"realLifeMission\":{\"titleAr\":\"مهمة الاستعداد للصلاة دون أي تذكير شفهي\",\"titleEn\":\"Zero-Reminder Prayer Transition\",\"taskAr\":\"حفظ الأدوات، خلع الحذاء تحت الطاولة بالفصل، والمشي بسكينة للمصلى دون أن يضطر المعلم لقول كلمة تذكير واحدة!\",\"taskEn\":\"Pack supplies, place shoes under classroom desks, and walk with Sakinah to prayer without a single teacher reminder!\",\"requiresTeacherSignoff\":true},\"reflectionQuestionsAr\":[\"ما الواجب الذي أنجزته اليوم بنفسي دون أن يذكرني به أحد؟\",\"ما النظام البسيط الذي سيساعدني على تذكر أدواتي ومهامي يومياً؟\",\"كيف ساعد تحملي للمسؤولية في جعل صفنا مكاناً مريحاً للجميع؟\"],\"reflectionQuestionsEn\":[\"What duty did I complete today entirely independently without any reminder?\",\"What simple system can help me remember my gear and responsibilities daily?\",\"How did my personal responsibility make our classroom a smoother place for everyone?\"]},{\"id\":\"honesty\",\"nameAr\":\"الصدق والأمانة\",\"nameEn\":\"Honesty & Integrity\",\"icon\":\"fa-certificate\",\"color\":\"rose\",\"definitionAr\":\"قول الحقيقة دائماً، وحفظ المفقودات والأمانات، والجرأة على الاعتراف بالخطأ وتصحيحه.\",\"definitionEn\":\"Always telling the truth, safeguarding lost items, bravely admitting mistakes, and repairing trust.\",\"quranHadithAr\":\"قال رسول الله ﷺ: «عليكم بالصدق، فإن الصدق يهدي إلى البر، وإن البر يهدي إلى الجنة» (متفق عليه).\",\"quranHadithEn\":\"The Prophet ﷺ said: 'Adhere to truthfulness, for truthfulness leads to righteousness, and righteousness leads to Paradise.'\",\"pypProfile\":[\"Principled\",\"Reflective\"],\"pypProfileAr\":[\"ذو مبادئ\",\"متأمل\"],\"scenarioGame\":{\"titleAr\":\"لعبة: قلم الألوان الفاخر المفقود في الساحة\",\"titleEn\":\"Honesty Challenge: The Found Art Pen\",\"contextAr\":\"وجد خالد علبة أقلام فاخرة وجديدة منسية في ركن التربية الفنية. كان يتمنى شراء مثلها منذ أسابيع. ماذا يفعل خالد؟\",\"contextEn\":\"Khalid finds a brand-new, expensive drawing set left behind in the art studio. He has dreamed of buying this exact set for weeks. What should Khalid do?\",\"optionsAr\":[{\"text\":\"يضعها في حقيبته ويقول: 'من أضاعها فهو مهمل ولا يستحقها!'.\",\"correct\":false,\"feedback\":\"حرام وخيانة أمانة! اللقطة في المدرسة يجب ردها لصاحبها.\"},{\"text\":\"يسلمها فوراً لمعلم الفنية أو مسؤول المفقودات ليعلن عنها ويعيدها لزميلها.\",\"correct\":true,\"feedback\":\"أمانة الصحابة! 'أدِّ الأمانة إلى من ائتمنك'؛ الصدق والأمانة أغلى من كنوز الدنيا.\"},{\"text\":\"يخبئها تحت طاولة زميله ليرى إن كان سيبحث عنها.\",\"correct\":false,\"feedback\":\"مماطلة ولعب بالأمانات ينافي خلق المؤمن الصادق.\"}],\"optionsEn\":[{\"text\":\"Slip it into his backpack, thinking: 'Whoever lost it was careless and doesn't deserve it!'\",\"correct\":false,\"feedback\":\"Breach of trust and unlawful! Lost property must be safeguarded and returned.\"},{\"text\":\"Hand it straight to the art teacher or Lost & Found so it returns to its rightful owner.\",\"correct\":true,\"feedback\":\"Noble integrity! 'Fulfill the trust to those who entrusted you'; honesty is worth more than all treasures.\"},{\"text\":\"Hide it under a table to see if anyone searches for it.\",\"correct\":false,\"feedback\":\"Tampering with lost property violates true Muslim character.\"}]},\"pairTask\":{\"titleAr\":\"لعبة فرز: حقيقة أم افتراض أم إشاعة؟\",\"titleEn\":\"Fact, Assumption or Rumor Sorting Game\",\"instructionAr\":\"يقرأ الزميلان ٤ جمل شائعة في المدرسة، ويصنفانها بدقة: ما هي الحقيقة المؤكدة؟ وما هو الافتراض؟ وما هي الإشاعة التي يحرم نقلها عملاً بالحديث: 'كفى بالمرء كذباً أن يحدث بكل ما سمع'؟\",\"instructionEn\":\"Partners sort 4 school statements: What is verified Fact? What is Assumption? What is Rumor that must never be spread based on the Hadith?\"},\"groupChallenge\":{\"titleAr\":\"تمثيل الاعتذار الصادق وإصلاح الثقة (Repairing Trust)\",\"titleEn\":\"Group Role-Play: Sincere Apology & Repairing Trust\",\"instructionAr\":\"تمثل المجموعة حواراً راقياً لطالب نقل معلومة غير دقيقة عن زميله، ثم أدرك خطأه: كيف يعتذر له بشجاعة ويصحح المعلومة أمام من سمعها منه بصدق وأمانة؟\",\"instructionEn\":\"Groups role-play a student who spread inaccurate info, realized his fault, and bravely apologized and corrected the record with honesty!\"},\"realLifeMission\":{\"titleAr\":\"مهمة الصدق الكامل وإرجاع أي أداة مستعارة\",\"titleEn\":\"Total Truthfulness & Borrowed Item Return\",\"taskAr\":\"التحدث بالصدق التام طوال اليوم، وإرجاع أي قلم أو مسطرة أو كتاب استعرته من زميلك أو معلمك قبل نهاية الحصة الأخيرة بنظافة وشكر!\",\"taskEn\":\"Speak 100% truthfulness all day, and return any borrowed stationery to its owner before dismissal with gratitude!\",\"requiresTeacherSignoff\":true},\"reflectionQuestionsAr\":[\"هل كنت صادقاً في كل كلامي وتصرفاتي اليوم دون تجميل أو إخفاء؟\",\"هل تحققت من صحة كل معلومة سمعتها قبل أن أنقلها لغيري؟\",\"كيف أصلح الثقة بيني وبين صديقي أو معلمي إذا ارتكبت خطأ غير مقصود؟\"],\"reflectionQuestionsEn\":[\"Was I completely truthful in all words and actions today without distortion?\",\"Did I verify information before repeating it to anyone else?\",\"How can I actively repair trust with a peer or teacher after an honest mistake?\"]}]");
var spiral_default = /*#__PURE__*/ JSON.parse("[{\"day\":1,\"week\":1,\"titleAr\":\"اليوم ١: الترحيب والتعارف وتأسيس بيئة التعلم الآمنة (Greet and Come In)\",\"titleEn\":\"Day 1: Welcome, Belonging & Meet and Greet Foundations\",\"focusAr\":\"تأسيس الانتماء، كسر الجليد، آداب إلقاء السلام والدخول المهذب للفصل والمختبرات (المهارات ١-٣)\",\"focusEn\":\"Belonging, class identity, courteous greeting, and gentle door entry across subjects (Skills 1–3)\",\"warmupType\":\"Meet & Greet Role Play\",\"quickWarmup\":{\"titleAr\":\"تحدي فرسان الانتماء والتعارف\",\"titleEn\":\"Belonging & Greeting Quest\",\"promptAr\":\"يمارس الطلاب تحية الإسلام بابتسامة مشرقة: يذكر كل طالب اسمه، وقوة خارقة يجلبها لصفنا، والقيمة التي يرجوها لهذا العام.\",\"promptEn\":\"Students practice warm Salam and introductions: Each student shares his/her name, a superpower brought to class, and nominates a core value.\"},\"newSkillsAr\":[\"١. أدب الاستئذان وطرق الباب برفق ثلاثاً\",\"٢. تنظيم الحقيبة وتجهيز الطاولة في ٦٠ ثانية\",\"٣. سكينة الممرات والتزام اليمين\"],\"newSkillsEn\":[\"1. Gentle 3-Knock Door Entry\",\"2. Bag Organization & 60-Second Desk Setup\",\"3. Hallway Composure & Keeping Right\"],\"spiralReviewAr\":[\"تأسيس بيئة التعلم الآمنة وميثاق الاحترام المتبادل بين المعلم والطلاب\"],\"spiralReviewEn\":[\"Safe learning community foundations and mutual respect agreement\"],\"physicalRehearsalAr\":\"محاكاة وقوف كامل الصف وإلقاء تحية الإسلام بوقار وابتسامة، وتطبيق الطرق الهادئ ثلاثاً بجانب الباب.\",\"physicalRehearsalEn\":\"Whole-class physical modeling of respectful Salam with warm posture and gentle 3-knock entry from the side.\",\"activityAr\":\"نشاط 'فرسان الانتماء': يذكر كل طالب اسمه، وقوة خارقة يجلبها للصف، ويختار القيمة الأهم التي يتمنى أن تسود بيننا هذا العام.\",\"activityEn\":\"Belonging Quest: Every student shares their name, one personal superpower, and nominates the value our class needs most.\",\"drillAr\":\"الملاحظة التقديرية الأولى: المعلم يلاحظ مع الطلاب كيف نقف، وكيف نلقي السلام بأدب ودفء.\",\"drillEn\":\"Initial teacher observation: Modeling how we stand and greet with a warm, respectful Salam.\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"نمذجة التحية ولقاء الزملاء: تمثيل أدوار الدخول المهذب للفصل (Model meet and greet. Use role play).\",\"activityEn\":\"Model meet and greet. Use role play to establish courteous morning arrival.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"نشاط 'الفصل الرائع' (A Great Classroom): التعارف وحساب نقاط البداية الإيجابية للمجموعات.\",\"activityEn\":\"Greet and Come In activity: 'A Great Classroom' team icebreaker.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"عادات صغيرة، روتينات واضحة، واستمرارية تصنع الانتماء العلمي: تنظيف المكان بعد الفسحة (Small habits, clear routines, consistency).\",\"activityEn\":\"Small habits, clear routines, consistency, and a strong sense of belonging in the science lab.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"المواطنون الرقميون المسؤولون: صياغة ميثاق الصف الرقمي للاحترام والمسؤولية (IB PYP: Principled, Communicator).\",\"activityEn\":\"Welcome as Responsible Digital Citizens: Create a class agreement for respect, responsibility and positive digital citizenship (IB PYP: Principled, Communicator).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"قواعد وتوقعات الصالة الرياضية: ألعاب الحركة والتحية البدنية (Essential PE Greetings & Movement Games).\",\"activityEn\":\"PE Rules & Expectations: Essential PE Greetings, Movement & Greeting Games.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"الترحيب والتعارف: هدي النبي ﷺ في إفشاء السلام وطلاقة الوجه وحسن الاستقبال.\",\"activityEn\":\"Islamic Greeting & Identity: The Prophetic Sunnah of spreading Salam with a bright smile.\"}},\"juniorNoteAr\":\"للصفوف الأولية (١-٣): لعبة 'اسمي الجميل' (My Name): يتحرك الطلاب وعند إشارة المعلم يصافح زميله: 'مرحباً، أنا اسمي...'\",\"juniorNoteEn\":\"Junior (Grades 1-3): 'My Name' game: Mix around, pair up, and greet: 'Hello, my name is...'\"},{\"day\":2,\"week\":1,\"titleAr\":\"اليوم ٢: ترسيخ الروتينات والاصطفاف المنظم (Line Up & Team Routines)\",\"titleEn\":\"Day 2: Line Up Routine, Songs & Class Efficiency\",\"focusAr\":\"مراجعة اليوم الأول + إتقان الاصطفاف برقم القائمة، مؤقت الاصطفاف، وحفظ النظام في الممرات والمختبرات\",\"focusEn\":\"Review Day 1 + Mastering line-up by number list, line-up songs, timers, and transitions\",\"warmupType\":\"Line Up & Spot Errors\",\"quickWarmup\":{\"titleAr\":\"تحدي الاصطفاف الصامت في ٦٠ ثانية\",\"titleEn\":\"60-Second Silent Line-Up Challenge\",\"promptAr\":\"يقف الطلاب حسب ترتيب القائمة أو أرقامهم دون كلام؛ اختبار للتعاون والتركيز والوعي المكاني!\",\"promptEn\":\"Students line up by roster number without speaking; testing silent coordination, teamwork, and spatial awareness!\"},\"newSkillsAr\":[\"٤. أدب طالب العلم والاستماع اليقظ الفعال\",\"٥. طهارة وسكينة دورات المياه وترشيد الماء\"],\"newSkillsEn\":[\"4. Attentive Listening & Scholar Posture\",\"5. Restroom Etiquette & Water Conservation\"],\"spiralReviewAr\":[\"مراجعة اليوم ١: طرق الباب ثلاثاً، الحقيبة بجانب المقعد، والمشي المنضبط يميناً\"],\"spiralReviewEn\":[\"Day 1 Review: 3-knock entry, bag beside desk, disciplined right-side walking\"],\"physicalRehearsalAr\":\"تدريب الاصطفاف بالرقم والتوجه للمختبر: إرجاع الكراسي، الوقوف بهدوء، المشي خلف الزميل، والأيدي بالجانب.\",\"physicalRehearsalEn\":\"Line-up drill by number: push chair in, stand quietly, walk behind peer, hands by side, eyes forward.\",\"activityAr\":\"لعبة 'لغز الاصطفاف البشري' (Human Puzzle): ترتب المجموعة نفسها تصاعدياً حسب الأرقام بأسرع وقت.\",\"activityEn\":\"Human Puzzle Challenge: Teams assemble themselves in ascending numerical order swiftly and silently.\",\"drillAr\":\"المعلم يستخدم مؤقت الـ ٤٥ ثانية للتحول من وضعية الجلوس إلى طابور مستقيم متراص.\",\"drillEn\":\"Teacher uses a 45-second timer to transition from seated desk mode to an aligned, silent line.\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"التدريب على الاصطفاف بقائمة الأرقام مع الأناشيد الإيقاعية والمؤقت (Practice lining up by number list, use song and timer).\",\"activityEn\":\"Practice lining up by number list, use a song and timer to build automatic routine.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"نشاط الاصطفاف الترتيبي + بينجو الأرقام (Line Up + Bingo).\",\"activityEn\":\"Ordinal Line Up + Number Bingo math connection.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"كيف نذهب لمختبر العلوم بانتظام، واستخدام بطاقات التعارف العلمية (How to go to science lab).\",\"activityEn\":\"How to go to the science lab safely; get to know peers using science flash cards.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"تحدي اصطفاف الفريق التقني: كيف ترفع الروتينات من الإنتاجية (IB PYP: Thinker, Self-Management).\",\"activityEn\":\"Line-Up and Team Efficiency Challenge: How routines improve productivity in tech labs (IB PYP: Thinker, Self-Management).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"إشارات البدنية القصيرة والطويلة، وتحديات الطابور السريعة والصامتة (PE Signals & Silent Line-Ups).\",\"activityEn\":\"PE Short & Long whistle signals, line-up timer by number, and tactical line-up games.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"قوانين الصف والروتين اليومي: التزام النظام امتثالاً لقوله تعالى: ﴿وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى﴾.\",\"activityEn\":\"Classroom Laws & Order: Cooperation and mutual discipline as Islamic virtues.\"}},\"juniorNoteAr\":\"أنشودة الاصطفاف (Line Up Song): 'Eyes on the door, feet on the floor, hands by my side, and say no more!'\",\"juniorNoteEn\":\"Line Up Song: 'Eyes on the door, feet on the floor, hands by my side, and say no more!'\"},{\"day\":3,\"week\":1,\"titleAr\":\"اليوم ٣: الاستعداد للحصة وتنظيم مساحة التعلم (Get Ready For Class)\",\"titleEn\":\"Day 3: Learning Readiness & Workspace Organization\",\"focusAr\":\"مراجعة اليومين ١-٢ + تنظيم الدفاتر وتسمية الخزائن (Cubbies) وروتين الجاهزية (SIT → CHECK → PREPARE → LISTEN → START)\",\"focusEn\":\"Review Days 1-2 + Materials readiness, copybook & cubby labeling, and readiness sequence\",\"warmupType\":\"Desk Readiness Relay\",\"quickWarmup\":{\"titleAr\":\"تحدي فك الشفرة وتجهيز الطاولة في ٤٥ ثانية\",\"titleEn\":\"Code Breaker Desk Readiness Challenge\",\"promptAr\":\"المعلم يعرض رمز الأدوات المطلوبة (كتاب، دفتر، قلمان، مسطرة)؛ ترتب المجموعات طاولاتها في ٤٥ ثانية وتتخذ وضعية الاستماع!\",\"promptEn\":\"Teacher flashes supply icons (book, copybook, 2 pens, ruler); squads organize desks in 45 seconds and enter listening posture!\"},\"newSkillsAr\":[\"٦. حفظ النعمة وإماطة الأذى ونظافة الساحة بعد الفسحة\",\"٧. نظام صلاة الظهر والاستعداد الصفي المنظم (١٢ خطوة)\"],\"newSkillsEn\":[\"6. Food Blessing, Leave No Trace & Clean Break\",\"7. Classroom Prayer Routine & Reverence (12 Steps)\"],\"spiralReviewAr\":[\"مراجعة اليومين ١-٢: الطرق ثلاثاً، تنظيم الحقيبة، طابور الأرقام، والاستماع اليقظ\"],\"spiralReviewEn\":[\"Review Days 1–2: 3-knock entry, bag setup, numbered line-up, and scholar listening\"],\"physicalRehearsalAr\":\"تطبيق روتين الجاهزية الخماسي: اجلس باعتدال (SIT) → تفقد أدواتك (CHECK) → جهز مكتبك (PREPARE) → أنصت (LISTEN) → ابدأ بإتقان (START).\",\"physicalRehearsalEn\":\"Physical rehearsal of the 5-step readiness drill: SIT → CHECK → PREPARE → LISTEN → START.\",\"activityAr\":\"نشاط تسمية الدفاتر والخزائن وتصنيف المستلزمات لضمان عدم ضياع الأدوات طوال العام.\",\"activityEn\":\"Copybook and cubby organization workshop: Labeling binders and organizing supplies.\",\"drillAr\":\"المعلم يغير المادة درامياً: 'انتهت الرياضيات والآن العلوم!' ويحسب سرعة تبديل الدفاتر دون فوضى.\",\"drillEn\":\"Simulated lesson switch: 'Math is done, now Science!' Timing desk changeover cleanly.\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"مناقشة المواد المطلوبة لكل حصة، وتسمية الدفاتر والخزائن بدقة (Discuss materials needed, label copies and cubbies).\",\"activityEn\":\"Discuss materials needed for every lesson. Label copybooks and cubbies neatly.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"لعبة فك الشفرة الحسابية لتجهيز الأدوات ومراجعة ترتيب الدفاتر (Code breaker activity).\",\"activityEn\":\"Get Ready for class + Code Breaker math activity.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"عرض الشرائح التعليمية: دفاتر منظمة، خزائن مرتبة، ومستلزمات جاهزة (Labeled books, neat binders, prepared supplies).\",\"activityEn\":\"Visual slides: Labeled books, organized cubbies, neat binders, prepared supplies.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"روتين الإنتاجية الرقمية: ملفات منظمة، تسجيل دخول صحيح، والجاهزية للتعلم (IB PYP: Knowledgeable, Self-Management).\",\"activityEn\":\"Digital Productivity Routine: Organized files, correct login, materials, focus and responsible device use (IB PYP: Knowledgeable, Self-Management).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"قواعد الأدوات الرياضية، لعبة إشارات المرور (Traffic Lights Game)، ولعبة المرآة (The Mirror Game).\",\"activityEn\":\"Equipment rules, Traffic Lights game, and The Mirror Game for active focus.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"أدب الاستعداد للعلم: احترام الكتاب وتقدير أدوات المعرفة كأمانة ورزق من الله.\",\"activityEn\":\"Etiquette of Knowledge Tools: Treating books and learning materials with respect and Amanah.\"}},\"juniorNoteAr\":\"للصفوف الأولية: روتين التنظيم الملون: علامة حمراء لكتاب القراءة، وزرقاء للرياضيات، وخضراء للعلوم.\",\"juniorNoteEn\":\"Junior (Grades 1-3): Color-coded sticker routine: Red for ELA, Blue for Math, Green for Science.\"},{\"day\":4,\"week\":1,\"titleAr\":\"اليوم ٤: الانتقال السلس وضبط مستويات الصوت والرعاية الذاتية (Transitions & Voice Modes)\",\"titleEn\":\"Day 4: Transitions, Voice Levels & Personal Safety\",\"focusAr\":\"مراجعة الأيام ١-٣ + إتقان الانتقال بين الأنشطة، مستويات الصوت الأربعة، والمساحة الشخصية والنظافة\",\"focusEn\":\"Review Days 1-3 + Mastering task transitions, the 4 voice levels, personal safety, and hygiene\",\"warmupType\":\"Voice Level Switch & Music Freeze\",\"quickWarmup\":{\"titleAr\":\"لعبة تبديل مستويات الصوت وتجميد الحركة\",\"titleEn\":\"Voice Level Switch & Movement Freeze\",\"promptAr\":\"المعلم يرفع بطاقة المستوى: ٠ (صمت)، ١ (همس)، ٢ (طاولة)، ٣ (عرض). يتحول الصف لحظياً للمستوى المطلوب مع التوقف الفوري عند إشارة التجميد!\",\"promptEn\":\"Teacher raises voice level card: 0 (Silence), 1 (Whisper), 2 (Table), 3 (Speaker). Class shifts immediately and freezes upon chime!\"},\"newSkillsAr\":[\"٨. كف الأذى وسلامة اليدين والقدمين واحترام الممتلكات\",\"٩. التعاون والإيثار والعمل كفريق واحد\"],\"newSkillsEn\":[\"8. Hands & Feet Safety & Respecting Property\",\"9. Teamwork, Mutual Support & Fair Play\"],\"spiralReviewAr\":[\"مراجعة الأيام ١-٣: الاستئذان، تنظيم المقعد، طابور الأرقام، وجاهزية الدفاتر والخزائن\"],\"spiralReviewEn\":[\"Review Days 1–3: Door entry, desk setup, numbered line-up, and cubby organization\"],\"physicalRehearsalAr\":\"تدريب التحول البدني: التوقف عن العمل (STOP) → تنظيف المساحة (CLEAN) → تنظيم الأدوات (ORGANIZE) → التأكد (CHECK) → الانتقال بسكينة (GO).\",\"physicalRehearsalEn\":\"Physical transition drill: STOP → CLEAN → ORGANIZE → CHECK → GO.\",\"activityAr\":\"لعبة 'لمس الألوان' (Color Touch Transition): الانتقال السلس بين الطاولات دون اصطدام أو رفع للصوت.\",\"activityEn\":\"Color Touch Transition: Moving between learning stations safely and peacefully without bumping or shouting.\",\"drillAr\":\"المعلم يستخدم مؤقت التحدي التنازلي (Countdown Challenge) للانتقال من عمل ثنائي إلى شرح جماعي في ٣٠ ثانية.\",\"drillEn\":\"30-Second Countdown Challenge to switch from partner discussion to whole-class focus.\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"تمثيل أدوار إجراءات الانتقال السليم وتحمل مسؤولية الأدوات الشخصية (Role play proper transition procedures).\",\"activityEn\":\"Role play proper transition procedures for moving around and being responsible for one's belongings.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"إتقان الانتقال بين حل المسائل الفردية والشرح التفاعلي (Transition slides 1-5).\",\"activityEn\":\"Transition practice between individual problem solving and interactive slides.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"التدريب على نمط الصوت المناسب وتمثيل الأدوار في سيناريوهات المختبر (Practice voice mode & role models).\",\"activityEn\":\"Practice voice mode & role modeling with different science lab scenarios.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"إدارة التحولات الرقمية: التمييز بين السلوك المنتج والسلوك المشتت أثناء تبديل المهام (IB PYP: Thinker, Principled).\",\"activityEn\":\"Managing Digital Transitions: Identify productive versus distracting behavior when switching tasks (IB PYP: Thinker, Principled).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"المساحة الشخصية والسلامة البدنية، لعبة تجميد الحركة (Music Freeze)، وتحدي العد التنازلي.\",\"activityEn\":\"Personal Space & Safety, Rules of transition, Music Freeze game, Countdown Challenge, Color Touch Transition.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"السكينة والوقار في الحركة، وآداب خفض الصوت امتثالاً للتوجيه القرآني: ﴿وَاغْضُضْ مِن صَوْتِكَ﴾.\",\"activityEn\":\"Islamic Poise & Voice Control: Lowering voice and moving with grace and Sakinah.\"}},\"juniorNoteAr\":\"للصفوف الأولية: تدريب النظافة الذاتية: اغسل → جفف → تخلص من المنديل في السلة → نظف مساحتك.\",\"juniorNoteEn\":\"Junior (Grades 1-3): Self-care routine: Wash → Dry → Trash tissue → Clean your space.\"},{\"day\":5,\"week\":1,\"titleAr\":\"اليوم ٥: الخروج المنظم من الصف والإنصات اليقظ (Leaving the Class & Orderly Exit)\",\"titleEn\":\"Day 5: Orderly Dismissal, Pushing Chairs & Attentive Listening\",\"focusAr\":\"مراجعة مهارات الأسبوع الأول (١-٥) + إتقان إجراءات مغادرة الفصل، إرجاع المقاعد، وحفظ البيانات\",\"focusEn\":\"Week 1 Cumulative Review (1–5) + Orderly dismissal, tucking in chairs, and digital logout\",\"warmupType\":\"Rapid Dismissal Simulation\",\"quickWarmup\":{\"titleAr\":\"محاكاة مغادرة الفصل النموذجية في ٦٠ ثانية\",\"titleEn\":\"60-Second Model Classroom Exit Simulation\",\"promptAr\":\"عند قرع الجرس: يغلق الطلاب الدفاتر، يدخلون الكراسي أسفل الطاولات، يتفقدون نظافة الأرضية، ويصطفون بهدوء!\",\"promptEn\":\"Upon chime: Students close books, push chairs in, check floor cleanliness, and line up peacefully!\"},\"newSkillsAr\":[\"١٠. الاستعداد للانصراف وحفظ الأمانة ومغادرة الصف بنظام\"],\"newSkillsEn\":[\"10. Orderly Dismissal, Amanah & Clean Exit\"],\"spiralReviewAr\":[\"مراجعة شاملة للأسبوع الأول: الاستئذان، الحقيبة، الاصطفاف، الاستعداد، الانتقال، والنظافة\"],\"spiralReviewEn\":[\"Comprehensive Week 1 Review: Door entry, bag setup, line-up, readiness, transitions, and hygiene\"],\"physicalRehearsalAr\":\"تدريب الخروج المنظم: ادفع الكرسي (Push Chair) → تفقد المساحة (Check Area) → قف بهدوء (Stand) → توجه للطابور (Walk to Line).\",\"physicalRehearsalEn\":\"Physical exit drill: Push in chair → Check area → Stand quietly → Walk to line.\",\"activityAr\":\"جولة المختبرات وقوانين السلامة: جولة في مختبر العلوم وحاسب المدرسة للتطبيق العملي لإجراءات الخروج.\",\"activityEn\":\"Lab Tour & Safety Rules: Science lab and ICT lab tour practicing orderly departure.\",\"drillAr\":\"إشارة التوقف والإنصات (Stop Signal & Listening): المعلم يرفع يده أو يطلق صفارة؛ يتجمد الصف وينصت خلال ثانيتين.\",\"drillEn\":\"Stop Signal & Listening drill: Freezing and paying undivided attention within 2 seconds of the teacher signal.\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"التدريب على حركات مغادرة الصف: دفع الكراسي، ترتيب الطاولات، والتأكد من عدم ترك متعلقات (Practice actions for leaving).\",\"activityEn\":\"Practice actions for leaving classroom: pushing chairs in, making sure desks are tidy and lining up.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"إجراءات مغادرة الحصة وحساب الوقت المستغرق لتنظيم الطاولات (Leaving class slides 5-10).\",\"activityEn\":\"Leaving the class routines and measuring time needed to pack up.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"تعليمات مغادرة مختبر العلوم: تنظيف طاولة التجارب، إرجاع الأدوات، وإعادة المقاعد (Lab tour & instructions).\",\"activityEn\":\"Leaving the class: Science Lab tour, lab safety instructions, and cleaning after class.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"المسؤولية الرقمية قبل المغادرة: احفظ العمل → أغلق البرامج → سجل الخروج → ادفع الكرسي (IB PYP: Responsible, Principled).\",\"activityEn\":\"Digital Responsibility Before Leaving: Save → Close → Log Out → Push Chair → Check Area (IB PYP: Responsible, Principled).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"إشارة التوقف والاستماع، وروتينات مغادرة الصالة الرياضية بانتظام (Stop Signal & Leaving Gym Routines).\",\"activityEn\":\"Stop Signal & Listening; Leaving PE Routines for the classroom & Gym.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"كيفية الخروج من الصف: أدب المشي دون تدافع ودعاء الخروج من المكان وبركة النظام.\",\"activityEn\":\"Islamic Manners of Leaving: Orderly dismissal without pushing and reciting dismissal Dua.\"}},\"juniorNoteAr\":\"للصفوف الأولية: نموذج (أنا أفعل - نحن نفعل - أنت تفعل): المس رأسك، قف، ادفع كرسيك، وقف خلفه بهدوء.\",\"juniorNoteEn\":\"Junior (Grades 1-3): 'I do - We do - You do': Touch your head, stand up, push chair in, stand behind it.\"},{\"day\":6,\"week\":2,\"titleAr\":\"اليوم ٦: ترتيب الحقيبة وجدولة الواجبات ومسؤولية البداية (Packing the Bag & STEM)\",\"titleEn\":\"Day 6: Bag Organization, Homework Tracking & Daily Planning\",\"focusAr\":\"تدشين الأسبوع الثاني + إتقان حزم الحقيبة حسب الجدول المدرسي، والفرز بين المهم وغير الضروري\",\"focusEn\":\"Week 2 Launch + Packing bags according to daily schedule, homework planning, and STEM sorting\",\"warmupType\":\"Bag Audit & Sorting Quest\",\"quickWarmup\":{\"titleAr\":\"تحدي فرز الحقيبة: مهم مقابل غير ضروري\",\"titleEn\":\"Bag Audit: Essential vs Not Needed Challenge\",\"promptAr\":\"تفتح المجموعات حقائبها وتفرز: الكتب المطلوبة لليوم فقط، علبة الأقلام، والماء؛ وإزالة أي أوراق أو ألعاب غير ضرورية لتقليل الوزن!\",\"promptEn\":\"Squads inspect bags: Only today's scheduled books, pencil case, and water bottle stay; clearing clutter to protect back health!\"},\"newSkillsAr\":[\"تطوير المهارة ٢: فحص جدول الواجبات اليومي وتنظيم مساحات التخزين\",\"تطوير المهارة ٩: الروح الرياضية والتعاون في المهام المشتركة\"],\"newSkillsEn\":[\"Advanced Skill 2: Daily homework schedule tracking and locker organization\",\"Advanced Skill 9: Teamwork, Fair Play and cooperative problem solving\"],\"spiralReviewAr\":[\"مراجعة تراكمية للأسبوع الأول: طرق الباب، الاصطفاف، مستويات الصوت، وإجراءات الخروج\"],\"spiralReviewEn\":[\"Cumulative Week 1 Review: Door entry, numbered line-up, voice modes, and dismissal\"],\"physicalRehearsalAr\":\"تطبيق حزم الحقيبة الصحيح: الكتب الثقيلة بمحاذاة الظهر، الزمزمية في الجيب الخارجي، ووضع الحقيبة ملاصقة للمقعد.\",\"physicalRehearsalEn\":\"Physical bag packing drill: Heavy books against the back, water in side pouch, bag tucked beside desk.\",\"activityAr\":\"نشاط حزم الحقيبة مع نشاط STEM الحسابي: قياس وزن الحقائب ومطابقتها مع الجدول الدراسي لليوم.\",\"activityEn\":\"Packing the Bag + STEM activity: Measuring bag weight and auditing against daily timetable.\",\"drillAr\":\"فحص جدول الواجبات: كل طالب يفتح مذكرته ويتأكد من تسجيل المهام المطلوبة قبل إغلاق الحقيبة.\",\"drillEn\":\"Homework chart audit: Every student verifies daily assignments are logged before zipping bag.\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"ممارسة ومناقشة أهمية فحص جدول الواجبات وحزم الحقيبة حسب الاحتياج اليومي (Practice checking homework chart).\",\"activityEn\":\"Practice and discuss importance of checking homework chart and packing bags according to daily needs.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"نشاط ترتيب الحقيبة مع مهمة STEM حسابية لتقدير الأحجام والأوزان (Packing Bag + STEM Activity).\",\"activityEn\":\"Packing the Bag + STEM Activity calculating optimal weight and schedule fit.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"حزم الحقائب وتعليمات المختبر والارتباط بالصحة الجسدية وسلامة الظهر (Packing bags & Lab instructions).\",\"activityEn\":\"Packing the bags, lab tour instructions, and ergonomics of back health.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"التنظيم الرقمي والمسؤولية الشخصية: استكشاف هياكل المجلدات والتسمية الواضحة للملفات (IB PYP: Self-Management, Thinker).\",\"activityEn\":\"Digital Organization and Personal Responsibility: Explore folder structures and meaningful file naming (IB PYP: Self-Management, Thinker).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"العمل الجماعي واللعب النظيف، وتنظيم الحقائب الرياضية (Teamwork & Fair Play).\",\"activityEn\":\"Teamwork & Fair Play: Cooperating in group challenges and maintaining gym bag order.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"ترتيب الحقيبة والاستعداد للانصراف: حفظ الأدوات وحسن التدبير وعدم الإهمال.\",\"activityEn\":\"Orderly Organization in Islam: Good stewardship, avoiding wastefulness, and valuing supplies.\"}},\"juniorNoteAr\":\"للصفوف الأولية: أغنية الحقيبة المنظمة: 'كتبي في الداخل، زمزميتي في الجانب، ومقعدي نظيف ومرتب!'\",\"juniorNoteEn\":\"Junior (Grades 1-3): Neat Bag Song: 'Books inside, water on the side, ready for school with joy and pride!'\"},{\"day\":7,\"week\":2,\"titleAr\":\"اليوم ٧: المحافظة على ممتلكات المدرسة والأمانة (Respecting School Property & Amanah)\",\"titleEn\":\"Day 7: Respecting School Property, Devices & Amanah\",\"focusAr\":\"مراجعة الأيام ١-٦ + احترام المقاعد، الجدران، الأجهزة التقنية، واعتبار ممتلكات المدرسة أمانة شرعية\",\"focusEn\":\"Review Days 1-6 + Respecting desks, walls, technology, and treating school property as Amanah\",\"warmupType\":\"Maze & Touch-Free Challenge\",\"quickWarmup\":{\"titleAr\":\"لعبة المتاهة بدون لمس الجدران\",\"titleEn\":\"Maze Game: Navigate Without Touching\",\"promptAr\":\"تحدي حركي: يتحرك الطلاب في مسار مخصص في الفصل دون لمس الطاولات أو الجدران بأيديهم أو حقائبهم؛ تعزيزاً للوعي الحركي واحترام المكان!\",\"promptEn\":\"Kinesthetic challenge: Students navigate an indoor classroom path without touching walls or desks with hands or bags!\"},\"newSkillsAr\":[\"تطوير المهارة ٨: حماية ممتلكات المدرسة والمقاعد من الخدش أو الكتابة\",\"تطوير المهارة ٥: المحافظة على مرافق المدرسة ودورات المياه كأمانة\"],\"newSkillsEn\":[\"Advanced Skill 8: Protecting school desks and walls from marks or damage\",\"Advanced Skill 5: Maintaining school facilities and restrooms as sacred trust\"],\"spiralReviewAr\":[\"مراجعة الأيام ١-٦: الطرق ثلاثاً، طابور الأرقام، تجهيز الطاولة، الانتقال، وترتيب الحقيبة\"],\"spiralReviewEn\":[\"Review Days 1–6: Door knocking, line-up, desk prep, transitions, and bag packing\"],\"physicalRehearsalAr\":\"محاكاة دور أبطال حماية الممتلكات: فحص الطاولة والتأكد من خلوها من أي آثار حبر، وترك المقعد نظيفاً للزميل القادم.\",\"physicalRehearsalEn\":\"Property Care Superheroes rehearsal: Inspecting desk surface, ensuring zero pencil marks, and leaving it pristine.\",\"activityAr\":\"لعبة 'ارسم في المتاهة دون لمسها' (Draw on the maze without touching it): نشاط العلوم للتحكم الحركي الدقيق.\",\"activityEn\":\"Science Game: Draw on the maze without touching the boundaries to build spatial self-control.\",\"drillAr\":\"فحص الطاولات والأجهزة: المعلم يدرب الطلاب على الإبلاغ الفوري عن أي خلل بدلاً من تجاهله أو العبث به.\",\"drillEn\":\"Desk and device inspection: Training students to report any pre-existing flaw immediately (Amanah).\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"تمثيل أدوار احترام ممتلكات المدرسة والتنظيف بعد الفسحة (Role play respecting school property).\",\"activityEn\":\"Role play respecting school property and cleaning after breaks; writing courteous reminders.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"مراجعة قواعد الحفاظ على الممتلكات والشرائح التفاعلية (Respecting School Property slides 10-15).\",\"activityEn\":\"Respecting School Property slides 10-15; calculating the value of preserving resources.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"لعبة المتاهة: ارسم على المتاهة دون لمسها، وتطبيق قواعد عدم ترك أثر (Draw on maze without touching).\",\"activityEn\":\"Game: Draw on the maze without touching it; Leave No Trace scientific ethic.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"احترام التكنولوجيا والأجهزة: عدم مسح أعمال الآخرين، وعدم استخدام حسابات غير مصرح بها، والأمانة (IB PYP: Principled, Caring).\",\"activityEn\":\"Respecting Technology and Digital Property: Do not delete others' work or misuse accounts; connect to Amanah (IB PYP: Principled, Caring).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"الانتقال السلس في الصالة الرياضية واحترام الأدوات والملاعب والكرات (PE Transitions & Equipment Care).\",\"activityEn\":\"Gym transitions and handling sports equipment with care and stewardship.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"المحافظة على ممتلكات المدرسة كأمانة شرعية: ﴿إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا﴾.\",\"activityEn\":\"School Property as Amanah: The sacred Islamic obligation of preserving public and shared wealth.\"}},\"juniorNoteAr\":\"للصفوف الأولية: أبطال الحفاظ على الصف: 'طاولتي بيتي الثاني، أحافظ عليها نظيفة وجميلة!'\",\"juniorNoteEn\":\"Junior (Grades 1-3): Classroom Care Heroes: 'My desk is my learning home; I keep it clean and bright!'\"},{\"day\":8,\"week\":2,\"titleAr\":\"اليوم ٨: روتين صلاة الظهر المدرسي والسكينة النبوية (Classroom Prayer Routine & Reverence)\",\"titleEn\":\"Day 8: JPIS Classroom Prayer Routine & Hallway Sakinah\",\"focusAr\":\"مراجعة الأيام ١-٧ + التطبيق العملي لروتين الصلاة الصفي (١٢ خطوة): وضع الأحذية تحت المقاعد داخل الفصل والسير بوقار\",\"focusEn\":\"Review Days 1-7 + Practicing the 12-step classroom prayer routine: shoes placed under desks inside class and Sakinah walk\",\"warmupType\":\"Prayer Routine Sequence Drill\",\"quickWarmup\":{\"titleAr\":\"تحدي ترتيب خطوات روتين الصلاة الصفي في ٦٠ ثانية\",\"titleEn\":\"60-Second Classroom Prayer Sequence Challenge\",\"promptAr\":\"ترتب المجموعات بطاقات روتين الصلاة الاثنتي عشرة بالترتيب الصحيح: إيقاف العمل → حفظ الكتب → تفقد الوضوء → وضع الأحذية تحت المقاعد داخل الفصل → المشي بسكينة!\",\"promptEn\":\"Squads put the 12 prayer routine cards in order: Stop work → Stow books → Wudu check → Shoes under desks inside class → Silent Sakinah walk!\"},\"newSkillsAr\":[\"تطوير المهارة ٧: إتقان روتين صلاة الظهر المدرسي كاملاً دون استعجال أو فوضى\",\"تطوير المهارة ٣: سكينة الممرات والتزام الهدوء أثناء التوجه للمصلى والعودة\"],\"newSkillsEn\":[\"Advanced Skill 7: Full mastery of the 12-step classroom prayer routine\",\"Advanced Skill 3: Hallway Sakinah during movement to and from the Musalla\"],\"spiralReviewAr\":[\"مراجعة الأيام ١-٧: طرق الباب، الاصطفاف، الجاهزية، الانتقال، الخروج، الحقيبة، وحفظ الممتلكات\"],\"spiralReviewEn\":[\"Review Days 1–7: Door entry, line-up, readiness, transitions, exit, bags, and property care\"],\"physicalRehearsalAr\":\"محاكاة واقعية داخل الفصل: خلع الحذاء بهدوء، وضعه بانتظام تحت المقعد أو بمحاذاة الجدار، الاصطفاف بالجورب النظيف، والسير بسكينة للمصلى، ثم العودة للفصل لارتدائه.\",\"physicalRehearsalEn\":\"Classroom physical rehearsal: Place shoes neatly under desks inside class, line up in clean socks, walk with Sakinah to Musalla, and return to put shoes on.\",\"activityAr\":\"لعبة 'البحث عن الكنز العلمي والأخلاقي' (Scavenger Hunt): نشاط العلوم للربط بين النظام في الأدوات والنظام في الصلاة.\",\"activityEn\":\"Scavenger Hunt Game: Science tools and orderly placement mirroring reverent prayer routine.\",\"drillAr\":\"المعلم يراقب المشي بالسكينة في الممرات تطبيقاً لحديث: «إِذَا أُقِيمَتِ الصَّلَاةُ فَلَا تَأْتُوهَا تَسْعَوْنَ، وَأْتُوهَا تَمْشُونَ، وَعَلَيْكُمُ السَّكِينَةُ».\",\"drillEn\":\"Hallway Sakinah observation: Ensuring zero running and complete calm during prayer movement.\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"مناقشة الإجراءات المتبعة لوقت الصلاة وكتابة مذكرات السكينة (Discuss procedure to be followed for prayer break).\",\"activityEn\":\"Discuss procedure to be followed for prayer break; reflecting on reverence and mindfulness.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"تنظيم الوقت لحصة الصلاة والشرائح التفاعلية (Prayer Break slides 15-20).\",\"activityEn\":\"Prayer break scheduling slides 15-20; timing transitions to prayer without rushing.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"لعبة البحث عن الأدوات العلمية والتنظيم الدقيق المشابه لترتيب الصفوف في الصلاة (Scavenger Hunt: Science tools).\",\"activityEn\":\"Scavenger Hunt Game: Science Tools and connecting physical precision to prayer rows.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"إدارة الوقت والتقنية والصلاة: إيقاف الأجهزة وحفظ العمل بهدوء وتقديم الصلاة على كل مشتت (IB PYP: Balanced, Reflective).\",\"activityEn\":\"Technology, Prayer and Time Management: Create a balanced schedule that prioritizes prayer over screen time (IB PYP: Balanced, Reflective).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"القواعد الذهبية الأربع للروح الرياضية وضبط النفس وسكينة الجسد (The 4 Golden Rules of Sportsmanship).\",\"activityEn\":\"The 4 Golden Rules of Sportsmanship: Self-control, bodily composure, and respectful conduct.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"روتين وقت الصلاة: فضل إسباغ الوضوء، تسوية الصفوف، الخشوع في الركوع والسجود، وأذكار ما بعد الصلاة.\",\"activityEn\":\"Prayer Etiquette & Khushu': Complete wudu, straightening prayer rows, serenity in prayer, and post-prayer Adhkar.\"}},\"juniorNoteAr\":\"للصفوف الأولية: تدريب خطوات الصلاة: 'حذائي تحت مقعدي، جوربي نظيف، وأمشي بهدوء كالفراشة إلى المصلى.'\",\"juniorNoteEn\":\"Junior (Grades 1-3): 'Shoes under my desk, socks clean and white, walking to prayer with peace and delight.'\"},{\"day\":9,\"week\":2,\"titleAr\":\"اليوم ٩: نظافة الساحة والصفوف بعد الفسحة (Cleaning After Breaks & Leave No Trace)\",\"titleEn\":\"Day 9: Playground Cleanliness, Leave No Trace & Clean Breaks\",\"focusAr\":\"مراجعة الأيام ١-٨ + إتقان تنظيف الفصل والساحة بعد الفسحة بمؤقت تنازلي، وتطبيق خطوات الطريقة العلمية\",\"focusEn\":\"Review Days 1-8 + Timed clean-up after breaks, playground cleanliness, and scientific inspection\",\"warmupType\":\"Timed Clean-Up Blitz\",\"quickWarmup\":{\"titleAr\":\"تحدي تنظيف الساحة والفصل في دقيقتين بمؤقت\",\"titleEn\":\"2-Minute Clean-Up Challenge on a Timer\",\"promptAr\":\"المعلم يطلق مؤقت الدقيقتين: تتنافس المجموعات لجمع أي قصاصات ورق، مسح الطاولات، والتأكد من عدم ترك أي أثر (Leave No Trace)!\",\"promptEn\":\"Teacher starts 2-minute timer: Squads clear floor scraps, wipe tables, and verify their station leaves zero trace!\"},\"newSkillsAr\":[\"تطوير المهارة ٦: إماطة الأذى عن ممرات المدرسة وساحات الفسحة وحفظ بقايا الطعام\",\"تطوير المهارة ٨: التعاون في إبقاء البيئة المدرسية نظيفة ومبهجة\"],\"newSkillsEn\":[\"Advanced Skill 6: Removing litter from playgrounds and preserving food blessings\",\"Advanced Skill 8: Cooperative classroom beautification and cleanliness\"],\"spiralReviewAr\":[\"مراجعة الأيام ١-٨: الاستئذان، الاصطفاف، الجاهزية، الانتقال، الخروج، الحقيبة، الممتلكات، والصلاة\"],\"spiralReviewEn\":[\"Review Days 1–8: Door entry, line-up, readiness, transitions, exit, bags, property, and prayer\"],\"physicalRehearsalAr\":\"تدريب 'قبل وبعد الفسحة': قبل الفسحة (توقف → نظف → رتب → تأكد) | بعد الفسحة (عد بهدوء → رتب → اجلس باعتدال → أنصت).\",\"physicalRehearsalEn\":\"Physical Break Routine: Before Break (STOP → CLEAN → ORGANIZE → CHECK) | After Break (RETURN → ORGANIZE → SIT → LISTEN).\",\"activityAr\":\"خطوات المنهج العلمي ونشيد العلوم: ربط دقة الملاحظة العلمية برصد نظافة البيئة الصفية والمدرسية.\",\"activityEn\":\"Scientific Method Steps and song: Connecting scientific observation to maintaining school environment.\",\"drillAr\":\"تفتيش محطات العمل الرقمية والمكتبية: فحص الفأرة ولوحة المفاتيح والكرسي والأرضية بموجب قائمة التحقق.\",\"drillEn\":\"Workstation inspection: Checking keyboard, mouse, chair, cables, desk and floor against clean checklist.\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"ممارسة تنظيف المكان بعد الفسحة بالمؤقت وكتابة شعارات النظافة (Practice cleaning after break on a timer).\",\"activityEn\":\"Practice cleaning after break on a timer; composing environmental pledges.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"تحدي تنظيف الساحة والصفوف والشرائح التفاعلية (Cleaning after Breaks slides 20-25).\",\"activityEn\":\"Cleaning after Breaks slides 20-25; graphing waste reduction and clean-up speed.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"خطوات الطريقة العلمية وأنشودتها: الملاحظة، الفرضية، والتجربة لحماية البيئة الصفية من التلوث.\",\"activityEn\":\"Scientific Method Steps and song: Observing, hypothesizing, and acting to protect classroom ecology.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"تحدي مساحة العمل الرقمية النظيفة: تنظيف محطة العمل المادية والمكتب والملفات غير الضرورية (IB PYP: Caring, Self-Management).\",\"activityEn\":\"Clean Digital Workspace Challenge: Organize physical workstation, desktop and files (IB PYP: Caring, Self-Management).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"أركان المسؤولية في التربية البدنية وتنظيف الصالة الرياضية وإرجاع الكرات (The Pillars of PE Responsibility).\",\"activityEn\":\"The Pillars of PE Responsibility: Packing away equipment and keeping courts litter-free.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"المحافظة على نظافة الساحة بعد الفسحة: «إِمَاطَةُ الْأَذَى عَنِ الطَّرِيقِ صَدَقَةٌ» وحفظ النعمة وشكرها.\",\"activityEn\":\"Cleanliness & Food Gratitude: Removing harm from paths as Sadaqah and revering food blessings.\"}},\"juniorNoteAr\":\"أنشودة الفسحة (Break Time Song): 'Line up, hands up, clap clap clap, hands to the back, head to the snack!'\",\"juniorNoteEn\":\"Break Time Song: 'Line up, hands up, clap clap clap, hands to the back, head to the snack!'\"},{\"day\":10,\"week\":2,\"titleAr\":\"اليوم ١٠: طرق التعبير الإيجابي ومهرجان إثبات الإتقان (Ways of Expression & Show Mastery)\",\"titleEn\":\"Day 10: Respectful Expression, I-Statements & Mastery Festival\",\"focusAr\":\"تتويج مهارات الأسبوعين التمهيديين (١-١٠) + مخطط التعبير بصيغة 'أنا' (I-Statements) وتحدي إثبات الإتقان الشامل\",\"focusEn\":\"Cumulative 2-Week Mastery Festival (1–10) + Respectful I-Statement Chart, Apple Experiment & Show What You Know\",\"warmupType\":\"I-Statement Communication Simulator\",\"quickWarmup\":{\"titleAr\":\"تحدي تحويل الرسائل الغاضبة إلى عبارات 'أنا' المحترمة\",\"titleEn\":\"Transform Rude Comments to Respectful I-Statements\",\"promptAr\":\"المعلم يعرض موقف خلاف: يحول الطلاب العبارة الهجومية إلى: 'أنا أشعر بـ... عندما... لأنني أحتاج إلى... وأقترح أن...'.\",\"promptEn\":\"Teacher presents a conflict: Students rewrite an attack into: 'I feel [feeling] when [action] because [need]. I propose [solution].'\"},\"newSkillsAr\":[\"تتويج كافة مهارات الحياة العشر ومنظومة القيم الخمس\",\"التوقيع الرسمي على الميثاق الصفي وتوزيع أوسمة الإتقان\"],\"newSkillsEn\":[\"Culmination of all 10 Life Skills & 5 Core Values\",\"Official signing of Classroom Agreement Charter & Mastery Awards\"],\"spiralReviewAr\":[\"المراجعة التراكمية الكبرى لكافة مهارات الأسبوعين التمهيديين (الأيام ١ إلى ١٠)\"],\"spiralReviewEn\":[\"Grand Cumulative Spiral Review of all 10 Orientation Days across all subjects\"],\"physicalRehearsalAr\":\"العرض الشامل لإثبات الإتقان: يمثل الطلاب محطات المهارات العشر عملياً كفريق واحد ويوثقون توقيع الميثاق الذهبي.\",\"physicalRehearsalEn\":\"Grand Whole-Class Mastery Showcase: Demonstrating the 10 routines in a live relay and signing the Golden Charter.\",\"activityAr\":\"مخطط عبارات 'أنا' (I-Statement Chart) وتجربة التفاحة العلمية (The Apple Science Experiment) التي تبين أثر الكلمات الجارحة والكلمات الطيبة.\",\"activityEn\":\"The I-Statement Chart & The Apple Science Experiment showing the deep impact of kind vs bruised words.\",\"drillAr\":\"تحدي التربية البدنية والمهارات: 'أثبت ما تعلمته' (PE Challenge – Show What You Know) في محطات حركية سريعة.\",\"drillEn\":\"PE Challenge: 'Show What You Know' obstacle course demonstrating self-control, teamwork, and agility.\",\"subjects\":{\"ela\":{\"nameAr\":\"اللغة الإنجليزية (ELA)\",\"activityAr\":\"طرق التعبير وكيفية التواصل الفعال باستخدام مخطط 'أنا' (Ways of expression; use the 'I statement chart').\",\"activityEn\":\"Ways of expression, how to effectively communicate. Use the 'I statement chart'.\"},\"math\":{\"nameAr\":\"الرياضيات (Math)\",\"activityAr\":\"طرق التعبير الرياضي والشرائح التفاعلية الختامية (Ways of Expression slides 25-30).\",\"activityEn\":\"Ways of Expression slides 25-30: Communicating mathematical thinking courteously.\"},\"science\":{\"nameAr\":\"العلوم (Science)\",\"activityAr\":\"مخطط التعبير بصيغة 'أنا' وتجربة التفاحة العلمية (The Apple Science Experiment) عن أثر الكلمات الطيبة.\",\"activityEn\":\"I statement chart & The Apple Science Experiment proving words impact living things.\"},\"ict\":{\"nameAr\":\"الحاسب (ICT)\",\"activityAr\":\"التعبير المسؤول عبر الإنترنت: إعادة كتابة الرسائل غير اللائقة إلى تعليقات محترمة وبناءة (IB PYP: Communicator, Open-Minded).\",\"activityEn\":\"Responsible Expression Online: Rewrite inappropriate messages into respectful comments and responses (IB PYP: Communicator, Open-Minded).\"},\"pe\":{\"nameAr\":\"التربية البدنية (PE)\",\"activityAr\":\"تحدي التربية البدنية الختامي: أثبت ما تعلمته من مهارات وانضباط وروح رياضية (PE Challenge – Show What You Know).\",\"activityEn\":\"PE Challenge – Show What You Know: Multi-station skills, sportsmanship, and physical mastery.\"},\"islamic\":{\"nameAr\":\"التربية الإسلامية (Islamic)\",\"activityAr\":\"طرق التعبير عن المشاعر والاحتياجات بأدب وإحسان: ﴿وَقُولُوا لِلنَّاسِ حُسْنًا﴾ والكلمة الطيبة صدقة.\",\"activityEn\":\"Islamic Manners of Speech: 'And speak to people good words' (Quran 2:83) & Kind words as Sadaqah.\"}},\"juniorNoteAr\":\"للصفوف الأولية: عجلة المشاعر والكلمات الطيبة: 'عندما أغضب، أتنفس بعمق وأتحدث بهدوء مع معلمي.'\",\"juniorNoteEn\":\"Junior (Grades 1-3): Feelings & Kind Words Wheel: 'When upset, I take a deep breath and speak gently.'\"}]");
var warmups_default = [
	{
		"id": "missing_value",
		"titleAr": "رصد القيمة الغائبة",
		"titleEn": "Spot the Missing Value",
		"duration": "3–5 min",
		"descAr": "عرض موقف واقعي سريع، وعلى المجموعات تحديد أي من قيم JPIS الخمس كانت غائبة وكيف نعيد إحياءها.",
		"descEn": "Present a brief scenario; squads identify which of the 5 JPIS values was missing and how to restore it."
	},
	{
		"id": "routine_relay",
		"titleAr": "تتابع الروتين في ٦٠ ثانية",
		"titleEn": "60-Second Routine Relay",
		"duration": "3–5 min",
		"descAr": "تنفيذ خطوة روتينية محددة (طرق الباب، تجهيز الطاولة، وضع الأحذية تحت المقاعد داخل الفصل) في أقل من دقيقة.",
		"descEn": "Practice an exact routine step (door knocking, bag setup, shoes under desks inside class) in under a minute."
	},
	{
		"id": "silent_challenge",
		"titleAr": "التحدي الصامت التام",
		"titleEn": "Silent Demonstration Challenge",
		"duration": "3–5 min",
		"descAr": "تنفيذ مهمة صفية معقدة بالكامل دون التلفظ بكلمة واحدة، بالاعتماد على لغة الجسد والتعاون الإيماني.",
		"descEn": "Execute a classroom task completely silently, relying on body language, eye contact, and unity."
	},
	{
		"id": "fix_dialogue",
		"titleAr": "تصحيح الحوار (مخطط عبارات أنا)",
		"titleEn": "Dialogue Repair (I-Statements)",
		"duration": "4–6 min",
		"descAr": "تحويل عبارة لوم أو غضب إلى عبارة 'أنا' مهذبة وبناءة وفق النموذج المعتمد بمدرسة JPIS.",
		"descEn": "Transform an accusatory or frustrated phrase into a respectful, constructive I-statement."
	},
	{
		"id": "charades",
		"titleAr": "تمثيل القيم بدون كلام",
		"titleEn": "Value Charades",
		"duration": "3–5 min",
		"descAr": "يمثل طالب سلوكاً يجسد إحدى القيم الخمس صامتاً، وتكتشف المجموعات القيمة والدليل النبوي المرتبط بها.",
		"descEn": "A student silently acts out a virtuous routine; squads deduce the core value and connected Hadith."
	},
	{
		"id": "four_corners",
		"titleAr": "الأركان الأربعة لاتخاذ القرار",
		"titleEn": "Four Corners Dilemma",
		"duration": "5–7 min",
		"descAr": "طرح معضلة سلوكية، ويتوجه الطلاب إلى ركن الخيار الذي يرونه يجسد الإحسان مع تقديم التعليل.",
		"descEn": "Pose a real school dilemma; students move to the corner matching their principled choice and justify it."
	},
	{
		"id": "mystery_routine",
		"titleAr": "روتين اليوم المجهول",
		"titleEn": "Mystery Routine of the Day",
		"duration": "3–5 min",
		"descAr": "سحب بطاقة عشوائية لأحد روتينات مدرسة JPIS العشرة واختبار تطبيق الصف لها دون إنذار مسبق.",
		"descEn": "Draw a mystery card from the 10 JPIS routines and run a surprise whole-class execution check."
	}
];
var ihsan_default = {
	stages: [
		{
			"stage": 1,
			"level": 1,
			"nameAr": "بذرة الإحسان",
			"nameEn": "Seed of Excellence",
			"target": 100,
			"minScore": 0,
			"maxScore": 100,
			"icon": "fa-seedling",
			"descAr": "بداية غرس العادات اليومية وتأسيس بيئة التعلم الآمنة",
			"descEn": "Planting daily habits and establishing safe community foundations"
		},
		{
			"stage": 2,
			"level": 2,
			"nameAr": "غرس القيم",
			"nameEn": "Nurturing the Values",
			"target": 250,
			"minScore": 101,
			"maxScore": 250,
			"icon": "fa-tree",
			"descAr": "نمو السلوكيات النبيلة وتطبيقها بتوجيه المعلم",
			"descEn": "Practicing noble routines with teacher guidance and active peer support"
		},
		{
			"stage": 3,
			"level": 3,
			"nameAr": "فرسان الانضباط",
			"nameEn": "Knights of Discipline",
			"target": 450,
			"minScore": 251,
			"maxScore": 450,
			"icon": "fa-shield-halved",
			"descAr": "الالتزام الذاتي بالروتينات في الفصل والممرات والمصلى",
			"descEn": "Self-directed mastery across classrooms, hallways, and prayer routines"
		},
		{
			"stage": 4,
			"level": 4,
			"nameAr": "قادة السلوك",
			"nameEn": "Behavior Leaders",
			"target": 700,
			"minScore": 451,
			"maxScore": 700,
			"icon": "fa-crown",
			"descAr": "مساعدة الزملاء وتقديم القدوة الحسنة للجميع",
			"descEn": "Inspiring peers and demonstrating exemplary role modeling for younger grades"
		},
		{
			"stage": 5,
			"level": 5,
			"nameAr": "منارة الإحسان",
			"nameEn": "Beacon of Ihsan",
			"target": 1e3,
			"minScore": 701,
			"maxScore": 1e3,
			"icon": "fa-sun",
			"descAr": "الوصول للإتقان الشامل امتثالاً للهدي النبوي الشريف",
			"descEn": "Achieving comprehensive Ihsan mastery in all words, actions, and worship"
		}
	],
	streaks: {
		"titleAr": "سلاسل الالتزام السلوكي للصف (Class Streaks)",
		"titleEn": "Classroom Behavioral Streaks",
		"items": [
			{
				"id": "morning_calm",
				"titleAr": "سلسلة الحضور الهادئ والاستئذان برفق",
				"titleEn": "Morning Calm & Polite Entry Streak",
				"days": 5,
				"targetDays": 5,
				"icon": "fa-door-open"
			},
			{
				"id": "clean_space",
				"titleAr": "سلسلة ترك المكان أنظف مما كان (Leave No Trace)",
				"titleEn": "Leave No Trace Cleanliness Streak",
				"days": 7,
				"targetDays": 7,
				"icon": "fa-broom"
			},
			{
				"id": "prayer_sakinah",
				"titleAr": "سلسلة سكينة صلاة الظهر وتنظيم الأحذية تحت المقاعد",
				"titleEn": "Prayer Reverence & Shoes Under Desks Streak",
				"days": 10,
				"targetDays": 10,
				"icon": "fa-mosque"
			}
		]
	},
	badges: [
		{
			"id": "b-1",
			"titleAr": "وسام حماة السكينة",
			"titleEn": "Keepers of Sakinah",
			"icon": "fa-feather",
			"descAr": "يمنح للفصل عند المشي بسكينة في الممرات دون ركض لمدة أسبوع كامل",
			"descEn": "Awarded for 5 consecutive days of serene, right-aligned hallway walking"
		},
		{
			"id": "b-2",
			"titleAr": "وسام عمار المصلى",
			"titleEn": "Musalla Champions",
			"icon": "fa-kaaba",
			"descAr": "يمنح للصف عند إتقان روتين وضع الأحذية تحت المقاعد داخل الفصل والسير بسكينة للمصلى",
			"descEn": "Awarded for flawless execution of placing shoes under desks inside class and Sakinah walk"
		},
		{
			"id": "b-3",
			"titleAr": "وسام فرسان الأمانة",
			"titleEn": "Guardians of Amanah",
			"icon": "fa-hand-holding-heart",
			"descAr": "يمنح للصف عند إعادة كافة الأدوات المستعارة وترك ممتلكات المدرسة سليمة",
			"descEn": "Awarded for returning borrowed belongings and protecting school equipment"
		},
		{
			"id": "b-4",
			"titleAr": "وسام صوت الحكمة",
			"titleEn": "Voice of Wisdom",
			"icon": "fa-volume-low",
			"descAr": "يمنح للصف عند الالتزام التام بمستويات الصوت المحددة في كل نشاط",
			"descEn": "Awarded for perfect adherence to target voice levels across lessons"
		},
		{
			"id": "b-5",
			"titleAr": "وسام رواد الإحسان",
			"titleEn": "Pioneers of Ihsan",
			"icon": "fa-star-half-stroke",
			"descAr": "يمنح للصف عند إكمال ٥٠ مهمة واقعية وسلوكية بنجاح",
			"descEn": "Awarded upon completing 50 real-life daily missions with teacher sign-off"
		},
		{
			"id": "b-6",
			"titleAr": "وسام الفريق الذهبي",
			"titleEn": "The Golden Squad",
			"icon": "fa-medal",
			"descAr": "يمنح للفصل بأكمله عند بلوغ مرحلة منارة الإحسان (١٠٠٠ نقطة)",
			"descEn": "Awarded to the entire class upon reaching the Beacon of Ihsan milestone"
		}
	]
};
var checklist_default = [
	{
		"id": "chk-1",
		"textAr": "طرق الباب ٣ طرقات والاستئذان بهدوء",
		"textEn": "Knocked 3 times and entered with Salam",
		"done": false
	},
	{
		"id": "chk-2",
		"textAr": "تعليق الحقيبة وتجهيز أدوات الحصة في ٦٠ ثانية",
		"textEn": "Bag hung & desk organized in 60s",
		"done": false
	},
	{
		"id": "chk-3",
		"textAr": "المشي في الممرات بالسكينة وعلى اليمين",
		"textEn": "Calm hallway walking on the right",
		"done": false
	},
	{
		"id": "chk-4",
		"textAr": "الإنصات للمعلم واحترام المتحدث",
		"textEn": "Attentive listening with eyes on speaker",
		"done": false
	},
	{
		"id": "chk-5",
		"textAr": "خلع الحذاء بهدوء في الفصل وترتيبه تحت الطاولة",
		"textEn": "Shoes removed calmly in class & placed under desk",
		"done": false
	},
	{
		"id": "chk-6",
		"textAr": "غسل اليدين بعد الفسحة وتنظيف المقعد",
		"textEn": "Washed hands & wiped break bench",
		"done": false
	},
	{
		"id": "chk-7",
		"textAr": "كف الأذى وحفظ اليدين والقدمين",
		"textEn": "Safe hands & feet respecting personal space",
		"done": false
	},
	{
		"id": "chk-8",
		"textAr": "إدخال الكرسي وفحص الأرضية قبل الانصراف",
		"textEn": "Chairs tucked & floor checked at pack-up",
		"done": false
	}
];
var grades_default = {
	"1": {
		"grade": 1,
		"stage": "junior",
		"stageAr": "الصفوف الأولية المبكرة (Early Primary)",
		"stageEn": "Early Primary (Grades 1–3)",
		"nameAr": "الصف الأول الابتدائي",
		"nameEn": "Grade 1",
		"cognitiveLevelAr": "حركي وحسي بصري مباشر (Sensory, Concrete & Kinesthetic)",
		"cognitiveLevelEn": "Concrete, Sensory & Kinesthetic Routines",
		"timerScale": 1.6,
		"timerPartner": 90,
		"roleplaySwitchRounds": 2,
		"characterAr": "عمر ونورة الصغار",
		"characterEn": "Young Omar & Noura",
		"badgeAr": "فرسان البراعم",
		"badgeEn": "Junior Sprout",
		"ageRange": "6–7 سنوات",
		"pedagogicalFocusAr": "التعود على النظام الصفي بالأنشودة والتقليد الحركي والإشارات البصرية الملونة",
		"pedagogicalFocusEn": "Routines built through songs, direct physical modeling, visual flashcards and positive mimicry",
		"customActivityAr": "لعبة 'اسمي فريد والصف عائلتي' + أنشودة الاصطفاف: 'Eyes on the door, feet on the floor, hands by my side!'",
		"customActivityEn": "'My Name is Unique' icebreaker + Line-up song: 'Eyes on the door, feet on the floor, hands by my side!'"
	},
	"2": {
		"grade": 2,
		"stage": "junior",
		"stageAr": "الصفوف الأولية المبكرة (Early Primary)",
		"stageEn": "Early Primary (Grades 1–3)",
		"nameAr": "الصف الثاني الابتدائي",
		"nameEn": "Grade 2",
		"cognitiveLevelAr": "حركي وبصري مع بداية القراءة الذاتية (Early Literacy & Social Habits)",
		"cognitiveLevelEn": "Early Literacy, Visual Cues & Social Mimicry",
		"timerScale": 1.5,
		"timerPartner": 90,
		"roleplaySwitchRounds": 2,
		"characterAr": "سعد وسارة الصغار",
		"characterEn": "Young Saad & Sarah",
		"badgeAr": "فرسان الهمة",
		"badgeEn": "Young Knights",
		"ageRange": "7–8 سنوات",
		"pedagogicalFocusAr": "تثبيت خطوات الاستئذان، تنظيم الحقيبة، ورعاية الزملاء برفق",
		"pedagogicalFocusEn": "Consolidating 3-tap door entry, bag organization, and gentle peer respect",
		"customActivityAr": "لعبة 'تجهيز المقلمة السحرية' في ٤٥ ثانية + أنشودة الفسحة ونظافة الطاولة",
		"customActivityEn": "'Magic Pencil Case Setup' in 45s + Break-time clean-up song and desk care"
	},
	"3": {
		"grade": 3,
		"stage": "junior",
		"stageAr": "الصفوف الأولية المبكرة (Early Primary)",
		"stageEn": "Early Primary (Grades 1–3)",
		"nameAr": "الصف الثالث الابتدائي",
		"nameEn": "Grade 3",
		"cognitiveLevelAr": "تطوير الاستقلالية وبناء المسؤولية الذاتية (Emerging Independence & Empathy)",
		"cognitiveLevelEn": "Emerging Independence, Structured Tasks & Empathy",
		"timerScale": 1.4,
		"timerPartner": 80,
		"roleplaySwitchRounds": 3,
		"characterAr": "بدر وتالا",
		"characterEn": "Badr & Tala",
		"badgeAr": "فرسان المبادرة",
		"badgeEn": "Initiative Knights",
		"ageRange": "8–9 سنوات",
		"pedagogicalFocusAr": "الموازنة بين السرعة والإتقان في تجهيز الأدوات وسكينة الممرات والمصلى",
		"pedagogicalFocusEn": "Balancing speed and quality in desk setup, hallway Sakinah, and Musalla reverence",
		"customActivityAr": "تحدي 'سفير الهدوء': كل طاولة تختار قائداً للملاحظة وتنظيم المقاعد",
		"customActivityEn": "'Peace Ambassador' Challenge: Squad leaders monitor quiet desk alignment"
	},
	"4": {
		"grade": 4,
		"stage": "intermediate",
		"stageAr": "الصفوف الابتدائية العليا (Upper Primary)",
		"stageEn": "Upper Primary (Grades 4–5)",
		"nameAr": "الصف الرابع الابتدائي",
		"nameEn": "Grade 4",
		"cognitiveLevelAr": "تفكير عملي منظم مع سقالات إرشادية (Concrete Operational with Scaffolds)",
		"cognitiveLevelEn": "Concrete Operational with Guided Scaffolding",
		"timerScale": 1.25,
		"timerPartner": 75,
		"roleplaySwitchRounds": 3,
		"characterAr": "فهد ولين",
		"characterEn": "Fahad & Leen",
		"badgeAr": "فرسان الإتقان",
		"badgeEn": "Mastery Knights",
		"ageRange": "9–10 سنوات",
		"pedagogicalFocusAr": "التعلم الذاتي والتفكير التأملي مع معايير 'أستطيع أن...' وبطاقات السقالات الإرشادية",
		"pedagogicalFocusEn": "Self-regulated routines, 'I Can...' rubrics with guided visual scaffolds",
		"customActivityAr": "محقق المواقف: تمثيل أدوار حل الخلافات المدرسية بمخطط 'أنا' (I-Statements)",
		"customActivityEn": "Scenario Detective: Role-playing conflict resolution using I-Statements"
	},
	"5": {
		"grade": 5,
		"stage": "intermediate",
		"stageAr": "الصفوف الابتدائية العليا (Upper Primary)",
		"stageEn": "Upper Primary (Grades 4–5)",
		"nameAr": "الصف الخامس الابتدائي",
		"nameEn": "Grade 5",
		"cognitiveLevelAr": "استقلالية كاملة وقيادة صفية وتأمل عميق (Autonomous Agency & Leadership)",
		"cognitiveLevelEn": "Autonomous Agency, Leadership & Reflective Inquiry",
		"timerScale": 1,
		"timerPartner": 60,
		"roleplaySwitchRounds": 3,
		"characterAr": "سعود وفاطمة",
		"characterEn": "Saud & Fatima",
		"badgeAr": "قادة الإحسان",
		"badgeEn": "Ihsan Leaders",
		"ageRange": "10–11 سنة",
		"pedagogicalFocusAr": "تطبيق ملامح متعلم البكالوريا الدولية (IB PYP): القيادة، الأمانة، والمبادرة المجتمعية",
		"pedagogicalFocusEn": "Full IB PYP agency, moral reasoning, classroom leadership, and community action",
		"customActivityAr": "مهرجان إثبات الإتقان الشامل + إدارة استطلاع التساؤل اليومي وبطاقات المغادرة",
		"customActivityEn": "Comprehensive Mastery Festival + Student Agency daily inquiry management"
	},
	"6": {
		"grade": 6,
		"stage": "middle",
		"stageAr": "المرحلة المتوسطة (Middle School / MYP)",
		"stageEn": "Middle School (Grades 6–8 / IB MYP)",
		"nameAr": "الصف السادس (الأول متوسط)",
		"nameEn": "Grade 6 (Middle 1)",
		"cognitiveLevelAr": "انتقال للمفاهيم المجردة وبناء الهوية والمسؤولية الأخلاقية (Early Formal Operational)",
		"cognitiveLevelEn": "Early Abstract Reasoning, Digital Ethics & Identity",
		"timerScale": .9,
		"timerPartner": 50,
		"roleplaySwitchRounds": 3,
		"characterAr": "ريان ومريم",
		"characterEn": "Rayan & Maryam",
		"badgeAr": "رواد المسؤولية",
		"badgeEn": "Responsibility Pioneers",
		"ageRange": "11–12 سنة",
		"pedagogicalFocusAr": "الانتقال السلس للمتوسطة، إدارة الوقت، احترام الخصوصية الرقمية، ومسؤولية الأجهزة",
		"pedagogicalFocusEn": "Middle school transition, time management, digital ethics, and peer integrity",
		"customActivityAr": "مناظرة صفية: 'الأمانة الرقمية وحماية الملكية الفكرية في العصر الحديث'",
		"customActivityEn": "Classroom Debate: 'Digital Amanah & Intellectual Integrity in the Modern Era'"
	},
	"7": {
		"grade": 7,
		"stage": "middle",
		"stageAr": "المرحلة المتوسطة (Middle School / MYP)",
		"stageEn": "Middle School (Grades 6–8 / IB MYP)",
		"nameAr": "الصف السابع (الثاني متوسط)",
		"nameEn": "Grade 7 (Middle 2)",
		"cognitiveLevelAr": "تفكير نقدي وتحليل الدوافع والعدالة الاجتماعية (Critical Thinking & Peer Influence)",
		"cognitiveLevelEn": "Critical Analysis, Ethical Dilemmas & Peer Accountability",
		"timerScale": .85,
		"timerPartner": 45,
		"roleplaySwitchRounds": 4,
		"characterAr": "طارق وجنى",
		"characterEn": "Tariq & Jana",
		"badgeAr": "سفراء النزاهة",
		"badgeEn": "Integrity Ambassadors",
		"ageRange": "12–13 سنة",
		"pedagogicalFocusAr": "مقاومة ضغط الأقران السلبي، النزاهة الأكاديمية، وتعزيز الصدق في المعاملات",
		"pedagogicalFocusEn": "Resisting negative peer pressure, academic honesty, and transparent integrity",
		"customActivityAr": "محاكاة محكمة الأخلاق: تحليل سيناريوهات الغش أو التنمر الرقمي ووضع حلول عادلة",
		"customActivityEn": "Ethics Court Simulation: Analyzing academic fraud and cyberbullying dilemmas"
	},
	"8": {
		"grade": 8,
		"stage": "middle",
		"stageAr": "المرحلة المتوسطة (Middle School / MYP)",
		"stageEn": "Middle School (Grades 6–8 / IB MYP)",
		"nameAr": "الصف الثامن (الثالث متوسط)",
		"nameEn": "Grade 8 (Middle 3)",
		"cognitiveLevelAr": "نضج أخلاقي وتفكير استراتيجي وبناء القدوات (Principled Reasoning & Mentorship)",
		"cognitiveLevelEn": "Principled Reasoning, Self-Regulation & Peer Mentoring",
		"timerScale": .8,
		"timerPartner": 45,
		"roleplaySwitchRounds": 4,
		"characterAr": "زياد وغلا",
		"characterEn": "Ziyad & Ghala",
		"badgeAr": "فرسان الحكمة",
		"badgeEn": "Wisdom Knights",
		"ageRange": "13–14 سنة",
		"pedagogicalFocusAr": "توجيه الطلاب الأصغر سناً (Mentorship)، تمثيل المدرسة، وحفظ الأمانة المجتمعية",
		"pedagogicalFocusEn": "Mentoring younger peers, representing school values, and community stewardship",
		"customActivityAr": "مشروع 'ميثاق الاحترام الرقمي والواقعي': صياغة وثيقة إرشادية للمرحلة المتوسطة",
		"customActivityEn": "'Digital & Physical Respect Charter': Drafting behavioral guidelines for MS"
	},
	"9": {
		"grade": 9,
		"stage": "high",
		"stageAr": "المرحلة الثانوية (High School / DP Prep)",
		"stageEn": "High School (Grades 9–12 / IB DP Prep)",
		"nameAr": "الصف التاسع (الأول ثانوي)",
		"nameEn": "Grade 9 (High 1)",
		"cognitiveLevelAr": "تفكير مجرد متقدم وتخطيط مستقبلي وبناء الهوية (Formal Abstract & Self-Identity)",
		"cognitiveLevelEn": "Advanced Abstract Thought, Strategic Planning & Identity",
		"timerScale": .75,
		"timerPartner": 40,
		"roleplaySwitchRounds": 4,
		"characterAr": "سلطان وريم",
		"characterEn": "Sultan & Reem",
		"badgeAr": "رواد التميز",
		"badgeEn": "Excellence Trailblazers",
		"ageRange": "14–15 سنة",
		"pedagogicalFocusAr": "المسؤولية الأكاديمية الذاتية، التخطيط للمستقبل، والتوازن بين الدراسة والعبادة",
		"pedagogicalFocusEn": "Independent academic diligence, future vision, and spiritual-work balance",
		"customActivityAr": "ورشة عمل 'إدارة الأولويات ومحاربة التسويف': تطبيق مصفوفة أيزنهاور القيمية",
		"customActivityEn": "Priority Management Workshop: Applying Eisenhower Matrix with Islamic values"
	},
	"10": {
		"grade": 10,
		"stage": "high",
		"stageAr": "المرحلة الثانوية (High School / DP Prep)",
		"stageEn": "High School (Grades 9–12 / IB DP Prep)",
		"nameAr": "الصف العاشر (الثاني ثانوي)",
		"nameEn": "Grade 10 (High 2)",
		"cognitiveLevelAr": "تحليل فلسفي وأخلاقي عميق ومواطنة عالمية (Philosophical & Global Ethical Inquiry)",
		"cognitiveLevelEn": "Global Citizenship, Moral Philosophy & Civic Responsibility",
		"timerScale": .75,
		"timerPartner": 40,
		"roleplaySwitchRounds": 4,
		"characterAr": "حمزة وهناء",
		"characterEn": "Hamza & Hanaa",
		"badgeAr": "فرسان القيادة",
		"badgeEn": "Leadership Knights",
		"ageRange": "15–16 سنة",
		"pedagogicalFocusAr": "المواطنة الواعية، تمثيل الهوية الإسلامية عالمياً، والقيادة المجتمعية",
		"pedagogicalFocusEn": "Global mindedness, Islamic identity in international arenas, civic leadership",
		"customActivityAr": "منتدى الشباب القيمي: صياغة مبادرات تطوعية مدرسية تحاكي مشاريع CAS",
		"customActivityEn": "Youth Values Forum: Designing community service initiatives (CAS alignment)"
	},
	"11": {
		"grade": 11,
		"stage": "high",
		"stageAr": "المرحلة الثانوية (High School / DP Prep)",
		"stageEn": "High School (Grades 9–12 / IB DP Prep)",
		"nameAr": "الصف الحادي عشر (الثالث ثانوي)",
		"nameEn": "Grade 11 (High 3)",
		"cognitiveLevelAr": "تفكير تركيبي ونقدي وبحوث علمية متقدمة (Synthesis, Research & IB DP Maturity)",
		"cognitiveLevelEn": "Epistemic Rigor, Ethical Research & Academic Stewardship",
		"timerScale": .7,
		"timerPartner": 35,
		"roleplaySwitchRounds": 5,
		"characterAr": "فيصل ولولوة",
		"characterEn": "Faisal & Lulwah",
		"badgeAr": "فرسان الأمانة الفكرية",
		"badgeEn": "Academic Integrity Knights",
		"ageRange": "16–17 سنة",
		"pedagogicalFocusAr": "الأمانة في البحث العلمي، الإتقان المهني، والاستعداد للمرحلة الجامعية",
		"pedagogicalFocusEn": "Research ethics (TOK/EE alignment), scholarly integrity, university readiness",
		"customActivityAr": "دراسة حالة أخلاقية: 'الذكاء الاصطناعي والأمانة الأكاديمية: كيف نكون مبدعين بلا غش؟'",
		"customActivityEn": "Case Study: 'AI & Academic Honesty: Innovating with Ethical Integrity'"
	},
	"12": {
		"grade": 12,
		"stage": "high",
		"stageAr": "المرحلة الثانوية (High School / DP Prep)",
		"stageEn": "High School (Grades 9–12 / IB DP Prep)",
		"nameAr": "الصف الثاني عشر (الرابع ثانوي / خريجون)",
		"nameEn": "Grade 12 (Graduating Seniors)",
		"cognitiveLevelAr": "نضج قيادي وتأثير مجتمعي وقدوة عليا (Senior Exemplars & Life Transition)",
		"cognitiveLevelEn": "Senior Exemplars, Life Transition & Community Impact",
		"timerScale": .7,
		"timerPartner": 30,
		"roleplaySwitchRounds": 5,
		"characterAr": "عبدالله وأميرة",
		"characterEn": "Abdullah & Amira",
		"badgeAr": "سفراء الإحسان الخريجون",
		"badgeEn": "Graduating Ihsan Ambassadors",
		"ageRange": "17–18 سنة",
		"pedagogicalFocusAr": "القدوة العليا للمدرسة بأكملها، ترك إرث قيمي إيجابي، وحمل رسالة الإحسان للجامعة والحياة",
		"pedagogicalFocusEn": "School-wide role modeling, positive legacy, carrying Ihsan to university and life",
		"customActivityAr": "ميثاق الخريجين: وثيقة عهد الإحسان والمسؤولية في الحياة الجامعية والمهنية",
		"customActivityEn": "Graduates' Legacy Charter: Ihsan Covenant in higher education and society"
	}
};
var wheel_default = [
	{
		"textAr": "أدب طرق الباب",
		"textEn": "3-Knock Drill",
		"color": "#10b981",
		"actionAr": "توجه لباب الصف ومثّل الطرقات الثلاث الهادئة والوقوف جانباً ثم إلقاء السلام وإغلاق الباب برفق!",
		"actionEn": "Walk to the classroom door and model the 3 gentle knocks, standing to side, Salam and soft door closing!"
	},
	{
		"textAr": "بطلي المفضل",
		"textEn": "Role Model",
		"color": "#3b82f6",
		"actionAr": "اذكر اسم شخصية إسلامية أو وطنية سعودية ملهمة تقتدي بها في حياتك ولماذا؟",
		"actionEn": "Name an Islamic or Saudi hero you look up to and explain why!"
	},
	{
		"textAr": "تحدي السكينة",
		"textEn": "Hallway Sakinah",
		"color": "#f59e0b",
		"actionAr": "قم ومثّل كيف يمشي بطل الصف الخامس في الممر على اليمين دون إصدار صوت حذاء أو ركض!",
		"actionEn": "Stand up and demonstrate how a Grade 5 champion walks silently on the right of the corridor!"
	},
	{
		"textAr": "سوبر باور صفي",
		"textEn": "Class Superpower",
		"color": "#ec4899",
		"actionAr": "ما هي الموهبة أو القوة الخارقة التي جئت بها للصف هذا العام (الرسم، الحساب، الإيثار، التشجيع)؟",
		"actionEn": "What unique superpower or talent do you bring to our class this year (art, math, kindness, cheering)?"
	},
	{
		"textAr": "الاستعداد للصلاة",
		"textEn": "Classroom Prayer Hero",
		"color": "#06b6d4",
		"actionAr": "اشرح لزملائك في ٣٠ ثانية خطوات الاستعداد الهادئ للصلاة وحفظ الأدوات ووضع الأحذية تحت الطاولة بالفصل!",
		"actionEn": "Explain to your peers in 30 seconds the steps of calm prayer preparation, packing supplies, and placing shoes under desks in class!"
	},
	{
		"textAr": "صفة PYP تشبهك",
		"textEn": "My PYP Trait",
		"color": "#8b5cf6",
		"actionAr": "اختر صفة من ملامح متعلم البكالوريا (مهتم، مفكر، ذو مبادئ، شجاع) واذكر كيف تطبقها اليوم.",
		"actionEn": "Choose a PYP attribute (Caring, Thinker, Principled, Risk-taker) and share how you showed it."
	},
	{
		"textAr": "سلام الفرسان",
		"textEn": "Salam & Smile",
		"color": "#14b8a6",
		"actionAr": "التفت إلى ٣ زملاء حولك، ألقِ عليهم تحية الإسلام بابتسامة ناصعة وصافحهم بلطف!",
		"actionEn": "Turn to 3 peers near you, greet them with a beaming Salam and a respectful handshake!"
	},
	{
		"textAr": "سر حقيبتي",
		"textEn": "Bag Inspection",
		"color": "#f97316",
		"actionAr": "أخرج من حقيبتك أهم أداة أحضرتها اليوم للمدرسة واشرح كيف ستفيدك في رحلة التعلم!",
		"actionEn": "Show the coolest item in your backpack today and explain how it helps your learning journey!"
	},
	{
		"textAr": "النينجا الصامت",
		"textEn": "Silent Ninja",
		"color": "#6366f1",
		"actionAr": "قم وافعل ٥ قفزات رياضية (Jumping Jacks) بصمت تام دون أي صوت لحذائك في الصف!",
		"actionEn": "Perform 5 jumping jacks in total, absolute silence without making any shoe or floor noise!"
	},
	{
		"textAr": "سنة نبوية يومية",
		"textEn": "Daily Sunnah",
		"color": "#84cc16",
		"actionAr": "اذكر سنة نبوية بسيطة تطبقها كل يوم (مثل التيامن، الابتسامة، شرب الماء جالساً باليمين).",
		"actionEn": "Share one simple Sunnah you practice daily (e.g. smiling, eating seated with right hand)."
	},
	{
		"textAr": "موقف بطولي",
		"textEn": "Kindness Memory",
		"color": "#e11d48",
		"actionAr": "احكِ لزملائك عن موقف قدمت فيه مساعدة لشخص في عائلتك أو مدرستك مؤخراً.",
		"actionEn": "Tell the class about a time you helped someone in your family or school recently."
	},
	{
		"textAr": "تجهيز الطاولة",
		"textEn": "Desk Master",
		"color": "#0284c7",
		"actionAr": "في ٢٠ ثانية فقط: رتّب طاولتك لتكون الأجمل والأنظف في الفصل بأكمله!",
		"actionEn": "In 20 seconds: organize your desk into the neatest launchpad in the whole room!"
	},
	{
		"textAr": "٣ نعم نشكرها",
		"textEn": "3 Blessings",
		"color": "#d97706",
		"actionAr": "اذكر ٣ نعم عظيمة تشكر الله عليها اليوم في مدرستنا وفصلنا الجميل.",
		"actionEn": "Name 3 wonderful blessings you are grateful to Allah for today in our school."
	},
	{
		"textAr": "الإنصات المتقن",
		"textEn": "Listening Ears",
		"color": "#7c3aed",
		"actionAr": "اطلب من زميلك أن يخبرك بهوايته المفضلة في جملتين، ثم أعد صياغتها للصف بأسلوبك!",
		"actionEn": "Ask a peer his favorite hobby in 2 sentences, then paraphrase it to the class with precision!"
	},
	{
		"textAr": "لا تترك أثراً",
		"textEn": "Leave No Trace",
		"color": "#059669",
		"actionAr": "تفقد الأرضية تحت مقعدك ومقعد زميلك واجمع أي قصاصة ورقية وتخلص منها في السلة فوراً!",
		"actionEn": "Inspect the floor under your desk and your neighbor's; pick up any tiny scrap for the bin!"
	},
	{
		"textAr": "نصيحة أخوية",
		"textEn": "Brotherly Tip",
		"color": "#475569",
		"actionAr": "وجه نصيحة ذهبية واحدة لزملائك لتكون سنتنا في الصف الخامس مليئة بالنجاح والتميز!",
		"actionEn": "Offer one piece of golden brotherly advice to make our Grade 5 year unforgettable and successful!"
	}
];
var SKILLS = skills_default;
var SCENARIOS = scenarios_default;
var VALUES = values_default;
var SPIRAL = spiral_default;
var WARMUPS = warmups_default;
var IHSAN = ihsan_default;
var CHECKLIST = checklist_default;
var GRADES = grades_default;
var CLASSES = classes_default;
var WHEEL = wheel_default;
var WHEEL_COLORS = [
	"#0F3D32",
	"#14644A",
	"#1F6B56",
	"#3D7A66",
	"#5A8F7A",
	"#8A9E8F",
	"#C4B8A0",
	"#1A1814"
];
function gradeConfig(grade) {
	return GRADES[String(grade)] ?? GRADES["5"];
}
function featuredSkillIndex() {
	return (/* @__PURE__ */ new Date()).getDate() % SKILLS.length;
}
function currentStage(score) {
	const stages = IHSAN.stages;
	let current = stages[0];
	for (const s of stages) if (score >= s.minScore) current = s;
	const next = stages.find((s) => s.minScore > score) ?? stages[stages.length - 1];
	return {
		current,
		next
	};
}
var ctx = null;
function audio() {
	if (typeof window === "undefined") return null;
	if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
	return ctx;
}
function resumeAudio() {
	const c = audio();
	if (c?.state === "suspended") c.resume();
}
function playTone(freq, type = "sine", duration = .12, gain = .08) {
	const c = audio();
	if (!c) return;
	const osc = c.createOscillator();
	const g = c.createGain();
	osc.type = type;
	osc.frequency.value = freq;
	g.gain.value = gain;
	osc.connect(g);
	g.connect(c.destination);
	osc.start();
	g.gain.exponentialRampToValueAtTime(.001, c.currentTime + duration);
	osc.stop(c.currentTime + duration + .02);
}
function playSuccess() {
	[
		523,
		659,
		784
	].forEach((f, i) => {
		setTimeout(() => playTone(f, "triangle", .16, .07), i * 90);
	});
}
function playError() {
	playTone(220, "sawtooth", .18, .05);
}
function playTick() {
	playTone(880, "square", .04, .03);
}
function playBell() {
	[
		784,
		988,
		1174
	].forEach((f, i) => {
		setTimeout(() => playTone(f, "sine", .4, .06), i * 120);
	});
}
var KINDS$1 = [
	"play",
	"practise",
	"partner",
	"group",
	"mission",
	"reflect",
	"mastery"
];
function credit(skillId, kind, lang) {
	const sound = useApp.getState().sound;
	const { ok, points } = useApp.getState().completeAction(skillId, kind);
	if (ok) {
		if (sound) playSuccess();
		burstConfetti();
		toast.success(tx(lang, "awarded") + ` +${points}`);
		if (kind === "mastery" || kind === "mission") useApp.getState().askWhoAchieved(skillId, kind === "mastery" ? "mastery" : "star");
	} else {
		if (sound) playTone(380, "triangle", .1, .06);
		toast.message(tx(lang, "alreadyDone"));
		if (kind === "mastery") useApp.getState().askWhoAchieved(skillId, "mastery");
	}
}
function SequenceGame({ skill }) {
	const lang = useApp((s) => s.lang);
	const steps = skill.minigame.steps ?? [];
	const [order, setOrder] = (0, import_react.useState)(() => shuffle(steps.map((_, i) => i)));
	const [result, setResult] = (0, import_react.useState)("idle");
	function move(i, dir) {
		const j = i + dir;
		if (j < 0 || j >= order.length) return;
		const next = [...order];
		[next[i], next[j]] = [next[j], next[i]];
		setOrder(next);
		setResult("idle");
	}
	function check() {
		const ok = order.every((orig, i) => orig === i);
		setResult(ok ? "ok" : "bad");
		if (ok) credit(skill.id, "play", lang);
		else if (useApp.getState().sound) playError();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
				ar: joinSpeak([skill.minigame.instructionAr || skill.minigame.titleAr, ...steps.map((s) => s.textAr)]),
				en: joinSpeak([skill.minigame.instructionEn || skill.minigame.titleEn, ...steps.map((s) => s.textEn)]),
				aria: tx(lang, "listenSection"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
					ar: skill.minigame.instructionAr || skill.minigame.titleAr,
					en: skill.minigame.instructionEn || skill.minigame.titleEn,
					as: "p",
					className: "text-sm text-muted"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2",
				children: order.map((orig, i) => {
					const step = steps[orig];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 rounded-lg bg-paper p-2.5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular w-7 text-center text-xs font-semibold text-crest",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
								ar: step.textAr,
								en: step.textEn,
								className: "flex-1 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-8 text-muted hover:text-fg",
									onClick: () => move(i, -1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "mx-auto size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-8 text-muted hover:text-fg",
									onClick: () => move(i, 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "mx-auto size-4" })
								})]
							})
						]
					}, step.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: check,
				children: tx(lang, "checkSequence")
			}),
			result === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-ok",
				children: tx(lang, "sequenceOk")
			}) : null,
			result === "bad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-warn",
				children: tx(lang, "sequenceBad")
			}) : null
		]
	});
}
function SpotGame({ skill }) {
	const lang = useApp((s) => s.lang);
	const stw = lang === "ar" ? skill.minigame.seeThinkWonderAr : skill.minigame.seeThinkWonderEn;
	const stwAr = skill.minigame.seeThinkWonderAr;
	const stwEn = skill.minigame.seeThinkWonderEn;
	const [marks, setMarks] = (0, import_react.useState)([
		false,
		false,
		false
	]);
	const keys = [
		"see",
		"think",
		"wonder"
	];
	const labels = [
		tx(lang, "see"),
		tx(lang, "think"),
		tx(lang, "wonder")
	];
	function toggle(i) {
		const next = [...marks];
		next[i] = !next[i];
		setMarks(next);
		if (next.every(Boolean)) credit(skill.id, "play", lang);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
				ar: joinSpeak([
					skill.minigame.sceneAr,
					stwAr?.see,
					stwAr?.think,
					stwAr?.wonder
				]),
				en: joinSpeak([
					skill.minigame.sceneEn,
					stwEn?.see,
					stwEn?.think,
					stwEn?.wonder
				]),
				aria: tx(lang, "listenSection"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
					ar: skill.minigame.sceneAr || "",
					en: skill.minigame.sceneEn || "",
					as: "p",
					className: "rounded-lg bg-paper p-3 text-sm leading-relaxed"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: tx(lang, "spotPrompt")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: keys.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => toggle(i),
					className: `rounded-lg p-3 text-start shadow-[var(--shadow-border)] transition-colors ${marks[i] ? "bg-primary/10" : "bg-card"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold text-crest",
							children: labels[i]
						}), marks[i] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-ok" }) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: stw?.[k]
					})]
				}, k))
			})
		]
	});
}
function DialogueGame({ skill }) {
	const lang = useApp((s) => s.lang);
	const [choice, setChoice] = (0, import_react.useState)(null);
	const bad = lang === "ar" ? skill.minigame.badDialogueAr : skill.minigame.badDialogueEn;
	const good = lang === "ar" ? skill.minigame.goodDialogueAr : skill.minigame.goodDialogueEn;
	function pick(which) {
		setChoice(which);
		if (which === "good") credit(skill.id, "play", lang);
		else if (useApp.getState().sound) playError();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
				ar: joinSpeak([
					skill.minigame.sceneAr,
					skill.minigame.badDialogueAr,
					skill.minigame.goodDialogueAr
				]),
				en: joinSpeak([
					skill.minigame.sceneEn,
					skill.minigame.badDialogueEn,
					skill.minigame.goodDialogueEn
				]),
				aria: tx(lang, "listenSection"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
					ar: skill.minigame.sceneAr || "",
					en: skill.minigame.sceneEn || "",
					as: "p",
					className: "text-sm leading-relaxed text-muted"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: tx(lang, "chooseRespectful")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => pick("bad"),
					className: `rounded-lg p-3 text-start text-sm shadow-[var(--shadow-border)] ${choice === "bad" ? "bg-danger/10" : "bg-card"}`,
					children: bad
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => pick("good"),
					className: `rounded-lg p-3 text-start text-sm shadow-[var(--shadow-border)] ${choice === "good" ? "bg-ok/10" : "bg-card"}`,
					children: good
				})]
			}),
			choice === "good" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-ok",
				children: tx(lang, "correct")
			}) : null,
			choice === "bad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-warn",
				children: tx(lang, "rethink")
			}) : null
		]
	});
}
function WhichValueGame({ skill }) {
	const lang = useApp((s) => s.lang);
	const [pick, setPick] = (0, import_react.useState)(null);
	const target = (skill.minigame.targetValue || "").toLowerCase();
	function choose(id) {
		setPick(id);
		if (id === target) credit(skill.id, "play", lang);
		else if (useApp.getState().sound) playError();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
				ar: joinSpeak([skill.minigame.scenarioAr, skill.minigame.justificationRequiredAr]),
				en: joinSpeak([skill.minigame.scenarioEn, skill.minigame.justificationRequiredEn]),
				aria: tx(lang, "listenSection"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
					ar: skill.minigame.scenarioAr || "",
					en: skill.minigame.scenarioEn || "",
					as: "p",
					className: "text-sm leading-relaxed"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: tx(lang, "whichValue")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
				children: VALUES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => choose(v.id),
					className: `rounded-lg p-3 text-start shadow-[var(--shadow-border)] ${pick === v.id ? v.id === target ? "bg-ok/10" : "bg-danger/10" : "bg-card"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: v.nameAr,
						en: v.nameEn,
						className: "text-sm font-medium"
					})
				}, v.id))
			}),
			pick === target ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
				ar: skill.minigame.justificationRequiredAr || "",
				en: skill.minigame.justificationRequiredEn || "",
				as: "p",
				className: "text-sm text-ok"
			}) : null
		]
	});
}
function PlayPane({ skill }) {
	const type = skill.minigame.type;
	if (type === "spot_problem") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotGame, { skill });
	if (type === "fix_dialogue") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogueGame, { skill });
	if (type === "which_value") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhichValueGame, { skill });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SequenceGame, { skill });
}
function PartnerTimer({ seconds }) {
	const lang = useApp((s) => s.lang);
	const [left, setLeft] = (0, import_react.useState)(seconds);
	const [run, setRun] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setLeft(seconds);
		setRun(false);
	}, [seconds]);
	(0, import_react.useEffect)(() => {
		if (!run) return;
		const id = window.setInterval(() => {
			setLeft((p) => {
				if (p <= 1) {
					setRun(false);
					return 0;
				}
				return p - 1;
			});
		}, 1e3);
		return () => window.clearInterval(id);
	}, [run]);
	const mm = String(Math.floor(left / 60)).padStart(2, "0");
	const ss = String(left % 60).padStart(2, "0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular font-display text-3xl",
				children: [
					mm,
					":",
					ss
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => setRun(!run),
				children: run ? tx(lang, "pauseTimer") : tx(lang, "startPartner")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => {
					setRun(false);
					setLeft(seconds);
				},
				children: tx(lang, "reset")
			})
		]
	});
}
function SkillStudio() {
	const open = useApp((s) => s.studioOpen);
	const close = useApp((s) => s.closeStudio);
	const id = useApp((s) => s.selectedSkillId);
	const lang = useApp((s) => s.lang);
	const grade = useApp((s) => s.grade);
	const completed = useApp((s) => s.completed);
	const isJunior = grade <= 3;
	const [kind, setKind] = (0, import_react.useState)("play");
	const [text, setText] = (0, import_react.useState)("");
	const [tier, setTier] = (0, import_react.useState)("tier3");
	const skill = SKILLS.find((s) => s.id === id);
	if (!skill) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => !v && close(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: tx(lang, "openStudio") }) })
	});
	const objectiveAr = isJunior ? skill.juniorObjectiveAr : skill.learningObjectiveAr;
	const objectiveEn = isJunior ? skill.juniorObjectiveEn : skill.learningObjectiveEn;
	const criteriaAr = isJunior ? skill.juniorCriteriaAr : skill.successCriteriaAr;
	const criteriaEn = isJunior ? skill.juniorCriteriaEn : skill.successCriteriaEn;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => !v && close(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			wide: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pe-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
							skill.jpisValueAr,
							" · ",
							skill.jpisValue
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
								ar: skill.titleAr,
								en: skill.titleEn
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: skill.taglineAr,
							en: skill.taglineEn,
							as: "p",
							className: "mt-1 text-sm text-muted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: skill.pypProfile.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-ink/5 text-fg",
								children: lang === "ar" ? skill.pypProfileAr[i] : p
							}, p))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 rounded-lg bg-paper p-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
						title: tx(lang, "objective"),
						ar: joinSpeak([
							tx("ar", "objective"),
							skill.titleAr,
							objectiveAr
						]),
						en: joinSpeak([
							tx("en", "objective"),
							skill.titleEn,
							objectiveEn
						])
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: objectiveAr,
						en: objectiveEn,
						as: "p",
						className: "text-sm leading-relaxed"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
						title: tx(lang, "hadith"),
						ar: joinSpeak([tx("ar", "hadith"), skill.islamicValueAr]),
						en: joinSpeak([tx("en", "hadith"), skill.islamicValueEn])
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: skill.islamicValueAr,
						en: skill.islamicValueEn,
						as: "p",
						className: "text-sm leading-relaxed"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
						title: tx(lang, "criteria"),
						ar: joinSpeak([tx("ar", "criteria"), ...criteriaAr]),
						en: joinSpeak([tx("en", "criteria"), ...criteriaEn])
					}), criteriaAr.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-ok" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: c,
							en: criteriaEn[i] || c
						})]
					}, i))]
				}),
				grade === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-lg bg-crest/8 p-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
						title: tx(lang, "scaffold"),
						ar: joinSpeak([tx("ar", "scaffold"), skill.grade4ScaffoldAr]),
						en: joinSpeak([tx("en", "scaffold"), skill.grade4ScaffoldEn])
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: skill.grade4ScaffoldAr,
						en: skill.grade4ScaffoldEn
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-1 overflow-x-auto pb-1",
					children: KINDS$1.map((k) => {
						const isDone = Object.keys(completed).some((key) => key.endsWith(`:${skill.id}:${k}`));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setKind(k),
							className: `h-10 shrink-0 rounded-md px-3 text-xs font-medium ${kind === k ? "bg-primary text-primary-fg" : "bg-crest/8 text-crest"}`,
							children: [tx(lang, k), isDone ? " · ✓" : ""]
						}, k);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 min-h-40",
					children: [
						kind === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayPane, { skill }) : null,
						kind === "practise" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
									ar: joinSpeak([
										skill.practise.titleAr,
										skill.practise.promptAr,
										...skill.practise.stemsAr
									]),
									en: joinSpeak([
										skill.practise.titleEn,
										skill.practise.promptEn,
										...skill.practise.stemsEn
									]),
									aria: tx(lang, "practise"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: skill.practise.titleAr,
										en: skill.practise.titleEn,
										as: "h3",
										className: "font-display text-lg"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: skill.practise.promptAr,
									en: skill.practise.promptEn,
									as: "p",
									className: "text-sm leading-relaxed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium text-muted",
									children: tx(lang, "stems")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: skill.practise.stemsAr.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "rounded-lg bg-paper p-3 text-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
											ar: s,
											en: skill.practise.stemsEn[i] || s
										})
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => credit(skill.id, "practise", lang),
									children: tx(lang, "confirm")
								})
							]
						}) : null,
						kind === "partner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
									ar: joinSpeak([skill.partner.titleAr, skill.partner.promptAr]),
									en: joinSpeak([skill.partner.titleEn, skill.partner.promptEn]),
									aria: tx(lang, "partner"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: skill.partner.titleAr,
										en: skill.partner.titleEn,
										as: "h3",
										className: "font-display text-lg"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: skill.partner.promptAr,
									en: skill.partner.promptEn,
									as: "p",
									className: "text-sm leading-relaxed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerTimer, { seconds: Math.round((grade <= 3 ? 90 : 60) * (grade === 4 ? 1.5 : 1)) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => credit(skill.id, "partner", lang),
									children: tx(lang, "confirm")
								})
							]
						}) : null,
						kind === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
									ar: joinSpeak([
										skill.groupChallenge.titleAr,
										skill.groupChallenge.scenarioAr || skill.groupChallenge.instructionAr,
										...skill.groupChallenge.investigationStepsAr || []
									]),
									en: joinSpeak([
										skill.groupChallenge.titleEn,
										skill.groupChallenge.scenarioEn || skill.groupChallenge.instructionEn,
										...skill.groupChallenge.investigationStepsEn || []
									]),
									aria: tx(lang, "group"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: skill.groupChallenge.titleAr,
										en: skill.groupChallenge.titleEn,
										as: "h3",
										className: "font-display text-lg"
									})
								}),
								skill.groupChallenge.scenarioAr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: skill.groupChallenge.scenarioAr,
									en: skill.groupChallenge.scenarioEn || "",
									as: "p",
									className: "text-sm"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: skill.groupChallenge.instructionAr || "",
									en: skill.groupChallenge.instructionEn || "",
									as: "p",
									className: "text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "space-y-2",
									children: (skill.groupChallenge.investigationStepsAr || []).map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "rounded-lg bg-paper p-3 text-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
											ar: step,
											en: skill.groupChallenge.investigationStepsEn?.[i] || step
										})
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => credit(skill.id, "group", lang),
									children: tx(lang, "confirm")
								})
							]
						}) : null,
						kind === "mission" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
									ar: joinSpeak([skill.realLifeMission.titleAr, skill.realLifeMission.taskAr]),
									en: joinSpeak([skill.realLifeMission.titleEn, skill.realLifeMission.taskEn]),
									aria: tx(lang, "mission"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: skill.realLifeMission.titleAr,
										en: skill.realLifeMission.titleEn,
										as: "h3",
										className: "font-display text-lg"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: skill.realLifeMission.taskAr,
									en: skill.realLifeMission.taskEn,
									as: "p",
									className: "text-sm leading-relaxed"
								}),
								skill.realLifeMission.requiresTeacherSignoff ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: tx(lang, "missionSignoff")
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => credit(skill.id, "mission", lang),
									children: tx(lang, "confirm")
								})
							]
						}) : null,
						kind === "reflect" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
									ar: skill.reflection.questionAr,
									en: skill.reflection.questionEn,
									aria: tx(lang, "reflect"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: skill.reflection.questionAr,
										en: skill.reflection.questionEn,
										as: "p",
										className: "text-sm leading-relaxed"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: text,
									onChange: (e) => setText(e.target.value),
									placeholder: tx(lang, "writeReflection")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => {
										if (!text.trim()) {
											toast.message(tx(lang, "writeReflection"));
											return;
										}
										credit(skill.id, "reflect", lang);
										setText("");
									},
									children: tx(lang, "shareReflection")
								})
							]
						}) : null,
						kind === "mastery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
										variant: "icon",
										aria: tx(lang, "mastery"),
										ar: joinSpeak([
											tx("ar", "mastery"),
											skill.mastery.tier1.ar,
											skill.mastery.tier2.ar,
											skill.mastery.tier3.ar
										]),
										en: joinSpeak([
											tx("en", "mastery"),
											skill.mastery.tier1.en,
											skill.mastery.tier2.en,
											skill.mastery.tier3.en
										])
									})
								}),
								[
									"tier1",
									"tier2",
									"tier3"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: `flex cursor-pointer gap-3 rounded-lg p-3 shadow-[var(--shadow-border)] ${tier === t ? "bg-primary/10" : "bg-card"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "tier",
										className: "mt-1 accent-primary",
										checked: tier === t,
										onChange: () => setTier(t)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: skill.mastery[t].ar,
										en: skill.mastery[t].en,
										className: "text-sm"
									})]
								}, t)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => credit(skill.id, "mastery", lang),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}),
										" ",
										tx(lang, "certify")
									]
								})
							]
						}) : null
					]
				})
			]
		})
	});
}
function ProgressRing({ value, max, size = 112, label, sub }) {
	const r = 42;
	const c = 2 * Math.PI * r;
	const pct = max <= 0 ? 0 : Math.min(1, value / max);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative inline-flex items-center justify-center",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			className: "size-full -rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r,
				fill: "none",
				stroke: "#ddd6c8",
				strokeWidth: "8"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r,
				fill: "none",
				stroke: "#14644a",
				strokeWidth: "8",
				strokeLinecap: "round",
				strokeDasharray: `${c * pct} ${c}`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular text-lg font-semibold text-fg",
					children: value
				}),
				sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted",
					children: sub
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-medium text-crest",
					children: label
				})
			]
		})]
	});
}
function TodayView() {
	const lang = useApp((s) => s.lang);
	const grade = useApp((s) => s.grade);
	const score = useApp((s) => s.score);
	const openStudio = useApp((s) => s.openStudio);
	const setTab = useApp((s) => s.setTab);
	const completed = useApp((s) => s.completed);
	const section = useApp((s) => s.section);
	const classId = useApp((s) => s.classId);
	const rosters = useApp((s) => s.rosters);
	const observations = useApp((s) => s.observations);
	const roster = rosters[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER;
	const prefix = makeRosterKey(grade, section, classId) + ":";
	const champions = roster.map((student) => {
		let stars = 0;
		let mastered = 0;
		for (const [key, item] of Object.entries(observations)) {
			if (!key.startsWith(prefix + student.id)) continue;
			stars += item.stars;
			if (item.mastered || isSkillMastered(item)) mastered += 1;
		}
		return {
			student,
			stars,
			mastered
		};
	}).filter((t) => t.stars > 0 || t.mastered > 0).sort((a, b) => b.stars - a.stars || b.mastered - a.mastered).slice(0, 3);
	const cfg = gradeConfig(grade);
	const skill = SKILLS[featuredSkillIndex()];
	const { current, next } = currentStage(score);
	const todayActions = Object.keys(completed).filter((k) => k.startsWith(todayISO())).length;
	const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
	const isJunior = grade <= 3;
	const objectiveAr = isJunior ? skill.juniorObjectiveAr : skill.learningObjectiveAr;
	const objectiveEn = isJunior ? skill.juniorObjectiveEn : skill.learningObjectiveEn;
	const criteriaAr = isJunior ? skill.juniorCriteriaAr : skill.successCriteriaAr;
	const criteriaEn = isJunior ? skill.juniorCriteriaEn : skill.successCriteriaEn;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "star-pattern overflow-hidden rounded-xl bg-crest p-6 text-primary-fg sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-primary-fg/12 text-primary-fg",
						children: tx(lang, "todayKicker")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
						tone: "onDark",
						className: "mt-3",
						aria: tx(lang, "todayKicker"),
						ar: joinSpeak([
							tx("ar", "todayKicker"),
							tx("ar", "todayTitle"),
							tx("ar", "ibLine"),
							cfg.nameAr,
							cfg.pedagogicalFocusAr
						]),
						en: joinSpeak([
							tx("en", "todayKicker"),
							tx("en", "todayTitle"),
							tx("en", "ibLine"),
							cfg.nameEn,
							cfg.pedagogicalFocusEn
						]),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl",
							children: tx(lang, "todayTitle")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-primary-fg/80",
						children: tx(lang, "ibLine")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-primary-fg/10 px-3 py-1",
								children: lang === "ar" ? cfg.nameAr : cfg.nameEn
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-primary-fg/10 px-3 py-1",
								children: lang === "ar" ? cfg.badgeAr : cfg.badgeEn
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-primary-fg/10 px-3 py-1",
								children: lang === "ar" ? cfg.cognitiveLevelAr : cfg.cognitiveLevelEn
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1.4fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: tx(lang, "featuredSkill")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
							className: "mt-2",
							aria: tx(lang, "featuredSkill"),
							ar: joinSpeak([skill.titleAr, skill.taglineAr]),
							en: joinSpeak([skill.titleEn, skill.taglineEn]),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
								ar: skill.titleAr,
								en: skill.titleEn,
								as: "h2",
								className: "font-display text-2xl font-semibold"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: skill.taglineAr,
							en: skill.taglineEn,
							as: "p",
							className: "mt-2 text-sm text-muted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-lg bg-paper p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
								title: tx(lang, "objective"),
								ar: joinSpeak([tx("ar", "objective"), objectiveAr]),
								en: joinSpeak([tx("en", "objective"), objectiveEn])
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
								ar: objectiveAr,
								en: objectiveEn,
								as: "p",
								className: "text-sm leading-relaxed"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
								title: tx(lang, "criteria"),
								ar: joinSpeak([tx("ar", "criteria"), ...criteriaAr]),
								en: joinSpeak([tx("en", "criteria"), ...criteriaEn])
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-1",
								children: criteriaAr.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-sm leading-relaxed text-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: c,
										en: criteriaEn[i] || c
									})
								}, i))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => openStudio(skill.id),
									children: [
										tx(lang, "startPractice"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { className: "size-4" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setTab("scenarios"),
									children: tx(lang, "caseOf")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => setTab("wheel"),
									children: tx(lang, "spin")
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex items-center justify-between gap-4 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
						value: score,
						max: next.target,
						label: lang === "ar" ? current.nameAr : current.nameEn,
						sub: `${tx(lang, "of")} ${next.target}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted",
								children: tx(lang, "nextMilestone")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-semibold",
								children: lang === "ar" ? next.nameAr : next.nameEn
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									tx(lang, "actionsDone"),
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular font-medium text-fg",
										children: todayActions
									})
								]
							})
						]
					})]
				})]
			}),
			champions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: tx(lang, "honorMetricsChampions")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => useApp.getState().setClassPanel(true),
						children: tx(lang, "viewHonor")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2 sm:grid-cols-3",
					children: champions.map((t, i) => {
						const medal = medalsFor(t.stars, t.mastered).at(-1);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => useApp.getState().setClassPanel(true),
							className: "rounded-lg bg-paper p-3 text-start",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tabular text-xs text-muted",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-medium",
									children: lang === "ar" ? t.student.nameAr : t.student.nameEn
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular mt-1 text-xs text-muted",
									children: [
										t.stars,
										" ★ · ",
										t.mastered,
										" ",
										tx(lang, "mastered")
									]
								}),
								medal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-crest",
									children: lang === "ar" ? medal.titleAr : medal.titleEn
								}) : null
							]
						}, t.student.id);
					})
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: IHSAN.streaks.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between gap-2 text-crest",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => useApp.getState().toggleStreak(item.id),
							className: "inline-flex min-w-0 flex-1 items-center gap-2 text-start text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 shrink-0" }), tx(lang, "streaks")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
							variant: "icon",
							ar: item.titleAr,
							en: item.titleEn,
							aria: item.titleAr
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "w-full text-start",
						onClick: () => useApp.getState().toggleStreak(item.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: item.titleAr,
							en: item.titleEn,
							className: "text-sm font-medium"
						})
					})]
				}, item.id))
			})
		]
	});
}
var Input = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("h-11 w-full rounded-md bg-card px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-muted focus-visible:outline-none", className),
	...props
}));
Input.displayName = "Input";
var KINDS = [
	"play",
	"practise",
	"partner",
	"group",
	"mission",
	"reflect",
	"mastery"
];
function SkillsView() {
	const lang = useApp((s) => s.lang);
	const grade = useApp((s) => s.grade);
	const openStudio = useApp((s) => s.openStudio);
	const completed = useApp((s) => s.completed);
	const [q, setQ] = (0, import_react.useState)("");
	const [value, setValue] = (0, import_react.useState)("all");
	const cfgNote = grade <= 3;
	const isJunior = grade <= 3;
	const list = (0, import_react.useMemo)(() => {
		return SKILLS.filter((s) => {
			const hay = `${s.titleAr} ${s.titleEn} ${s.taglineAr} ${s.taglineEn} ${s.jpisValue}`.toLowerCase();
			const matchQ = !q || hay.includes(q.toLowerCase());
			const matchV = value === "all" || s.jpisValue.toLowerCase().startsWith(value);
			return matchQ && matchV;
		});
	}, [q, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: lang === "ar" ? "المهارات العشر" : "Ten essential skills"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm text-muted",
					children: cfgNote ? lang === "ar" ? "نمط الصفوف الأولية: خطوات أقصر، قراءة جهرية، وخيارات أوضح." : "Junior mode: shorter steps, read-aloud, and clearer choices." : lang === "ar" ? "كل مهارة استوديو تفاعلي: لعب، تدريب، شريك، مهمة، تأمل، وإتقان." : "Each skill is a live studio: play, practise, partner, mission, reflect, mastery."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-3 start-3 size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "ps-9",
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: tx(lang, "search")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setValue("all"),
					className: `h-10 rounded-full px-3 text-xs font-medium ${value === "all" ? "bg-primary text-primary-fg" : "bg-crest/8 text-crest"}`,
					children: lang === "ar" ? "الكل" : "All"
				}), VALUES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setValue(v.id),
					className: `h-10 rounded-full px-3 text-xs font-medium ${value === v.id ? "bg-primary text-primary-fg" : "bg-crest/8 text-crest"}`,
					children: lang === "ar" ? v.nameAr : v.nameEn
				}, v.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: list.map((skill, idx) => {
					const done = KINDS.filter((k) => completed[`${todayISO()}:${skill.id}:${k}`]).length;
					const objectiveAr = isJunior ? skill.juniorObjectiveAr : skill.learningObjectiveAr;
					const objectiveEn = isJunior ? skill.juniorObjectiveEn : skill.learningObjectiveEn;
					const criteriaAr = isJunior ? skill.juniorCriteriaAr : skill.successCriteriaAr;
					const criteriaEn = isJunior ? skill.juniorCriteriaEn : skill.successCriteriaEn;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-card p-4 text-start shadow-[var(--shadow-border)] transition-[transform] duration-150 hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "min-w-0 flex-1 text-start",
								onClick: () => openStudio(skill.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular text-xs font-medium text-muted",
									children: String(idx + 1).padStart(2, "0")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: skill.titleAr,
									en: skill.titleEn,
									as: "h3",
									className: "font-display mt-1 text-lg font-semibold"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 flex-wrap items-center justify-end gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
										variant: "icon",
										aria: tx(lang, "listenObjective"),
										ar: joinSpeak([
											skill.titleAr,
											skill.taglineAr,
											tx("ar", "objective"),
											objectiveAr
										]),
										en: joinSpeak([
											skill.titleEn,
											skill.taglineEn,
											tx("en", "objective"),
											objectiveEn
										])
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
										variant: "icon",
										aria: tx(lang, "listenCriteria"),
										ar: joinSpeak([tx("ar", "criteria"), ...criteriaAr]),
										en: joinSpeak([tx("en", "criteria"), ...criteriaEn])
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: lang === "ar" ? skill.jpisValueAr : skill.jpisValue })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "mt-2 w-full text-start",
							onClick: () => openStudio(skill.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
								ar: skill.taglineAr,
								en: skill.taglineEn,
								as: "p",
								className: "text-sm text-muted"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex justify-between text-[11px] text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tx(lang, "progress") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular",
										children: [
											done,
											" ",
											tx(lang, "of"),
											" 7"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 overflow-hidden rounded-full bg-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-primary",
										style: { width: `${done / 7 * 100}%` }
									})
								})]
							})]
						})]
					}, skill.id);
				})
			})
		]
	});
}
function ValuesView() {
	const lang = useApp((s) => s.lang);
	const [active, setActive] = (0, import_react.useState)(VALUES[0].id);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const value = VALUES.find((v) => v.id === active) ?? VALUES[0];
	const options = lang === "ar" ? value.scenarioGame.optionsAr : value.scenarioGame.optionsEn;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: tx(lang, "valuesSuite")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-1 text-2xl font-semibold",
				children: tx(lang, "liveIt")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: VALUES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setActive(v.id);
						setPicked(null);
					},
					className: `h-11 shrink-0 rounded-full px-4 text-sm font-medium ${active === v.id ? "bg-primary text-primary-fg" : "bg-card text-fg shadow-[var(--shadow-border)]"}`,
					children: lang === "ar" ? v.nameAr : v.nameEn
				}, v.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
						ar: joinSpeak([value.nameAr, value.definitionAr]),
						en: joinSpeak([value.nameEn, value.definitionEn]),
						aria: tx(lang, "listenSection"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: value.nameAr,
							en: value.nameEn,
							as: "h3",
							className: "font-display text-2xl font-semibold"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: value.definitionAr,
						en: value.definitionEn,
						as: "p",
						className: "mt-3 text-sm leading-relaxed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-paper p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
								title: tx(lang, "hadith"),
								ar: joinSpeak([tx("ar", "hadith"), value.quranHadithAr]),
								en: joinSpeak([tx("en", "hadith"), value.quranHadithEn])
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
								ar: value.quranHadithAr,
								en: value.quranHadithEn,
								as: "p",
								className: "text-sm"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-paper p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
								title: tx(lang, "pyp"),
								ar: joinSpeak([tx("ar", "pyp"), value.pypLinkAr]),
								en: joinSpeak([tx("en", "pyp"), value.pypLinkEn])
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
								ar: value.pypLinkAr,
								en: value.pypLinkEn,
								as: "p",
								className: "text-sm"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
								ar: joinSpeak([
									value.scenarioGame.titleAr,
									value.scenarioGame.contextAr,
									...value.scenarioGame.optionsAr.map((o) => o.text)
								]),
								en: joinSpeak([
									value.scenarioGame.titleEn,
									value.scenarioGame.contextEn,
									...value.scenarioGame.optionsEn.map((o) => o.text)
								]),
								aria: tx(lang, "listenSection"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: value.scenarioGame.titleAr,
									en: value.scenarioGame.titleEn,
									as: "h4",
									className: "font-medium"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
								ar: value.scenarioGame.contextAr,
								en: value.scenarioGame.contextEn,
								as: "p",
								className: "mt-2 text-sm text-muted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid gap-2",
								children: options.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setPicked(i);
										if (opt.correct) {
											playSuccess();
											burstConfetti();
											useApp.getState().addScore(8);
											toast.success(tx(lang, "correct"));
										} else {
											playError();
											toast.message(tx(lang, "rethink"));
										}
									},
									className: `rounded-lg p-3 text-start text-sm shadow-[var(--shadow-border)] ${picked === i ? opt.correct ? "bg-ok/10" : "bg-danger/10" : "bg-paper"}`,
									children: opt.text
								}, i))
							}),
							picked !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: options[picked].feedback
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-paper p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
										title: tx(lang, "partner"),
										ar: joinSpeak([value.pairTask.titleAr, value.pairTask.instructionAr]),
										en: joinSpeak([value.pairTask.titleEn, value.pairTask.instructionEn])
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: value.pairTask.titleAr,
										en: value.pairTask.titleEn,
										className: "mt-1 text-sm font-medium"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: value.pairTask.instructionAr,
										en: value.pairTask.instructionEn,
										as: "p",
										className: "mt-1 text-xs text-muted"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-paper p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
										title: tx(lang, "group"),
										ar: joinSpeak([value.groupChallenge.titleAr, value.groupChallenge.instructionAr]),
										en: joinSpeak([value.groupChallenge.titleEn, value.groupChallenge.instructionEn])
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: value.groupChallenge.titleAr,
										en: value.groupChallenge.titleEn,
										className: "mt-1 text-sm font-medium"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: value.groupChallenge.instructionAr,
										en: value.groupChallenge.instructionEn,
										as: "p",
										className: "mt-1 text-xs text-muted"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-paper p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
										title: tx(lang, "mission"),
										ar: joinSpeak([value.realLifeMission.titleAr, value.realLifeMission.taskAr]),
										en: joinSpeak([value.realLifeMission.titleEn, value.realLifeMission.taskEn])
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: value.realLifeMission.titleAr,
										en: value.realLifeMission.titleEn,
										className: "mt-1 text-sm font-medium"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
										ar: value.realLifeMission.taskAr,
										en: value.realLifeMission.taskEn,
										as: "p",
										className: "mt-1 text-xs text-muted"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
							title: tx(lang, "reflect"),
							ar: joinSpeak(value.reflectionQuestionsAr),
							en: joinSpeak(value.reflectionQuestionsEn)
						}), (lang === "ar" ? value.reflectionQuestionsAr : value.reflectionQuestionsEn).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-sm text-muted",
							children: ["— ", q]
						}, q))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						variant: "secondary",
						onClick: () => {
							useApp.getState().addScore(5);
							toast.success(tx(lang, "awarded") + " +5");
						},
						children: tx(lang, "confirm")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "ms-2",
						children: tx(lang, "reflect")
					})
				]
			})
		]
	});
}
function SpiralView() {
	const lang = useApp((s) => s.lang);
	const grade = useApp((s) => s.grade);
	const [day, setDay] = (0, import_react.useState)(1);
	const [mode, setMode] = (0, import_react.useState)("days");
	const [warmup, setWarmup] = (0, import_react.useState)(0);
	const d = SPIRAL.find((x) => x.day === day) ?? SPIRAL[0];
	const w = WARMUPS[warmup];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: mode === "days" ? "default" : "outline",
				onClick: () => setMode("days"),
				children: tx(lang, "orientation")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: mode === "gen" ? "default" : "outline",
				onClick: () => setMode("gen"),
				children: tx(lang, "warmup")
			})]
		}), mode === "days" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto pb-1",
			children: SPIRAL.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setDay(item.day),
				className: `h-10 shrink-0 rounded-full px-3 text-xs font-medium ${day === item.day ? "bg-primary text-primary-fg" : "bg-card shadow-[var(--shadow-border)]"}`,
				children: [
					tx(lang, "day"),
					" ",
					item.day
				]
			}, item.day))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: itemWeek(d.week, lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
					className: "mt-1",
					aria: tx(lang, "listenSection"),
					ar: joinSpeak([d.titleAr, d.focusAr]),
					en: joinSpeak([d.titleEn, d.focusEn]),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: d.titleAr,
						en: d.titleEn,
						as: "h2",
						className: "font-display text-2xl font-semibold"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
					ar: d.focusAr,
					en: d.focusEn,
					as: "p",
					className: "mt-2 text-sm text-muted"
				}),
				d.quickWarmup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-lg bg-paper p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
							title: tx(lang, "warmup"),
							ar: joinSpeak([d.quickWarmup.titleAr, d.quickWarmup.promptAr]),
							en: joinSpeak([d.quickWarmup.titleEn, d.quickWarmup.promptEn])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: d.quickWarmup.titleAr,
							en: d.quickWarmup.titleEn,
							className: "text-sm font-medium"
						}),
						d.quickWarmup.promptAr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: d.quickWarmup.promptAr,
							en: d.quickWarmup.promptEn || "",
							as: "p",
							className: "mt-1 text-sm text-muted"
						}) : null
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: tx(lang, "newSkills"),
						ar: d.newSkillsAr,
						en: d.newSkillsEn
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: tx(lang, "review"),
						ar: d.spiralReviewAr,
						en: d.spiralReviewEn
					})]
				}),
				d.physicalRehearsalAr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
						title: tx(lang, "rehearsal"),
						ar: joinSpeak([tx("ar", "rehearsal"), d.physicalRehearsalAr]),
						en: joinSpeak([tx("en", "rehearsal"), d.physicalRehearsalEn])
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: d.physicalRehearsalAr,
						en: d.physicalRehearsalEn || "",
						as: "p",
						className: "text-sm"
					})]
				}) : null,
				grade <= 3 && d.juniorNoteAr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-lg bg-crest/8 p-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
						title: tx(lang, "juniorOn"),
						ar: d.juniorNoteAr,
						en: d.juniorNoteEn || ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: d.juniorNoteAr,
						en: d.juniorNoteEn || ""
					})]
				}) : null
			]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setWarmup(Math.floor(Math.random() * WARMUPS.length)),
					children: tx(lang, "rollWarmup")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: WARMUPS.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setWarmup(i),
						className: `rounded-xl p-4 text-start shadow-[var(--shadow-border)] ${i === warmup ? "bg-primary/10" : "bg-card"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: item.titleAr,
							en: item.titleEn,
							className: "font-medium"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: item.duration
						})]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
						ar: joinSpeak([w.titleAr, w.descAr]),
						en: joinSpeak([w.titleEn, w.descEn]),
						aria: tx(lang, "warmup"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: w.titleAr,
							en: w.titleEn,
							as: "h3",
							className: "font-display text-xl font-semibold"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: w.descAr,
						en: w.descEn,
						as: "p",
						className: "mt-2 text-sm leading-relaxed"
					})]
				})
			]
		})]
	});
}
function itemWeek(week, lang) {
	return week === 2 ? lang === "ar" ? "الأسبوع ٢" : "Week 2" : lang === "ar" ? "الأسبوع ١" : "Week 1";
}
function Block({ title, ar, en }) {
	if (!ar?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-paper p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
			title,
			ar: joinSpeak([title, ...ar]),
			en: joinSpeak([title, ...en || []])
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 space-y-1",
			children: ar.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
					ar: item,
					en: en?.[i] || item
				})
			}, item))
		})]
	});
}
function IhsanView() {
	const lang = useApp((s) => s.lang);
	const score = useApp((s) => s.score);
	const marks = useApp((s) => s.streakMarks);
	const { current, next } = currentStage(score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-4 rounded-xl bg-crest p-6 text-primary-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium opacity-80",
							children: tx(lang, "stages")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
							tone: "onDark",
							className: "mt-1",
							aria: tx(lang, "stages"),
							ar: joinSpeak([current.nameAr, current.descAr]),
							en: joinSpeak([current.nameEn, current.descEn]),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold",
								children: lang === "ar" ? current.nameAr : current.nameEn
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm text-primary-fg/80",
							children: lang === "ar" ? current.descAr : current.descEn
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
					value: score,
					max: next.target,
					label: tx(lang, "stars"),
					sub: `${tx(lang, "of")} ${next.target}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: IHSAN.stages.map((s) => {
					const reached = score >= s.minScore;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-xl p-4 shadow-[var(--shadow-border)] ${reached ? "bg-card" : "bg-paper"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
							ar: joinSpeak([s.nameAr, s.descAr]),
							en: joinSpeak([s.nameEn, s.descEn]),
							aria: s.nameAr,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: s.nameAr,
									en: s.nameEn,
									className: "font-medium"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular text-xs text-muted",
									children: [
										s.minScore,
										"–",
										s.maxScore
									]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: s.descAr,
							en: s.descEn,
							as: "p",
							className: "mt-1 text-sm text-muted"
						})]
					}, s.stage);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold",
				children: tx(lang, "streaks")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2 sm:grid-cols-3",
				children: IHSAN.streaks.items.map((item) => {
					const on = Boolean(marks[`${todayISO()}:${item.id}`]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `rounded-xl p-4 shadow-[var(--shadow-border)] ${on ? "bg-primary/10" : "bg-card"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "min-w-0 flex-1 text-start",
								onClick: () => useApp.getState().toggleStreak(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: item.titleAr,
									en: item.titleEn,
									className: "text-sm font-medium"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-muted",
									children: [
										item.targetDays,
										" ",
										lang === "ar" ? "أيام" : "days"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
								variant: "icon",
								ar: item.titleAr,
								en: item.titleEn,
								aria: item.titleAr
							})]
						})
					}, item.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold",
				children: tx(lang, "badges")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2 sm:grid-cols-2",
				children: IHSAN.badges.map((b, i) => {
					const unlocked = score >= [
						80,
						160,
						240,
						320,
						400,
						1e3
					][i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-xl p-4 ${unlocked ? "bg-card" : "bg-paper opacity-70"} shadow-[var(--shadow-border)]`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
							ar: joinSpeak([b.titleAr, b.descAr]),
							en: joinSpeak([b.titleEn, b.descEn]),
							aria: b.titleAr,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
								ar: b.titleAr,
								en: b.titleEn,
								className: "font-medium"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: b.descAr,
							en: b.descEn,
							as: "p",
							className: "mt-1 text-sm text-muted"
						})]
					}, b.id);
				})
			})] })
		]
	});
}
function ScenariosView() {
	const lang = useApp((s) => s.lang);
	const section = useApp((s) => s.section);
	const grade = useApp((s) => s.grade);
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const sc = SCENARIOS[idx];
	const options = (lang === "ar" ? sc.optionsAr : sc.optionsEn).slice(0, grade <= 3 ? 2 : 3);
	const hero = section === "girls" ? lang === "ar" ? [
		"سارة",
		"نورة",
		"لولوة",
		"ريم",
		"لين"
	][idx % 5] : [
		"Sarah",
		"Noura",
		"Lulwah",
		"Reem",
		"Leen"
	][idx % 5] : lang === "ar" ? sc.character : sc.characterEn;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: tx(lang, "caseOf")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold",
				children: lang === "ar" ? "ماذا يفعل بطلنا في هذا الموقف؟" : "What would our champion do?"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: SCENARIOS.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setIdx(i);
						setPicked(null);
					},
					className: `h-10 shrink-0 rounded-full px-3 text-xs font-medium ${i === idx ? "bg-primary text-primary-fg" : "bg-card shadow-[var(--shadow-border)]"}`,
					children: i + 1
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
							hero,
							" · ",
							idx + 1,
							" / ",
							SCENARIOS.length
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
							ar: joinSpeak([
								sc.titleAr,
								sc.contextAr,
								...sc.optionsAr.map((o) => o.text)
							]),
							en: joinSpeak([
								sc.titleEn,
								sc.contextEn,
								...sc.optionsEn.map((o) => o.text)
							])
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
						className: "mt-3",
						ar: sc.titleAr,
						en: sc.titleEn,
						aria: tx(lang, "listenSection"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: sc.titleAr,
							en: sc.titleEn,
							as: "h3",
							className: "font-display text-xl font-semibold"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed",
						children: adapt(lang === "ar" ? sc.contextAr : sc.contextEn, section)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-2",
						children: options.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setPicked(i);
								if (opt.correct) {
									playSuccess();
									burstConfetti();
									useApp.getState().addScore(10);
									toast.success(tx(lang, "correct") + " +10");
								} else {
									playError();
									toast.message(tx(lang, "rethink"));
								}
							},
							className: `rounded-lg p-3 text-start text-sm shadow-[var(--shadow-border)] ${picked === i ? opt.correct ? "bg-ok/10" : "bg-danger/10" : "bg-paper"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "me-2 inline-flex size-6 items-center justify-center rounded-md bg-card text-xs font-semibold",
								children: lang === "ar" ? [
									"أ",
									"ب",
									"ج"
								][i] : [
									"A",
									"B",
									"C"
								][i]
							}), adapt(opt.text, section)]
						}, i))
					}),
					picked !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-2 rounded-lg bg-paper p-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
								title: tx(lang, "hadith"),
								ar: joinSpeak([
									sc.optionsAr[picked]?.feedback,
									sc.hadithAnchorAr,
									sc.pypProfileAr
								]),
								en: joinSpeak([
									sc.optionsEn[picked]?.feedback,
									sc.hadithAnchorEn,
									sc.pypProfileEn
								])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: adapt(options[picked].feedback, section) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: lang === "ar" ? sc.hadithAnchorAr : sc.hadithAnchorEn
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-crest",
								children: [
									tx(lang, "pyp"),
									": ",
									lang === "ar" ? sc.pypProfileAr : sc.pypProfileEn
								]
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: idx === 0,
							onClick: () => {
								setIdx(idx - 1);
								setPicked(null);
							},
							children: tx(lang, "previous")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: idx === SCENARIOS.length - 1,
							onClick: () => {
								setIdx(idx + 1);
								setPicked(null);
							},
							children: tx(lang, "next")
						})]
					})
				]
			})
		]
	});
}
function WheelView() {
	const lang = useApp((s) => s.lang);
	const canvasRef = (0, import_react.useRef)(null);
	const [angle, setAngle] = (0, import_react.useState)(0);
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	const [winner, setWinner] = (0, import_react.useState)(null);
	const n = WHEEL.length;
	const arc = Math.PI * 2 / n;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const size = canvas.width;
		const r = size / 2 - 8;
		ctx.clearRect(0, 0, size, size);
		ctx.save();
		ctx.translate(size / 2, size / 2);
		ctx.rotate(angle);
		for (let i = 0; i < n; i++) {
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, r, i * arc, (i + 1) * arc);
			ctx.closePath();
			ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
			ctx.fill();
			ctx.save();
			ctx.rotate(i * arc + arc / 2);
			ctx.fillStyle = i % WHEEL_COLORS.length === 6 ? "#1A1814" : "#F4EFE4";
			ctx.font = "600 11px 'IBM Plex Sans Arabic', sans-serif";
			ctx.textAlign = "right";
			const label = lang === "ar" ? WHEEL[i].textAr : WHEEL[i].textEn;
			ctx.fillText(label.slice(0, 22), r - 12, 4);
			ctx.restore();
		}
		ctx.beginPath();
		ctx.arc(0, 0, 28, 0, Math.PI * 2);
		ctx.fillStyle = "#F4EFE4";
		ctx.fill();
		ctx.restore();
	}, [
		angle,
		lang,
		n,
		arc
	]);
	function spin() {
		if (spinning) return;
		setSpinning(true);
		setWinner(null);
		const extra = Math.PI * 8 + Math.random() * Math.PI * 4;
		const start = angle;
		const startTime = performance.now();
		const dur = 4200;
		function frame(now) {
			const t = Math.min(1, (now - startTime) / dur);
			const ease = 1 - Math.pow(1 - t, 3);
			const next = start + extra * ease;
			setAngle(next);
			if (t < 1) requestAnimationFrame(frame);
			else {
				const normalized = (next % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
				const pointer = (Math.PI * 1.5 - normalized + Math.PI * 2) % (Math.PI * 2);
				const i = Math.floor(pointer / arc) % n;
				setWinner(i);
				setSpinning(false);
				playTick();
			}
		}
		requestAnimationFrame(frame);
	}
	const item = winner !== null ? WHEEL[winner] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[auto_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute start-1/2 top-0 z-10 -translate-x-1/2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0 w-0 border-x-8 border-t-[14px] border-x-transparent border-t-crest" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					width: 360,
					height: 360,
					className: "size-[min(86vw,360px)]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: spin,
						disabled: spinning,
						size: "lg",
						children: spinning ? tx(lang, "spinning") : tx(lang, "spin")
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-muted",
					children: tx(lang, "challenge")
				}),
				item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
						className: "mt-2",
						aria: tx(lang, "challenge"),
						ar: joinSpeak([item.textAr, item.actionAr]),
						en: joinSpeak([item.textEn, item.actionEn]),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: item.textAr,
							en: item.textEn,
							as: "h3",
							className: "font-display text-2xl font-semibold"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
						ar: item.actionAr,
						en: item.actionEn,
						as: "p",
						className: "mt-3 text-sm leading-relaxed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						onClick: () => {
							useApp.getState().addScore(5);
							playSuccess();
							burstConfetti();
							toast.success(tx(lang, "awarded") + " +5");
						},
						children: tx(lang, "completeChallenge")
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: tx(lang, "ready")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 grid grid-cols-2 gap-2",
					children: WHEEL.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: `rounded-md px-2 py-1.5 text-xs ${winner === i ? "bg-primary/10 text-crest" : "text-muted"}`,
						children: lang === "ar" ? w.textAr : w.textEn
					}, i))
				})
			]
		})]
	});
}
function ToolkitView() {
	const lang = useApp((s) => s.lang);
	const grade = useApp((s) => s.grade);
	const section = useApp((s) => s.section);
	const voice = useApp((s) => s.voiceLevel);
	const setVoice = useApp((s) => s.setVoice);
	const ttsVoice = useApp((s) => s.ttsVoice);
	const setTtsVoice = useApp((s) => s.setTtsVoice);
	const squads = useApp((s) => s.squads);
	const checklist = useApp((s) => s.checklist);
	const classId = useApp((s) => s.classId);
	const roster = useApp((s) => s.rosters)[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER;
	const cfg = gradeConfig(grade);
	const base = Math.round(60 * cfg.timerScale);
	const [seconds, setSeconds] = (0, import_react.useState)(base);
	const [total, setTotal] = (0, import_react.useState)(base);
	const [run, setRun] = (0, import_react.useState)(false);
	const [picked, setPicked] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!run) return;
		const id = window.setInterval(() => {
			setSeconds((s) => {
				if (s <= 1) {
					setRun(false);
					playBell();
					return 0;
				}
				playTick();
				return s - 1;
			});
		}, 1e3);
		return () => window.clearInterval(id);
	}, [run]);
	const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
	const ss = String(seconds % 60).padStart(2, "0");
	const namesAr = section === "girls" ? girls_ar_default : boys_ar_default;
	const namesEn = section === "girls" ? girls_en_default : boys_en_default;
	const pool = roster.length ? roster.map((s) => lang === "ar" ? s.nameAr : s.nameEn) : lang === "ar" ? namesAr : namesEn;
	function drawName() {
		const name = pool[Math.floor(Math.random() * pool.length)];
		setPicked(name);
	}
	const voiceLabels = [
		tx(lang, "silence"),
		tx(lang, "whisper"),
		tx(lang, "table"),
		tx(lang, "speaker")
	];
	const caption = voiceCaption(lang, resolveTtsGender(section, ttsVoice));
	const narratorModes = [
		"auto",
		"male",
		"female"
	];
	const narratorLabel = {
		auto: tx(lang, "voiceAuto"),
		male: tx(lang, "voiceMale"),
		female: tx(lang, "voiceFemale")
	};
	const sampleAr = section === "girls" ? "السلام عليكن يا بطلات. نحن فارسات القيم، ونرتقي بالإحسان كل يوم في مدارس جدة الخاصة العالمية." : "السلام عليكم يا أبطال. نحن فرسان القيم، ونرتقي بالإحسان كل يوم في مدارس جدة الخاصة العالمية.";
	const sampleEn = section === "girls" ? "Peace be upon you, champions. We are Fursan Al-Qiyam, and we rise with Ihsan every day at Jeddah Private International School." : "Peace be upon you, champions. We are Fursan Al-Qiyam, and we rise with Ihsan every day at Jeddah Private International School.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold",
						children: tx(lang, "timer")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular mt-4 font-display text-5xl tracking-tight",
						children: [
							mm,
							":",
							ss
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => setRun(!run),
								children: run ? tx(lang, "pauseTimer") : tx(lang, "startTimer")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => {
									setRun(false);
									setSeconds(total);
								},
								children: tx(lang, "reset")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => {
									setSeconds((s) => s + 30);
									setTotal((t) => t + 30);
								},
								children: tx(lang, "add30")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => playBell(),
								children: tx(lang, "bell")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs font-medium text-muted",
						children: tx(lang, "presets")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [
							30,
							60,
							90,
							120
						].map((sec) => {
							const scaled = Math.round(sec * cfg.timerScale);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									setRun(false);
									setSeconds(scaled);
									setTotal(scaled);
								},
								children: [scaled, "s"]
							}, sec);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold",
							children: tx(lang, "voice")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
							variant: "icon",
							aria: tx(lang, "voice"),
							ar: joinSpeak([tx("ar", "voice"), ...VOICE_COPY.map((v) => v.ar)]),
							en: joinSpeak([tx("en", "voice"), ...VOICE_COPY.map((v) => v.en)])
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-4 gap-2",
						children: voiceLabels.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setVoice(i),
							className: `rounded-lg p-3 text-center text-xs font-medium ${voice === i ? "bg-primary text-primary-fg" : "bg-paper"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular block text-lg",
								children: i
							}), label]
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: VOICE_COPY[voice][lang]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold",
						children: tx(lang, "narrator")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: tx(lang, "narratorHint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-3 gap-2",
						children: narratorModes.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTtsVoice(mode),
							className: `rounded-lg p-3 text-center text-xs font-medium ${ttsVoice === mode ? "bg-primary text-primary-fg" : "bg-paper"}`,
							children: narratorLabel[mode]
						}, mode))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							caption.name,
							" · ",
							caption.locale
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenButton, {
							ar: sampleAr,
							en: sampleEn
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold",
						children: tx(lang, "squads")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => useApp.getState().resetSquads(),
						children: tx(lang, "reset")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: squads.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg bg-paper px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar: s.nameAr,
							en: s.nameEn,
							className: "text-sm font-medium"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "outline",
									className: "size-9",
									onClick: () => useApp.getState().changeSquad(s.id, -1),
									children: "−"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular w-6 text-center font-semibold",
									children: s.stars
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "outline",
									className: "size-9",
									onClick: () => useApp.getState().changeSquad(s.id, 1),
									children: "+"
								})
							]
						})]
					}, s.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold",
						children: tx(lang, "pickStudent")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-3xl font-semibold",
						children: picked || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						onClick: drawName,
						children: tx(lang, "pickStudent")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mt-6 text-sm font-medium",
						children: tx(lang, "checklist")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-2",
						children: CHECKLIST.map((item) => {
							const key = `${todayISO()}:${item.id}`;
							const on = Boolean(checklist[key]);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => useApp.getState().toggleCheck(item.id),
								className: `w-full rounded-lg px-3 py-2 text-start text-sm ${on ? "bg-ok/10" : "bg-paper"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
									ar: item.textAr,
									en: item.textEn
								})
							}) }, item.id);
						})
					})
				]
			})
		]
	});
}
function AgencyView() {
	const lang = useApp((s) => s.lang);
	const votes = useApp((s) => s.pollVotes);
	const [rating, setRating] = (0, import_react.useState)(0);
	const [goal, setGoal] = (0, import_react.useState)("");
	const [valueId, setValueId] = (0, import_react.useState)(VALUES[0].id);
	const total = votes.reduce((a, b) => a + b, 0);
	const pollTitleAr = "أي روتين ساعد فصلنا اليوم؟";
	const pollTitleEn = "Which routine helped our class today?";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
					title: tx(lang, "poll"),
					ar: joinSpeak([pollTitleAr, ...POLL_OPTIONS.ar]),
					en: joinSpeak([pollTitleEn, ...POLL_OPTIONS.en])
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
					ar: pollTitleAr,
					en: pollTitleEn,
					aria: tx(lang, "poll"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display mt-1 text-xl font-semibold",
						children: lang === "ar" ? pollTitleAr : pollTitleEn
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: POLL_OPTIONS[lang].map((opt, i) => {
						const pct = total ? Math.round(votes[i] / total * 100) : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => useApp.getState().castVote(i),
							className: "relative w-full overflow-hidden rounded-lg bg-paper p-3 text-start text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-y-0 start-0 bg-primary/12",
								style: { width: `${pct}%` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular text-xs text-muted",
									children: [
										pct,
										"% · ",
										votes[i]
									]
								})]
							})]
						}, opt);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "ghost",
					onClick: () => useApp.getState().resetPoll(),
					children: tx(lang, "resetPoll")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakHeading, {
					title: tx(lang, "checkout"),
					ar: joinSpeak([
						tx("ar", "rating"),
						tx("ar", "valueToday"),
						tx("ar", "goalTomorrow")
					]),
					en: joinSpeak([
						tx("en", "rating"),
						tx("en", "valueToday"),
						tx("en", "goalTomorrow")
					])
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-1 text-xl font-semibold",
					children: tx(lang, "rating")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-1",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setRating(n),
						className: `size-11 rounded-md text-lg ${n <= rating ? "bg-primary text-primary-fg" : "bg-paper"}`,
						children: n
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-sm font-medium",
					children: tx(lang, "valueToday")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "mt-1 h-11 w-full rounded-md bg-paper px-3 text-sm",
					value: valueId,
					onChange: (e) => setValueId(e.target.value),
					children: VALUES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: v.id,
						children: lang === "ar" ? v.nameAr : v.nameEn
					}, v.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-sm font-medium",
					children: tx(lang, "goalTomorrow")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-1",
					value: goal,
					onChange: (e) => setGoal(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: () => {
						if (!goal.trim()) {
							toast.message(tx(lang, "goalTomorrow"));
							return;
						}
						useApp.getState().markCheckout();
						playSuccess();
						burstConfetti();
						toast.success(tx(lang, "awarded") + " +10");
						setGoal("");
					},
					children: tx(lang, "submitTicket")
				})
			]
		})]
	});
}
function CharterView() {
	const lang = useApp((s) => s.lang);
	const grade = useApp((s) => s.grade);
	const section = useApp((s) => s.section);
	const cfg = gradeConfig(grade);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-print flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => window.print(),
				children: tx(lang, "printCharter")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, { className: "size-16 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: tx(lang, "school")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: tx(lang, "brand")
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted",
					children: [
						lang === "ar" ? cfg.nameAr : cfg.nameEn,
						" · ",
						section === "girls" ? tx(lang, "girls") : tx(lang, "boys")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithSpeak, {
					className: "mt-2",
					aria: tx(lang, "charterPledge"),
					ar: joinSpeak([tx("ar", "charterPledge"), ...CHARTER_POINTS.ar]),
					en: joinSpeak([tx("en", "charterPledge"), ...CHARTER_POINTS.en]),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-3xl font-semibold",
						children: tx(lang, "charterPledge")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 space-y-3",
					children: CHARTER_POINTS.ar.map((ar, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-crest",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
							ar,
							en: CHARTER_POINTS.en[i]
						})]
					}, ar))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-8 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: tx(lang, "signTeacher")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: tx(lang, "signAdmin")
					})] })]
				})
			]
		})]
	});
}
function CertificateCard({ student, skillId, stars, mastered, medal, actions }) {
	const lang = useApp((s) => s.lang);
	const section = useApp((s) => s.section);
	const grade = useApp((s) => s.grade);
	const classId = useApp((s) => s.classId);
	const cfg = gradeConfig(grade);
	const skill = SKILLS.find((s) => s.id === skillId);
	const body = section === "girls" ? tx(lang, "certBodyGirl") : tx(lang, "certBodyBoy");
	const reason = section === "girls" ? tx(lang, "certReasonGirl") : tx(lang, "certReasonBoy");
	const knight = section === "girls" ? tx(lang, "knightGirl") : tx(lang, "knightBoy");
	const name = lang === "ar" ? student.nameAr : student.nameEn;
	const medalLabel = medal ? lang === "ar" ? medal.ar : medal.en : tx(lang, "certMedal");
	const shown = Math.min(Math.max(stars, 1), 5);
	const date = (/* @__PURE__ */ new Date()).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "print-sheet w-full min-w-0 rounded-xl border-2 border-primary/40 bg-card p-5 sm:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-primary/25 p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 border-b border-border pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, { className: "size-16 shrink-0 sm:size-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-wide text-muted",
							children: tx(lang, "school")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: tx(lang, "certIb")
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold text-crest",
						children: date
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-center text-xs font-semibold tracking-wide text-crest",
					children: tx(lang, "certMedal")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-1 text-center text-2xl font-semibold",
					children: tx(lang, "certTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-sm leading-relaxed text-muted",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-xs text-muted",
					children: knight
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display mt-1 text-center text-3xl font-semibold",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-center text-xs text-muted",
					children: [
						lang === "ar" ? cfg.nameAr : cfg.nameEn,
						classId ? ` · ${classId}` : "",
						" · ",
						section === "girls" ? tx(lang, "girls") : tx(lang, "boys")
					]
				}),
				skill ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-sm",
					children: lang === "ar" ? skill.titleAr : skill.titleEn
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-sm leading-relaxed text-muted",
					children: reason
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-lg tracking-widest text-crest",
					children: "★".repeat(shown)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "tabular mt-1 text-center text-xs text-muted",
					children: [
						stars,
						" ",
						tx(lang, "stars"),
						" · ",
						mastered,
						" ",
						tx(lang, "mastered")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-sm font-medium text-crest",
					children: medalLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-6 text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] text-muted",
						children: tx(lang, "signTeacher")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] text-muted",
						children: tx(lang, "signAdmin")
					})] })]
				})
			]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "no-print mt-6 w-full",
			onClick: printCertificate,
			children: tx(lang, "printThisCert")
		}) : null]
	});
}
function ClassPanel() {
	const open = useApp((s) => s.classPanelOpen);
	const setOpen = useApp((s) => s.setClassPanel);
	const lang = useApp((s) => s.lang);
	const grade = useApp((s) => s.grade);
	const section = useApp((s) => s.section);
	const classId = useApp((s) => s.classId);
	const rosters = useApp((s) => s.rosters);
	const observations = useApp((s) => s.observations);
	const [name, setName] = (0, import_react.useState)("");
	const [studentId, setStudentId] = (0, import_react.useState)("");
	const [skillId, setSkillId] = (0, import_react.useState)(SKILLS[0].id);
	const [tab, setTab] = (0, import_react.useState)("honor");
	const [honorMode, setHonorMode] = (0, import_react.useState)("overall");
	const classes = CLASSES[String(grade)] || [];
	const roster = rosters[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER;
	const selected = roster.find((s) => s.id === studentId) ?? roster[0];
	const obsKey = selected ? `${makeRosterKey(grade, section, classId)}:${selected.id}:${skillId}` : "";
	const obs = obsKey && observations[obsKey] || EMPTY_OBS;
	const skill = SKILLS.find((s) => s.id === skillId) ?? SKILLS[0];
	const criteria = lang === "ar" ? skill.successCriteriaAr : skill.successCriteriaEn;
	const prefix = makeRosterKey(grade, section, classId) + ":";
	const totals = (0, import_react.useMemo)(() => {
		return roster.map((student) => {
			let stars = 0;
			let mastered = 0;
			let skillStars = 0;
			let skillMastered = false;
			for (const [key, item] of Object.entries(observations)) {
				if (!key.startsWith(prefix + student.id)) continue;
				stars += item.stars;
				if (isSkillMastered(item)) mastered += 1;
				if (key.endsWith(`:${skillId}`)) {
					skillStars = item.stars;
					skillMastered = isSkillMastered(item);
				}
			}
			return {
				student,
				stars,
				mastered,
				skillStars,
				skillMastered
			};
		}).sort((a, b) => honorMode === "skill" ? b.skillStars - a.skillStars || Number(b.skillMastered) - Number(a.skillMastered) : b.stars - a.stars || b.mastered - a.mastered);
	}, [
		roster,
		observations,
		prefix,
		skillId,
		honorMode
	]);
	const top = totals[0];
	const classStars = totals.reduce((n, t) => n + t.stars, 0);
	const classMastered = totals.reduce((n, t) => n + t.mastered, 0);
	const evaluated = totals.filter((t) => t.stars > 0 || t.mastered > 0).length;
	const csv = (0, import_react.useMemo)(() => {
		const rows = [[
			"name",
			"stars",
			"mastered"
		]];
		totals.forEach((t) => rows.push([
			lang === "ar" ? t.student.nameAr : t.student.nameEn,
			String(t.stars),
			String(t.mastered)
		]));
		return rows.map((r) => r.join(",")).join("\n");
	}, [totals, lang]);
	function grant(id, kind) {
		if (useApp.getState().sound) playSuccess();
		burstConfetti();
		useApp.getState().creditStudent(id, skillId, kind);
		setStudentId(id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			className: "fixed inset-y-0 end-0 z-50 flex w-[min(100vw,640px)] flex-col overflow-y-auto bg-card p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
						className: "font-display text-xl font-semibold",
						children: tx(lang, "honorRoll")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						className: "inline-flex size-10 items-center justify-center rounded-md hover:bg-crest/8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: tx(lang, "privacy")
				}),
				classes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "mt-3 h-11 rounded-md bg-paper px-3 text-sm",
					value: classId,
					onChange: (e) => useApp.getState().setClassId(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: tx(lang, "allClasses")
					}), classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c,
						children: c
					}, c))]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-1",
					children: [
						"honor",
						"observe",
						"cert"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(t),
						className: `h-10 flex-1 rounded-md text-xs font-medium ${tab === t ? "bg-primary text-primary-fg" : "bg-paper"}`,
						children: t === "observe" ? tx(lang, "rewards") : t === "honor" ? tx(lang, "honorRoll") : tx(lang, "certificate")
					}, t))
				}),
				tab === "observe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: tx(lang, "namePlaceholder")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => {
									if (!name.trim()) return;
									useApp.getState().addStudent(name.trim());
									setName("");
								},
								children: tx(lang, "addStudent")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => useApp.getState().fillRoster(),
							children: tx(lang, "randomRoster")
						}),
						roster.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: tx(lang, "emptyRoster")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted",
								children: tx(lang, "selectStudent")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-11 w-full rounded-md bg-paper px-3 text-sm",
								value: selected?.id,
								onChange: (e) => setStudentId(e.target.value),
								children: roster.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: lang === "ar" ? s.nameAr : s.nameEn
								}, s.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted",
								children: tx(lang, "selectSkill")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-11 w-full rounded-md bg-paper px-3 text-sm",
								value: skillId,
								onChange: (e) => setSkillId(e.target.value),
								children: SKILLS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: lang === "ar" ? s.titleAr : s.titleEn
								}, s.id))
							}),
							selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm",
									children: [
										tx(lang, "stars"),
										": ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular font-semibold",
											children: obs.stars
										}),
										obs.mastered ? ` · ${tx(lang, "mastered")}` : ""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-1",
									children: criteria.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: Boolean(obs.criteria[i]),
											onChange: (e) => {
												const next = [...obs.criteria];
												next[i] = e.target.checked;
												useApp.getState().saveObs(selected.id, skillId, { criteria: next });
											}
										}), c]
									}) }, c))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: obs.notes,
									onChange: (e) => useApp.getState().saveObs(selected.id, skillId, { notes: e.target.value }),
									placeholder: tx(lang, "notes")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											onClick: () => grant(selected.id, "star"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4" }),
												" ",
												tx(lang, "awardStar")
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "secondary",
											onClick: () => grant(selected.id, "mastery"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "size-4" }),
												" ",
												tx(lang, "awardMastery")
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											onClick: () => useApp.getState().resetStudentSkill(selected.id, skillId),
											children: tx(lang, "resetStars")
										})
									]
								})
							] }) : null
						] })
					]
				}) : null,
				tab === "honor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "honor-sheet mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: tx(lang, "evaluated"),
									value: `${evaluated} / ${totals.length || 0}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: tx(lang, "totalStarsAwarded"),
									value: classStars
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: tx(lang, "honorMetricsMastered"),
									value: classMastered
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: tx(lang, "topAchiever"),
									value: top && top.stars > 0 ? lang === "ar" ? top.student.nameAr : top.student.nameEn : "—"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setHonorMode("overall"),
								className: `h-10 flex-1 rounded-md text-xs font-medium ${honorMode === "overall" ? "bg-primary text-primary-fg" : "bg-paper"}`,
								children: tx(lang, "overallHonor")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setHonorMode("skill"),
								className: `h-10 flex-1 rounded-md text-xs font-medium ${honorMode === "skill" ? "bg-primary text-primary-fg" : "bg-paper"}`,
								children: tx(lang, "bySkill")
							})]
						}),
						honorMode === "skill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "h-11 w-full rounded-md bg-paper px-3 text-sm",
							value: skillId,
							onChange: (e) => setSkillId(e.target.value),
							children: SKILLS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.id,
								children: lang === "ar" ? s.titleAr : s.titleEn
							}, s.id))
						}) : null,
						totals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: tx(lang, "noChampionsYet")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: (() => {
								const podium = totals.filter((t) => (honorMode === "skill" ? t.skillStars : t.stars) > 0).slice(0, 3);
								return [
									podium[1],
									podium[0],
									podium[2]
								].map((t, i) => {
									const place = i === 1 ? 1 : i === 0 ? 2 : 3;
									if (!t) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, place);
									const medal = [
										"",
										"🥇",
										"🥈",
										"🥉"
									][place];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => useApp.getState().showCertificate(t.student.id, skillId),
										className: `rounded-xl p-3 text-center shadow-[var(--shadow-border)] ${place === 1 ? "bg-crest text-primary-fg" : "bg-paper"} ${place === 1 ? "mt-0" : "mt-4"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-base",
												children: medal
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 truncate text-sm font-semibold",
												children: lang === "ar" ? t.student.nameAr : t.student.nameEn
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "tabular mt-1 text-xs",
												children: [honorMode === "skill" ? t.skillStars : t.stars, " ★"]
											})
										]
									}, t.student.id);
								});
							})()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-xl bg-paper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[28rem] text-start text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2 text-center",
											children: tx(lang, "rank")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2",
											children: tx(lang, "selectStudent")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2 text-center",
											children: tx(lang, "stars")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2 text-center",
											children: tx(lang, "mastered")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2 text-center",
											children: tx(lang, "masteryTier")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-2 text-center",
											children: tx(lang, "certificate")
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: totals.map((t, i) => {
									const starsShown = honorMode === "skill" ? t.skillStars : t.stars;
									const tier = masteryTier(t.mastered, t.stars);
									const earned = medalsFor(t.stars, t.mastered);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-2 text-center tabular",
												children: t.stars > 0 && i === 0 ? "🥇" : t.stars > 0 && i === 1 ? "🥈" : t.stars > 0 && i === 2 ? "🥉" : i + 1
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium",
													children: lang === "ar" ? t.student.nameAr : t.student.nameEn
												}), earned.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-0.5 text-[10px] text-crest",
													children: earned.map((m) => lang === "ar" ? m.titleAr : m.titleEn).join(" · ")
												}) : null]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "tabular p-2 text-center font-semibold",
												children: starsShown
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "tabular p-2 text-center",
												children: [
													t.mastered,
													" / ",
													SKILLS.length
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-2 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-2 py-0.5 text-[10px] font-medium ${tier.tone === "ok" ? "bg-primary/15 text-crest" : tier.tone === "mid" ? "bg-paper text-fg" : "bg-card text-muted"}`,
													children: lang === "ar" ? tier.ar : tier.en
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-2 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "ghost",
													className: "no-print",
													onClick: () => useApp.getState().showCertificate(t.student.id, skillId),
													children: tx(lang, "certificate")
												})
											})
										]
									}, t.student.id);
								}) })]
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "no-print flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => {
										if (top && top.stars > 0) useApp.getState().showCertificate(top.student.id, skillId);
									},
									children: tx(lang, "printTopCert")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: printHonorReport,
									children: tx(lang, "printHonor")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => {
										const blob = new Blob([csv], { type: "text/csv" });
										const url = URL.createObjectURL(blob);
										const a = document.createElement("a");
										a.href = url;
										a.download = "honor-roll.csv";
										a.click();
										URL.revokeObjectURL(url);
									},
									children: tx(lang, "exportCsv")
								})
							]
						})
					]
				}) : null,
				tab === "cert" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4",
					children: [roster.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "h-11 w-full rounded-md bg-paper px-3 text-sm",
						value: selected?.id || "",
						onChange: (e) => setStudentId(e.target.value),
						children: roster.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: lang === "ar" ? s.nameAr : s.nameEn
						}, s.id))
					}) : null, !selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: tx(lang, "noChampionsYet")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificateCard, {
						student: selected,
						skillId: honorMode === "skill" ? skillId : void 0,
						stars: totals.find((t) => t.student.id === selected.id)?.stars || 0,
						mastered: totals.find((t) => t.student.id === selected.id)?.mastered || 0,
						actions: true
					})]
				}) : null
			]
		})] })
	});
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-paper p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 truncate text-sm font-semibold",
			children: value
		})]
	});
}
function WhoAchieved() {
	const pending = useApp((s) => s.pendingCredit);
	const lang = useApp((s) => s.lang);
	const grade = useApp((s) => s.grade);
	const section = useApp((s) => s.section);
	const classId = useApp((s) => s.classId);
	const roster = useApp((s) => s.rosters)[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER;
	const skill = SKILLS.find((s) => s.id === pending?.skillId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(pending),
		onOpenChange: (open) => !open && useApp.getState().clearPendingCredit(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: tx(lang, "whoAchieved") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: tx(lang, "whoAchievedHint")
			}),
			skill ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
				ar: skill.titleAr,
				en: skill.titleEn,
				as: "p",
				className: "mt-3 font-display text-lg font-semibold"
			}) : null,
			roster.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: tx(lang, "emptyRoster")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						useApp.getState().fillRoster();
					},
					children: tx(lang, "fillThenAward")
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid max-h-72 gap-2 overflow-y-auto",
				children: roster.map((student) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex h-12 w-full items-center rounded-lg bg-paper px-3 text-start text-sm font-medium hover:bg-crest/8",
					onClick: () => {
						if (!pending) return;
						if (useApp.getState().sound) playSuccess();
						burstConfetti();
						useApp.getState().creditStudent(student.id, pending.skillId, pending.kind, { closeStudio: true });
					},
					children: lang === "ar" ? student.nameAr : student.nameEn
				}) }, student.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				variant: "ghost",
				onClick: () => useApp.getState().clearPendingCredit(),
				children: tx(lang, "skipAward")
			})
		] })
	});
}
function RewardMoment() {
	const celebration = useApp((s) => s.celebration);
	const lang = useApp((s) => s.lang);
	const grade = useApp((s) => s.grade);
	const section = useApp((s) => s.section);
	const classId = useApp((s) => s.classId);
	const rosters = useApp((s) => s.rosters);
	const observations = useApp((s) => s.observations);
	const student = (rosters[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER).find((s) => s.id === celebration?.studentId);
	const skill = SKILLS.find((s) => s.id === celebration?.skillId);
	const prefix = makeRosterKey(grade, section, classId) + ":";
	let stars = 0;
	let mastered = 0;
	if (student) for (const [key, obs] of Object.entries(observations)) {
		if (!key.startsWith(prefix + student.id)) continue;
		stars += obs.stars;
		if (obs.mastered) mastered += 1;
	}
	const medals = medalsFor(stars, mastered);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(celebration && student),
		onOpenChange: (open) => !open && useApp.getState().clearCelebration(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			wide: true,
			className: "z-[70]",
			overlayClassName: "z-[70]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: tx(lang, "celebrateTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "mt-1",
					children: student ? lang === "ar" ? student.nameAr : student.nameEn : tx(lang, "honorRoll")
				}),
				skill ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dual, {
					ar: skill.titleAr,
					en: skill.titleEn,
					as: "p",
					className: "mt-1 text-sm text-muted"
				}) : null,
				celebration ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 rounded-lg bg-crest/8 px-3 py-2 text-sm font-medium text-crest",
					children: [
						tx(lang, "medalEarned"),
						": ",
						lang === "ar" ? celebration.medalAr : celebration.medalEn
					]
				}) : null,
				medals.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: medals.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-paper px-3 py-1 text-xs",
						children: lang === "ar" ? m.titleAr : m.titleEn
					}, m.id))
				}) : null,
				student ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificateCard, {
						student,
						skillId: celebration?.skillId,
						stars,
						mastered,
						medal: celebration ? {
							ar: celebration.medalAr,
							en: celebration.medalEn
						} : void 0,
						actions: true
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "no-print mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							useApp.getState().clearCelebration();
							useApp.getState().setClassPanel(true);
						},
						children: tx(lang, "viewHonor")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => useApp.getState().clearCelebration(),
						children: tx(lang, "close")
					})]
				})
			]
		})
	});
}
var ICONS = {
	today: Sparkles,
	skills: BookOpen,
	values: Flag,
	spiral: Compass,
	ihsan: Star,
	scenarios: Swords,
	wheel: LayoutGrid,
	toolkit: Timer,
	agency: Megaphone,
	charter: Users
};
function AppShell() {
	const lang = useApp((s) => s.lang);
	const dual = useApp((s) => s.dualLang);
	const section = useApp((s) => s.section);
	const grade = useApp((s) => s.grade);
	const classId = useApp((s) => s.classId);
	const tab = useApp((s) => s.tab);
	const role = useApp((s) => s.role);
	const score = useApp((s) => s.score);
	const sound = useApp((s) => s.sound);
	const focus = useApp((s) => s.focusMode);
	const cfg = gradeConfig(grade);
	const classes = CLASSES[String(grade)] || [];
	(0, import_react.useEffect)(() => {
		const result = useApp.persist.rehydrate();
		Promise.resolve(result).then(() => useApp.getState().ensureOfficialRoster());
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang;
		document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
	}, [lang]);
	(0, import_react.useEffect)(() => {
		const onFirst = () => resumeAudio();
		window.addEventListener("pointerdown", onFirst, { once: true });
		return () => window.removeEventListener("pointerdown", onFirst);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("min-h-screen", focus && "[&_.extra]:hidden"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfettiLayer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "no-print sticky top-0 z-30 border-b border-border bg-card/92 backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 bg-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, { className: "size-11 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-semibold leading-none",
									children: tx(lang, "brand")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 hidden truncate text-[11px] text-muted sm:block",
									children: tx(lang, "brandSub")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular inline-flex h-10 items-center rounded-md bg-crest/8 px-3 text-sm font-semibold text-crest",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "me-1.5 size-4" }), score]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "h-10 max-w-[10rem] rounded-md bg-paper px-2 text-xs",
										value: grade,
										onChange: (e) => useApp.getState().setGrade(Number(e.target.value)),
										"aria-label": tx(lang, "grade"),
										children: Array.from({ length: 12 }, (_, i) => i + 1).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: g,
											children: lang === "ar" ? gradeConfig(g).nameAr : gradeConfig(g).nameEn
										}, g))
									}),
									classes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "hidden h-10 rounded-md bg-paper px-2 text-xs sm:block",
										value: classId,
										onChange: (e) => useApp.getState().setClassId(e.target.value),
										children: classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c,
											children: c
										}, c))
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden rounded-md bg-paper p-0.5 sm:flex",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => useApp.getState().setSection("boys"),
											className: cn("h-9 rounded-[6px] px-3 text-xs font-medium", section === "boys" && "bg-card shadow-[var(--shadow-border)]"),
											children: tx(lang, "boys")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => useApp.getState().setSection("girls"),
											className: cn("h-9 rounded-[6px] px-3 text-xs font-medium", section === "girls" && "bg-card shadow-[var(--shadow-border)]"),
											children: tx(lang, "girls")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => useApp.getState().setLang(lang === "ar" ? "en" : "ar"),
										children: lang === "ar" ? "EN" : "عربي"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: dual ? "secondary" : "ghost",
										size: "sm",
										className: "hidden md:inline-flex",
										onClick: () => useApp.getState().toggleDual(),
										children: "AR/EN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "hidden md:inline-flex",
										onClick: () => useApp.getState().setSound(!sound),
										"aria-label": tx(lang, "soundOn"),
										children: sound ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										className: "hidden sm:inline-flex",
										onClick: () => useApp.getState().setClassPanel(true),
										children: tx(lang, "honorRoll")
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "extra mx-auto hidden max-w-6xl gap-1 overflow-x-auto px-3 pb-2 md:flex",
						children: TABS.map((id) => {
							const Icon = ICONS[id];
							const label = TAB_LABEL[id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => useApp.getState().setTab(id),
								className: cn("flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 text-xs font-medium", tab === id ? "bg-primary text-primary-fg" : "text-muted hover:bg-crest/8 hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), lang === "ar" ? label.shortAr : label.shortEn]
							}, id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-6 pb-24",
				children: [
					!focus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "extra mb-4 hidden text-xs text-muted md:block",
						children: [lang === "ar" ? cfg.pedagogicalFocusAr : cfg.pedagogicalFocusEn, role === "student" ? ` · ${tx(lang, "student")}` : ` · ${tx(lang, "teacher")}`]
					}) : null,
					tab === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayView, {}) : null,
					tab === "skills" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsView, {}) : null,
					tab === "values" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValuesView, {}) : null,
					tab === "spiral" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpiralView, {}) : null,
					tab === "ihsan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IhsanView, {}) : null,
					tab === "scenarios" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenariosView, {}) : null,
					tab === "wheel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WheelView, {}) : null,
					tab === "toolkit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolkitView, {}) : null,
					tab === "agency" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgencyView, {}) : null,
					tab === "charter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharterView, {}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "no-print extra fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-2 py-2 backdrop-blur md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-around",
					children: [[
						"today",
						"skills",
						"scenarios",
						"ihsan",
						"toolkit"
					].map((id) => {
						const Icon = ICONS[id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => useApp.getState().setTab(id),
							className: cn("flex min-w-12 flex-col items-center gap-0.5 text-[10px]", tab === id ? "text-primary" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), lang === "ar" ? TAB_LABEL[id].shortAr : TAB_LABEL[id].shortEn]
						}, id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => useApp.getState().setClassPanel(true),
						className: "flex min-w-12 flex-col items-center gap-0.5 text-[10px] text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), tx(lang, "more")]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillStudio, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhoAchieved, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardMoment, {})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
