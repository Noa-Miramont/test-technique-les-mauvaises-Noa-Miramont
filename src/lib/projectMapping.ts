// Mapping textures et projets
export const TEXTURE_TO_PROJECT_MAPPING = {
  '/textures/arte.png': 'arte',
  '/textures/floa.png': 'floa',
  '/textures/diurne.png': 'galerie-diurne',
  '/textures/les_mauvaises.png': 'les-mauvaises',
  '/textures/sharp_and_cheesy.png': 'sharp-and-chessy',
  '/textures/soap_nova.png': 'soapnova',
  '/textures/vdk.png': 'vondekay'
};

// Ordre des textures dans can
export const TEXTURE_ORDER = [
  '/textures/arte.png',
  '/textures/floa.png',
  '/textures/diurne.png',
  '/textures/les_mauvaises.png',
  '/textures/sharp_and_cheesy.png',
  '/textures/soap_nova.png',
  '/textures/vdk.png'
];

// Mapping des images de background
export const BACKGROUND_IMAGES = [
  '/backgrounds/ArteBG.png',
  '/backgrounds/FloaBG.png',
  '/backgrounds/GalerieBG.png',
  '/backgrounds/LesMauvaiseBG.png',
  '/backgrounds/SharpAndCheesyBG.png',
  '/backgrounds/SoapNovaBG.png',
  '/backgrounds/VDKBG.png'
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