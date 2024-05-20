import { Col, Row } from "@w01f-o/react-grid-layout";
import { ChangeEvent, FC, useCallback } from "react";
import controlStyles from "./controls.module.scss";
import { nextSvg, pauseSvg, playSvg, prevSvg } from "@/assets/svg/svg.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { getStringTime } from "@/utils/getStringSeek.ts";
import { setCurrentTrack, setIsLoading } from "@/store/player/playerSlice.ts";
import { tracksAPI } from "@/services/trackAPI.ts";
import Skeleton from "react-loading-skeleton";

const Controls: FC = () => {
  const {
    sound,
    isPlaying,
    seek,
    duration,
    currentTrack,
    isLoading: isTrackLoading,
  } = useAppSelector((state) => state.player);
  const { data, isLoading } = tracksAPI.useFetchAllTracksQuery();
  const dispatch = useAppDispatch();

  const mouseUpHandler = useCallback(() => {
    if (sound!.state() === "loaded" && !isPlaying && !isTrackLoading) {
      dispatch(setIsLoading(true));
      sound!.play();
    }
  }, [sound, isPlaying, isTrackLoading, dispatch]);

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isPlaying) {
        sound!.pause();
      }
      const value = Number(e.target.value);
      sound!.seek(value);
    },
    [sound, isPlaying],
  );

  const clickHandler = (action: "prev" | "next") => (): void => {
    if (data && !isLoading) {
      let trackIndex = data.findIndex((track) => track.id === currentTrack!.id);

      switch (action) {
        case "next":
          if (data.length - 1 === trackIndex) {
            return;
          }

          trackIndex += 1;
          break;

        case "prev":
          if (trackIndex === 0) {
            return;
          }

          trackIndex -= 1;
          break;

        default:
          break;
      }

      dispatch(setCurrentTrack(data[trackIndex]));
    }
  };

  return (
    <Row className={controlStyles.row}>
      <Col xs={12}>
        <div className={controlStyles.time}>
          <div className={controlStyles.current}>
            {isTrackLoading ? <Skeleton /> : getStringTime(seek)}
          </div>
          <div className={controlStyles.duration}>
            {isTrackLoading ? <Skeleton /> : getStringTime(duration)}
          </div>
        </div>
      </Col>
      <Col xs={12}>
        {isTrackLoading ? (
          <Skeleton />
        ) : (
          <input
            type="range"
            className={controlStyles.range}
            value={seek}
            min={0}
            max={duration}
            onChange={changeHandler}
            onMouseUp={mouseUpHandler}
            onTouchEnd={mouseUpHandler}
            style={{
              background: `linear-gradient(to right, #343434 ${
                seek / (duration / 100)
              }%, #ccc ${seek / (duration / 100)}%)`,
            }}
          />
        )}
      </Col>
      <Col xs={12}>
        <div className={controlStyles.buttons}>
          <button
            type="button"
            title="Предыдущий трек"
            onClick={clickHandler("prev")}
            disabled={isTrackLoading}
          >
            {prevSvg}
          </button>
          <button
            type="button"
            onClick={() => {
              isPlaying ? sound!.pause() : sound!.play();
            }}
            title={isPlaying ? "Пауза" : "Воспроизведение"}
            disabled={isTrackLoading}
          >
            {isPlaying ? pauseSvg : playSvg}
          </button>
          <button
            type="button"
            title="Следующий трек"
            onClick={clickHandler("next")}
            disabled={isTrackLoading}
          >
            {nextSvg}
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default Controls;
