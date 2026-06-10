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


### RTK QUERY

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

### Thunk

<img width="488" height="586" alt="Screenshot 2026-06-10 at 09 34 30" src="https://github.com/user-attachments/assets/f1704214-c41a-4e32-840b-1eb26bed284b" />

```javascript
const thunk =
  ({ dispatch, getState }) =>
  next =>
  action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    return next(action);
  };

const fetchEpisodes = () => async dispatch => {
  dispatch({ type: "episodes/loading" });

  try {
    const res = await fetch("https://rickandmortyapi.com/api/episode");
    const data = await res.json();

    dispatch({
      type: "episodes/success",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "episodes/error",
      payload: error,
    });
  }
};

dispatch(fetchEpisodes());
```


### Saga
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
