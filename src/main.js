import "./style.css";
import javascriptLogo from "./assets/javascript.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
<div class="page">

  <section class="intro">
    <h1>Scroll pour faire pousser la fleur 🌱</h1>
  </section>

  <section class="scene">
    <img src="/Svg scroll/fleur.svg" id="fleur" />
    <img src="/Svg scroll/pigeon1.svg" id="pigeon1" />
    <img src="/Svg scroll/pigeon2.svg" id="pigeon2" />
    <div id="crotte"></div>
  </section>

  <section class="spacer"></section>

</div>
`;

setupCounter(document.querySelector("#counter"));
