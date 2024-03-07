import { useCreateNewStudentMutation } from "../../store/services/createNewStudent";

import StudentForm from "./StudentForm";

///styles
import "./styles.scss";
import { BreadCrum } from "../../components/breadCrume";

const AddNewStudentForm = () => {
  return (
    <div>
      <BreadCrum name={"Add New Student"} sub={""} />
      <StudentForm />
    </div>
  );
};

export default AddNewStudentForm;
