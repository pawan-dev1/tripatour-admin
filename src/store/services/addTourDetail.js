// 


import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const packageDetail = createApi({
  reducerPath: "packageDetail",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getPackage: builder.mutation({
      query: (body) => ({
        url: "/tourDetails/getTourDetails",
        method: "POST",
        body
      }),
      providesTags:["category"]
    }),
    getPackageDetail: builder.query({
      query: (body) => ({
        url: `/package/PackageGetById/${body}`,
        method: "GET",
      }),
      providesTags:["category"]
    }),
    addPackageDetail: builder.mutation({
      query: (body) => ({
        url: "/package/addPackage",
        method: "POST",
        body,
      }),
      invalidatesTags:["category"]
    }),
    editPackageDetails: builder.mutation({
      query: (body) => ({
        url: `/tourDetails/updateTourDetails/${body.id}`,
        method: "PUT",
        body:body.data
      }),
      invalidatesTags:["category"]
    }),
    // deleteCategory: builder.mutation({
    //   query: (body) => ({
    //     url: `/category/deleteCategory/${body.id}`,
    //     method: "DELETE",
    //     }), 
    //   // invalidatesTags:["category"]
    // }),
  }),
});

export const { useAddPackageDetailMutation,useEditPackageDetailsMutation, useGetPackageMutation ,useGetPackageDetailQuery} = packageDetail;
