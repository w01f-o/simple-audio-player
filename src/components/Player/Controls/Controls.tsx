import { Col, Row } from "@w01f-o/react-grid-layout";
import { FC } from "react";
import controlStyles from "./controls.module.scss";
import ProgressBar from "@/components/Player/Controls/ProgressBar.tsx";
import Buttons from "@/components/Player/Controls/Buttons.tsx";
import Time from "@/components/Player/Controls/Time.tsx";

const Controls: FC = () => {
  return (
    <Row className={controlStyles.row}>
      <Col xs={12}>
        <Time />
      </Col>
      <Col xs={12}>
        <ProgressBar />
      </Col>
      <Col xs={12}>
        <Buttons />
      </Col>
    </Row>
  );
};

export default Controls;
