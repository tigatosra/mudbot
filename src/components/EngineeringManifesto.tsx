import { Hammer, Trees, Zap, HardHat, AlertTriangle } from 'lucide-react';

export function EngineeringManifesto() {
  const DOCTRINES = [
    {
      number: '01',
      title: 'CLEAN ROOMS BREED FRAGILE MACHINES',
      icon: HardHat,
      color: 'amber',
      text: 'Robots engineered in climate-controlled white rooms with polished epoxy floors look pristine in tech demos. But drop them into wet loamy mud, pine needles, or freezing rain, and their exposed bearings seize within four minutes. We design directly in the dirt.',
    },
    {
      number: '02',
      title: 'THE CELLULAR TIMBER REVOLUTION',
      icon: Trees,
      color: 'timber',
      text: 'Wood is not antique; it is nature’s 300-million-year-old high-performance cellular composite. Birch and walnut naturally absorb high-frequency motor harmonics that blind IMU sensors and disperse point impacts that would shatter brittle carbon fiber.',
    },
    {
      number: '03',
      title: 'SACRIFICIAL PRINTED FUSES',
      icon: Hammer,
      color: 'cyan',
      text: 'When a 50-pound rover wedges between two submerged limestone rocks at peak brushless torque, something will break. We make sure that something is a $0.35 PETG shear pin that can be reprinted in 18 minutes on a backyard 3D printer.',
    },
    {
      number: '04',
      title: 'OFFLINE SILICON SOVEREIGNTY',
      icon: Zap,
      color: 'amber',
      text: 'If your robot requires an active broadband cloud connection to identify a boulder or calculate a turn, you haven’t built an autonomous machine; you have built a remote-controlled appliance. Our edge networks run entirely offline at sub-watt efficiency.',
    },
  ];

  return (
    <section id="manifesto" className="relative py-24 px-4 sm:px-6 lg:px-12 bg-void border-b border-steel-border/30 overflow-hidden">
      {/* Background Mud Viscous Textures */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-mud/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-timber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* BANNER STAMP */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mud/30 border border-timber/30 text-xs font-mono text-timber mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-amber" />
            <span>THE DIRT DOCTRINE // OFFICIAL PROTOCOL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-steel-light tracking-tight uppercase">
            BUILT FOR A <span className="text-amber">DIRTY FUTURE</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-steel/80 leading-relaxed font-sans">
            The future of robotics will not unfold in sterile research labs. It will happen in rain-soaked backyards, vegetable patches, rough quarries, and off-grid homesteads.
          </p>
        </div>

        {/* 4 CORE DOCTRINE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DOCTRINES.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={idx}
                className="relative group p-8 rounded-2xl bg-void-card/80 border border-steel-border/70 hover:border-amber/60 backdrop-blur-md transition-all duration-300 shadow-lg"
              >
                {/* Large Background Watermark Number */}
                <div className="absolute top-4 right-6 text-6xl font-display font-bold text-steel/5 select-none pointer-events-none">
                  {doc.number}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-void-deep border ${
                    doc.color === 'amber'
                      ? 'border-amber/40 text-amber'
                      : doc.color === 'cyan'
                      ? 'border-cyan/40 text-cyan'
                      : 'border-timber/40 text-timber'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-steel/60 tracking-widest uppercase">
                      PRINCIPLE // {doc.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-steel-light">
                      {doc.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-steel/80 leading-relaxed font-sans">
                  {doc.text}
                </p>

                <div className="mt-6 pt-4 border-t border-steel-border/40 flex items-center justify-between text-[11px] font-mono text-steel/60">
                  <span>RESILIENCE INDEX: MAX</span>
                  <span className="text-cyan font-semibold">TESTED IN DEEP CLAY</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* HEAD TO HEAD PHILOSOPHICAL COMPARISON */}
        <div className="mt-16 p-8 rounded-2xl bg-void-deep border border-steel-border/80 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-amber tracking-widest uppercase">
              // DESIGN COMPARISON
            </span>
            <h3 className="text-2xl font-display font-bold text-steel-light mt-1">
              COMMERCIAL CONSUMER BOT VS. MUD &amp; BOT MACHINE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            {/* Consumer Drone / Robot */}
            <div className="p-6 rounded-xl bg-void-card/60 border border-red-500/20 space-y-3">
              <div className="text-red-400 font-bold text-sm flex items-center gap-2">
                <span>✕ THE SILICON VALLEY CLEAN-ROOM ROBOT</span>
              </div>
              <ul className="space-y-2 text-steel/70">
                <li>• Molded ABS plastic that cracks on sub-zero winter mornings.</li>
                <li>• Proprietary metal gears that take 6 weeks to ship from overseas.</li>
                <li>• Closes down automatically when dust particles touch unsealed ports.</li>
                <li>• Requires 5GHz Wi-Fi + monthly cloud subscription to perform SLAM.</li>
                <li>• Zero repairability without voiding a warranty sticker.</li>
              </ul>
            </div>

            {/* Mud & Bot Hybrid */}
            <div className="p-6 rounded-xl bg-void-card/60 border border-emerald-500/30 space-y-3">
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                <span>✓ THE MUD &amp; BOT BACKYARD TANK</span>
              </div>
              <ul className="space-y-2 text-steel-light">
                <li>• CNC Birch chassis sealed with marine varnish; dampens motor vibration.</li>
                <li>• Inexpensive 3D printed PETG shear pins snap intentionally to protect motors.</li>
                <li>• Self-shedding TPU tank tracks clear out wet clods and garden mulch.</li>
                <li>• 100% offline ESP32-S3 neural processing runs on 0.85W solar trickle.</li>
                <li>• Fully open BOM: repair in 20 minutes with a wood chisel and 3D printer.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
