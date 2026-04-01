import { apiSlice } from "./apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComment: builder.query({
            query: (id) => `comments/${id}`,
            providesTags: (result, error, id) => [{ type: 'Comment', id: id }]
        }),
        createComment: builder.mutation({
            query: (body) => ({ url: 'comments/', method: 'POST', body: body }),
            invalidatesTags: ['Comment']
        }),
        updateComment: builder.mutation({
            query: ({ id, data }) => ({ url: `comments/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: (result, error, id) => [{ type: 'Comment', id: id }]
        }),
        deleteComment: builder.mutation({
            query: (id) => ({ url: `comments/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Comment']
        }),
    }),
    overrideExisting: false,
})

export const { useGetCommentQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } = commentApiSlice
export default commentApiSlice