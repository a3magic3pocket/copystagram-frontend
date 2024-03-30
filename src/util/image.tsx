export const getImageUrl = (imagePath: string) => {
  return `${process.env.NEXT_PUBLIC_COPYSTAGRAM_IMAGE_URL}${imagePath}`;
};
