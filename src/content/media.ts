/**
 * Registre central des visuels (phase transitoire — banques libres de droits).
 * TODO : remplacer chaque entrée par les visuels propres à la marque via la
 * Médiathèque du CMS. Un seul point de modification.
 *
 * Toutes retraitées à l'affichage dans une dominante bleutée cohérente
 * (overlay `--gradient-eau` + mix-blend) — cf. composant <Photo/>.
 */
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const photos = {
  heroWater: U("1523362289600-a70b4a0e09aa", 1920), // surface d'eau bleue
  waterSurface: U("1505118380757-91f5f5632de0"),
  waterDropMacro: U("1548839140-29a749e1cf4d"),
  springNature: U("1470071459604-3b5ec3a7fe05", 1920), // vallée / source
  rockLayers: U("1465146344425-f00d5f5c8f07"),
  glassOfWater: U("1523362628745-0c100150b504"),
  bottleStudio: U("1625708458528-802ec79b1ed8"),
  bubbles: U("1559825481-12a05cc00344"),
  factoryLine: U("1581092160562-40aa08e78837"),
  team: U("1521737604893-d14cc237f11d"),
  recycling: U("1532996122724-e3c354a0b15b"),
} as const;

export type PhotoKey = keyof typeof photos;
