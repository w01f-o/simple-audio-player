import { FC, useEffect, useState } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import topStyles from "./top.module.scss";
import { useAppSelector } from "@/hooks/redux.ts";
import { trackAuthor } from "../../../enums/trackAuthors.ts";

const Top: FC = () => {
  const { currentTrack } = useAppSelector((state) => state.player);
  const [videoSrc, setVideoSrc] = useState<string>("");

  useEffect(() => {
    switch (currentTrack?.author) {
      case trackAuthor.elizar:
        setVideoSrc("/video/elizar.mp4");
        break;

      case trackAuthor.vadim:
        setVideoSrc("/video/vadim.mp4");
        break;

      default:
        setVideoSrc("/video/vadim.mp4");
        break;
    }
  }, [currentTrack?.author]);

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
