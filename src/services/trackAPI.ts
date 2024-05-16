import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tracksAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8222/api" }),
  reducerPath: "tracksAPI",
  endpoints: (build) => ({
    fetchAllTracks: build.query<Track[], void>({
      query: () => ({
        url: "/tracks",
      }),
    }),
  }),
});
