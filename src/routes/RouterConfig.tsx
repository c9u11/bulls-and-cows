import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayout from "components/BaseLayout";
import Modal from "components/Modal";
import Challenge from "pages/Challenge";
import HomePage from "pages/Home";
import DigitTestPage from "pages/Test/Digit";
import RowTestPage from "pages/Test/Row";

const RouterConfig = () => {
  return (
    <Routes>
      <Route element={
        <>
          <BaseLayout />
          <Modal></Modal>
        </>
      }>
        <Route path="/home" element={<HomePage />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/test/row" element={<RowTestPage />} />
        <Route path="/test/digit" element={<DigitTestPage />} />
      </Route>
      <Route path="/*" element={<Navigate replace to="/home" />} />
    </Routes>
  )
}
export default RouterConfig;