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
}

async function activateResultFigure(name: string) {
  const volumeList = [{ url: `${name}.nii.gz`, colormap: "gray" }];

  const canvas0 = document.querySelector(
    `div#${name}.result-render > .result-render-0 > canvas`
  )! as HTMLCanvasElement;
  canvas0.removeAttribute("hidden");
  const nv0 = new Niivue(niiVueDefaults);
  await nv0.attachToCanvas(canvas0);
  await nv0.loadVolumes(volumeList);
  nv0.setClipPlane(clipPlane);
  nv0.setClipPlaneColor(clipPlaneColor);
  nv0.setSliceType(nv0.sliceTypeRender);
  nv0.loadMatCapTexture(matCapTexture);
  await nv0.setVolumeRenderIllumination(illumination);

  const canvas50 = document.querySelector(
    `div#${name}.result-render > .result-render-50 > canvas`
  )! as HTMLCanvasElement;
  canvas50.removeAttribute("hidden");
  const nv50 = new Niivue(niiVueDefaults);
  await nv50.attachToCanvas(canvas50);
  await nv50.loadVolumes(volumeList);
  nv50.setClipPlane(clipPlane);
  nv50.setClipPlaneColor(clipPlaneColor);
  nv50.setSliceType(nv50.sliceTypeRender);
  nv50.loadMatCapTexture(matCapTexture);
  await nv50.setVolumeRenderIllumination(illumination);
  nv50.setGradientOpacity(0.5);

  const canvas100 = document.querySelector(
    `div#${name}.result-render > .result-render-100 > canvas`
  )! as HTMLCanvasElement;
  canvas100.removeAttribute("hidden");
  const nv100 = new Niivue(niiVueDefaults);
  await nv100.attachToCanvas(canvas100);
  await nv100.loadVolumes(volumeList);
  nv100.setClipPlane(clipPlane);
  nv100.setClipPlaneColor(clipPlaneColor);
  nv100.setSliceType(nv100.sliceTypeRender);
  nv100.loadMatCapTexture(matCapTexture);
  await nv100.setVolumeRenderIllumination(illumination);
  nv100.setGradientOpacity(1.0);

  nv0.broadcastTo([nv50, nv100], {
    "3d": true,
    clipPlane: true,
  });
  nv50.broadcastTo([nv0, nv100], {
    "3d": true,
    clipPlane: true,
  });
  nv100.broadcastTo([nv0, nv50], {
    "3d": true,
    clipPlane: true,
  });

  const width = Math.floor(
    (parseInt(canvas0.getAttribute("width")!) +
      parseInt(canvas50.getAttribute("width")!) +
      parseInt(canvas100.getAttribute("width")!)) /
      3
  );
  canvas0.setAttribute("width", `${width}`);
  canvas50.setAttribute("width", `${width}`);
  canvas100.setAttribute("width", `${width}`);
  canvas0.setAttribute("height", `${width}`);
  canvas50.setAttribute("height", `${width}`);
  canvas100.setAttribute("height", `${width}`);
  nv0.resizeListener();
  nv50.resizeListener();
  nv100.resizeListener();
}

async function activateOMEZarrFigure() {
  const scales = ["1", "3", "5"];
  scales.forEach(async (scale) => {
    const volumeList = [
      {
        url: `/public/lightsheet_ome_zarr/scale_${scale}.nii.gz`,
        colormap: "gray",
      },
    ];
    const canvas = document.querySelector(
      `div#ome-zarr.ome-zarr-render > .ome-zarr-render-scale-${scale} > canvas`
    )! as HTMLCanvasElement;
    canvas.removeAttribute("hidden");
    const nv = new Niivue(niiVueDefaults);
    await nv.attachToCanvas(canvas);
    await nv.loadVolumes(volumeList);
    nv.setSliceType(nv.sliceTypeRender);
    nv.loadMatCapTexture(matCapTexture);
    await nv.setVolumeRenderIllumination(illumination);
    nv.setGradientOpacity(0.7);
    nv.scene.renderAzimuth = 360;
    nv.scene.renderElevation = 88;
  });
}

await activateGradientOrderFigure();

// await activateResultFigure("t1w");
// await activateResultFigure("flair");
// await activateResultFigure("tof");
await activateResultFigure("mni152");
// await activateResultFigure("ct");
// await activateResultFigure("visiblehuman");

await activateOMEZarrFigure();
