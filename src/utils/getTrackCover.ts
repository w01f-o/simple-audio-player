import { trackAuthor } from "../enums/trackAuthors.ts";
import {
  elizarTrackCoversArray,
  vadimTrackCoversArray,
} from "../assets/img/covers/covers.ts";

export const getTrackCover = (track: Track, index: number): string => {
  switch (track.author) {
    case trackAuthor.elizar:
      return elizarTrackCoversArray[index % elizarTrackCoversArray.length];

    case trackAuthor.vadim:
      return vadimTrackCoversArray[index % vadimTrackCoversArray.length];
    default:
      return elizarTrackCoversArray[0];
  }
};
