import React from "react";
import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";

function Background() {
  async function customInit(main: any) {
    loadLinksPreset(main);
  }

  const particleOptions = {
    preset: "links",
  };

  return (
    <div className="min-h-screen relative">
      <Particles options={particleOptions} init={customInit} />
    </div>
  );
}

export default React.memo(Background);
