export const getStringSeek = (seek: number) => {
  const minutes = Math.floor(seek / 60);
  const seconds = Math.floor(seek % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};
