import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const filtersAdapter = createEntityAdapter({
    selectId: filters => filters.element
});
const initialState = filtersAdapter.getInitialState({
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request('http://localhost:3001/filter');
    }
);

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChange: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = "loading"
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                filtersAdapter.setAll(state, action.payload);
                state.filtersLoadingStatus = 'idle'
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error'
            })
    }
});

const { actions, reducer } = filterSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);



export default reducer;
export const {filterChange} = actions;