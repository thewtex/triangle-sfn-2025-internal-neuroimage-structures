import "./style.css";

import { Niivue } from "@niivue/niivue";

const niiVueDefaults = {
  backColor: [0.3, 0.3, 0.5, 1],
  show3Dcrosshair: false,
  loglevel: "debug",
  gradientOrder: 2,
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

  // get all the canvas elements in the figureElement
  // const canvasElements = figureElement.querySelectorAll("canvas");
  // canvasElements.forEach((canvas) => {
  //   canvas.removeAttribute("hidden");
  //   canvas.setAttribute("width", "500");
  //   canvas.setAttribute("height", "500");
  // });
  const order1Container = figureElement.querySelector(
    ".gradient-orientation-order-1"
  )! as HTMLDivElement;
  const order2Container = figureElement.querySelector(
    ".gradient-orientation-order-2"
  )! as HTMLDivElement;
  order1Container.style.display = "block";
  order2Container.style.display = "block";
  // set the order1 and order2 containers to be 256px tall and 100% wide
  order1Container.style.height = "256px";
  order1Container.style.width = "100%";
  order2Container.style.height = "256px";
  order2Container.style.width = "100%";

  // create the canvas elements, append them to the order1Container and order2Container
  // set their width to the container width and their height to 256
  const canvas1 = document.createElement("canvas");
  const canvas2 = document.createElement("canvas");
  order1Container.appendChild(canvas1);
  order2Container.appendChild(canvas2);

  const volumeList = [{ url: "/shear.nii.gz", colormap: "gray" }];
  const azimuth = 132;
  const elevation = -1;

  // const gradientOrientationOrder1Canvas = document.querySelector(
  //   ".gradient-orientation-order-1 > canvas"
  // )! as HTMLCanvasElement;
  const order1Nv = new Niivue(niiVueDefaults);
  await order1Nv.attachToCanvas(
    canvas1
  );
  await order1Nv.loadVolumes(volumeList);
  order1Nv.opts.gradientOrder = 1;
  order1Nv.setClipPlane(clipPlane);
  order1Nv.scene.renderAzimuth = azimuth;
  order1Nv.scene.renderElevation = elevation;
  order1Nv.setSliceType(
    order1Nv.sliceTypeRender
  );
  order1Nv.gradientGL(order1Nv.volumes[0]);
  await order1Nv.setGradientOpacity(0.5);
  // await order1Nv.setVolumeRenderIllumination(NaN);

  // const order2Canvas = document.querySelector(
  //   ".gradient-orientation-order-2 > canvas"
  // )! as HTMLCanvasElement;
  // const order2Nv = new Niivue(niiVueDefaults);
  // await order2Nv.attachToCanvas(
  //   order2Canvas
  // );
  // await order2Nv.loadVolumes(volumeList);
  // order2Nv.opts.gradientOrder = 2;
  // order2Nv.setClipPlane(clipPlane);
  // order2Nv.setClipPlaneColor(clipPlaneColor);
  // order2Nv.scene.renderAzimuth = azimuth;
  // order2Nv.scene.renderElevation = elevation;
  // order2Nv.setSliceType(
  //   order2Nv.sliceTypeRender
  // );
  // await order2Nv.setVolumeRenderIllumination(NaN);

  // order1Nv.broadcastTo([order2Nv], {
  //   "3d": true,
  //   clipPlane: true,
  // });
  // order2Nv.broadcastTo([order1Nv], {
  //   "3d": true,
  //   clipPlane: true,
  // });
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

  // const width = Math.floor(
  //   (parseInt(canvas0.getAttribute("width")!) +
  //     parseInt(canvas50.getAttribute("width")!) +
  //     parseInt(canvas100.getAttribute("width")!)) /
  //     3
  // );
  const width = 500;
  canvas0.setAttribute("width", `${width}`);
  canvas50.setAttribute("width", `${width}`);
  canvas100.setAttribute("width", `${width}`);
  canvas0.setAttribute("height", `${width}`);
  canvas50.setAttribute("height", `${width}`);
  canvas100.setAttribute("height", `${width}`);
  // nv0.resizeListener();
  // nv50.resizeListener();
  // nv100.resizeListener();
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

// await activateGradientOrderFigure();

// await activateResultFigure("t1w");
// await activateResultFigure("flair");
// await activateResultFigure("tof");
// await activateResultFigure("mni152");
// await activateResultFigure("ct");
// await activateResultFigure("visiblehuman");

// await activateOMEZarrFigure();

const activatedFigures = {
  gradientOrder: false,
  t1w: false,
  // flair: false,
  tof: false,
  mni152: false,
  ct: false,
  visiblehuman: false,
  omeZarr: false,
};

async function activateFigure(name: string, figureElement: HTMLElement) {
  if (activatedFigures[name]) {
    return;
  }
  activatedFigures[name] = true;

  switch (name) {
    case "gradientOrder":
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
    case "omeZarr":
      await activateOMEZarrFigure();
      break;
  }
}

const gradientOrderPreview = document.querySelector(
  ".gradient-order-figure > div.interactive-preview-container"
)! as HTMLDivElement;
gradientOrderPreview.addEventListener("click", () => {
  activateFigure("gradientOrder", gradientOrderPreview.parentElement!);
});
