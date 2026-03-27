import { apiSlice } from './apiSlice'

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id: id }]
        }),
    }),
    overrideExisting: false
})

export const { useGetUserQuery } = userApiSlice
export default userApiSlice