import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tts-BXIzZrqA.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var MAX_CHARS = 4e3;
var CACHE_LIMIT = 80;
var VOICE_ID = {
	male: {
		ar: "leo",
		en: "rex"
	},
	female: {
		ar: "luna",
		en: "eve"
	}
};
var cache = /* @__PURE__ */ new Map();
function cacheGet(key) {
	const hit = cache.get(key);
	if (!hit) return null;
	cache.delete(key);
	cache.set(key, hit);
	return hit;
}
function cacheSet(key, value) {
	if (cache.has(key)) cache.delete(key);
	cache.set(key, value);
	while (cache.size > CACHE_LIMIT) {
		const oldest = cache.keys().next().value;
		if (oldest === void 0) break;
		cache.delete(oldest);
	}
}
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
async function callXaiTts(opts) {
	const res = await fetch("https://api.x.ai/v1/tts", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${opts.apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			text: opts.text,
			voice_id: VOICE_ID[opts.voice][opts.lang],
			language: opts.lang === "ar" ? "ar-SA" : "en",
			speed: opts.lang === "ar" ? .92 : .96,
			text_normalization: true,
			output_format: {
				codec: "mp3",
				sample_rate: 24e3,
				bit_rate: 128e3
			}
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `tts ${res.status}`
	};
	const buf = Buffer.from(await res.arrayBuffer());
	if (buf.length < 64) return {
		ok: false,
		error: "tts empty"
	};
	return {
		ok: true,
		audio: buf.toString("base64"),
		mime: "audio/mpeg"
	};
}
var synthesizeSpeech_createServerFn_handler = createServerRpc({
	id: "daef94b3928363e7cc8c18cfd62b2ecf03ea36ddb53468b4a634d0117c53daa3",
	name: "synthesizeSpeech",
	filename: "src/lib/tts.ts"
}, (opts) => synthesizeSpeech.__executeServer(opts));
var synthesizeSpeech = createServerFn({ method: "POST" }).validator(parseInput).handler(synthesizeSpeech_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "unavailable"
	};
	const key = `${data.voice}:${data.lang}:${data.text}`;
	const cached = cacheGet(key);
	if (cached) return {
		ok: true,
		...cached
	};
	let result = await callXaiTts({
		...data,
		apiKey
	});
	if (!result.ok) {
		await new Promise((r) => setTimeout(r, 400));
		result = await callXaiTts({
			...data,
			apiKey
		});
	}
	if (result.ok) cacheSet(key, {
		audio: result.audio,
		mime: result.mime
	});
	return result;
});
//#endregion
export { synthesizeSpeech_createServerFn_handler };
