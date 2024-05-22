import { Dispatch, FC, HTMLAttributes, memo, SetStateAction } from "react";
import tracksStyles from "./tracks.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import clsx from "clsx";
import { setCurrentTrack } from "@/store/player/playerSlice.ts";
import { Img } from "react-image";
import Skeleton from "react-loading-skeleton";

interface Props extends Pick<HTMLAttributes<HTMLDivElement>, "onClick"> {
  track: Track;
  img: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TracksItem: FC<Props> = memo(({ track, img, setIsOpen }) => {
  const currentTrack = useAppSelector((state) => state.player.currentTrack);

  const dispatch = useAppDispatch();

  const clickHandler = (): void => {
    if (currentTrack?.id !== track.id) {
      dispatch(setCurrentTrack(track));
      setIsOpen(false);
    }
  };

  return (
    <div
      className={clsx({
        [tracksStyles.item]: true,
        [tracksStyles.current]: currentTrack?.id === track.id,
      })}
      onClick={clickHandler}
    >
      <div className={tracksStyles.img}>
        <Img
          src={img}
          loader={
            <Skeleton
              circle={true}
              containerClassName={tracksStyles["img-loader"]}
            />
          }
        />
      </div>
      <div className={tracksStyles.info}>
        <span>{track.author}</span> <span>-</span> <span>{track.name}</span>
      </div>
    </div>
  );
});

export default TracksItem;
