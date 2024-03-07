export const columns = [
  {
    title: "Course Name",
    dataIndex: "CourseName",
    key: "CourseName",
    // filteredValue: [searchText],

    onFilter: (value, record) => {
      return String(record.CourseName)
        .toLowerCase()
        .includes(value.toLowerCase());
    },
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    title: "Create Time",
    dataIndex: "createdTime",
    key: "createdTime",
  },
  {
    title: "Edit",
    dataIndex: "edit",
    key: "edit",
  },
];
