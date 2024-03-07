import { Input } from "antd";
import moment from "moment";
import { useState } from "react";
import { PrimaryButton } from "../../../common/button";
import { toast } from "react-toastify";
import { usePayFeesMutation } from "../../../store/services/payFees";

///styles
import "./styles.scss";
const FeesSubmitPop = ({ stdUserId }) => {
  const [formData, setFormData] = useState({
    userId: stdUserId?.userId || "",
    fee: "",
    roll_no: stdUserId?.roll_no,
    submittedBy: "Admin",
    student_name: stdUserId?.student_name,
  });
  const [delayCalculate, setDelayCalculate] = useState(stdUserId?.fee_Delay);
  const [feesAmountError, setFeesAmountError] = useState(false);

  const [trigger, { data }] = usePayFeesMutation();

  const amountHandler = (value) => {
    setFormData((prev) => {
      return {
        ...prev,
        ["fee"]: value,
      };
    });
    const dailyFees = stdUserId?.monthly_fee / 30;
    const daysRef = value / dailyFees;
    setDelayCalculate(stdUserId?.fee_Delay - daysRef);
    if (!value) {
      setFeesAmountError(true);
    } else {
      setFeesAmountError(false);
    }
  };

  const submitFormData = () => {
    if (!formData?.fee) {
      setFeesAmountError(true);
      toast.error("Please Enter Amount"); //checking empty fields
    } else {
      setFeesAmountError(false);
      trigger(formData);
    }
  };

  return (
    <div className="popup-container">
      <div className="pending-fees-top-col">
        {/* <img src={card} alt="" /> */}
        <label>Student Name</label>
        <Input placeholder={stdUserId?.student_name} disabled />
        <label>Last Fees</label>
        <Input
          placeholder={moment(stdUserId?.fees_Date).format("DD-MM-YYYY hh:mm")}
          disabled
        />
        <label>Fees Delay</label>
        <Input
          placeholder={`${(delayCalculate / 30).toFixed(0)} Month ${(
            delayCalculate % 30
          ).toFixed(0)} Day`}
          disabled
        />
        <label>Monthly Fees</label>
        <Input placeholder={stdUserId?.monthly_fee} type="number" disabled />
        <label>Total Fees</label>
        <Input
          placeholder={Math.trunc(
            stdUserId?.monthly_fee * (delayCalculate / 30)
          )}
          type="number"
          disabled
        />
        <label>Enter Fees</label>
        <Input
          placeholder="Enter Fees"
          value={formData?.fee}
          type="number"
          style={{
            border: feesAmountError ? "1px solid red" : "",
          }}
          onChange={(e) => amountHandler(e.target.value)}
        />
      </div>
      <div className="pending-fees-bottom-col">
        <PrimaryButton
          name={"Submit"}
          bg="#6E60E4"
          fontClr="white"
          fun={submitFormData}
        />
      </div>
    </div>
  );
};

export default FeesSubmitPop;
