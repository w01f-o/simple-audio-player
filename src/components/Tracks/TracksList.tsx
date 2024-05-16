import { tracksAPI } from "@/services/trackAPI.ts";
import tracksStyles from "./tracks.module.scss";
import { Dispatch, FC, MouseEvent, SetStateAction, useRef } from "react";
import TracksItem from "@/components/Tracks/TracksItem.tsx";
import { Transition } from "react-transition-group";
import Skeleton from "react-loading-skeleton";
import { getTrackCover } from "@/utils/getTrackCover.ts";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
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
            transition: `opacity ${100}ms ease-in-out`,
            opacity: 0,
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
              <div className={tracksStyles.error}>
                Произошла ошибка соединения с сервером
              </div>
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
