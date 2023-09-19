import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiSummarizerKey = import.meta.env.VITE_RAPID_API_SUMMARIZER_KEY;

export const textApi = createApi({
  reducerPath: 'textApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', rapidApiSummarizerKey);
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.url)}&length=${params.paragraphs}`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = textApi;