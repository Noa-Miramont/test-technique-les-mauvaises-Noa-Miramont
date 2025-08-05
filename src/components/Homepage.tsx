"use client";

import Scene3D from "./Scene3D"
import Can from "./model/Can";
import Navbar from "./UI/navbar";
import ProjectTitle from "./ProjectTitle";
import ProjectSpecs from "./ProjectSpecs";
import Header from './UI/Header'
import { SlideProvider, useSlideContext } from "@/contexts/SlideContext";
import { useBackgroundImage } from "@/hooks/useBackgroundImage";

// Nombre total de textures disponibles
const TOTAL_SLIDES = 7;

// Composant interne pour gérer le fond avec images
function HomepageContent() {
  const { currentIndex } = useSlideContext();
  const { currentImage, nextImage, isTransitioning, imageErrors } = useBackgroundImage(currentIndex);

  return (
    <div className="wrapper">
      {/* Fond avec image courante */}
      <div 
        className="background-image"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: currentImage && imageErrors.has(currentImage) ? 'none' : `url(${currentImage})`,
          backgroundColor: currentImage && imageErrors.has(currentImage) ? '#2e2e33' : 'transparent',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -2
        }}
      />
      
      {/* Image de transition (se superpose pendant l'animation) */}
      {isTransitioning && nextImage && !imageErrors.has(nextImage) && (
        <div 
          className="background-image-transition"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${nextImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
            animation: "fadeInOut 0.6s ease-in-out"
          }}
        />
      )}

      {/* Section avec la canette */}
      <section className="hero" style={{ height: "100vh", position: "relative" }}>
        <div data-hero style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
          <Scene3D>
            <Can />
          </Scene3D>
        </div>

          <Header />
          <Navbar />
          

          <div className="info">
            {/* Titre à gauche */}
            <div className="project-title-left" style={{
              zIndex: 10,
              color: "white",
              pointerEvents: "none"
            }}>
              <ProjectTitle />
            </div>
            
            {/* Spécifications à droite */}
            <div className="project-specs-right" style={{
              zIndex: 10,
              color: "white",
              pointerEvents: "none",
            }}>
              <ProjectSpecs />
            </div>
          </div>
          <div className="scroll-message-container">
            <div className="scroll-message-bar"></div>
            <h3 className="scroll-message">Scroll to rotate</h3>
            <div className="scroll-message-bar"></div>
          </div>
        </section>
      </div>
    );
}

export default function Homepage() {
  return (
    <SlideProvider totalSlides={TOTAL_SLIDES}>
      <HomepageContent />
    </SlideProvider>
  );
}


/*/ PETIT BONUS /*/
// BASE DE ALGORYTHME DE CARROUSEL //


// export default function modulo(value, n) {
//   return ((value % n) + n) % n;
// }
// modulo(index + 1, objects.length)
// modulo(index-1, objects.length)

// for(i = 0, i < objects.length, i++) {
// objects.push(mesh)
// }

// for(i = 0, i < objects.length, i++) {
// objects[index].visible = false
// }
// objects[index - 1].visible = true
// objects[index].visible = true
// objects[index + 1].visible = true
