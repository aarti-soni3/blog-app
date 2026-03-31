import { apiSlice } from "./apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => 'category',
            providesTags: ['Category']
        }),
        getCategory: builder.query({
            query: (id) => `category/${id}`,
            providesTags: (result, error, id) => [{ type: 'Category', id: id }]
        }),
    }),
    overrideExisting: false,
})


export const { useGetAllCategoryQuery, useGetCategoryQuery } = categoryApiSlice
export default categoryApiSlice