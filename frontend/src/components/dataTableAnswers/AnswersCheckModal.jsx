/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserAnswersLog } from "../../api/logAnswers";

const ITEMS_PER_PAGE = 5;

export default function AnswersCheckModal({ item, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      list_name: item?.list_name,
      exercise_name: item?.exercise_name,
      user_email: item?.user_email,
    }),
    [item]
  );

  const {
    data: detailsData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["logDetails", queryParams],
    queryFn: () => getUserAnswersLog(queryParams),
    enabled: !!item,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const totalItemsCount = detailsData.length;
  const totalPages = Math.ceil(totalItemsCount / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return detailsData.slice(startIndex, endIndex);
  }, [detailsData, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (item) {
      setCurrentPage(1);
    }
  }, [item]);

  if (!item) {
    return null;
  }

  const solutionQuery =
    detailsData.length > 0
      ? detailsData[0].exercise_solution
      : isLoading
      ? "Carregando..."
      : "N/A";

  return (
    <div
      id="details-modal-backdrop"
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
              Respostas de:{" "}
              <span className="text-blue-400">{item.user_email}</span>
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
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white mt-1">
                <strong>Lista:</strong> {item.list_name}
              </p>
              <p className="text-sm text-gray-900 dark:text-white mt-1">
                <strong>Exercício:</strong> {item.exercise_name}
              </p>
              <p className="text-sm text-gray-900 dark:text-white mt-1">
                <strong>Solução (Gabarito):</strong>
                <code className="block text-xs bg-gray-200 dark:bg-gray-900 p-2 rounded mt-1 font-mono whitespace-pre-wrap break-all">
                  {solutionQuery}
                </code>
              </p>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-3/5">
                      Resposta do Aluno
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Avaliação
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Data de Envio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center p-4 dark:text-white"
                      >
                        Carregando detalhes...
                      </td>
                    </tr>
                  )}
                  {isError && (
                    <tr>
                      <td colSpan="3" className="text-center p-4 text-red-500">
                        Erro: {error.message}
                      </td>
                    </tr>
                  )}
                  {currentItems.map((detail, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-mono text-xs whitespace-pre-wrap break-all">
                        {detail.user_response}
                      </td>
                      <td className="px-6 py-4">
                        {detail.response_evaluation ? (
                          <span className="text-green-500 font-medium">
                            Correto
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Incorreto
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(detail.created_at).toLocaleString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                  {!isLoading && !isError && currentItems.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center p-4 dark:text-gray-400"
                      >
                        Nenhuma resposta encontrada.
                      </td>
                    </tr>
                  )}
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
