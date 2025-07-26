/* eslint-disable react/prop-types */
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
//import { rawQuery } from "../api/rawQuery";
import { connectQueryWebSocket } from "../lib/queryWebSocket";

export default function CodeEditor({ setDataTable, onStartQuery, onEndQuery, onContentChange }) {
    const editorRef = useRef();
    const [ws, setWs] = useState(null);
    const [pid, setPid] = useState(null);
    
  
    const onMount = editor => {
      editorRef.current = editor;
      editor.focus();

      // eleva para a home quando o conteúdo muda
      editor.onDidChangeModelContent(() => {
            onContentChange(editor.getValue());
        });
    };
  
    useEffect(() => {
      const socket = connectQueryWebSocket((msg, socket) => {
        switch (msg.type){
                    case 'pid':
                        setPid(msg.pid);
                        break;
    
                    case 'result':
                        setDataTable({
                            success: msg.success,
                            rows: msg.data.rows || msg.data,
                            command: msg.data.command,
                            fields: msg.data.fields,
                            error: msg.error
                          });
                          onEndQuery?.();
                          break;
    
                    case 'error':
                        console.error('Erro na query:', msg.error);
                        setDataTable({
                            success: false,
                            rows: [],
                            command: null,
                            fields: [],
                            error: msg.error
                        });
                        onEndQuery?.();
                        break;

                    case 'cancelled':
                        setDataTable({
                            success: false,
                            rows: [],
                            command: null,
                            fields: [],
                            error: msg.error || 'Query cancelada'
                        });
                        onEndQuery?.();
                        break;
                    
                    case 'expired':
                        alert('Sua sessão expirou. Por favor, recarregue e faça login novamente.');
                        socket.close();
                        onEndQuery?.();
                        break;

                    default:
                    console.warn('Mensagem desconhecida:', msg);
                    
                }
      });

      // funções para finalizar o cronometro caso o servidor caia
      socket.onclose = () => {
        console.warn("Conexão com o servidor perdida");
        
      };

      setWs(socket);
      return () => socket.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const runCode = () => {
      const sourceCode = editorRef.current.getValue();
      if (!sourceCode.trim()) return;
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.error('WebSocket não conectado ainda');
        return;
      }
      onStartQuery(); // starta o cronometro de resposta, antes de enviar a requisição a servidor, assim pega o tempo total
      
      ws.send(JSON.stringify({ type: 'query', rawQuery: sourceCode }));
    };

    function cancelQuery() {
        if (!pid) return;           // só cancela se tiver PID
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            setDataTable({
                success: false,
                rows: [],
                command: null,
                fields: [],
                error: 'Query cancelada'
            });
          onEndQuery?.();
          return;
        }
        ws.send(JSON.stringify({ type: 'cancel', pid }));
        
      }

    return (
        <div className="h-full w-full flex">
            {/* Botão de Executar (Rotacionado) */}
            <div className="flex flex-col items-start pt-2">
                <button
                    onClick={runCode}
                    type="button"
                    className="rotate-90 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-1 py-1.5 mx-2 text-center cursor-pointer dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="8"
                        height="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="css-i6dzq1"
                    >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    </svg>
                </button>

                <button
                    onClick={cancelQuery}
                    type="button"
                    className=" text-red-700 hover:text-red-500 font-medium rounded-lg text-sm ml-1.5 mt-1 text-center cursor-pointer "
                >
                    <svg 
                        viewBox="0 0 24 24" 
                        width="22" 
                        height="24" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="css-i6dzq1">
                        <polygon 
                            points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2">
                        </polygon>
                        <line 
                            x1="15" y1="9" x2="9" y2="15">
                        </line>
                        <line 
                            x1="9" y1="9" x2="15" y2="15">
                        </line>
                    </svg>
                </button>
            </div>

            {/* Editor de Código */}
            <div className="flex-grow h-[50vh] sm:h-full overflow-hidden">
                <Editor
                    defaultLanguage="sql"
                    height="100%"
                    width="100%"
                    theme="vs-dark"
                    defaultValue=""
                    onMount={onMount}
                    options={{
                        automaticLayout: true, // Ajusta o layout automaticamente
                    }}
                />
            </div>
        </div>
    );
}