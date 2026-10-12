// Real constellations, north up as seen from Korea. Star coordinates are
// normalized to the constellation's bounding box (0..1); weight 2 is the
// brightest star. Anchors place the box center as viewport fractions and
// its width as a fraction of viewport width.

export type Anchor = { ax: number; ay: number; w: number };

export type ConstellationDef = {
  id: string;
  name: string;
  stars: readonly [nx: number, ny: number, weight: 0 | 1 | 2][];
  edges: readonly [number, number][];
  aspect: number; // height / width of the bounding box
  desktop: Anchor;
  mobile?: Anchor; // omitted → hidden on narrow viewports
};

export const CONSTELLATIONS: readonly ConstellationDef[] = [
  {
    id: "orion",
    name: "오리온",
    stars: [
      [0.52, 0.0, 0], // Meissa
      [0.78, 0.22, 2], // Betelgeuse
      [0.28, 0.2, 1], // Bellatrix
      [0.62, 0.55, 1], // Alnitak
      [0.52, 0.52, 1], // Alnilam
      [0.42, 0.49, 1], // Mintaka
      [0.74, 0.92, 1], // Saiph
      [0.22, 0.95, 2], // Rigel
    ],
    edges: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 5], [3, 4], [4, 5], [3, 6], [5, 7], [6, 7]],
    aspect: 1.25,
    desktop: { ax: 0.78, ay: 0.44, w: 0.16 },
    mobile: { ax: 0.7, ay: 0.3, w: 0.42 },
  },
  {
    id: "big-dipper",
    name: "북두칠성",
    stars: [
      [0.0, 0.42, 1], // Alkaid
      [0.17, 0.18, 1], // Mizar
      [0.33, 0.12, 1], // Alioth
      [0.48, 0.28, 0], // Megrez
      [0.66, 0.0, 2], // Dubhe
      [0.7, 0.72, 1], // Merak
      [0.52, 0.86, 1], // Phecda
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
    aspect: 0.42,
    desktop: { ax: 0.17, ay: 0.2, w: 0.22 },
    mobile: { ax: 0.38, ay: 0.66, w: 0.62 },
  },
  {
    id: "cassiopeia",
    name: "카시오페이아",
    stars: [
      [0.0, 0.3, 1], // Caph
      [0.22, 0.68, 2], // Schedar
      [0.48, 0.36, 1], // Navi
      [0.72, 0.74, 1], // Ruchbah
      [1.0, 0.44, 0], // Segin
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    aspect: 0.55,
    desktop: { ax: 0.24, ay: 0.82, w: 0.14 },
    mobile: { ax: 0.6, ay: 0.9, w: 0.46 },
  },
  {
    id: "cygnus",
    name: "백조",
    stars: [
      [0.5, 0.0, 2], // Deneb
      [0.5, 0.4, 1], // Sadr
      [0.5, 1.0, 1], // Albireo
      [0.95, 0.52, 1], // Gienah
      [0.08, 0.26, 1], // δ Cyg
    ],
    edges: [[0, 1], [1, 2], [1, 3], [1, 4]],
    aspect: 1.1,
    desktop: { ax: 0.62, ay: 0.86, w: 0.09 },
  },
  {
    id: "scorpius",
    name: "전갈",
    stars: [
      [0.08, 0.08, 1], // Graffias
      [0.0, 0.24, 1], // Dschubba
      [0.22, 0.4, 2], // Antares
      [0.3, 0.52, 0],
      [0.4, 0.64, 1],
      [0.5, 0.74, 0],
      [0.58, 0.84, 0],
      [0.7, 0.92, 0],
      [0.82, 0.98, 1], // Sargas
      [0.92, 0.88, 0],
      [0.9, 0.68, 1], // Shaula
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    aspect: 0.95,
    desktop: { ax: 0.92, ay: 0.72, w: 0.08 },
  },
];
