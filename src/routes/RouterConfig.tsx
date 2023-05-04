import { Navigate, Route, Routes } from "react-router-dom";
import BaseLayout from "components/BaseLayout";
import Modal from "components/Modal";
import Challenge from "pages/Challenge";
import HomePage from "pages/Home";
import DigitTestPage from "pages/Test/Digit";
import RowTestPage from "pages/Test/Row";
import Practice from "pages/Practice";
import { ROUTES_PATH_HOME, ROUTES_PARAMS_ALL, ROUTES_PATH_CHALLENGE, ROUTES_PATH_PRACTICE, ROUTES_PATH_TEST_DIGIT, ROUTES_PATH_TEST_ROW } from '../constants/Routes';

const RouterConfig = () => {
  return (
    <Routes>
      <Route element={
        <>
          <BaseLayout />
          <Modal></Modal>
        </>
      }>
        {/* <Route path={ROUTES_PATH_HOME} element={<HomePage />} /> */}
        <Route path={ROUTES_PATH_HOME} element={<Navigate replace to={ROUTES_PATH_CHALLENGE} />} />
        <Route path={ROUTES_PATH_CHALLENGE} element={<Challenge />} />
        <Route path={ROUTES_PATH_PRACTICE} element={<Practice />} />
        <Route path={ROUTES_PATH_TEST_ROW} element={<RowTestPage />} />
        <Route path={ROUTES_PATH_TEST_DIGIT} element={<DigitTestPage />} />
      </Route>
      <Route path={ROUTES_PARAMS_ALL} element={<Navigate replace to={ROUTES_PATH_CHALLENGE} />} />
    </Routes>
  )
}
export default RouterConfig;