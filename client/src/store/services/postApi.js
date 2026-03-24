import { apiSlice } from "./apiSlice";

const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query({ query: () => 'posts', providesTags: ['Post'] }),
        getPost: builder.query({ query: (id) => `posts/${id}`, providesTags: (result, error, id) => [{ type: 'Post', id: id }] }),
    }),
    overrideExisting: false,
})


export const { useGetAllPostsQuery, useGetPostQuery } = postApiSlice
export default postApiSlice