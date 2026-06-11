# RTK Query

With this library, we have more control over the status of our requests and can perform actions such as:
- cache
- refetch automatic
- Polling
- Pagination

## `useGet` vs `useGetLazy`

- UseGet
  - This function is called when the component is mounted.
  - mostly used for automated searching.
 
- useGetLazy
  - It is only called when the trigger is called.

## How RTK generate the function useQuery and useQueryLazy?
RTK generate this
```javascript
export const {
  useGetEpisodesQuery,
  useGetEpisodeByIdQuery,
  useLazySearchEpisodesByNameQuery,
  useLazyGetEpisodesQuery,
  useLazyGetEpisodeByIdQuery,
  useSearchEpisodesByNameQuery
} = api;
```
- to understand better we can get this function as example `getEpisodes`
  - RTK query generateNewHooks
```javascript
api.useGetEpisodesQuery = api.endpoints.getEpisodes.useQuery;
api.useLazyGetEpisodesQuery = api.endpoints.getEpisodes.useLazyQuery;
```

- When you call `useGetEpisodesQuery()` behind the scenes rtk query do this
```javascript
function useGetEpisodesQuery() {
  const dispatch = useDispatch();

  const queryState = useSelector(
    state => state.rickAndMortyApi.queries["getEpisodes"]
  );

  useEffect(() => {
    dispatch(fetchEpisodes());
  }, [dispatch]);

  return queryState;
}
```

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
