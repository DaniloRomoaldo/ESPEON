/* eslint-disable react/prop-types */
export default function LogFilterForm({ onFilterChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-t-lg flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label htmlFor="list_search" className="sr-only">
          Filtrar por Lista de Exercício
        </label>
        <input
          type="text"
          id="list_search"
          name="list_name"
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Filtro de lista..."
        />
      </div>

      <div className="flex-1">
        <label htmlFor="exercise_search" className="sr-only">
          Filtrar por Exercício
        </label>
        <input
          type="text"
          id="exercise_search"
          name="exercise_name"
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Filtro de exercício..."
        />
      </div>

      <div className="flex-1">
        <label htmlFor="user_search" className="sr-only">
          Filtrar por Aluno
        </label>
        <input
          type="text"
          id="user_search"
          name="user_email"
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Filtro de usuário..."
        />
      </div>
    </div>
  );
}
