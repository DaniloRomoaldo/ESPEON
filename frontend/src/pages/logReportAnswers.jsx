/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLogReportData } from "../api/logAnswers";

import HamburguerMenu from "../components/HamburguerMenu";
import DrawerMenu from "../components/DrawerMenu";
import ReportQueryModal from "../components/dataTableAnswers/ReportQueryModal";

import LogActivitiesTable from "../layouts/LogActivitiesTable";

export default function LogReportAnswers() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiFilters, setApiFilters] = useState(null);

  const handleApiSearch = (formData) => {
    setApiFilters(formData);
    setIsModalOpen(false);
  };

  const {
    data: reportData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["logReport", apiFilters],
    queryFn: () => getLogReportData(apiFilters),
    enabled: !!apiFilters,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 ">
        <div className="absolute top-6 left-6 z-30">
          <HamburguerMenu onOpen={() => setIsDrawerOpen(true)} />
        </div>

        <p className="text-gray-900 text-4xl md:text-6xl dark:text-white mt-16 md:mt-8">
          Registro de Respostas
        </p>

        <div className="mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isLoading}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-wait"
            type="button"
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        <div className="w-full max-w-7xl mt-8">
          {" "}
          {isLoading && (
            <p className="text-center text-white text-lg">
              Carregando dados...
            </p>
          )}
          {isError && (
            <p className="text-center text-red-500 text-lg">
              Erro ao buscar dados: {error.message}
            </p>
          )}
          {!isLoading && !isError && reportData && reportData.length > 0 && (
            <LogActivitiesTable data={reportData} />
          )}
          {!isLoading && !isError && reportData && reportData.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              Nenhum registro encontrado.
            </p>
          )}
          {!isLoading && !isError && !reportData && (
            <p className="text-center text-gray-500 mt-10"></p>
          )}
        </div>
      </div>

      <ReportQueryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleApiSearch}
      />

      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
