import { apiSlice } from "./apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => 'category',
            providesTags: (result) => result ?
                [...result.category.map(({ categoryId }) => ({ type: 'Category', id: categoryId }))]
                : [{ type: 'Category', id: 'LIST' }]
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