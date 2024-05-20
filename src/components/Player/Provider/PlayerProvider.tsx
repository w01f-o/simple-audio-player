import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import {
  setCurrentTrack,
  setDuration,
  setIsLoading,
  setIsPlaying,
  setSeek,
} from "@/store/player/playerSlice.ts";
import { tracksAPI } from "@/services/trackAPI.ts";

interface Props {
  children: ReactNode;
}

const PlayerProvider: FC<Props> = ({ children }) => {
  const { sound, isPlaying, currentTrack } = useAppSelector(
    (state) => state.player,
  );
  const { data, isLoading } = tracksAPI.useFetchAllTracksQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(
        setCurrentTrack({
          ...data[0],
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    const seekInterval = setInterval(() => {
      if (sound !== null && isPlaying && sound.state() === "loaded") {
        dispatch(setSeek(sound.seek()));
      }
    }, 1000);

    return () => clearInterval(seekInterval);
  }, [sound, isPlaying]);

  useEffect(() => {
    const spaceButtonPressHandler = (e: KeyboardEvent): void => {
      if (sound !== null && e.code === "Space") {
        isPlaying ? sound.pause() : sound.play();
      }
    };

    document.addEventListener("keypress", spaceButtonPressHandler);

    return () =>
      document.removeEventListener("keypress", spaceButtonPressHandler);
  }, [sound, isPlaying]);

  useEffect(() => {
    if (sound !== null) {
      const playHandler = (): void => {
        dispatch(setIsPlaying(true));
        dispatch(setIsLoading(false));
      };

      const pauseHandler = (): void => {
        dispatch(setIsPlaying(false));
      };

      const endHandler = (): void => {
        if (data && !isLoading) {
          const nextTracksIndex =
            data.findIndex((track) => track.id === currentTrack!.id) + 1;

          if (data.length === nextTracksIndex) {
            sound.pause();
            return;
          }

          dispatch(
            setCurrentTrack({
              ...data[nextTracksIndex],
            }),
          );
        }
      };

      const seekHandler = (): void => {
        dispatch(setSeek(sound.seek()));
      };

      const loadHandler = (): void => {
        dispatch(setDuration(sound.duration()));
        dispatch(setIsLoading(false));
      };

      const playErrorHandler = (): void => {
        throw new Error("Failed to play track");
      };

      const loadErrorHandler = (): void => {
        throw new Error("Failed to play track");
      };

      sound.on("pause", pauseHandler);
      sound.on("play", playHandler);
      sound.on("seek", seekHandler);
      sound.on("load", loadHandler);
      sound.on("playerror", playErrorHandler);
      sound.on("end", endHandler);
      sound.on("loaderror", loadErrorHandler);

      return () => {
        sound.off("pause", pauseHandler);
        sound.off("play", playHandler);
        sound.off("seek", seekHandler);
        sound.off("load", loadHandler);
        sound.off("playerror", playErrorHandler);
        sound.off("end", endHandler);
        sound.off("loaderror", loadErrorHandler);
      };
    }
  }, [sound, isPlaying]);

  return children;
};

export default PlayerProvider;
