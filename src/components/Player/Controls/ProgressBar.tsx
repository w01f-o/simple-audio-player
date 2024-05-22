import { ChangeEvent, FC, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import controlStyles from "@/components/Player/Controls/controls.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { setIsLoading } from "@/store/player/playerSlice.ts";

const ProgressBar: FC = () => {
  const { seek, duration, isLoading, isPlaying, sound } = useAppSelector(
    (state) => state.player,
  );
  const dispatch = useAppDispatch();

  const mouseUpHandler = useCallback(() => {
    if (sound!.state() === "loaded" && !isPlaying && !isLoading) {
      dispatch(setIsLoading(true));
      sound!.play();
    }
  }, [sound, isPlaying, isLoading, dispatch]);

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

  return (
    <>
      {isLoading ? (
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
    </>
  );
};

export default ProgressBar;
