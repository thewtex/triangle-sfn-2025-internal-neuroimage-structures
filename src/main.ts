import "./style.css";

import { Niivue } from "@niivue/niivue";

const niiVueDefaults = {
  backColor: [0.3, 0.3, 0.5, 1],
  show3Dcrosshair: false,
  loglevel: "debug",
  gradientOrder: 2,
};
const illumination = 0.5;
const matCapTexture = "/Cream.jpg";
const clipPlaneColor = [1, 0, 0, 0.0];
const clipPlane = [0.25, 250, 0];

// const nv1 = new Niivue(niiVueDefaults);
// const gl1 = document.getElementById("gl1")! as HTMLCanvasElement;
// await nv1.attachToCanvas(gl1);
// nv1.loadVolumes([{ url: "/matt_t1w.nii.gz" }]);
// nv1.setSliceType(nv1.sliceTypeRender);
// nv1.setVolumeRenderIllumination(illumination);
// console.log(nv1);
// gradientOrientationOrder1Nv.loadMatCapTexture("/Cortex.jpg");

async function activateGradientOrderFigure() {
  const volumeList = [{ url: "/shear.nii.gz", colormap: "gray" }];
  const azimuth = 132;
  const elevation = -1;

  const gradientOrientationOrder1Canvas = document.querySelector(
    ".gradient-orientation-order-1 > canvas"
  )! as HTMLCanvasElement;
  gradientOrientationOrder1Canvas.removeAttribute("hidden");
  const gradientOrientationOrder1Nv = new Niivue(niiVueDefaults);
  await gradientOrientationOrder1Nv.attachToCanvas(
    gradientOrientationOrder1Canvas
  );
  await gradientOrientationOrder1Nv.loadVolumes(volumeList);
  gradientOrientationOrder1Nv.opts.gradientOrder = 1;
  gradientOrientationOrder1Nv.setClipPlane(clipPlane);
  gradientOrientationOrder1Nv.setClipPlaneColor(clipPlaneColor);
  gradientOrientationOrder1Nv.scene.renderAzimuth = azimuth;
  gradientOrientationOrder1Nv.scene.renderElevation = elevation;
  gradientOrientationOrder1Nv.setSliceType(
    gradientOrientationOrder1Nv.sliceTypeRender
  );
  await gradientOrientationOrder1Nv.setVolumeRenderIllumination(NaN);

  const gradientOrientationOrder2Canvas = document.querySelector(
    ".gradient-orientation-order-2 > canvas"
  )! as HTMLCanvasElement;
  gradientOrientationOrder2Canvas.removeAttribute("hidden");
  const gradientOrientationOrder2Nv = new Niivue(niiVueDefaults);
  await gradientOrientationOrder2Nv.attachToCanvas(
    gradientOrientationOrder2Canvas
  );
  await gradientOrientationOrder2Nv.loadVolumes(volumeList);
  gradientOrientationOrder2Nv.opts.gradientOrder = 2;
  gradientOrientationOrder2Nv.setClipPlane(clipPlane);
  gradientOrientationOrder2Nv.setClipPlaneColor(clipPlaneColor);
  gradientOrientationOrder2Nv.scene.renderAzimuth = azimuth;
  gradientOrientationOrder2Nv.scene.renderElevation = elevation;
  gradientOrientationOrder2Nv.setSliceType(
    gradientOrientationOrder2Nv.sliceTypeRender
  );
  await gradientOrientationOrder2Nv.setVolumeRenderIllumination(NaN);

  gradientOrientationOrder1Nv.broadcastTo([gradientOrientationOrder2Nv], {
    "3d": true,
    clipPlane: true,
  });
  gradientOrientationOrder2Nv.broadcastTo([gradientOrientationOrder1Nv], {
    "3d": true,
    clipPlane: true,
  });

  console.log(gradientOrientationOrder1Nv);
}

await activateGradientOrderFigure();
