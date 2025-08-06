// Mapping textures et projets
export const TEXTURE_TO_PROJECT_MAPPING = {
  '/textures/arte.jpg': 'arte',
  '/textures/floa.jpg': 'floa',
  '/textures/diurne.jpg': 'galerie-diurne',
  '/textures/les_mauvaises.jpg': 'les-mauvaises',
  '/textures/sharp_and_cheesy.jpg': 'sharp-and-chessy',
  '/textures/soap_nova.jpg': 'soapnova',
  '/textures/vdk.jpg': 'vondekay'
};

// Ordre des textures dans can
export const TEXTURE_ORDER = [
  '/textures/arte.jpg',
  '/textures/floa.jpg',
  '/textures/diurne.jpg',
  '/textures/les_mauvaises.jpg',
  '/textures/sharp_and_cheesy.jpg',
  '/textures/soap_nova.jpg',
  '/textures/vdk.jpg'
];

// Mapping des images de background
export const BACKGROUND_IMAGES = [
  '/backgrounds/ArteBG.jpg',
  '/backgrounds/FloaBG.jpg',
  '/backgrounds/GalerieBG.jpg',
  '/backgrounds/LesMauvaiseBG.jpg',
  '/backgrounds/SharpAndCheesyBG.jpg',
  '/backgrounds/SoapNovaBG.jpg',
  '/backgrounds/VDKBG.jpg'
];

// Obtntion du slug
export function getProjectSlugByIndex(index: number): string {
  const texturePath = TEXTURE_ORDER[index % TEXTURE_ORDER.length];
  return TEXTURE_TO_PROJECT_MAPPING[texturePath as keyof typeof TEXTURE_TO_PROJECT_MAPPING] || 'arte';
}

// Normalisaton des Nom de projey
export function normalizeProjectTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
} 