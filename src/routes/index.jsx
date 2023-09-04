import { Routes, Route } from "react-router-dom";
import { TablePage } from "../pages/TablePage";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<TablePage />} />
    </Routes>
  );
};
