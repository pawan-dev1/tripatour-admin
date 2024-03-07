import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getAllStudent = createApi({
  reducerPath: "getAllStudent",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getAllStudent: builder.mutation({
      query: (body) => ({
        url: "/student/students-perpage",
        method: "POST",
        body,
      }),
    }),
    editStudent: builder.mutation({
      query: (body) => ({
        url: "/student/edit-student",
        method: "PUT",
        body,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (body) => ({
        url: "/student/delete-student",
        method: "DELETE",
        body,
      }), 
    }),
  }),
});

export const { useGetAllStudentMutation, useEditStudentMutation, useDeleteStudentMutation } = getAllStudent;
