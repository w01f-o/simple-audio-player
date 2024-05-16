import { FC, useState } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import infoStyles from "./info.module.scss";
import { trackListSvg } from "@/components/Player/Controls/svg/svg.tsx";
import TracksList from "@/components/Tracks/TracksList.tsx";
import { useAppSelector } from "@/hooks/redux.ts";
import Skeleton from "react-loading-skeleton";

const Info: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { currentTrack, isLoading } = useAppSelector((state) => state.player);

  return (
    <Row className={infoStyles.row}>
      <TracksList isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
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
        <button
          onClick={() => setModalIsOpen(!modalIsOpen)}
          type="button"
          title="Список треков"
        >
          {trackListSvg}
        </button>
      </Col>
    </Row>
  );
};

export default Info;
