import {
  createApi,
  fetchBaseQuery,
  TagDescription,
} from "@reduxjs/toolkit/query/react";
import type { Episode, EpisodeResponse } from "../types/episode";

export const api = createApi({
  reducerPath: "rickAndMortyService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api/",
  }),

  tagTypes: ["Episodes"],

  endpoints: (builder) => ({
    getEpisodes: builder.query<EpisodeResponse, number | void>({
      query: (page) => {
        if (page) {
          return `episode?page=${page}`;
        }

        return "episode";
      },

      providesTags: (result) => {
        if (!result) {
          return [{ type: "Episodes", id: "LIST" }];
        }

        const episodeTags: TagDescription<"Episodes">[] = [];
        for (const episode of result.results) {
          episodeTags.push({ type: "Episodes", id: episode.id });
        }

        return [...episodeTags, { type: "Episodes", id: "LIST" }];
      },
    }),

    getEpisodeById: builder.query<Episode, number>({
      query: (id) => `episode/${id}`,

      providesTags: (result, error, id) => [{ type: "Episodes", id }],
    }),

    searchEpisodesByName: builder.query<EpisodeResponse, string>({
      query: (name) => `episode/?name=${name}`,
    }),
  }),
});

export const {
  useGetEpisodesQuery,
  useGetEpisodeByIdQuery,
  useLazySearchEpisodesByNameQuery,
  useLazyGetEpisodesQuery,
  useLazyGetEpisodeByIdQuery,
  useSearchEpisodesByNameQuery
} = api;
