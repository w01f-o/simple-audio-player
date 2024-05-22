import { FC } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import infoStyles from "./info.module.scss";
import TracksList from "@/components/Tracks/TracksList.tsx";
import { useAppSelector } from "@/hooks/redux.ts";
import Skeleton from "react-loading-skeleton";

const Info: FC = () => {
  const currentTrack = useAppSelector((state) => state.player.currentTrack);
  const isLoading = useAppSelector((state) => state.player.isLoading);

  return (
    <Row className={infoStyles.row}>
      <Col xs={10}>
        <div>
          <div className={infoStyles.author}>
            {isLoading ? (
              <Skeleton containerClassName={infoStyles["author-loader"]} />
            ) : (
              currentTrack?.author
            )}
          </div>
          <div className={infoStyles.name}>
            {isLoading ? (
              <Skeleton containerClassName={infoStyles["name-loader"]} />
            ) : (
              currentTrack?.name
            )}
          </div>
        </div>
      </Col>
      <Col xs={2} className={infoStyles["open-list"]}>
        <TracksList />
      </Col>
    </Row>
  );
};

export default Info;
