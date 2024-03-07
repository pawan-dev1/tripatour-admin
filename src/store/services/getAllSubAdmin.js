import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getAllSubAdmin = createApi({
  reducerPath: "getAllSubAdmin",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getAllSubAdmin: builder.mutation({
      query: (body) => ({
        url: "/user/admins",
        method: "GET",
        body,
      }),
    }),
  }),
});

export const { useGetAllSubAdminMutation } = getAllSubAdmin;
