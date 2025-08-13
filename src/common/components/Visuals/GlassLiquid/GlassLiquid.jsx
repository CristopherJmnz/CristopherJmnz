import { useEffect, useRef } from 'react';
import './GlassLiquid.css';

export default function GlassLiquid({
  opacity = 0.32,
  speed = 0.12,
  colorA = [0.1, 0.1, 0.11], // gris muy oscuro
  colorB = [0.26, 0.26, 0.29], // gris oscuro
  grain = 0.7,
  dprMax = 1.5, // limitar resolución para estabilidad de FPS
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const timeRef = useRef(0);
  const lastTsRef = useRef(0);
  const locationsRef = useRef({});

  // Resize handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, dprMax);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      const gl = glRef.current;
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    window.addEventListener('resize', resize);
    resize();
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [dprMax]);

  // WebGL setup + animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: true });
    if (!gl) return; // gracefully no-op if WebGL unsupported

    glRef.current = gl;

    const onLost = (e) => {
      e.preventDefault();
    };
    const onRestored = () => {
      /* handled by remount */
    };
    canvas.addEventListener('webglcontextlost', onLost, false);
    canvas.addEventListener('webglcontextrestored', onRestored, false);

    const vert = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main(){
        v_uv = (a_pos + 1.0) * 0.5; // from clip to uv
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // Adapted fbm + specular highlight; produces a liquid-like glass motion
    const frag = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec3 u_colorA;
      uniform vec3 u_colorB;
      uniform float u_opacity;
      uniform float u_grain;

      // Hash and noise from IQ
      float hash(vec2 p){
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        mat2 m = mat2(1.6,1.2,-1.2,1.6);
        for(int i=0;i<4;i++){
          v += a*noise(p);
          p = m*p;
          a *= 0.5;
        }
        return v;
      }

      void main(){
        // Normalized coordinates centered
        vec2 uv = v_uv;
        vec2 p = (uv - 0.5) * vec2(u_res.x/u_res.y, 1.0);

        // Animated domain warp for liquid motion
        float t = u_time * 0.12;
        float n1 = fbm(p * 2.5 + t);
        float n2 = fbm(p * 4.0 - t*0.7);
        float n = mix(n1, n2, 0.5);

        // Caustic-like highlights via gradient magnitude approximation
        float e = 0.002 * (u_res.y/800.0);
        float nx = fbm(p + vec2(e,0.0) + t) - fbm(p - vec2(e,0.0) + t);
        float ny = fbm(p + vec2(0.0,e) + t) - fbm(p - vec2(0.0,e) + t);
        float grad = sqrt(nx*nx + ny*ny);

        // Base color blend
        vec3 base = mix(u_colorA, u_colorB, smoothstep(0.2, 0.8, n));

  // Specular highlight (neutral)
  float highlight = pow(grad * 2.2, 1.2);
  vec3 spec = vec3(1.0) * highlight * 0.85;

        // Subtle vignette to aid contrast
        float vign = smoothstep(0.9, 0.3, length(p));

        // Grain
        float g = (hash(uv * (u_res.xy + 13.0)) - 0.5) * 0.02 * u_grain;

        vec3 col = base + spec + g;
        col = mix(col, col * vign, 0.25);

        gl_FragColor = vec4(col, u_opacity);
      }
    `;

    const compile = (type, source) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('GL shader error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, vert);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('GL link error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    programRef.current = prog;

    // Fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const locs = {
      u_res: gl.getUniformLocation(prog, 'u_res'),
      u_time: gl.getUniformLocation(prog, 'u_time'),
      u_colorA: gl.getUniformLocation(prog, 'u_colorA'),
      u_colorB: gl.getUniformLocation(prog, 'u_colorB'),
      u_opacity: gl.getUniformLocation(prog, 'u_opacity'),
      u_grain: gl.getUniformLocation(prog, 'u_grain'),
    };
    locationsRef.current = locs;

    const render = (ts) => {
      // Use rAF timestamp delta for stable speed; clamp to avoid big jumps on tab switch
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) * 0.001, 0.05); // max 50ms step
      timeRef.current += dt * speed;
      lastTsRef.current = ts;
      const { width, height } = canvas;
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(programRef.current);
      gl.uniform2f(locs.u_res, width, height);
      gl.uniform1f(locs.u_time, timeRef.current);
      gl.uniform3f(locs.u_colorA, colorA[0], colorA[1], colorA[2]);
      gl.uniform3f(locs.u_colorB, colorB[0], colorB[1], colorB[2]);
      gl.uniform1f(locs.u_opacity, opacity);
      gl.uniform1f(locs.u_grain, grain);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      try {
        gl.deleteProgram(programRef.current);
      } catch {
        void 0; // ignore cleanup error
      }
      try {
        gl.disableVertexAttribArray(aPos);
      } catch {
        void 0;
      }
      try {
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      } catch {
        void 0;
      }
      try {
        gl.deleteBuffer(buf);
      } catch {
        void 0;
      }
      try {
        gl.detachShader(prog, vs);
        gl.detachShader(prog, fs);
      } catch {
        void 0;
      }
      try {
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      } catch {
        void 0;
      }
      try {
        gl.useProgram(null);
      } catch {
        void 0;
      }
      try {
        canvas.removeEventListener('webglcontextlost', onLost);
        canvas.removeEventListener('webglcontextrestored', onRestored);
      } catch {
        void 0;
      }
      lastTsRef.current = 0;
      programRef.current = null;
      glRef.current = null;
    };
  }, [opacity, speed, colorA, colorB, grain, dprMax]);

  return <canvas ref={canvasRef} className="glass-liquid-canvas" />;
}
