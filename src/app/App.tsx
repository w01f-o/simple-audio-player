import Player from "@/components/Player/Player.tsx";
import PlayerProvider from "@/components/Player/Provider/PlayerProvider.tsx";

import "@/styles/App.scss";
import "@w01f-o/react-grid-layout/css";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary.tsx";

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <PlayerProvider>
          <Player />
        </PlayerProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
