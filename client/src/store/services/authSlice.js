import { apiSlice } from "./apiSlice";


const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({ url: 'auth/register', method: 'POST', body: body }),
            invalidatesTags: ['User', 'Auth'] //TODO add
        }),
        loginUser: builder.mutation({
            query: (body) => ({ url: 'auth/login', method: 'POST', body: body }),
            invalidatesTags: ['User', 'Auth'] //TODO add
        }),
    }),
    overrideExisting: false,
})

export const { useRegisterUserMutation, useLoginUserMutation } = authSlice
export default authSlice