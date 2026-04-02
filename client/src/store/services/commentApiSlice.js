import { apiSlice } from "./apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComment: builder.query({
            query: (id) => `comments/${id}`,
            providesTags: (result, error, id) => [{ type: 'Comment', id: id }]
        }),
        createComment: builder.mutation({
            query: (body) => ({ url: 'comments/', method: 'POST', body: body }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }]
        }),
        updateComment: builder.mutation({
            query: ({ commentId, data }) => ({ url: `comments/${commentId}`, method: 'PATCH', body: data }),
            invalidatesTags: (result, error, { blogId }) => [{ type: 'Blog', id: blogId }]
        }),
        deleteComment: builder.mutation({
            query: ({ commentId }) => ({ url: `comments/${commentId}`, method: 'DELETE' }),
            invalidatesTags: (result, error, { blogId }) => [{ type: 'Blog', id: blogId }]
        }),
    }),
    overrideExisting: false,
})

export const { useGetCommentQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } = commentApiSlice
export default commentApiSlice