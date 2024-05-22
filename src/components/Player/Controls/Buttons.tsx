import controlStyles from "@/components/Player/Controls/controls.module.scss";
import { nextSvg, pauseSvg, playSvg, prevSvg } from "@/assets/svg/svg.tsx";
import { setCurrentTrack } from "@/store/player/playerSlice.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { tracksAPI } from "@/services/trackAPI.ts";
import { FC } from "react";

const Buttons: FC = () => {
  const sound = useAppSelector((state) => state.player.sound);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);
  const currentTrack = useAppSelector((state) => state.player.currentTrack);
  const isTrackLoading = useAppSelector((state) => state.player.isLoading);

  const { data, isLoading } = tracksAPI.useFetchAllTracksQuery();
  const dispatch = useAppDispatch();

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
  );
};

export default Buttons;
