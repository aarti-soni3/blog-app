import { apiSlice } from "./apiSlice";

const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => 'blogs',
            providesTags: ['Blog']
        }),
        getBlog: builder.query({
            query: (id) => `blogs/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blog', id: id }]
        }),
    }),
    overrideExisting: false,
})


export const { useGetAllBlogsQuery, useGetBlogQuery } = postApiSlice
export default postApiSlice