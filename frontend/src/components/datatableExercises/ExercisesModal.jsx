/* eslint-disable react/prop-types */

import DatatableExercisesRow from "./DatatableExercicesRow"; // CAMINHO CORRIGIDO: de ../ para ./
import listAllExercices from "../../api/exercises";
import { useEffect, useState, useMemo } from "react";

const ITEMS_PER_PAGE = 10;

export default function ExercisesModal({ listName, onClose }) {
  const [exercises, setExercices] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (listName) {
      async function fetchData() {
        const data = await listAllExercices({ list_name: listName });
        setExercices(data);
        setCurrentPage(1);
      }
      fetchData();
    }
  }, [listName]);

  const totalItemsCount = exercises.length;
  const totalPages = Math.ceil(totalItemsCount / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return exercises.slice(startIndex, endIndex);
  }, [exercises, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  if (!listName) {
    return null;
  }

  return (
    <div
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-stone-900/40"
      onClick={onClose}
    >
      <div
        className="relative p-4 w-full max-w-4xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Exercícios da Lista:{" "}
              <span className="text-blue-400">{listName}</span>
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Fechar modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-600 ">
              <table className="w-[98%] justify-self-center  mt-2 mb-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Questão
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Descrição
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Solução
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Criado em
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Deletar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <DatatableExercisesRow
                      key={item.id}
                      index={index}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      solution_query={item.solution_query}
                      created_at={item.created_at.split("T")[0]}
                    />
                  ))}
                </tbody>
              </table>

              <nav
                className="flex items-center flex-col md:flex-row justify-between pt-4 p-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
                  Mostrando
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {" "}
                    {totalItemsCount === 0
                      ? 0
                      : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                    -{Math.min(currentPage * ITEMS_PER_PAGE, totalItemsCount)}{" "}
                  </span>
                  de
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {" "}
                    {totalItemsCount}
                  </span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                    >
                      Previous
                    </button>
                  </li>
                  <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                    {currentPage}
                  </li>
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
