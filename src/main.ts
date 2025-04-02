import "./style.css";

import { Niivue } from "@niivue/niivue";

const niiVueDefaults = {
  backColor: [0.3, 0.3, 0.5, 1],
  show3Dcrosshair: false,
  loglevel: "debug",
  gradientOrder: 1,
  gradientOpacity: 0.5,
  clipPlaneColor: [1, 0, 0, 0.0],
  isResizeCanvas: true,
};
const illumination = 0.5;
const matCapTexture = "/Cream.jpg";
const clipPlaneColor = [1, 0, 0, 0.0];
const clipPlane = [0.25, 250, 0];

async function activateGradientOrderFigure(figureElement: HTMLElement) {
  const interactivePreview = figureElement.querySelector(
    ".interactive-preview-container"
  )! as HTMLDivElement;
  interactivePreview.style.display = "none";

  const order1Container = figureElement.querySelector(
    ".gradient-orientation-order-1"
  )! as HTMLDivElement;
  const order2Container = figureElement.querySelector(
    ".gradient-orientation-order-2"
  )! as HTMLDivElement;
  order1Container.style.display = "block";
  order2Container.style.display = "block";
  const renderWidth = 192;
  const renderHeight = 192;
  order1Container.style.width = `${renderWidth}px`;
  order1Container.style.height = `${renderHeight}px`;
  order2Container.style.width = `${renderWidth}px`;
  order2Container.style.height = `${renderHeight}px`;

  const canvas1 = document.createElement("canvas");
  const canvas2 = document.createElement("canvas");
  order1Container.appendChild(canvas1);
  order2Container.appendChild(canvas2);
  canvas1.setAttribute("width", "${renderWidth}");
  canvas2.setAttribute("width", "${renderWidth}");
  canvas1.setAttribute("height", "${renderHeight}");
  canvas2.setAttribute("height", "${renderHeight}");

  const volumeList = [{ url: "/shear.nii.gz", colormap: "gray" }];
  const azimuth = 132;
  const elevation = -1;

  const order1Nv = new Niivue(niiVueDefaults);
  await order1Nv.attachToCanvas(canvas1);
  await order1Nv.loadVolumes(volumeList);
  order1Nv.opts.gradientOrder = 1;
  order1Nv.setClipPlane(clipPlane);
  order1Nv.scene.renderAzimuth = azimuth;
  order1Nv.scene.renderElevation = elevation;
  order1Nv.setSliceType(order1Nv.sliceTypeRender);
  await order1Nv.setVolumeRenderIllumination(NaN);

  const order2Nv = new Niivue(niiVueDefaults);
  await order2Nv.attachToCanvas(canvas2);
  await order2Nv.loadVolumes(volumeList);
  order2Nv.opts.gradientOrder = 2;
  order2Nv.setClipPlane(clipPlane);
  order2Nv.setClipPlaneColor(clipPlaneColor);
  order2Nv.scene.renderAzimuth = azimuth;
  order2Nv.scene.renderElevation = elevation;
  order2Nv.setSliceType(order2Nv.sliceTypeRender);
  await order2Nv.setVolumeRenderIllumination(NaN);

  // order1Nv.broadcastTo([order2Nv], {
  //   "3d": true,
  //   clipPlane: true,
  // });
  // order2Nv.broadcastTo([order1Nv], {
  //   "3d": true,
  //   clipPlane: true,
  // });
}
function deactivateGradientOrderFigure(figureElement: HTMLElement) {
  const interactivePreview = figureElement.querySelector(
    ".interactive-preview-container"
  )! as HTMLDivElement;
  interactivePreview.style.display = "block";
  const order1Container = figureElement.querySelector(
    ".gradient-orientation-order-1"
  )! as HTMLDivElement;
  const order2Container = figureElement.querySelector(
    ".gradient-orientation-order-2"
  )! as HTMLDivElement;
  order1Container.style.display = "none";
  order2Container.style.display = "none";
  const order1Canvas = order1Container.querySelector(
    "canvas"
  )! as HTMLCanvasElement;
  const order2Canvas = order2Container.querySelector(
    "canvas"
  )! as HTMLCanvasElement;
  order1Container.removeChild(order1Canvas);
  order2Container.removeChild(order2Canvas);
}

