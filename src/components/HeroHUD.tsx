import { useEffect, useState } from 'react';
import { Radio, Cpu } from 'lucide-react';

export function HeroHUD() {
  const [fps, setFps] = useState(60);
  const [timeStr, setTimeStr] = useState('');
  const [gyro, setGyro] = useState({ pitch: 12.4, roll: -3.8, yaw: 184.2 });
  const [moisture, setMoisture] = useState(78.2);

  // Live FPS and dynamic telemetry update
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const updateFrame = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;

        // Subtle realistic telemetry micro-jitter
        setMoisture(+(78 + (Math.random() * 0.8 - 0.4)).toFixed(1));
        setGyro(prev => ({
          pitch: +(prev.pitch + (Math.random() * 0.4 - 0.2)).toFixed(1),
          roll: +(prev.roll + (Math.random() * 0.4 - 0.2)).toFixed(1),
          yaw: +(prev.yaw + (Math.random() * 0.6 - 0.3)).toFixed(1),
        }));
      }

      const d = new Date();
      const ms = String(d.getMilliseconds()).padStart(3, '0').slice(0, 2);
      setTimeStr(`${d.toTimeString().split(' ')[0]}.${ms}`);

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 md:p-8 select-none overflow-hidden">
      {/* SCANLINE & GRAIN OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      {/* TOP HUD BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand Stamp & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-void-card/85 backdrop-blur-md border border-steel-border/60 rounded text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-cyan font-bold tracking-wider">SYSTEM: UNTETHERED</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-void-card/85 backdrop-blur-md border border-steel-border/60 rounded text-xs font-mono">
            <span className="text-timber font-bold">SOIL_MOISTURE:</span>
            <span className="text-steel-light font-semibold">{moisture}%</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-void-card/85 backdrop-blur-md border border-steel-border/60 rounded text-xs font-mono">
            <span className="text-amber font-bold">FIRMWARE:</span>
            <span className="text-steel-light">V2.4_DIRTY</span>
          </div>
        </div>

        {/* Telemetry Clock & FPS Diagnostics */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-void-card/85 backdrop-blur-md border border-steel-border/60 rounded text-xs font-mono text-steel">
            <Radio className="w-3.5 h-3.5 text-cyan animate-pulse" />
            <span className="text-steel-light tracking-widest">{timeStr}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-void-card/85 backdrop-blur-md border border-steel-border/60 rounded text-xs font-mono">
            <span className="text-steel/70">FPS:</span>
            <span className={`font-bold ${fps > 50 ? 'text-emerald-400' : 'text-amber'}`}>{fps}</span>
          </div>
        </div>
      </div>

      {/* CENTER HUD RETICLES (Industrial Tech Chamfers) */}
      <div className="relative flex items-center justify-center pointer-events-none">
        {/* Corner Reticles */}
        <div className="absolute -top-32 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan/30" />
        <div className="absolute -top-32 -right-4 w-8 h-8 border-t-2 border-r-2 border-cyan/30" />
        <div className="absolute -bottom-32 -left-4 w-8 h-8 border-b-2 border-l-2 border-cyan/30" />
        <div className="absolute -bottom-32 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan/30" />

        {/* Floating Telemetry Coordinates */}
        <div className="hidden lg:flex absolute left-4 flex-col gap-2 font-mono text-[11px] text-steel/60 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-cyan">// GYRO_ROT:</span>
            <span className="text-steel-light">P:{gyro.pitch}° R:{gyro.roll}° Y:{gyro.yaw}°</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber">// TORQUE_IDX:</span>
            <span className="text-steel-light">48.2 Nm (HYBRID_MODE)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-timber">// CHASSIS_SLURRY:</span>
            <span className="text-steel-light">CLAY_SHORE_85</span>
          </div>
        </div>
      </div>

      {/* BOTTOM HUD STRIP */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        {/* Hardware Architecture Chip */}
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-mono tracking-widest text-amber uppercase font-semibold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            BACKYARD HARDWARE MANIFEST
          </div>
          <div className="text-xs font-mono text-steel/80 bg-void-card/70 px-2.5 py-1 rounded border border-steel-border/40 backdrop-blur-sm">
            FUSED: CNC_BIRCH_SPINE // PETG_GEARS // ESP32_S3_EDGE
          </div>
        </div>

        {/* Live Status Crosshairs */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-steel/70">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan shadow-glow-cyan" />
          <span>ZERO-G GRAVITATIONAL BUS: NOMINAL</span>
        </div>
      </div>
    </div>
  );
}
