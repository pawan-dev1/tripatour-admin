import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getTourPackages = createApi({
  reducerPath: "category",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getTourCategory: builder.query({
      query: (body) => ({
        url: "/tour/allPackages", 
        method: "GET",
        body,
      }),
      providesTags:["category"]
    }),
    addTourPackages: builder.mutation({
      query: (body) => ({
        url: `/tour/addToursByCategory/${body.id}`,
        method: "POST",
        body:body.data,
      }),
      invalidatesTags:["category"]
    }),
    editTourPackages: builder.mutation({
      query: (body) => ({
        url: `/tour/updateTourByTourId/${body.id}`,
        method: "PUT",
        body:body.data
      }),
      invalidatesTags:["category"]
    }),
    deleteTourPackage: builder.mutation({
      query: (body) => ({
        url: `/tour/deletetoursBytourId/${body.id}`,
        method: "DELETE",
        }), 
      invalidatesTags:["category"]
    }),
  }),
});

export const { useGetTourCategoryQuery, useAddTourPackagesMutation, useEditTourPackagesMutation, useDeleteTourPackageMutation } = getTourPackages;
