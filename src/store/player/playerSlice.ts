import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Howl } from "howler";

interface CurrentTrack {
  name: string;
  author: string;
  id: string;
  src: string;
}

interface State {
  isPlaying: boolean;
  currentTrack: CurrentTrack | null;
  seek: number;
  duration: number;
  isFirstLoad: boolean;
  sound: Howl;
}

const initialState: State = {
  isPlaying: false,
  currentTrack: null,
  seek: 0,
  duration: 0,
  isFirstLoad: true,
  sound: new Howl({
    src: `null`,
    html5: true,
    format: "mp3",
    volume: 0.1,
  }),
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<CurrentTrack | null>) => {
      state.currentTrack = action.payload;
      state.seek = 0;
      if (action.payload) {
        state.sound.stop();
        state.isPlaying = false;
        state.sound = new Howl({
          src: action.payload.src,
          html5: true,
          format: "mp3",
          volume: 0.1,
        });
        if (!state.isFirstLoad) {
          state.sound.play();
        }
        state.isFirstLoad = false;
      }
    },
    setSeek: (state, action: PayloadAction<number>) => {
      state.seek = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
  },
});

export const { setIsPlaying, setCurrentTrack, setSeek, setDuration } =
  playerSlice.actions;

export default playerSlice.reducer;
