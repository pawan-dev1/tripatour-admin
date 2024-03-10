import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { allCourses } from "./services/allCourses";
import { loginAuth } from "./services/login";
import { courseDeletedResquest } from "./services/coursesDeletedRequest";
import { createdCourses } from "./services/createdCourse";
import { editCourse } from "./services/editCourse";
import { getDeletedRequest } from "./services/getDeletedRequest";
import { signUp } from "./services/signUpService";
import { getAllSubAdmin } from "./services/getAllSubAdmin";
import { createNewStudent } from "./services/createNewStudent";
import { getAllStudent } from "./services/getAllStudent";
import { pendingFees } from "./services/pendingFees";
import { payFees } from "./services/payFees";
import { courseDetails } from "./services/coursesDetail";
import { getCourseDetails } from "./services/getCourseDetails";
import { getAllTeamMember } from "./services/teamMember";
import { addCourseCardDesc } from "./services/addCourseCardDesc";
import { getFaqServices } from "./services/faq";
import { getCourseTopic } from "./services/getCourseTopics";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [allCourses.reducerPath]: allCourses.reducer,
    [loginAuth.reducerPath]: loginAuth.reducer,
    [courseDeletedResquest.reducerPath]: courseDeletedResquest.reducer,
    [createdCourses.reducerPath]: createdCourses.reducer,
    [editCourse.reducerPath]: editCourse.reducer,
    [getDeletedRequest.reducerPath]: getDeletedRequest.reducer,
    [signUp.reducerPath]: signUp.reducer,
    [getAllSubAdmin.reducerPath]: getAllSubAdmin.reducer,
    [createNewStudent.reducerPath]: createNewStudent.reducer,
    [getAllStudent.reducerPath]: getAllStudent.reducer,
    [pendingFees.reducerPath]: pendingFees.reducer,
    [payFees.reducerPath]: payFees.reducer,
    [courseDetails.reducerPath]: courseDetails.reducer,
    [getCourseDetails.reducerPath]: getCourseDetails.reducer,
    [getAllTeamMember.reducerPath]: getAllTeamMember.reducer,
    [addCourseCardDesc.reducerPath]: addCourseCardDesc.reducer,
    [getFaqServices.reducerPath]: getFaqServices.reducer,
    [getCourseTopic.reducerPath]: getCourseTopic.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(allCourses.middleware)
      .concat(loginAuth.middleware)
      .concat(courseDeletedResquest.middleware)
      .concat(createdCourses.middleware)
      .concat(editCourse.middleware)
      .concat(getDeletedRequest.middleware)
      .concat(signUp.middleware)
      .concat(getAllSubAdmin.middleware)
      .concat(createNewStudent.middleware)
      .concat(getAllStudent.middleware)
      .concat(pendingFees.middleware)
      .concat(payFees.middleware)
      .concat(courseDetails.middleware)
      .concat(getCourseDetails.middleware)
      .concat(getAllTeamMember.middleware)
      .concat(addCourseCardDesc.middleware)
      .concat(getCourseTopic.middleware)
      .concat(getFaqServices.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
