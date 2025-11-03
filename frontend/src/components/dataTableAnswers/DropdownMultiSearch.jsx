/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export default function DropdownMultiSearch({
  queryKey,
  queryFn,
  dataKey,
  placeholder,
  onSelectionChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const { data: allItems = [], isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    enabled: isOpen,
  });

  const filteredItems = useMemo(() => {
    return allItems.filter((item) =>
      (item[dataKey] ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allItems, searchTerm, dataKey]);

  const handleCheckboxChange = (itemName) => {
    let newSelection;
    if (selectedItems.includes(itemName)) {
      newSelection = selectedItems.filter((name) => name !== itemName);
    } else {
      newSelection = [...selectedItems, itemName];
    }

    setSelectedItems(newSelection);
    onSelectionChange(newSelection);
  };

  let buttonText = placeholder;
  if (selectedItems.length === 1) {
    buttonText = selectedItems[0];
  } else if (selectedItems.length > 1) {
    buttonText = `${selectedItems.length} itens selecionados`;
  }

  return (
    <div className="relative w-full">
      <button
        id="dropdownSearchButton"
        onClick={() => setIsOpen(!isOpen)}
        data-dropdown-placement="bottom"
        className="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between w-full dark:bg-gray-600 dark:hover:bg-gray-500 "
        type="button"
      >
        <span className="truncate">{buttonText}</span>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownSearch"
          className="z-10 absolute mt-1 bg-white rounded-lg shadow-sm w-full dark:bg-gray-700"
        >
          <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-2 ps-10 text-sm text-gray-900 rounded-lg  dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="Pesquisar opções..."
              />
            </div>
          </div>

          <ul
            className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownSearchButton"
          >
            {isLoading && <li>Carregando...</li>}

            {filteredItems.length === 0 && !isLoading && (
              <li className="w-full py-2 ms-2 text-sm font-medium text-gray-400 rounded-sm">
                Nenhum resultado.
              </li>
            )}

            {filteredItems.map((item, index) => {
              const itemName = item[dataKey];
              const isChecked = selectedItems.includes(itemName);
              const checkboxId = `checkbox-item-${queryKey}-${index}`;

              return (
                <li key={index}>
                  <div className="flex items-center ps-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      value={itemName}
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(itemName)}
                      className="w-4 h-4 text-blue-600 rounded-sm bg-gray-600 "
                    />
                    <label
                      htmlFor={checkboxId}
                      className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300 cursor-pointer"
                    >
                      {itemName}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
