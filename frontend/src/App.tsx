import { Route, Routes } from "react-router-dom";
import { AppRoute } from "./common/enums/app-route.enum";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path={AppRoute.HOME} element={<HomePage />} />
      </Routes>
    </div>
  );
}
