import { apiSlice } from "./apiSlice";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        accessUser: builder.query({
            query: () => ({ url: 'auth/access', method: 'GET', }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation({
            query: (body) => ({ url: 'auth/login', method: 'POST', body: body }),
            invalidatesTags: ['User', 'Auth'] //TODO add
        }),
        registerUser: builder.mutation({
            query: (body) => ({ url: 'auth/register', method: 'POST', body: body }),
            invalidatesTags: ['User', 'Auth'] //TODO add
        }),
        refreshToken: builder.mutation({
            query: (refreshToken) => ({ url: 'auth/refresh', method: 'POST', body: { refreshToken } }),
            invalidatesTags: ['User', 'Auth'],
        }),
        logoutUser: builder.mutation({
            query: () => ({ url: 'auth/logout', method: "POST" }),
            invalidatesTags: ['User'],
        })
    }),
    overrideExisting: false,
})

export const { useRegisterUserMutation, useLoginUserMutation, useAccessUserQuery, useRefreshTokenMutation, useLogoutUserMutation } = authApiSlice
export default authApiSlice