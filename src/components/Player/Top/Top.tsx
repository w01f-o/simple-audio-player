import { FC, useMemo } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import topStyles from "./top.module.scss";
import { useAppSelector } from "@/hooks/redux.ts";
import { trackAuthor } from "../../../enums/trackAuthors.ts";

const Top: FC = () => {
  const currentTrackAuthor = useAppSelector(
    (state) => state.player.currentTrack?.author,
  );

  const videoSrc = useMemo(() => {
    switch (currentTrackAuthor) {
      case trackAuthor.elizar:
        return "/video/elizar.mp4";
      case trackAuthor.vadim:
        return "/video/vadim.mp4";
      default:
        return "/video/vadim.mp4";
    }
  }, [currentTrackAuthor]);

  return (
    <Row className={topStyles.row}>
      <Col md={6} xs={12}>
        <h1 className={topStyles.title}>Наши хиты</h1>
      </Col>
      <Col md={6} xs={12}>
        <div className={topStyles.video}>
          <video autoPlay loop src={videoSrc} muted></video>
        </div>
      </Col>
    </Row>
  );
};

export default Top;
