import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getAllStudent = createApi({
  reducerPath: "getAllStudent",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getAllStudent: builder.mutation({
      query: (body) => ({
        url: "/student/lists",
        method: "POST",
        body,
      }),
    }),
    editStudent: builder.mutation({
      query: (body) => ({
        url: "/student/edit-info",
        method: "PUT",
        body,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (body) => ({
        url: "/student/delete",
        method: "DELETE",
        body,
      }), 
    }),
  }),
});

export const { useGetAllStudentMutation, useEditStudentMutation, useDeleteStudentMutation } = getAllStudent;
