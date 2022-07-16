import { FaArrowCircleLeft } from "react-icons/fa";

const BackButton = () => {
  const previousMonth = (e) => {
    e.preventDefault();
    let navigate = 0;
    const date = new Date();
    navigate--;
    date.setMonth(new Date().getMonth() + navigate);
    console.log("HIT");
  };
  return (
    <div onClick={previousMonth} className="btn btn-reverse btn-back">
      <FaArrowCircleLeft /> Previous
    </div>
  );
};

export default BackButton;
