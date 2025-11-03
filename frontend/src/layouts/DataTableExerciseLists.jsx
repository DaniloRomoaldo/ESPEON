import DatatableExerciseListsRow from "../components/datatableExercises/DatatableExerciseListsRow";
import { listAllExerciceLists } from "../api/exerciseLists";
import { useEffect, useState, useMemo } from "react";
import ExercisesModal from "../components/datatableExercises/ExercisesModal"; // <-- 1. IMPORTAR O MODAL

const ITEMS_PER_PAGE = 10;

export default function DataTable() {
  const [exerciseLists, setExerciseLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await listAllExerciceLists();
      setExerciseLists(data);
    }
    fetchData();
  }, []);

  const totalItemsCount = exerciseLists.length;
  const totalPages = Math.ceil(totalItemsCount / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return exerciseLists.slice(startIndex, endIndex);
  }, [exerciseLists, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-600">
        <table className="w-[98%] justify-self-center mt-2 mb-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Lista de Exercício
              </th>
              <th scope="col" className="px-6 py-3">
                Quantidade Exercícios
              </th>
              <th scope="col" className="px-6 py-3">
                Criado em
              </th>
              <th scope="col" className="px-6 py-3">
                Deletar
              </th>
              <th scope="col" className="px-6 py-3">
                Lab
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <DatatableExerciseListsRow
                key={item.id}
                index={index}
                id={item.id}
                list_name={item.name}
                qnt_exercicio={item.qnt_exercicios}
                created_at={item.created_at.split("T")[0]}
                onRowClick={() => setSelectedList(item.name)}
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

      <ExercisesModal
        listName={selectedList}
        onClose={() => setSelectedList(null)}
      />
    </>
  );
}
