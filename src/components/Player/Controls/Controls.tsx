import { Col, Row } from "@w01f-o/react-grid-layout";
import { ChangeEvent, FC, useCallback } from "react";
import controlStyles from "./controls.module.scss";
import {
  nextSvg,
  pauseSvg,
  playSvg,
  prevSvg,
} from "@/components/Player/Controls/svg/svg.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { getStringTrackDuration } from "@/utils/getStringTrackDuration.ts";
import { getStringSeek } from "@/utils/getStringSeek.ts";
import { setCurrentTrack } from "@/store/player/playerSlice.ts";
import { tracksAPI } from "../../../services/trackAPI.ts";

const Controls: FC = () => {
  const { sound, isPlaying, seek, duration, currentTrack } = useAppSelector(
    (state) => state.player,
  );
  const { data, isLoading } = tracksAPI.useFetchAllTracksQuery();
  const dispatch = useAppDispatch();

  const mouseUpHandler = useCallback(() => {
    if (sound.state() !== "loading" && !isPlaying) {
      sound.play();
    }
  }, [sound, isPlaying]);

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      sound.pause();
      const value = Number(e.target.value);
      sound.seek(value);
    },
    [sound],
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

      dispatch(
        setCurrentTrack({
          ...data[trackIndex],
          src: `http://localhost:8222/api/tracks/getAudio?id=${data[trackIndex].id}`,
        }),
      );
    }
  };

  return (
    <Row className={controlStyles.row}>
      <Col xs={12}>
        <div className={controlStyles.time}>
          <div className={controlStyles.current}>{getStringSeek(seek)}</div>
          <div className={controlStyles.duration}>
            {getStringTrackDuration(duration)}
          </div>
        </div>
      </Col>
      <Col xs={12}>
        <input
          type="range"
          className={controlStyles.range}
          value={seek}
          min={0}
          max={duration}
          onChange={changeHandler}
          onMouseUp={mouseUpHandler}
          onTouchEnd={mouseUpHandler}
        />
      </Col>
      <Col xs={12}>
        <div className={controlStyles.buttons}>
          <button
            type="button"
            title="Предыдущий трек"
            onClick={clickHandler("prev")}
          >
            {prevSvg}
          </button>
          <button
            type="button"
            onClick={() => {
              if (sound.state() === "unloaded" || sound.state() === "loaded") {
                isPlaying ? sound.pause() : sound.play();
              }
            }}
            title={isPlaying ? "Пауза" : "Воспроизведение"}
          >
            {isPlaying ? pauseSvg : playSvg}
          </button>
          <button
            type="button"
            title="Следующий трек"
            onClick={clickHandler("next")}
          >
            {nextSvg}
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default Controls;
