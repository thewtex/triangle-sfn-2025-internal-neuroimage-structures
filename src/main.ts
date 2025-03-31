import "./style.css";

import { Niivue } from 'npm:@niivue/niivue';

const niiVueDefaults = {
  backColor: [0.2, 0.2, 0.2, 1],
  show3Dcrosshair: false,
  loglevel: 'info',
  isRuler: false,
  gradientOpacity: 0.7,
}
const nv1 = new Niivue(niiVueDefaults);
const gl1 = document.getElementById("gl1")!;
