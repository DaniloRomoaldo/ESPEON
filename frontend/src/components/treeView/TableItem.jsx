/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ExpansionButton from "./ExpansionButton";
import InsertClientElement from "../ClientInsert";
import ElementName from "../ElementName";
import { getTableColumns } from "../../api/databaseElements";

export default function TableItem({ name }) {
  const [columns, setColumns] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (columns.length > 0) {
      setTimeout(() => {
        if (window.HSStaticMethods) {
          window.HSStaticMethods.autoInit();
        }
      }, 100);
    }
  }, [columns]);

  const handleExpand = async (event) => {
    event.stopPropagation();

    if (columns.length === 0 && !isExpanded) {
      setIsLoading(true);
      try {
        const result = await getTableColumns("public", name);
        setColumns(result);
      } catch (error) {
        console.error(`Erro ao buscar colunas para a tabela ${name}:`, error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <div role="treeitem">
      <div className="py-0.5 flex items-center gap-x-0.5 w-full">
        <ExpansionButton functionName={handleExpand} />
        <div
          className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer"
          onClick={handleExpand}
        >
          <ElementName name={name} />
        </div>
      </div>

      {isExpanded && (
        <div role="group">
          <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
            <div
              className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md"
              role="treeitem"
            >
              {isLoading ? (
                <p className="text-xs text-gray-500 italic py-1">
                  Carregando colunas...
                </p>
              ) : columns.length > 0 ? (
                columns.map((column) => (
                  <InsertClientElement
                    key={column.column_name}
                    name={column.column_name}
                  />
                ))
              ) : (
                <p className="text-xs text-gray-500 italic py-1"></p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
