// Gestion des models, textures et toute Interactivité avec les models //

"use client";

import { useState, useEffect, createRef, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader, PMREMGenerator } from "three";
import { RGBELoader } from "three-stdlib";
import { useSlideContext } from '@/contexts/SlideContext';
import { useBackgroundColor } from '@/hooks/useBackgroundColor';

const TEXTURES = [
  '/textures/arte.png',
  '/textures/floa.png',
  '/textures/diurne.png',
  '/textures/les_mauvaises.png',
  '/textures/sharp_and_cheesy.png',
  '/textures/soap_nova.png',
  '/textures/vdk.png'
];

export const useSlideState = () => {
  return useSlideContext();
};

// Hook pour gérer la position de la souris
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

// taille du viewport
const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return viewportSize;
};

// détecter les swipes
const useSwipeDetection = () => {
  const { nextSlide, prevSlide } = useSlideContext();
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  // Distance minimale pour considérer comme un swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchEnd(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        // Swipe vers la gauche -> prochaine cannette
        nextSlide();
      } else {
        // Swipe vers la droite -> cannette précédente
        prevSlide();
      }
    }
  };

  useEffect(() => {
    const element = document.body;
    
    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [touchStart, touchEnd]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};

const usePreloadAssets = () => {
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  const [envMap, setEnvMap] = useState<THREE.Texture | null>(null);
  const [isReady, setIsReady] = useState(false);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const loadAssets = async () => {
      const textureLoader = new TextureLoader();
      const pmremGenerator = new PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();

      try {
        const texturePromises = TEXTURES.map((texturePath) => {
          return new Promise<THREE.Texture>((resolve, reject) => {
            textureLoader.load(
              texturePath,
              (texture) => {
                texture.flipY = false;
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;
                texture.needsUpdate = true;
                resolve(texture);
              },
              undefined,
              (error) => reject(error)
            );
          });
        });

        const [loadedTextures, hdrTexture] = await Promise.all([
          Promise.all(texturePromises),
          new Promise<THREE.Texture>((resolve, reject) => {
            new RGBELoader().load(
              "/envMap/studio_small_09_4k.hdr",
              (texture) => {
                const env = pmremGenerator.fromEquirectangular(texture).texture;
                texture.dispose();
                pmremGenerator.dispose();
                resolve(env);
              },
              undefined,
              (err) => reject(err)
            );
          })
        ]);

        setTextures(loadedTextures);
        setEnvMap(hdrTexture);
        setIsReady(true);
      } catch (e) {
        console.error("Erreur lors du chargement des assets:", e);
      }
    };

    loadAssets();
  }, [gl]);

  return { textures, envMap, isReady };
};

export default function Can() {
  const { currentIndex, nextSlide, prevSlide, isTransitioning } = useSlideContext();
  const { textures, envMap, isReady } = usePreloadAssets();
  const canModel = useGLTF("/model/can.gltf");
  const [canInstances, setCanInstances] = useState<any[]>([]);
  const scrollDeltaRef = useRef(0);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const mousePosition = useMousePosition();
  const viewportSize = useViewportSize();
  
  // Détection de swipe
  useSwipeDetection();
  
  useBackgroundColor(currentIndex);

  useEffect(() => {
    const isFullyReady = isReady && canInstances.length > 0;
    
    // Ne mettre à jour le loading que si c'est le premier chargement
    if (isFullyReady && !hasInitiallyLoaded) {
      setHasInitiallyLoaded(true);
      // @ts-ignore
      window.isWebGLLoading = false;
    } else if (!hasInitiallyLoaded) {
      // @ts-ignore
      window.isWebGLLoading = !isFullyReady;
    }
  }, [isReady, canInstances.length, hasInitiallyLoaded]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      scrollDeltaRef.current += e.deltaY * 0.05;
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    if (!isReady || !envMap) return;

    const instances = TEXTURES.map((_, index) => {
      const clonedScene = canModel.scene.clone();

      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const applyMaterial = (material: THREE.Material | THREE.Material[]) => {
            const texture = textures[index] || null;

            if (Array.isArray(material)) {
              return material.map((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  const newMat = mat.clone();
                  newMat.map = texture;
                  newMat.envMap = envMap;
                  newMat.transparent = true;
                  newMat.opacity = 0;
                  newMat.metalness = 1;
                  newMat.roughness = 0.4;
                  newMat.needsUpdate = true;
                  return newMat;
                }
                return mat.clone();
              });
            } else if (material instanceof THREE.MeshStandardMaterial) {
              const newMat = material.clone();
              newMat.map = texture;
              newMat.envMap = envMap;
              newMat.transparent = true;
              newMat.opacity = 0;
              newMat.metalness = 1;
              newMat.roughness = 0.4;
              newMat.needsUpdate = true;
              return newMat;
            }
            return material;
          };

          child.material = applyMaterial(child.material);
        }
      });

      return {
        index,
        scene: clonedScene,
        ref: createRef<THREE.Group>(),
        rotationSpeed: 0
      };
    });

    setCanInstances(instances);
  }, [isReady, textures, envMap, canModel.scene]);

  useEffect(() => {
    canInstances.forEach((instance) => {
      instance.rotationSpeed = 0;
    });
  }, [currentIndex]);

  useEffect(() => {
    // @ts-ignore
    window.navigateSlides = {
      nextSlide,
      prevSlide,
      getCurrentIndex: () => currentIndex,
      isTransitioning: () => isTransitioning,
      isLoading: () => !isReady
    };
  }, [nextSlide, prevSlide, currentIndex, isTransitioning, isReady]);

  const isFullyReady = isReady && canInstances.length > 0;

  if (!isFullyReady) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="gray" transparent opacity={1} />
        </mesh>
      </group>
    );
  }

  return (
    <>
      {canInstances.map((instance, idx) => (
        <CanMesh
          key={idx}
          instance={instance}
          currentIndex={currentIndex}
          scrollDeltaRef={scrollDeltaRef}
          mousePosition={mousePosition}
          viewportSize={viewportSize}
        />
      ))}
    </>
  );
}

