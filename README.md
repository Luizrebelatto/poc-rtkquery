# RTK Query

With this library, we have more control over the status of our requests and can perform actions such as:
- cache
- refetch automatic
- Polling
- Pagination


## Request with RTK Query
```javascript
favoriteEpisode: builder.mutation<
  Episode,
  { id: number; favorite: boolean }
>({
  query: ({ id, favorite }) => ({
    url: `/episodes/${id}`,
    method: "PATCH",
    body: { favorite },
  }),

  invalidatesTags: (_result, _error, { id }) => [
    { type: "Episodes", id },
    { type: "Episodes", id: "LIST" },
  ],
});
```
