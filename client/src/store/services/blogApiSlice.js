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
            invalidatesTags: ['Blog']
        }),
        updateBlog: builder.mutation({
            query: ({ id, data }) => ({ url: `/blogs/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }, { type: 'Blog', id: 'LIST' }],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({ url: `/blogs/${id}`, method: 'DELETE' }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }, { type: 'Blog', id: 'LIST' }],
        })
    }),
    overrideExisting: false,
})

export const { useGetAllBlogsQuery, useGetBlogQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApiSlice
export default blogApiSlice