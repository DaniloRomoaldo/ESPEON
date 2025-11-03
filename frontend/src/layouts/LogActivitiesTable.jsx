/* eslint-disable no-unused-vars */
// src/layouts/LogActivitiesTable.jsx
/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import LogFilterForm from "../components/dataTableAnswers/LogFilterTable";
import LogResultTable from "../components/dataTableAnswers/LogResultTable";
import AnswersCheckModal from "../components/dataTableAnswers/AnswersCheckModal";

const ITEMS_PER_PAGE = 10;

export default function LogActivitiesTable({ data = [], onRowClick }) {
  const [clientFilters, setClientFilters] = useState({
    list_name: "",
    exercise_name: "",
    user_email: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const listMatch = item.list_name
        ?.toLowerCase()
        .includes(clientFilters.list_name.toLowerCase());
      const exerciseMatch = item.exercise_name
        ?.toLowerCase()
        .includes(clientFilters.exercise_name.toLowerCase());
      const userMatch = item.user_email
        ?.toLowerCase()
        .includes(clientFilters.user_email.toLowerCase());
      return listMatch && exerciseMatch && userMatch;
    });
  }, [data, clientFilters]);

  const totalItemsCount = filteredData.length;
  const totalPages = Math.ceil(totalItemsCount / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const handleFilterChange = (newFilters) => {
    setClientFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto mt-8">
        <LogFilterForm onFilterChange={handleFilterChange} />

        <LogResultTable
          currentItems={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItemsCount={totalItemsCount}
          itemsPerPage={ITEMS_PER_PAGE}
          onRowClick={handleRowClick}
        />
      </div>

      <AnswersCheckModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
