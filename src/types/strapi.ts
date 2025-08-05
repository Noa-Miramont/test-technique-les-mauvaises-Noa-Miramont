export type StrapiColor = { title: string; hex: string };
export type StrapiPolice = { title: string; policeName: string };

export type StrapiProjet = {
  title: string;
  slug: string | null;
  years: string | null;
  description: string | null;
  lastWord: string | null;
  url: string | null;
  police_connection?: { nodes: StrapiPolice[] };
  colors_connection?: { nodes: StrapiColor[] };
  tags?: { tag: string }[];
};

export type ProjetsResponse = {
  projets: StrapiProjet[];
};