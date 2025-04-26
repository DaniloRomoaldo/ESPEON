/* eslint-disable no-unused-vars */
import FileUpload from "../components/exerciseLists/FileUpload"
import ExerciseForm from "../components/exerciseLists/ExerciseForm"
import { useState , useRef } from "react"
import registerExerciseList from "../api/registerExerciseLists.js"
import Cookies from 'js-cookie';
import Alert from "../components/Alert";

export default function ExerciseLists() {
    const [forms, setForms] = useState([0]);
    const [exercises, setExercises] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [resetKey, setResetKey] = useState(0);
    const listNameRef = useRef(null);
  
    const addForm = () => {
        setForms(prev => [...prev, prev.length]);
        setExercises(prev => [...prev, { name: '', description: '', solution_query: '' }]);
      };

    async function handleSubmit (e) {
        e.preventDefault(); 
        
        const listName = listNameRef.current.value;
        const userId = Cookies.get('userId');


        const query = {
            name_list: listName,
            userId: userId,
          };

        const body = {
          exercises, 
        };
      
        try {
            const message = await registerExerciseList(body, query, uploadedFile);
            setAlertMessage(message); 
            listNameRef.current.value = '';
            setForms([0]);
            setExercises([]);
            setUploadedFile(null);
            setResetKey(prev => prev + 1);

        } catch (error) {
            setAlertMessage(error.message);
        }


    };
  
    return (
      <div className="h-screen flex flex-col items-center bg-gray-900 p-4 sm:p-6 md:p-8">
        
        {alertMessage && (
            <Alert 
                message={alertMessage}
                onClose={() => setAlertMessage("")} // 👈 Zera quando clicar!
            />
            )}
        
        <form key={resetKey} className="w-[70%] h-[95%] bg-[#202024] flex flex-col">
  
          {/* Parte fixa*/}
          <div className="w-full px-[3%] py-4">

            <div>
              <label htmlFor="exercices" className="block text-xs sm:text-sm text-white opacity-30 font-extralight mt-2">
                Lista de Exercícios
              </label>
              <div className="mt-1 mb-2 ">
                <input
                  id="list_name"
                  ref={listNameRef}
                  type="text"
                  required
                  placeholder="Exemplo: Lista1"
                  className="block w-full bg-[rgba(217,217,217,0.1)] rounded-sm text-neutral-300 h-8 sm:h-10 px-2 sm:px-3 placeholder-gray-600"
                />
              </div>
            </div>

            <FileUpload onFileSelect={setUploadedFile} />

          </div>
  
          
          <div className="flex-1 px-[2%] overflow-y-auto  pt-2">
            <div id="id_exercices_input" className="space-y-2">
            {forms.map((_, index) => (
                <ExerciseForm
                    key={index}
                    index={index}
                    onChange={(idx, updatedData) => {
                    setExercises((prevExercises) => {
                        const newExercises = [...prevExercises];
                        newExercises[idx] = updatedData;
                        return newExercises;
                    });
                    }}
                />
            ))}
            </div>
  
            {/* Botão para adicionar formulários */}
            <div className="flex justify-end mt-2 mb-4">
              <button
                type="button"
                onClick={addForm}
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-end mt-2 mb-4 mr-2">
            <button type="submit" 
            onClick={handleSubmit}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">submit</button>
          </div>
        </form>
      </div>
    );
  }
  