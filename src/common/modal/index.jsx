import { Modal } from "antd";
////styles
import "./styles.scss";
const PrimaryModal = ({
  setIsModalOpen,
  isModalOpen,
  title,
  element,
  onFinish,
  width
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    onFinish();
    // setIsModalOpen(false);
  };
  console.log(width)
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      destroyOnClose
      footer={null}
      className={width ?"model-comp":""}
    >
      {element}
    </Modal>
  );
};

export default PrimaryModal;
