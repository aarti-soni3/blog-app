import { apiSlice } from "./apiSlice";

const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => 'blogs',
            providesTags: ['Blog']
        }),
        getBlog: builder.query({
            query: (id) => `blogs/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blog', id: id }]
        }),
        createBlog: builder.mutation({
            query: (data) => ({ url: '/blogs', method: "POST", body: data }),
            // providesTags: ['Blog']
        })
    }),
    overrideExisting: false,
})

export const { useGetAllBlogsQuery, useGetBlogQuery, useCreateBlogMutation } = blogApiSlice
export default blogApiSlice