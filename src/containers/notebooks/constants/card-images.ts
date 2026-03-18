const CARD_IMAGE_COUNT = 20

export const NOTEBOOK_CARD_IMAGES: string[] = Array.from(
  { length: CARD_IMAGE_COUNT },
  (_, index) => `/images/notebook/card-${index + 1}.jpg`,
)

export const getNotebookCardImageByIndex = (cardIndex: number): string => {
  const normalizedIndex = ((cardIndex % CARD_IMAGE_COUNT) + CARD_IMAGE_COUNT) % CARD_IMAGE_COUNT
  return NOTEBOOK_CARD_IMAGES[normalizedIndex]
}