function CanMesh({ instance, currentIndex, scrollDeltaRef, mousePosition, viewportSize }: { instance: any, currentIndex: number, scrollDeltaRef: any, mousePosition: { x: number, y: number }, viewportSize: { width: number, height: number } }) {
  const groupRef = instance.ref;
  const [targetZRotation, setTargetZRotation] = useState(0);

  useFrame((_, dt) => {
    if (groupRef.current) {
      const index = instance.index;

      let xOffset = 0;
      let zOffset = 50;
      let scale = 0.1;
      let opacity = 0;
      let newTargetZRotation = 0;
      
      // Ajuster la position Y en fonction de la taille du viewport
      let yOffset = -2.5;
      if (viewportSize.width <= 991) {
        yOffset = -4.5; // Position plus basse pour mobile
      }

      if (index === currentIndex) {
        xOffset = 0.01;
        zOffset = 0;
        scale = 0.5;
        opacity = 1;
        newTargetZRotation = 0;

        instance.rotationSpeed += scrollDeltaRef.current * 0.2;
        scrollDeltaRef.current = 0;
      } else if (index === (currentIndex - 1 + TEXTURES.length) % TEXTURES.length) {
        xOffset = -15;
        zOffset = -2;
        scale = 0.3;
        opacity = 1;
        newTargetZRotation = Math.PI / 4;
      } else if (index === (currentIndex + 1) % TEXTURES.length) {
        xOffset = 15;
        zOffset = -2;
        scale = 0.3;
        opacity = 1;
        newTargetZRotation = -Math.PI / 4;
      }

      if (newTargetZRotation !== targetZRotation) {
        setTargetZRotation(newTargetZRotation);
      }

      const targetPos = new THREE.Vector3(xOffset, yOffset, zOffset);
      const targetScale = new THREE.Vector3(scale, scale, scale);

      groupRef.current.position.lerp(targetPos, dt * 3);
      groupRef.current.scale.lerp(targetScale, dt * 3);

      const newOpacity = THREE.MathUtils.lerp(
        groupRef.current.userData.currentOpacity ?? 0,
        opacity,
        dt * 3
      );
      groupRef.current.userData.currentOpacity = newOpacity;

      groupRef.current.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.opacity = newOpacity;
                mat.transparent = newOpacity < 0.99;
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.opacity = newOpacity;
            child.material.transparent = newOpacity < 0.99;
          }
        }
      });

      if (index === currentIndex) {
        instance.rotationSpeed *= 0.95;
        groupRef.current.rotation.y -= dt * (0.2 + instance.rotationSpeed);

        // Rotation basée sur la position de la souris
        const mouseRotationX = mousePosition.y * - 0.5; // Rotation X basée sur Y de la souris
        const mouseRotationZ = -mousePosition.x * 0.5; // Rotation Z basée sur X de la souris
        
        // Appliquer la rotation
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouseRotationX,
          dt * 2
        );
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          mouseRotationZ,
          dt * 2
        );

        // @ts-ignore
        window.canOpacity = newOpacity;
      }

      const currentZRotation = groupRef.current.rotation.z;
      const lerpSpeed = 0.05;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(currentZRotation, targetZRotation, lerpSpeed);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={instance.scene} />
    </group>
  );
}