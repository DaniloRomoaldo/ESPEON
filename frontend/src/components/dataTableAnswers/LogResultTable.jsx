/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function LogResultTable({
  currentItems,
  currentPage,
  totalPages,
  onPageChange,
  totalItemsCount,
  itemsPerPage,
  onRowClick,
}) {
  const startItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const endItemIndex = Math.min(currentPage * itemsPerPage, totalItemsCount);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;

    buttons.push(
      <li key="prev">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-400 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
      </li>
    );

    if (currentPage > 2) {
      buttons.push(
        <li key={1}>
          <button
            onClick={() => onPageChange(1)}
            className="flex items-center justify-center px-3 h-8 text-gray-400"
          >
            1
          </button>
        </li>
      );
      if (currentPage > 3) {
        buttons.push(
          <li key="dots-start">
            <span className="px-3 h-8 text-gray-400">...</span>
          </li>
        );
      }
    }

    if (currentPage > 1) {
      buttons.push(
        <li key={currentPage - 1}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center justify-center px-3 h-8 text-white"
          >
            {currentPage - 1}
          </button>
        </li>
      );
    }

    buttons.push(
      <li key={currentPage}>
        <button
          aria-current="page"
          className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 ... dark:bg-gray-700 dark:text-white"
        >
          {currentPage}
        </button>
      </li>
    );

    if (currentPage < totalPages) {
      buttons.push(
        <li key={currentPage + 1}>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center justify-center px-3 h-8 text-white"
          >
            {currentPage + 1}
          </button>
        </li>
      );
    }

    if (currentPage < totalPages - 2) {
      buttons.push(
        <li key="dots-end">
          <span className="px-3 h-8 text-white">...</span>
        </li>
      );
    }
    if (currentPage < totalPages - 1) {
      buttons.push(
        <li key={totalPages}>
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex items-center justify-center px-3 h-8 text-white"
          >
            {totalPages}
          </button>
        </li>
      );
    }

    buttons.push(
      <li key="next">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </li>
    );

    return buttons;
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-b-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Lista de Exercício
            </th>
            <th scope="col" className="px-6 py-3">
              Exercício
            </th>
            <th scope="col" className="px-6 py-3">
              Usuário
            </th>
            <th scope="col" className="px-6 py-3">
              Acertos
            </th>
            <th scope="col" className="px-6 py-3">
              Erros
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => onRowClick(item)}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.list_name}
              </th>
              <td className="px-6 py-4">{item.exercise_name}</td>
              <td className="px-6 py-4">{item.user_email}</td>
              <td className="px-6 py-4 text-green-500">{item.acertos}</td>
              <td className="px-6 py-4 text-red-500">{item.erros}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Mostrando
          <span className="font-semibold text-gray-900 dark:text-white">
            {" "}
            {startItemIndex}-{endItemIndex}{" "}
          </span>
          de
          <span className="font-semibold text-gray-900 dark:text-white">
            {" "}
            {totalItemsCount}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          {totalPages > 0 && renderPaginationButtons()}
        </ul>
      </nav>
    </div>
  );
}
