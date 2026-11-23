'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Aurora-style animated wallpaper, drawn live with a small WebGL shader (no libraries, no video file).
 *
 * - Decorative only: aria-hidden, never blocks clicks, content above it is always visible.
 * - Without JavaScript or WebGL, a static CSS glow is shown instead.
 * - prefers-reduced-motion or data-saver: one still frame, no animation.
 * - Pauses when scrolled out of view or when the tab is hidden; renders at low
 *   resolution and ~30 fps to stay light on phones.
 */

// Voice-site palette (RGB 0–1): sky blue at the horizon (#4AA8FF) → brand blue (#4C8DFF) → deep blue (#2563EB).
const COLOR_BASE = [74 / 255, 168 / 255, 1.0];
const COLOR_MID = [76 / 255, 141 / 255, 1.0];
const COLOR_TOP = [37 / 255, 99 / 255, 235 / 255];
const BACKGROUND = [2 / 255, 4 / 255, 9 / 255]; // #020409

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform float uShift;
uniform vec3 uBase;
uniform vec3 uMid;
uniform vec3 uTop;
uniform vec3 uBg;

float hash(vec2 p) {
  p = fract(p * 0.3183099 + vec2(0.71, 0.113));
  p *= 17.0;
  return fract(p.x * p.y * (p.x + p.y));
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  float x = (uv.x - 0.5 - uShift) * aspect;
  float y = uv.y;
  float t = uTime;

  // Slow sideways sway of the whole curtain
  float sway = fbm(vec2(x * 0.5 + t * 0.02, t * 0.04)) - 0.5;
  float xs = x + sway * 0.8;

  // Height profile: an arch that is low in the middle and rises towards the sides
  float side = smoothstep(0.0, 1.0, abs(xs));
  float height = 0.30 + 0.45 * side + 0.25 * (fbm(vec2(xs * 1.1, t * 0.035)) - 0.5);
  height = max(height, 0.1);

  // Flame-like tendrils: bend the light sideways more the higher it rises
  float above = y - 0.015;
  float warp = fbm(vec2(xs * 1.8, y * 1.6 - t * 0.12)) - 0.5;
  float xf = xs + warp * 0.45 * max(above, 0.0);

  // Vertical light rays drifting upward
  float rays = fbm(vec2(xf * 6.5, y * 1.0 - t * 0.1));
  rays = smoothstep(0.32, 0.8, rays) * 1.8 + 0.08;

  // Bright at the horizon, fading upward
  float rise = exp(-max(above, 0.0) / height * 1.7);
  float horizon = smoothstep(-0.01, 0.04, above);
  float glow = 0.18 * exp(-max(above, 0.0) * 18.0); // soft bright band along the horizon
  float intensity = (rise * rays + glow) * horizon;

  // Keep the very edges quieter
  intensity *= 1.0 - smoothstep(0.9, 1.6, abs(x) / max(aspect, 1.0) * 1.6);

  // Colour shifts from teal to cyan to blue as the light rises
  float k = clamp(above / height, 0.0, 1.0);
  vec3 col = mix(uBase, uMid, smoothstep(0.0, 0.45, k));
  col = mix(col, uTop, smoothstep(0.35, 1.0, k));

  // Soft highlight roll-off instead of hard clipping
  vec3 c = uBg + (1.0 - exp(-col * intensity * 1.3));

  // Tiny dither so the gradients don't band
  c += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;
  gl_FragColor = vec4(c, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    });
    if (!gl || gl.isContextLost()) return; // CSS fallback stays visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One triangle that covers the whole canvas
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uShift = gl.getUniformLocation(program, 'uShift');
    gl.uniform3fv(gl.getUniformLocation(program, 'uBase'), COLOR_BASE);
    gl.uniform3fv(gl.getUniformLocation(program, 'uMid'), COLOR_MID);
    gl.uniform3fv(gl.getUniformLocation(program, 'uTop'), COLOR_TOP);
    gl.uniform3fv(gl.getUniformLocation(program, 'uBg'), BACKGROUND);

    // Aurora is soft, so a low internal resolution (upscaled by CSS) looks the same and costs far less.
    const MAX_INTERNAL_WIDTH = 800;
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      const scale = Math.min(1, MAX_INTERNAL_WIDTH / w);
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      // On wide screens, move the aurora right, behind the empty side of the hero.
      gl.uniform1f(uShift, w >= 1024 ? 0.18 : 0);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    const isStill = () => motionQuery.matches || saveData;

    const START_TIME = 42; // a pleasant still frame for reduced motion
    let elapsed = START_TIME;
    let last = 0;
    let raf = 0;
    let visible = true;
    let ready = false;

    const draw = () => {
      gl.uniform1f(uTime, elapsed % 3600);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!ready) {
        ready = true;
        canvas.dataset.ready = 'true';
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (last === 0) last = now;
      const dt = now - last;
      if (dt < 1000 / 30) return; // ~30 fps is plenty for slow motion
      last = now;
      elapsed += Math.min(dt, 100) / 1000;
      draw();
    };

    const start = () => {
      if (raf || isStill() || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const refresh = () => {
      stop();
      draw();
      start();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(container);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(container);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    motionQuery.addEventListener('change', refresh);

    // If the browser drops the GPU context (low memory, driver reset), fall back to the static glow.
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
      delete canvas.dataset.ready;
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    resize();
    draw();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      motionQuery.removeEventListener('change', refresh);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      // Free GPU resources but keep the context itself: React may mount this component
      // again on the same canvas, and a deliberately lost context can't be revived.
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden bg-ink', className)}
    >
      {/* Static glow shown before the canvas draws, or when JavaScript/WebGL is unavailable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 68% 100%, rgba(76,141,255,0.24), transparent 70%),' +
            'radial-gradient(35% 55% at 92% 100%, rgba(37,99,235,0.2), transparent 70%),' +
            'radial-gradient(30% 40% at 45% 100%, rgba(74,168,255,0.14), transparent 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 data-[ready=true]:opacity-100"
      />
    </div>
  );
}
