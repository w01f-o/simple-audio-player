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
  isLoading: boolean;
  isFirstLoad: boolean;
  currentTrack: CurrentTrack | null;
  seek: number;
  duration: number;
  sound: Howl;
}

const initialState: State = {
  isFirstLoad: true,
  isPlaying: false,
  isLoading: true,
  currentTrack: null,
  seek: 0,
  duration: 0,
  sound: new Howl({
    src: " ",
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
      state.isLoading = true;
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setIsPlaying,
  setCurrentTrack,
  setSeek,
  setDuration,
  setIsLoading,
} = playerSlice.actions;

export default playerSlice.reducer;
