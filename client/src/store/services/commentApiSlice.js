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
        })
    }),
    overrideExisting: false,
})

export const { useGetCommentQuery,useCreateCommentMutation } = commentApiSlice
export default commentApiSlice