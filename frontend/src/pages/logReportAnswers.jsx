import { useState } from "react"; 
import { useQuery } from "@tanstack/react-query";
import { getLogReportData } from "../api/logAnswers"; 

//imports Drawer Menu
import HamburguerMenu from "../components/HamburguerMenu";
import DrawerMenu from "../components/DrawerMenu";
import ReportQueryModal from "../components/dataTableAnswers/ReportQueryModal";


export default function LogReportAnswers() { 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Estado do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiFilters, setApiFilters] = useState(null);

  // Função da API para o modal
  const handleApiSearch = (formData) => {
    console.log("Filtros recebidos do Modal:", formData);
    setApiFilters(formData); // Atualiza o estado que dispara a useQuery
    setIsModalOpen(false); // Fecha o modal após a busca
  };


    // --- NOVO: useQuery para buscar os dados do relatório ---
  const { data: reportData, isLoading, isError, error } = useQuery({
    // A queryKey DEVE incluir os filtros para o cache funcionar corretamente
    // e para a query refazer a busca quando os filtros mudarem.
    queryKey: ['logReport', apiFilters],

    // queryFn recebe um objeto com queryKey por padrão, pegamos os filtros de lá
    queryFn: () => getLogReportData(apiFilters),

    // enabled: !!apiFilters garante que a query só rode APÓS a primeira busca
    // (quando apiFilters não for mais null).
    enabled: !!apiFilters,

    // Outras opções úteis (opcional):
    // refetchOnWindowFocus: false, // Evita refazer a busca só por trocar de aba
    // staleTime: 5 * 60 * 1000, // Considera os dados "frescos" por 5 minutos
  });

  // --- NOVO: Logando o resultado da useQuery ---
  console.log("Status da Busca (useQuery):", { isLoading, isError, error });
  console.log("Dados do Relatório (useQuery):", reportData);

  // TODO: Passar 'reportData', 'isLoading', 'isError' para o Layout/Tabela

  return (
    <>
      <div className="relative h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
        <div className="absolute top-6 left-6 z-30">
          <HamburguerMenu onOpen={() => setIsDrawerOpen(true)} />
        </div>

        <p className="text-gray-900 text-6xl dark:text-white">
          Log de Respostas
        </p>

        {/* --- NOVO: Botão temporário --- */}
        <div className="mt-10">
          <button
            onClick={() => setIsModalOpen(true)} // Apenas abre o modal
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Abrir Modal de Busca (Temporário)
          </button>
        </div>
        {/* --- Fim do Botão --- */}

      </div>

      {/* --- NOVO: Renderização do Modal --- */}
      {/* Ele fica "escutando" o estado 'isModalOpen' */}
      <ReportQueryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleApiSearch}
      />

      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}