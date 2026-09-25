import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import { soundController } from './AudioController';

// Custom shader material for wet viscous mud with specular glint
const MudViscousMaterial = ({ color = '#382212' }: { color?: string }) => {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.25}
      metalness={0.1}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
      reflectivity={0.9}
    />
  );
};

// Wooden Material (Birch / Walnut tone)
const TimberMaterial = ({ dark = false }: { dark?: boolean }) => (
  <meshStandardMaterial
    color={dark ? '#7A4F26' : '#D4A373'}
    roughness={0.75}
    metalness={0.05}
  />
);

// 3D Printed PETG / TPU Material (Cyber Amber orange)
const PrintMaterial = ({ color = '#FF7A00' }: { color?: string }) => (
  <meshStandardMaterial
    color={color}
    roughness={0.4}
    metalness={0.2}
    emissive={color}
    emissiveIntensity={0.15}
  />
);

// Brushed Steel Material
const SteelMaterial = () => (
  <meshStandardMaterial
    color="#A2ACB6"
    roughness={0.35}
    metalness={0.85}
  />
);

// Glowing Cyan LED / Visor Material
const CyanGlowMaterial = () => (
  <meshBasicMaterial
    color="#00E5FF"
  />
);

// 1. Central Robot Bust Assembly
function RobotBust({ mousePos, explodedProgress = 0 }: { mousePos: { x: number; y: number }; explodedProgress?: number }) {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const spineRef = useRef<THREE.Group>(null);
  const armorChestRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (headRef.current) {
      // Smooth look-at tracking toward mouse position
      const targetRotY = mousePos.x * 0.45;
      const targetRotX = -mousePos.y * 0.35;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, delta * 3.5);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, delta * 3.5);

      // Subtle breathing / idle floating
      headRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 + explodedProgress * 0.6;
    }

    if (armorChestRef.current) {
      // Chest armor slides forward when exploded
      armorChestRef.current.position.z = THREE.MathUtils.lerp(
        armorChestRef.current.position.z,
        explodedProgress * 1.8,
        delta * 4
      );
    }

    if (spineRef.current) {
      // Wooden spine moves backward when exploded
      spineRef.current.position.z = THREE.MathUtils.lerp(
        spineRef.current.position.z,
        -explodedProgress * 1.4,
        delta * 4
      );
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* HEAD UNIT */}
      <group ref={headRef} position={[0, 0.4, 0]}>
        {/* Main Steel Helmet Shell */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.3, 0.85, 1.1]} />
          <SteelMaterial />
        </mesh>

        {/* Timber Top Inlay (Crafted Birch Crown) */}
        <mesh position={[0, 0.84, 0]}>
          <boxGeometry args={[1.15, 0.08, 0.95]} />
          <TimberMaterial />
        </mesh>

        {/* Visor Bezel (Heavy Chamfered Steel) */}
        <mesh position={[0, 0.4, 0.52]}>
          <boxGeometry args={[1.18, 0.46, 0.12]} />
          <meshStandardMaterial color="#1E232A" roughness={0.5} metalness={0.7} />
        </mesh>

        {/* Dark Acrylic Visor Glass */}
        <mesh position={[0, 0.4, 0.57]}>
          <boxGeometry args={[1.08, 0.36, 0.04]} />
          <meshPhysicalMaterial color="#0A0E12" roughness={0.1} transmission={0.6} thickness={0.2} />
        </mesh>

        {/* Dual Glowing Cyan Eyes */}
        <mesh ref={leftEyeRef} position={[-0.26, 0.4, 0.60]}>
          <boxGeometry args={[0.22, 0.12, 0.02]} />
          <CyanGlowMaterial />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.26, 0.4, 0.60]}>
          <boxGeometry args={[0.22, 0.12, 0.02]} />
          <CyanGlowMaterial />
        </mesh>

        {/* Eye Glow Halos */}
        <pointLight position={[-0.26, 0.4, 0.8]} color="#00E5FF" intensity={1.8} distance={2.5} />
        <pointLight position={[0.26, 0.4, 0.8]} color="#00E5FF" intensity={1.8} distance={2.5} />

        {/* 3D Printed Orange Ear Mounts & Antenna */}
        <mesh position={[-0.7, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.16, 16]} />
          <PrintMaterial color="#FF7A00" />
        </mesh>
        <mesh position={[-0.72, 0.65, -0.1]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>

        <mesh position={[0.7, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.16, 16]} />
          <PrintMaterial color="#FF7A00" />
        </mesh>
        <mesh position={[0.72, 0.72, 0.1]}>
          <cylinderGeometry args={[0.02, 0.02, 0.55, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Mud Splatter Decal on Forehead */}
        <mesh position={[0.3, 0.65, 0.56]} rotation={[0.1, 0.2, 0.4]}>
          <sphereGeometry args={[0.14, 8, 8]} />
          <MudViscousMaterial />
        </mesh>
        <mesh position={[0.42, 0.52, 0.57]}>
          <sphereGeometry args={[0.08, 6, 6]} />
          <MudViscousMaterial />
        </mesh>

        {/* Neck Pivot Joint (Brass + 3D printed collar) */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.32, 0.35, 0.28, 16]} />
          <meshStandardMaterial color="#B5832E" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* LAYER 1 & 2: TORSO & CHEST (Reacts to deconstruction) */}
      <group ref={armorChestRef} position={[0, -0.5, 0]}>
        {/* Battle-worn Steel Chest Plate */}
        <mesh position={[0, 0, 0.3]}>
          <boxGeometry args={[1.9, 0.9, 0.4]} />
          <SteelMaterial />
        </mesh>

        {/* Stamped Center Emblem Badge (M&B) */}
        <mesh position={[0, 0.05, 0.52]}>
          <boxGeometry args={[0.7, 0.35, 0.05]} />
          <meshStandardMaterial color="#1E232A" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* Amber Center Indicator LED */}
        <mesh position={[0, -0.22, 0.53]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <meshBasicMaterial color="#FF7A00" />
        </mesh>
        <pointLight position={[0, -0.22, 0.7]} color="#FF7A00" intensity={1.5} distance={1.8} />

        {/* Heavy Mud Clots on Chest */}
        <mesh position={[-0.45, -0.15, 0.52]} rotation={[0.2, 0.3, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <MudViscousMaterial />
        </mesh>
        <mesh position={[-0.6, -0.3, 0.48]}>
          <sphereGeometry args={[0.13, 6, 6]} />
          <MudViscousMaterial />
        </mesh>
      </group>

      {/* LAYER 3: CNC BIRCH SPINE & ESP32-S3 NERVOUS CORE */}
      <group ref={spineRef} position={[0, -0.5, 0]}>
        {/* Birch Wood Spine Vertebrae */}
        {[-0.3, -0.1, 0.1, 0.3].map((y, idx) => (
          <group key={idx} position={[0, y, -0.1]}>
            <mesh>
              <boxGeometry args={[0.9, 0.12, 0.6]} />
              <TimberMaterial dark={idx % 2 === 0} />
            </mesh>
            {/* Brass Assembly Dowels */}
            <mesh position={[-0.38, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.16, 8]} />
              <meshStandardMaterial color="#B5832E" metalness={0.9} roughness={0.3} />
            </mesh>
            <mesh position={[0.38, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.16, 8]} />
              <meshStandardMaterial color="#B5832E" metalness={0.9} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* ESP32-S3 Circuit Board Nervous System Core */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.6, 0.4, 0.04]} />
          <meshStandardMaterial color="#0C2518" roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Glowing Neural Wave Traces */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[0.45, 0.25, 0.01]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
        <pointLight position={[0, 0, 0.2]} color="#00E5FF" intensity={1.2} distance={1.2} />
      </group>

      {/* INDUSTRIAL HYDRAULIC COLLAR & SHOULDERS */}
      <group position={[0, -0.5, 0]}>
        {/* Left Shoulder 3D Printed Bracket & Brass Bushing */}
        <group position={[-1.25, 0.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.32, 0.32, 0.45, 16]} />
            <PrintMaterial color="#FF7A00" />
          </mesh>
          <mesh position={[-0.1, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
            <SteelMaterial />
          </mesh>
        </group>

        {/* Right Shoulder 3D Printed Bracket */}
        <group position={[1.25, 0.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.32, 0.32, 0.45, 16]} />
            <PrintMaterial color="#FF7A00" />
          </mesh>
          <mesh position={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
            <SteelMaterial />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// 2. Dynamic Floating Zero-G Debris Item with Physics & Gravitational Repulsion
interface FloatingItemProps {
  initialPos: [number, number, number];
  type: 'gear' | 'bracket' | 'bolt' | 'timber' | 'mud';
  mousePos: { x: number; y: number };
  disruptShock: number;
  rotSpeed: [number, number, number];
}

function FloatingZeroGItem({ initialPos, type, mousePos, disruptShock, rotSpeed }: FloatingItemProps) {
  const meshRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(...initialPos));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const basePos = useMemo(() => new THREE.Vector3(...initialPos), [initialPos]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Convert normalized mouse coordinates (-1 to 1) into roughly estimated 3D scene space
    const mouse3D = new THREE.Vector3(mousePos.x * 4.5, mousePos.y * 3.2, 1.0);
    const toMouse = new THREE.Vector3().subVectors(currentPos.current, mouse3D);
    const dist = toMouse.length();

    // Gravitational Repulsion Force (pushes debris away from cursor)
    if (dist < 3.2) {
      const force = (1.0 - dist / 3.2) * 2.8;
      toMouse.normalize().multiplyScalar(force * delta);
      velocity.current.add(toMouse);
    }

    // Shockwave repulsion during gravity disruption button trigger
    if (disruptShock > 0.05) {
      const dirFromCenter = currentPos.current.clone().normalize();
      velocity.current.add(dirFromCenter.multiplyScalar(disruptShock * 18 * delta));
    }

    // Spring tension restoring item to its zero-G home position
    const springForce = new THREE.Vector3().subVectors(basePos, currentPos.current).multiplyScalar(2.2);
    velocity.current.add(springForce.multiplyScalar(delta));

    // Damping (smooth zero-G inertia friction)
    velocity.current.multiplyScalar(0.92);

    // Update position
    currentPos.current.add(velocity.current);

    // Harmonic floating bob
    const t = state.clock.elapsedTime;
    const floatY = Math.sin(t * 1.8 + initialPos[0] * 2) * 0.08;
    const floatX = Math.cos(t * 1.4 + initialPos[1] * 2) * 0.05;

    meshRef.current.position.set(
      currentPos.current.x + floatX,
      currentPos.current.y + floatY,
      currentPos.current.z
    );

    // Continuous rotation
    meshRef.current.rotation.x += rotSpeed[0] * delta;
    meshRef.current.rotation.y += rotSpeed[1] * delta;
    meshRef.current.rotation.z += rotSpeed[2] * delta;
  });

  return (
    <group ref={meshRef} position={initialPos}>
      {type === 'gear' && (
        <group>
          {/* Wooden Gear */}
          <mesh>
            <cylinderGeometry args={[0.38, 0.38, 0.08, 18]} />
            <TimberMaterial />
          </mesh>
          {/* Center bore with brass sleeve */}
          <mesh>
            <cylinderGeometry args={[0.12, 0.12, 0.1, 12]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      )}

      {type === 'bracket' && (
        <group>
          {/* 3D Printed Orange PETG Servo Mount */}
          <mesh>
            <boxGeometry args={[0.35, 0.45, 0.2]} />
            <PrintMaterial color="#FF7A00" />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <cylinderGeometry args={[0.08, 0.08, 0.06, 8]} />
            <SteelMaterial />
          </mesh>
        </group>
      )}

      {type === 'bolt' && (
        <group>
          {/* Brass Hex Bolt & Heavy Nut */}
          <mesh>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 6]} />
            <meshStandardMaterial color="#E5A823" metalness={0.88} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.16, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.22, 12]} />
            <SteelMaterial />
          </mesh>
        </group>
      )}

      {type === 'timber' && (
        <group>
          {/* Rough Milled Pine Chunk */}
          <mesh>
            <boxGeometry args={[0.42, 0.28, 0.32]} />
            <TimberMaterial dark={Math.random() > 0.5} />
          </mesh>
        </group>
      )}

      {type === 'mud' && (
        <group>
          {/* Viscous Wet Clay Splash Blob */}
          <mesh>
            <sphereGeometry args={[0.22, 12, 12]} />
            <MudViscousMaterial />
          </mesh>
          <mesh position={[0.12, -0.12, 0.08]}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <MudViscousMaterial color="#573A25" />
          </mesh>
        </group>
      )}
    </group>
  );
}

// 3. Complete Zero-G Workshop Floating Environment
export interface HeroSceneProps {
  explodedProgress?: number;
  onDisruptGravity?: () => void;
}

export function HeroScene({ explodedProgress = 0 }: HeroSceneProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [disruptShock, setDisruptShock] = useState(0);

  // Floating debris configuration
  const debrisItems: FloatingItemProps[] = useMemo(() => [
    { initialPos: [-2.6, 1.4, 0.2], type: 'gear', mousePos, disruptShock, rotSpeed: [0.4, 0.8, 0.2] },
    { initialPos: [2.5, 1.6, -0.4], type: 'bracket', mousePos, disruptShock, rotSpeed: [0.6, 0.3, 0.7] },
    { initialPos: [-2.8, -1.2, 0.5], type: 'timber', mousePos, disruptShock, rotSpeed: [0.3, 0.5, 0.4] },
    { initialPos: [2.7, -1.4, 0.1], type: 'bolt', mousePos, disruptShock, rotSpeed: [1.2, 0.8, 0.5] },
    { initialPos: [-1.8, 2.2, -0.8], type: 'mud', mousePos, disruptShock, rotSpeed: [0.2, 0.4, 0.1] },
    { initialPos: [1.9, 2.3, 0.4], type: 'gear', mousePos, disruptShock, rotSpeed: [-0.5, 0.3, 0.6] },
    { initialPos: [-3.4, 0.1, -0.3], type: 'bracket', mousePos, disruptShock, rotSpeed: [0.8, -0.4, 0.3] },
    { initialPos: [3.3, 0.2, 0.3], type: 'mud', mousePos, disruptShock, rotSpeed: [0.3, 0.6, -0.2] },
    { initialPos: [-1.4, -2.2, 0.8], type: 'bolt', mousePos, disruptShock, rotSpeed: [0.9, 1.1, 0.4] },
    { initialPos: [1.5, -2.1, -0.2], type: 'timber', mousePos, disruptShock, rotSpeed: [-0.4, 0.5, 0.2] },
    { initialPos: [-0.9, 2.6, 0.1], type: 'bolt', mousePos, disruptShock, rotSpeed: [1.4, 0.3, 0.8] },
    { initialPos: [1.0, -2.6, 0.6], type: 'mud', mousePos, disruptShock, rotSpeed: [0.2, 0.3, 0.5] },
  ], [mousePos, disruptShock]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const triggerDisrupt = () => {
    soundController.playSubThud();
    setDisruptShock(1.0);
    setTimeout(() => {
      setDisruptShock(0);
    }, 450);
  };

  return (
    <div
      className="relative w-full h-[88vh] min-h-[620px] max-h-[920px] cursor-crosshair select-none"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* ATMOSPHERIC WORKSHOP LIGHTING */}
        <ambientLight intensity={0.45} />
        
        {/* Key Warm Directional (Timber / Workshop sunlight) */}
        <directionalLight position={[4, 5, 4]} intensity={1.8} color="#FFF1DB" />

        {/* Industrial Amber Rim Light */}
        <pointLight position={[-4, 2, -2]} intensity={2.6} color="#FF7A00" distance={10} />

        {/* Arc Reactor Cyan Fill Light */}
        <pointLight position={[3, -2, 2]} intensity={2.2} color="#00E5FF" distance={8} />

        {/* Top Mud Sludge Tint */}
        <pointLight position={[0, 4, 1]} intensity={1.0} color="#8B5E3C" distance={6} />

        {/* Central Floating Robot Assembly */}
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.2}>
          <Center>
            <RobotBust mousePos={mousePos} explodedProgress={explodedProgress} />
          </Center>
        </Float>

        {/* Zero-G Floating Workshop Items */}
        {debrisItems.map((item, idx) => (
          <FloatingZeroGItem
            key={idx}
            initialPos={item.initialPos}
            type={item.type}
            mousePos={mousePos}
            disruptShock={disruptShock}
            rotSpeed={item.rotSpeed}
          />
        ))}
      </Canvas>

      {/* INTERACTIVE CONTROLS OVERLAY */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2 pointer-events-auto">
        <button
          onClick={triggerDisrupt}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 bg-void-card/90 backdrop-blur-md border border-amber/40 hover:border-amber text-xs font-mono tracking-wider text-steel-light hover:text-amber rounded transition-all duration-300 shadow-industrial hover:shadow-glow-amber active:scale-95"
          title="Disrupt gravity field impulse"
        >
          <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
          <span className="font-semibold">// ZERO-G DISRUPTION IMPULSE</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-amber/20 text-amber font-mono rounded">
            CLICK
          </span>
        </button>
        <div className="text-[10px] font-mono text-steel/60 tracking-wider">
          MOUSE REPULSION: ACTIVE | GRAVITY FLUIDITY: 98.4%
        </div>
      </div>
    </div>
  );
}
