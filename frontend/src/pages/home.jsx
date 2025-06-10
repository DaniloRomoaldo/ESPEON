import Treeview from "../layouts/TreeView";
import CodeEditor from "../layouts/CodeEditor";
import OutputTable from "../layouts/OutputTable";
import HamburguerMenu from "../components/HamburguerMenu";
import OutputError from "../layouts/OutputError";
import OutputSucess from "../layouts/OutputSucess";

import { useState , useEffect } from "react";


export default function Home() {

    const [dataTable, setDataTable] = useState({success: null, rows: [], fields: [] ,command: null, error: null });

    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);

    function startTimer (){
        setElapsed(0)
        setRunning(true)
    }

    function stopTimer(){
        setRunning(false)
    }

    useEffect(() => {
        if (!running) return;

        const starTime = Date.now();
        const timerId = setInterval(() => {
            setElapsed(Date.now() - starTime);
        }, 100);

        return () => clearInterval(timerId);
    }, [running])


    return (
        <div className="h-screen flex flex-col sm:grid sm:grid-cols-[15%_85%]">
            {/* Coluna Esquerda (Treeview e Menu) */}
            <div className="h-auto sm:h-screen flex flex-col ">
                {/* Menu Superior */}
                <div className="h-16 sm:h-[10%] flex items-center p-2 sm:p-0">
                    <HamburguerMenu />
                    <div className="basis-2/3 bg-[rgba(10,160,20,0.7)] rounded-lg min-h-[1.5rem] sm:min-h-[1rem] w-[40%] ml-2 sm:ml-[5%] flex justify-center items-center">
                        <p className="text-cyan-50 whitespace-nowrap overflow-hidden text-ellipsis text-[clamp(0.75rem,2vw,1rem)]">PostgreSQL</p>
                    </div>
                </div>

                {/* Treeview */}
                <div className="bg-[rgba(23,21,13,0.4)] flex-grow border-l-4 border-b-4 border-t-4 border-[#08090b8f] overflow-scroll">
                    <Treeview />
                </div>
            </div>

            {/* Coluna Direita (CodeEditor e OutputTable) */}
            <div className="flex-grow flex flex-col sm:h-screen">
                {/* CodeEditor */}
                <div className="bg-[rgba(30,30,30,1)] flex-grow h-[50vh] sm:h-[60%] border-r-6 border-l-4 border-b-2 border-[#08090b] border-t-3 overflow-y-auto">
                    <CodeEditor 
                    setDataTable={setDataTable}
                    onStartQuery={startTimer} // inicia o cronometro antes de enviar a requisição
                    onEndQuery={stopTimer} // finaliza o cronometro quando recebe a resposta do WS
                    />
                </div>

                {/* OutputTable */}
                <div className="bg-[rgba(23,21,13,0.4)] h-[40vh] sm:h-[40%] border-r-6 border-l-4 border-b-4 border-t-2 border-[#08090b] overflow-y-auto">
                {running ? (
                    <div className="flex justify-center items-center h-full text-gray-300 italic">
                        Carregando { (elapsed/1000).toFixed(1) }s
                    </div>
                ): dataTable.success === false ? (
                        <OutputError data={dataTable.error} />
                    ) : dataTable.success === true && dataTable.command != 'SELECT' && dataTable.rows.length === 0 ? (
                        <OutputSucess data={`${dataTable.command} command executed successfully!`} />
                    ): (
                        <OutputTable data={dataTable} />
                    )}
                </div>
            </div>
        </div>
    );
}
