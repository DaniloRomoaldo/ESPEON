// src/components/dataTableAnswers/ReportQueryModal.jsx

/* eslint-disable react/prop-types */
import { useForm, Controller } from "react-hook-form";
import DropdownMultiSearch from "./DropdownMultiSearch";
import {
  getListNames,
  getDistinctExercises,
  getDistinctUsers,
  getLogReportData
} from "../../api/logAnswers"; // Verifique o nome

export default function ReportQueryModal({ isOpen, onClose, onSearch }) {
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      list_names: [],
      startDate: "",
      endDate: "",
      exercise_names: [],
      user_emails: [],
    },
  });

  const onInternalSubmit = async (formData) => { 

    try {
      await getLogReportData(formData);
      onSearch(formData);

    } catch (error) {
       console.error("Erro ao preparar dados da busca:", error);
       
    } finally {
        reset();
        onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="crud-modal-backdrop"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-[#10131B] opacity-70"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Consulta nos Registros
            </h3>
            <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
               <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
               <span className="sr-only">Fechar modal</span>
            </button>
          </div>

          {/* Formulário */}
          <form
            className="p-4 md:p-5 "
            onSubmit={handleSubmit(onInternalSubmit)}
          >
            <div className="grid gap-4 mb-4 grid-cols-2"> {/* Manteve grid-cols-2 */}

              {/* Linha 1: Dropdown Listas (Ocupa 2 colunas) */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Listas de Exercício
                </label>
                <Controller
                  name="list_names"
                  control={control}
                  render={({ field }) => (
                    <DropdownMultiSearch
                      queryKey="exerciseLists" 
                      queryFn={getListNames}
                      dataKey="list_name"
                      placeholder=" "
                      onSelectionChange={field.onChange} 
                    />
                  )}
                />
              </div>

              {/* Linha 2: Campos de Data (Cada um ocupa 1 coluna) */}
              <div className="col-span-1">
                <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Data Início
                </label>
                <input
                  id="startDate"
                  type="date"
                  {...register("startDate")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Data Fim
                </label>
                <input
                  id="endDate"
                  type="date"
                  {...register("endDate")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Exercícios
                </label>
                <Controller
                  name="exercise_names" 
                  control={control}
                  render={({ field }) => (
                    <DropdownMultiSearch
                      queryKey="distinctExercises" 
                      queryFn={getDistinctExercises} 
                      dataKey="exercise_name" 
                      placeholder=" "
                      onSelectionChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Usuários
                </label>
                <Controller
                  name="user_emails" 
                  control={control}
                  render={({ field }) => (
                    <DropdownMultiSearch
                      queryKey="distinctUsers" 
                      queryFn={getDistinctUsers} 
                      dataKey="user_email" 
                      placeholder=" "
                      onSelectionChange={field.onChange}
                    />
                  )}
                />
              </div>

            </div>
            {/* Botão de Submissão */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
