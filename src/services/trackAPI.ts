import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Track } from "@/types/tracks.type.ts";

export const tracksAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
  }),
  reducerPath: "tracksAPI",
  endpoints: (build) => ({
    fetchAllTracks: build.query<Track[], void>({
      query: () => ({
        url: "/tracks",
      }),
    }),
  }),
});
