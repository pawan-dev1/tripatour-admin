// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from './BadRequestHandler/BadRequestHandler'

// Define a service using a base URL and expected endpoints
export const getCourseDetails = createApi({
    reducerPath: 'getCourseDetails',
    baseQuery:dynamicBaseQuery,
    endpoints: (builder) => ({
        getCourseDetails: builder.query({
            query: (body) => ({
                url: `course/get-course-detail`,
                method: 'POST',
                body
            }),
        }),
        
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCourseDetailsQuery } = getCourseDetails