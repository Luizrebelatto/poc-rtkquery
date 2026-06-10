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


RTK QUERY
```
RTK Query

Button
  ↓
favoriteEpisode()
  ↓
PATCH
  ↓
invalidatesTags
  ↓
refetch/cache update
  ↓
UI atualiza
```

Thunk
```
Thunk

Button
  ↓
dispatch(thunk)
  ↓
pending
  ↓
PATCH
  ↓
fulfilled ou rejected
  ↓
reducer atualiza state
  ↓
UI atualiza
```

Saga
```
Saga

Button
  ↓
dispatch(request action)
  ↓
saga escuta action
  ↓
call PATCH
  ↓
put success/failure
  ↓
reducer atualiza state
  ↓
UI atualiza
```
