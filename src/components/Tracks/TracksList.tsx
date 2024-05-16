import { tracksAPI } from "../../services/trackAPI.ts";
import tracksStyles from "./tracks.module.scss";
import { Dispatch, FC, MouseEvent, SetStateAction, useRef } from "react";
import TracksItem from "@/components/Tracks/TracksItem.tsx";
import { Transition } from "react-transition-group";

import trackCoverElizar1 from "./img/covers/1elizar.png";
import trackCoverElizar2 from "./img/covers/2elizar.png";
import trackCoverElizar3 from "./img/covers/3elizar.png";
import trackCoverElizar4 from "./img/covers/4elizar.png";
import trackCoverElizar5 from "./img/covers/5elizar.png";
import trackCoverElizar6 from "./img/covers/6elizar.png";
import trackCoverElizar7 from "./img/covers/7elizar.png";
import trackCoverElizar8 from "./img/covers/8elizar.png";
import trackCoverElizar9 from "./img/covers/9elizar.png";
import trackCoverVadim1 from "./img/covers/1vadim.png";
import trackCoverVadim2 from "./img/covers/2vadim.png";
import trackCoverVadim3 from "./img/covers/3vadim.png";
import trackCoverVadim4 from "./img/covers/4vadim.png";
import { trackAuthor } from "../../enums/trackAuthors.ts";
import Skeleton from "react-loading-skeleton";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultStyle = {
  transition: `opacity ${100}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const elizarTrackCoversArray: string[] = [
  trackCoverElizar1,
  trackCoverElizar2,
  trackCoverElizar3,
  trackCoverElizar4,
  trackCoverElizar5,
  trackCoverElizar6,
  trackCoverElizar7,
  trackCoverElizar8,
  trackCoverElizar9,
];

const vadimTrackCoversArray: string[] = [
  trackCoverVadim1,
  trackCoverVadim2,
  trackCoverVadim3,
  trackCoverVadim4,
];

const getTrackCover = (track: Track, index: number): string => {
  switch (track.author) {
    case trackAuthor.elizar:
      return elizarTrackCoversArray[index % elizarTrackCoversArray.length];

    case trackAuthor.vadim:
      return vadimTrackCoversArray[index % vadimTrackCoversArray.length];
    default:
      return elizarTrackCoversArray[0];
  }
};

const TracksList: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { data, isLoading, isError } = tracksAPI.useFetchAllTracksQuery();

  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <Transition
      in={isOpen}
      timeout={100}
      mountOnEnter
      unmountOnExit
      nodeRef={modalRef}
    >
      {(state) => (
        <div
          className={tracksStyles.modal}
          onClick={() => setIsOpen(false)}
          style={{
            ...defaultStyle,
            // @ts-ignore
            ...transitionStyles[state],
          }}
          ref={modalRef}
        >
          <div
            className={tracksStyles.content}
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            {isLoading && (
              <Skeleton
                count={10}
                className={tracksStyles["loader"]}
                borderRadius={8}
                containerClassName={tracksStyles["loader-container"]}
              />
            )}
            {isError && (
              <div className={tracksStyles.error}>Произошла ошибка</div>
            )}
            {data &&
              data.map((track: Track, index) => (
                <TracksItem
                  track={track}
                  key={track.id}
                  img={getTrackCover(track, index)}
                  setIsOpen={setIsOpen}
                />
              ))}
          </div>
        </div>
      )}
    </Transition>
  );
};

export default TracksList;
