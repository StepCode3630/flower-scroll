import "./style.css";
import fleurUrl from "./assets/Svg scroll/fleur.svg?url";
import pigeon1 from "./assets/Svg scroll/pigeon1.svg?url";
import pigeon2 from "./assets/Svg scroll/pigeon2.svg?url";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.querySelector("#app").innerHTML = `
<div class="page">

  <section class="intro">
    <h1>Salam</h1>
  </section>

  <section class="scene">
    <div id="flower-container" style="transform: scale(0.4); transform-origin: center;"></div>
    <img src="${pigeon1}" id="pigeon1" style="opacity:0; position:absolute;" />
    <img src="${pigeon2}" id="pigeon2" style="opacity:0; position:absolute;" />
    <div id="crotte" style="position:absolute;"></div>
  </section>

  <section class="spacer"></section>

</div>
`;

// 1Charger le SVG inline
fetch(fleurUrl)
  .then((res) => res.text())
  .then((svgText) => {
    const container = document.querySelector("#flower-container");
    container.innerHTML = svgText;

    // 2Sélectionner tous les path du SVG
    const paths = container.querySelectorAll("path");

    // 3 Préparer les path pour l'animation avec opacité
    paths.forEach((path) => {
      path.style.fillOpacity = "0";
      path.style.transition = "fill-opacity 0.3s ease";
    });

    // 4 Animer chaque path en séquence avec le scroll (1 path par 1vh)
    const pathsArray = Array.from(paths);
    const totalPaths = pathsArray.length;
    const vhPerPath = 60; // pixels par path (ajuste selon tes besoins)

    pathsArray.forEach((path, index) => {
      gsap.to(path, {
        fillOpacity: 1,
        scrollTrigger: {
          trigger: ".scene",
          start: `top+=${index * vhPerPath}px top`,
          end: `top+=${(index + 1) * vhPerPath}px top`,
          scrub: 1,
          markers: false,
        },
      });
    });

    gsap.to("#image0_19_1311", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".scene",
        start: `top+=${totalPaths * vhPerPath}px top`,
        end: `top+=${(totalPaths + 1) * vhPerPath}px top`,
        scrub: 1,
        markers: false,
      },
    });

    // Animation de rotation qui s'accélère avec le scroll
    const imageElement = container.querySelector("image");

    if (imageElement) {
      imageElement.style.opacity = "1";

      // Récupérer les dimensions et position de l'image
      const x = parseFloat(imageElement.getAttribute("x") || 0);
      const y = parseFloat(imageElement.getAttribute("y") || 0);
      const width = parseFloat(imageElement.getAttribute("width") || 100);
      const height = parseFloat(imageElement.getAttribute("height") || 100);

      // Calculer le centre
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      let totalRotation = 0;

      // Animation d'apparition
      gsap.to(imageElement, {
        opacity: 1,
        scrollTrigger: {
          trigger: ".scene",
          start: `top+=${totalPaths * vhPerPath}px top`,
          end: `top+=${(totalPaths + 1) * vhPerPath}px top`,
          scrub: 1,
          markers: false,
        },
      });

      // Rotation continue basée sur le scroll autour du centre
      ScrollTrigger.create({
        onUpdate: (self) => {
          const scrollProgress = window.scrollY || window.pageYOffset;
          totalRotation = scrollProgress * 67;

          // Rotation autour du centre de l'image
          gsap.set(imageElement, {
            attr: {
              transform: `rotate(${totalRotation} ${centerX} ${centerY})`,
            },
          });
        },
      });
    }

    // Quand tous les paths sont animés, faire apparaître les pigeons
    gsap.to(["#pigeon1", "#pigeon2"], {
      opacity: 0,
      y: -500,
      scrollTrigger: {
        trigger: ".scene",
        start: "left center",
        end: "bottom top",
        scrub: 2,
        markers: false,
      },
    });
  });
