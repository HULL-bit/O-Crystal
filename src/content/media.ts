/**
 * Registre central des visuels. Un seul point de modification.
 *
 * - Visuels « procédé / qualité / conditionnement » : fichiers réels fournis
 *   par la marque, dans `public/`.
 * - Quelques ambiances (surface d'eau, bulles…) restent sur banque libre en
 *   attendant les prises de vue définitives — remplaçables ici ou via la
 *   Médiathèque du CMS.
 *
 * Toutes retraitées à l'affichage dans une dominante bleutée cohérente
 * (overlay `--gradient-eau` + mix-blend) — cf. composant <Photo/>.
 */
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const photos = {
  // Fond du hero d'accueil — inchangé.
  heroWater: U("1523362289600-a70b4a0e09aa", 1920),

  // Visuels de marque (fichiers réels — public/).
  springNature: "/istockphoto-1438751626-612x612.jpg", // bassins de traitement à ciel ouvert
  waterSurface: "/bottle-2032980_1280-1024x566.jpg", // bouteille versée dans un verre
  rockLayers: "/istockphoto-1356056182-612x612.jpg", // service au robinet — pureté du quotidien
  glassOfWater: "/istockphoto-1356056182-612x612.jpg",
  bottleStudio: "/bottle-2032980_1280-1024x566.jpg",
  factoryLine: "/istockphoto-1326958894-612x612.jpg", // ligne d'embouteillage
  treatmentPlant: "/gettyimages-157400197-612x612.jpg", // rampes d'osmose inverse
  bottlingMotors: "/istockphoto-876873662-612x612.jpg", // convoyeur d'embouteillage
  utilities: "/gettyimages-1304069482-612x612.jpg", // tuyauterie / utilités de l'usine

  // Ambiances — banque libre en attendant les prises de vue.
  waterDropMacro: U("1548839140-29a749e1cf4d"),
  bubbles: U("1559825481-12a05cc00344"),
  team: U("1521737604893-d14cc237f11d"),
  recycling: U("1532996122724-e3c354a0b15b"),
} as const;

export type PhotoKey = keyof typeof photos;
