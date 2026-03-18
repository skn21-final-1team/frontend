export const NOTEBOOK_CARD_IMAGES: string[] = [
  '/list_background/21e1266b97c8479421488227c6b8c0a3.jpg',
  '/list_background/3.jpeg',
  '/list_background/3d-render-coastal-landscape-sunset-sky_1048-5670.avif',
  '/list_background/90000004614_504136_5832.jpg',
  '/list_background/Hippocampus_haema_couple.jpg',
  '/list_background/beautiful-landscape-around-lake-kawaguchiko.jpg',
  '/list_background/beautiful-morning-pang-ung-lake-pang-ung-mae-hong-son-province-thailand.jpg',
  '/list_background/beautiful-scenery-lake-surrounded-by-forested-mountains-purple-sky-sunset.jpg',
  '/list_background/desktop-wallpaper-horses-running-high-definition-fullscreen-race-horses.jpg',
  '/list_background/desktop-wallpaper-of-arabian-horse-high-definition-monitor-girly-horse.jpg',
  '/list_background/fbba464d13461027.jpg',
  '/list_background/img.png',
  '/list_background/img1.daumcdn.jpg',
  '/list_background/img1.daumcdn.png',
  '/list_background/istockphoto-534037450-612x612.jpg',
  '/list_background/kbc202409260057.800x.0.jpg',
  '/list_background/media_1efd82c338fa3ad0fac427225816549d7ab0a5c80.png',
  '/list_background/orion-nebula-11107.jpg',
  '/list_background/photo-1539667547529-84c607280d20.avif',
  '/list_background/pngtree-animated-landscape-image_16697170.jpg',
  '/list_background/premium_photo-1667126445804-79202e10a28a.avif',
  '/list_background/realistic-seahorse-animal-wild-underwater-environment_23-2151516329.avif',
  '/list_background/realistic-seahorse-animal-wild-underwater-environment_23-2151516343.avif',
  '/list_background/thumb-Bimg_d97eac2abeb8757ed5a8eba3aa66d886_9esq.jpg',
  '/list_background/view-colorful-bright-neon-lights-seahorse-animal_23-2151514465.avif',
  '/list_background/wild-seahorse-animal-oceanic-underwater-environment_23-2151516387.avif',
  '/list_background/wrtFileImageView.jpg',
  '/list_background/wrtFileImageViewwe.jpg',
]

export const getNotebookCardImageByIndex = (cardIndex: number): string => {
  const totalImages = NOTEBOOK_CARD_IMAGES.length
  const normalizedIndex = ((cardIndex % totalImages) + totalImages) % totalImages
  return NOTEBOOK_CARD_IMAGES[normalizedIndex]
}
