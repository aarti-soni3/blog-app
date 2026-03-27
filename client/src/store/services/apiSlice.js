import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorageData } from "../../utils/localStorageUtility";
import { Mutex } from 'async-mutex'
import { logout, setCredentials } from "../Slice/authSlice";

const mutex = new Mutex();

//basequery configuration
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken || getLocalStorageData(import.meta.env.VITE_ACCESSTOKEN_STORAGEKEY);

        //setting header
        headers.set('Content-Type', 'application/json')

        if (token)
            headers.set('authorization', `Bearer ${token}`)
        return headers;
    },
})

//wrapper for basequery for handling authentication
export const baseQueryWithReauth = async (args, api, extraOptions) => {

    // wait if refresh is ongoing
    await mutex.waitForUnlock();

    // re requesting 
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && (result.error.status === 401 /* || result.error.status === 403 */)) {

        const isRefreshRequest = typeof args === 'object' && args.url === '/auth/refresh';
        if (!isRefreshRequest && !mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshToken = getLocalStorageData(import.meta.env.VITE_REFRESHTOKEN_STORAGEKEY);
                const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'POST', body: { refreshToken } }, api, extraOptions);

                if (refreshResult.data) {
                    api.dispatch(setCredentials({ accessToken: refreshResult.data.accessToken, refreshToken: refreshResult.data.refreshToken, user: refreshResult.data.user }))

                    //user is authenticated and requesting to locked api endpoint
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    //logout
                    console.log('calling logout from reauth');
                    await baseQuery({ url: '/auth/logout', method: "POST" }, api, extraOptions);
                    api.dispatch(logout());
                }

            } catch (error) {
                console.log(error)
            } finally {
                // release the lock
                release();
            }
        } else {
            //queued req due to already has lock
            await mutex.waitForUnlock();

            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result;
}

//main api 
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Blog', 'Auth'],
    endpoints: () => ({}),
});