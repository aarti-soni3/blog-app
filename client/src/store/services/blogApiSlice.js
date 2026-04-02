import { apiSlice } from "./apiSlice";

// generaic [individual & list] : ['Blog']
// fetch list : [{ type: 'Blog', id: 'LIST' }]

// fetch all individual & list if specified : (result) => result ?
//                 [...result.blogs.map(({ id }) => ({ type: 'Blog', id })), { type: 'Blog', id: 'LIST' }]
//                 : [{ type: 'Blog', id: 'LIST' }]

// fetch only with specific id : (result, error, id) => [{ type: 'Blog', id }]

const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => 'blogs',
            providesTags: (result) => result ?
                [...result.blogs.map(({ blogId }) => ({ type: 'Blog', id: blogId })), { type: 'Blog', id: 'LIST' }]
                : [{ type: 'Blog', id: 'LIST' }]
        }),
        getBlog: builder.query({
            query: (id) => `blogs/${id}`,
            providesTags: (result, error, id) => [{ type: 'Blog', id }]
        }),
        createBlog: builder.mutation({
            query: (data) => ({ url: '/blogs', method: "POST", body: data }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }]
        }),
        updateBlog: builder.mutation({
            query: ({ id, data }) => ({ url: `/blogs/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id } /*, { type: 'Blog', id: 'LIST' }*/],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({ url: `/blogs/${id}`, method: 'DELETE' }),
            invalidatesTags: (result, error, id) => [{ type: 'Blog', id }/*, { type: 'Blog', id: 'LIST' }*/],
        })
    }),
    overrideExisting: false,
})

export const { useGetAllBlogsQuery, useGetBlogQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApiSlice
export default blogApiSlice