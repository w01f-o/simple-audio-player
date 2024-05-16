import { FC } from "react";
import { Container } from "@w01f-o/react-grid-layout";
import Controls from "@/components/Player/Controls/Controls.tsx";
import Top from "@/components/Player/Top/Top.tsx";
import Info from "@/components/Player/Info/Info.tsx";
import playerStyles from "./player.module.scss";

const Player: FC = () => {
  return (
    <Container className={`${playerStyles.container} offset-0`}>
      <Top />
      <div className={playerStyles.shadowContainer}>
        <Info />
        <Controls />
      </div>
    </Container>
  );
};

export default Player;
