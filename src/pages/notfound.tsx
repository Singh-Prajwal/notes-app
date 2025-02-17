import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div>
      <h3>404 - Page Not Found!</h3>
      <a onClick={goHome}>Go Home</a>
    </div>
  );
};

export default NotFound;
