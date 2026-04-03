import { apiSlice } from './apiSlice'

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id: id }]
        }),
        updateUser: builder.mutation({
            query: (body) => ({ url: `users/${body.id}`, method: 'PATCH', body: body.data }),
            invalidatesTags: (result, error, args) => [{ type: 'User', id: args.id }]
        }),
    }),
    overrideExisting: false
})

export const { useGetUserQuery, useUpdateUserMutation } = userApiSlice
export default userApiSlice