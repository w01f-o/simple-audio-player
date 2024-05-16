import Player from "@/components/Player/Player.tsx";
import PlayerProvider from "@/components/PlayerProvider/PlayerProvider.tsx";

import "@/styles/App.scss";
import "@w01f-o/react-grid-layout/css";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  return (
    <>
      <PlayerProvider>
        <Player />
      </PlayerProvider>
    </>
  );
};

export default App;