async function activateResultFigure(name: string) {
  const figureElement = document.querySelector(
    `#${name}-figure`
  )! as HTMLElement;

  const interactivePreview = figureElement.querySelector(
    ".interactive-preview-container"
  )! as HTMLDivElement;
  interactivePreview.style.display = "none";

  const render0Container = figureElement.querySelector(
    ".result-render-0"
  )! as HTMLDivElement;
  const render50Container = figureElement.querySelector(
    ".result-render-50"
  )! as HTMLDivElement;
  const render100Container = figureElement.querySelector(
    ".result-render-100"
  )! as HTMLDivElement;
  render0Container.style.display = "block";
  render50Container.style.display = "block";
  render100Container.style.display = "block";
  const renderWidth = 192;
  const renderHeight = 192;
  render0Container.style.width = `${renderWidth}px`;
  render50Container.style.width = `${renderWidth}px`;
  render100Container.style.width = `${renderWidth}px`;
  render0Container.style.height = `${renderHeight}px`;
  render50Container.style.height = `${renderHeight}px`;
  render100Container.style.height = `${renderHeight}px`;
  const canvas0 = document.createElement("canvas");
  const canvas50 = document.createElement("canvas");
  const canvas100 = document.createElement("canvas");
  render0Container.appendChild(canvas0);
  render50Container.appendChild(canvas50);
  render100Container.appendChild(canvas100);
  canvas0.setAttribute("width", `${renderWidth}`);
  canvas50.setAttribute("width", `${renderWidth}`);
  canvas100.setAttribute("width", `${renderWidth}`);
  canvas0.setAttribute("height", `${renderHeight}`);
  canvas50.setAttribute("height", `${renderHeight}`);
  canvas100.setAttribute("height", `${renderHeight}`);

  const volumeList = [{ url: `${name}.nii.gz`, colormap: "gray" }];

  const nv0 = new Niivue(niiVueDefaults);
  await nv0.attachToCanvas(canvas0);
  await nv0.loadVolumes(volumeList);
  nv0.setClipPlane(clipPlane);
  nv0.setSliceType(nv0.sliceTypeRender);
  nv0.loadMatCapTexture(matCapTexture);
  await nv0.setVolumeRenderIllumination(illumination);

  const nv50 = new Niivue(niiVueDefaults);
  await nv50.attachToCanvas(canvas50);
  await nv50.loadVolumes(volumeList);
  nv50.setClipPlane(clipPlane);
  nv50.setSliceType(nv50.sliceTypeRender);
  nv50.loadMatCapTexture(matCapTexture);
  await nv50.setVolumeRenderIllumination(illumination);
  nv50.setGradientOpacity(0.5);

  canvas100.removeAttribute("hidden");
  const nv100 = new Niivue(niiVueDefaults);
  await nv100.attachToCanvas(canvas100);
  await nv100.loadVolumes(volumeList);
  nv100.setClipPlane(clipPlane);
  nv100.setSliceType(nv100.sliceTypeRender);
  nv100.loadMatCapTexture(matCapTexture);
  await nv100.setVolumeRenderIllumination(illumination);
  nv100.setGradientOpacity(1.0);

  // nv0.broadcastTo([nv50, nv100], {
  //   "3d": true,
  //   clipPlane: true,
  // });
  // nv50.broadcastTo([nv0, nv100], {
  //   "3d": true,
  //   clipPlane: true,
  // });
  // nv100.broadcastTo([nv0, nv50], {
  //   "3d": true,
  //   clipPlane: true,
  // });

  const renderContainer = figureElement.querySelector(
    ".result-render"
  )! as HTMLDivElement;
  const computedStyle = window.getComputedStyle(renderContainer);
  const width = Math.floor((parseInt(computedStyle.width) * 0.9) / 3);
  render0Container.style.width = `${width}px`;
  render0Container.style.height = `${width}px`;
  render50Container.style.width = `${width}px`;
  render50Container.style.height = `${width}px`;
  render100Container.style.width = `${width}px`;
  render100Container.style.height = `${width}px`;
}
function deactivateResultFigure(name: string) {
  const figureElement = document.querySelector(
    `#${name}-figure`
  )! as HTMLElement;
  const interactivePreview = figureElement.querySelector(
    ".interactive-preview-container"
  )! as HTMLDivElement;
  interactivePreview.style.display = "block";
  const render0Container = figureElement.querySelector(
    ".result-render-0"
  )! as HTMLDivElement;
  const render50Container = figureElement.querySelector(
    ".result-render-50"
  )! as HTMLDivElement;
  const render100Container = figureElement.querySelector(
    ".result-render-100"
  )! as HTMLDivElement;
  render0Container.style.display = "none";
  render50Container.style.display = "none";
  render100Container.style.display = "none";
  const render0Canvas = render0Container.querySelector(
    "canvas"
  )! as HTMLCanvasElement;
  const render50Canvas = render50Container.querySelector(
    "canvas"
  )! as HTMLCanvasElement;
  const render100Canvas = render100Container.querySelector(
    "canvas"
  )! as HTMLCanvasElement;
  render0Container.removeChild(render0Canvas);
  render50Container.removeChild(render50Canvas);
  render100Container.removeChild(render100Canvas);
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

// await activateOMEZarrFigure();

const activatedFigures = new Map<string, boolean>();
activatedFigures.set("gradient-order", false);
activatedFigures.set("t1w", false);
// activatedFigures.set("flair", false);
activatedFigures.set("tof", false);
activatedFigures.set("mni152", false);
activatedFigures.set("ct", false);
activatedFigures.set("visiblehuman", false);
activatedFigures.set("ome-zarr", false);

function deactivateFigure(name: string, figureElement: HTMLElement) {
  switch (name) {
    case "gradient-order":
      deactivateGradientOrderFigure(figureElement);
      break;
    case "t1w":
    case "flair":
    case "tof":
    case "mni152":
    case "ct":
    case "visiblehuman":
      deactivateResultFigure(name);
      break;
    // const canvas = figureElement.querySelector("canvas")! as HTMLCanvasElement;
    // const nv = new Niivue(niiVueDefaults);
    // nv.detachFromCanvas(canvas);
    // nv.destroy();
    // canvas.setAttribute("hidden", "true");
  }
}
async function activateFigure(name: string, figureElement: HTMLElement) {
  if (activatedFigures.get(name)) {
    return;
  }
  // deactivate all other figures
  activatedFigures.forEach((value, key) => {
    if (key !== name && value) {
      deactivateFigure(key, document.querySelector(`#${key}-figure`)!);
      activatedFigures.set(key, false);
    }
  });
  activatedFigures.set(name, true);

  switch (name) {
    case "gradient-order":
      await activateGradientOrderFigure(figureElement);
      break;
    case "t1w":
      await activateResultFigure("t1w");
      break;
    case "flair":
      await activateResultFigure("flair");
      break;
    case "tof":
      await activateResultFigure("tof");
      break;
    case "mni152":
      await activateResultFigure("mni152");
      break;
    case "ct":
      await activateResultFigure("ct");
      break;
    case "visiblehuman":
      await activateResultFigure("visiblehuman");
      break;
    case "ome-zarr":
      await activateOMEZarrFigure();
      break;
  }
}

const gradientOrderPreview = document.querySelector(
  "#gradient-order-figure > div.interactive-preview-container"
)! as HTMLDivElement;
gradientOrderPreview.addEventListener("click", () => {
  activateFigure("gradient-order", gradientOrderPreview.parentElement!);
});

["t1w", "tof", "mni152", "ct", "visiblehuman"].forEach((name) => {
  const preview = document.querySelector(
    `#${name}-figure > div.interactive-preview-container`
  )! as HTMLDivElement;
  preview.addEventListener("click", () => {
    activateFigure(name, preview.parentElement!);
  });
});
