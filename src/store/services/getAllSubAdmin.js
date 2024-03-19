import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getAllSubAdmin = createApi({
  reducerPath: "getAllSubAdmin",
  baseQuery: dynamicBaseQuery,
  tagTypes:["getAllSubAdmin"],
  endpoints: (builder) => ({
    getAllSubAdmin: builder.query({
      query: (body) => ({
        url: "/user/admins",
        method: "GET",
        body,
      }),
      providesTags:["getAllSubAdmin"]
    }),
    getUserData: builder.query({
      query: (body) => ({
        url: "/admin/user-data",
        method: "GET",
        body,
      }),
      providesTags:["getAllSubAdmin"]
    }),
    createAdmin: builder.mutation({
      query: (body) => ({
        url: "/admin/create",
        method: "POST",
        body,
      }),
      invalidatesTags:["getAllSubAdmin"]
    }),
    deleteAdmin: builder.mutation({
      query: (body) => ({
        url: "/admin/delete",
        method: "DELETE",
        body,
      }),
      invalidatesTags:["getAllSubAdmin"]
    }),
    editAdmin: builder.mutation({
      query: (body) => ({
        url: "/admin/edit",
        method: "PUT",
        body,
      }),
      invalidatesTags:["getAllSubAdmin"]
    }),
  }),
});

export const { useGetAllSubAdminQuery,useCreateAdminMutation,useDeleteAdminMutation,useEditAdminMutation,useGetUserDataQuery} = getAllSubAdmin;
