export const getAudioUrl = (src: string) => {
  return `http://${import.meta.env.VITE_BASE_URL}/api/tracks/getAudio?id=${src}`;
};
