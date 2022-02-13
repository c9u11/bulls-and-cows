import { Route, Routes } from "react-router-dom";
import Challenge from "../pages/Challenge";
import HomePage from "../pages/Home";
import DigitTestPage from "../pages/Test/Digit";
import RowTestPage from "../pages/Test/Row";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path={"/test/digit"} element={<DigitTestPage />} />
      <Route path={"/test/row"} element={<RowTestPage />} />
      <Route path={"/challenge"} element={<Challenge />} />
      <Route path={"/"} element={<HomePage />} />
    </Routes>
  )
}
export default RouterConfig;