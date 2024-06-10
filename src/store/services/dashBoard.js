import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getDashboard = createApi({
    reducerPath: "dashboard",
    baseQuery: dynamicBaseQuery,
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => ({
                url: "/enquiry/totalDashBoardDataCount",
                method: "GET"
            })
        })
    })
})
export const {useGetDashboardQuery} = getDashboard;