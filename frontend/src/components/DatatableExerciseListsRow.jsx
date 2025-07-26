/* eslint-disable react/prop-types */
import { deleteExerciseList } from "../api/exerciseLists";
import { startLab } from "../api/labManager";
import listAllExercices from "../api/exercises";
import Cookies from 'js-cookie'; 
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import ConfirmationModal from "../components/ConfirmationModal"; // <-- 1. Importe o novo modal

export default function DatatableExerciseListsRow({list_name, qnt_exercicio, id, created_at}){

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); 

    // <-- 2. Crie um estado para controlar o modal
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        action: null, // 'delete' ou 'start'
        message: ''
    });

    // <-- 3. Lógica para DELETAR (separada para ser chamada pelo modal)
    const performDelete = async () => {
        try {
            await deleteExerciseList(id);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao deletar lista:', error.message);
            alert(`Erro ao deletar lista: ${error.message}`);
        }
    };

    // <-- 4. Lógica para INICIAR O LAB (separada para ser chamada pelo modal)
    const performStartLab = async () => {
        setIsLoading(true);
        try {
            const [labResponse, exercisesResponse] = await Promise.all([
                startLab(id),
                listAllExercices({ list_name: list_name })
            ]);
            const { labSessionId } = labResponse;
            const exercises = exercisesResponse;

            if (labSessionId && exercises){
                Cookies.set('labSessionId', labSessionId, {expires: 1/12});
                localStorage.setItem('currentLabExercises', JSON.stringify(exercises));
                localStorage.setItem('currentExerciseIndex', '0');
                navigate('/home');
            }
        } catch (error) {
            alert(`Erro ao iniciar o laboratório: ${error.message}`);
            Cookies.remove('labSessionId');
            localStorage.removeItem('currentLabExercises');
            localStorage.removeItem('currentExerciseIndex');
        } finally {
            setIsLoading(false);
        }
    };

    // <-- 5. Função genérica que o modal vai chamar na confirmação
    const handleConfirmAction = () => {
        if (modalConfig.action === 'delete') {
            performDelete();
        } else if (modalConfig.action === 'start') {
            performStartLab();
        }
    };

    function navigateTo() {
        const url = `/exercises?name_list=${encodeURIComponent(list_name)}`;
        window.open(url, "_blank");
    }

    return(
        // <-- 6. Use um Fragment para poder renderizar a <tr> e o <ConfirmationModal>
        <>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" id={id}  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <a type="button" className="hover:underline cursor-pointer" onClick={navigateTo}>
                        {list_name}
                    </a>
                </th>
                <td className="px-6 py-4">
                    {qnt_exercicio}
                </td>
                <td className="px-6 py-4">
                    {created_at}
                </td>
                <td className="px-6 py-4">
                    {/* <-- 7. O botão de remover agora apenas ABRE o modal */}
                    <a type="button" onClick={() => setModalConfig({ isOpen: true, action: 'delete', message: `Tem certeza que deseja deletar a lista "${list_name}"?` })} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                        Remove
                    </a>
                </td>
                <td className="px-6 py-4">
                    {/* <-- 8. O botão de play agora apenas ABRE o modal */}
                    <a type="button" onClick={() => setModalConfig({ isOpen: true, action: 'start', message: `Deseja iniciar um laboratório para a lista de exercícios "${list_name}"?` })} className="group font-medium text-green-600 dark:text-green-600 hover:underline cursor-pointer">
                        {isLoading ? 'Iniciando...' : (
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-200 group-hover:fill-green-600">
                                <polygon points="5 3 24 12 5 21 5 3" />
                            </svg>
                        )}
                    </a>
                </td>
            </tr>

            {/* <-- 9. Renderize o modal aqui, passando as props dinâmicas */}
            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ isOpen: false, action: null, message: '' })}
                onConfirm={handleConfirmAction}
                message={modalConfig.message}
                confirmText={modalConfig.action === 'delete' ? 'Sim, deletar' : 'Sim, iniciar'}
                confirmColor={modalConfig.action === 'delete' ? 'red' : 'green'}
            />
        </>
    )
}