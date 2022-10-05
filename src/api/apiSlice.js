import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['loadHeroes'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['loadHeroes']
        }),
        addHero: builder.mutation({
            query: hero => ({
            url: '/heroes',
            method: 'POST',
            body: hero
            }),
            invalidatesTags: ['loadHeroes']
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['loadHeroes']
        })
    })
})

export const {useGetHeroesQuery, useAddHeroMutation, useDeleteHeroMutation} = apiSlice;
