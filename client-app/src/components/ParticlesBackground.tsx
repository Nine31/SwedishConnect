import Particles from "@tsparticles/react";
import particlesConfig from "../config/particlesConfig.json";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesLoaded = useCallback(async (engine: any) => {
    console.log("Particles Engine Loaded:", engine);
    await loadSlim(engine);
  }, []);

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={particlesConfig as any} />;
};

export default ParticlesBackground;