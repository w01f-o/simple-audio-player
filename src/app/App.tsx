import Player from "@/components/Player/Player.tsx";
import "@/styles/App.scss";
import "@w01f-o/react-grid-layout/css";
import PlayerProvider from "@/components/PlayerProvider/PlayerProvider.tsx";

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
