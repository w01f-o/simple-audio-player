import { FC } from "react";
import controlStyles from "@/components/Player/Controls/controls.module.scss";
import Skeleton from "react-loading-skeleton";
import { getStringTime } from "@/utils/getStringSeek.ts";
import { useAppSelector } from "@/hooks/redux.ts";

const Time: FC = () => {
  const { seek, duration, isLoading } = useAppSelector((state) => state.player);

  return (
    <div className={controlStyles.time}>
      <div className={controlStyles.current}>
        {isLoading ? <Skeleton /> : getStringTime(seek)}
      </div>
      <div className={controlStyles.duration}>
        {isLoading ? <Skeleton /> : getStringTime(duration)}
      </div>
    </div>
  );
};

export default Time;
