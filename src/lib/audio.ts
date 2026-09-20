let ctx: AudioContext | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor({ latencyHint: "interactive" });
  }
  return ctx;
}

export function resumeAudio() {
  const c = audio();
  if (c?.state === "suspended") void c.resume();
}

export function playTone(
  freq: number,
  type: OscillatorType = "sine",
  duration = 0.12,
  gain = 0.08,
) {
  const c = audio();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = Math.max(0.001, gain);
  osc.connect(g);
  g.connect(c.destination);
  osc.start();
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.stop(c.currentTime + duration + 0.02);
}

export function playSuccess() {
  [523, 659, 784].forEach((f, i) => {
    setTimeout(() => playTone(f, "triangle", 0.16, 0.07), i * 90);
  });
}

export function playError() {
  playTone(220, "sawtooth", 0.18, 0.05);
}

/** Peg click as the wheel passes a slice. `speed` 1 = fast, 0 = almost stopped. */
export function playTick(speed = 1) {
  const s = Math.max(0, Math.min(1, speed));
  playTone(580 + s * 460 + Math.random() * 90, "square", 0.022 + s * 0.018, 0.028 + s * 0.055);
  playTone(160 + s * 50, "triangle", 0.045, 0.018 + s * 0.02);
}

export function playBell() {
  [784, 988, 1174].forEach((f, i) => {
    setTimeout(() => playTone(f, "sine", 0.4, 0.06), i * 120);
  });
}

let noiseBuf: AudioBuffer | null = null;
let whoosh: { source: AudioBufferSourceNode; filter: BiquadFilterNode; gain: GainNode } | null = null;

function noiseBuffer(c: AudioContext) {
  if (noiseBuf && noiseBuf.sampleRate === c.sampleRate) return noiseBuf;
  const len = c.sampleRate;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
  noiseBuf = buf;
  return buf;
}

export function startWheelWhoosh() {
  resumeAudio();
  const c = audio();
  if (!c) return;
  stopWheelWhoosh();
  const source = c.createBufferSource();
  source.buffer = noiseBuffer(c);
  source.loop = true;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1100;
  filter.Q.value = 0.65;
  const g = c.createGain();
  g.gain.value = 0.001;
  source.connect(filter);
  filter.connect(g);
  g.connect(c.destination);
  source.start();
  g.gain.setTargetAtTime(0.045, c.currentTime, 0.04);
  whoosh = { source, filter, gain: g };
}

export function setWheelWhooshSpeed(speed: number) {
  if (!whoosh || !ctx) return;
  const s = Math.max(0, Math.min(1, speed));
  const t = ctx.currentTime;
  whoosh.filter.frequency.setTargetAtTime(380 + s * 980, t, 0.06);
  whoosh.gain.gain.setTargetAtTime(0.01 + s * 0.05, t, 0.06);
}

export function stopWheelWhoosh() {
  if (!whoosh || !ctx) return;
  const node = whoosh;
  whoosh = null;
  try {
    node.gain.gain.setTargetAtTime(0.001, ctx.currentTime, 0.04);
    node.source.stop(ctx.currentTime + 0.18);
  } catch {
    /* already stopped */
  }
}
