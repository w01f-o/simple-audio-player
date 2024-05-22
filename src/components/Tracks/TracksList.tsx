import { tracksAPI } from "@/services/trackAPI.ts";
import tracksStyles from "./tracks.module.scss";
import { FC, memo, useState } from "react";
import TracksItem from "@/components/Tracks/TracksItem.tsx";
import Skeleton from "react-loading-skeleton";
import { getTrackCover } from "@/utils/getTrackCover.ts";
import TracksListModal from "@/components/Tracks/TrackListModal.tsx";
import { trackListSvg } from "@/assets/svg/svg.tsx";

const TracksList: FC = memo(() => {
  const { data, isLoading, isError } = tracksAPI.useFetchAllTracksQuery();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setModalIsOpen(!modalIsOpen)}
        type="button"
        title="Список треков"
      >
        {trackListSvg}
      </button>
      <TracksListModal setIsOpen={setModalIsOpen} isOpen={modalIsOpen}>
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
              setIsOpen={setModalIsOpen}
            />
          ))}
      </TracksListModal>
    </>
  );
});

export default TracksList;
