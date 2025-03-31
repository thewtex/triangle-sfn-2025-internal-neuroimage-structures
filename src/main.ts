import "./style.css";

import { Niivue } from '@niivue/niivue';

const niiVueDefaults = {
  backColor: [0.2, 0.2, 0.2, 1],
  show3Dcrosshair: false,
  loglevel: 'info',
  isRuler: false,
  gradientOpacity: 1.0,
  gradientOrder: 2,
};
const illumination = 0.5;
const nv1 = new Niivue(niiVueDefaults);
const gl1 = document.getElementById("gl1")! as HTMLCanvasElement;
await nv1.attachToCanvas(gl1);
nv1.loadVolumes([{ url: "/matt_t1w.nii.gz" }]);
nv1.setSliceType(nv1.sliceTypeRender);
nv1.setVolumeRenderIllumination(illumination);
console.log(nv1);