import { FaExclamationTriangle } from "react-icons/fa";
import CardWrapper from "./CardWrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops something went wrong"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full items-center justify-center flex ">
        <FaExclamationTriangle size={24} className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
