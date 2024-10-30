import "@/styles/component/NoResultPage/NoResultPage.css";
import { CiFaceFrown } from "react-icons/ci";

const NoResultPage = () => {
  return (
    <div className="no_result_page">
      <CiFaceFrown />
      <p>{`Sorry, We couldn't find any result`}</p>
    </div>
  );
};

export default NoResultPage;
