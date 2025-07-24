import { useEffect, useState } from "react";
import SchemaIcon from "../components/Schema";
import ExpansionButton from "../components/ExpansionButton";
import TableIcon from "../components/Tables";
import ViewsIcon from "../components/Views";
import FunctionsIcon from "../components/Functions";
import TriggersIcon from "../components/Triggers";
import ProceduresIcon from "../components/Procedures";
import EnumsIcon from "../components/Enums";
import InsertClientElement from "../components/ClientInsert";
import { getDatabaseElement } from "../api/databaseElements";


export default function Treeview() {
    /* hooks de estados para a treeview */
    const [tableList, setTableList] = useState([]);
    const [viewsList, setViewsList] = useState([]);
    const [functionsList, setFunctionsList] = useState([]);
    const [triggersList, setTriggersList] = useState([]);
    const [proceduresList, setProceduresList] = useState([]);
    const [enumsList, setEnumsList] = useState([]);

     useEffect(() => {

        // Atrasamos um pouquinho (100ms) para dar tempo ao DOM de se estabilizar completamente.
        setTimeout(() => {
          // Verifica se o objeto global da Preline existe antes de chamá-lo
          if (window.HSStaticMethods) {
              window.HSStaticMethods.autoInit();
          }
        }, 100);

    }, []);


    const HandleGetDbElement = async (schemaName, elementName, hookName) => {
        try {
            const tablesResult = await getDatabaseElement(schemaName, elementName);
            hookName(tablesResult);
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <div className="h-full w-full overflow-y-auto p-2 overflow-scroll">
            {/* Raiz da Árvore */}
            <div className="hs-accordion-treeview-root overflow-y-auto overflow-x-auto w-full" role="tree" aria-orientation="vertical">
                {/* Primeiro Grupo da Árvore -> Schemas */}
                <div className="hs-accordion-group" role="group" data-hs-accordion-always-open="">
                    {/* 1° Nível = Schemas */}
                    <div className="hs-accordion active" role="treeitem" aria-expanded="false" id="hs-customize-tree-heading-one">
                        {/* Cabeçalho do 1° Elemento */}
                        <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full whitespace-nowrap">
                            <ExpansionButton />
                            {/* Schema -> Padrão Public */}
                            <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                <SchemaIcon name={'Public'}/>
                            </div>
                        </div>
                        {/* Fim do Cabeçalho do 1° Elemento */}

                        {/* Expansão do 1° Nível -> 2° nível */}
                        <div id="hs-customize-tree-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-customize-tree-heading-one">
                            {/* Grupo de Elementos do 2° nível = Tables, Views, Functions, Triggers, Procedures, Enums */}
                            <div className="hs-accordion-group ps-7 overflow-y-auto overflow-x-auto w-full relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" role="group" data-hs-accordion-always-open="">
                                {/* PRIMEIRO ELEMENTO - TABLES */}
                                <div className="hs-accordion active" role="treeitem" aria-expanded="false" id="hs-customize-tree-sub-heading-one">
                                    {/* 2.1 -> Tables cabeçalho */}
                                    <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                        <ExpansionButton 
                                            functionName={HandleGetDbElement} 
                                            schemaName="public" 
                                            elementName="tables"
                                            hookName={setTableList}
                                        />
                                        <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                            <TableIcon name={'Tables'} />
                                        </div>
                                    </div>
                                    {/* Fim 2.1 -> Cabeçalho Tables */}

                                    {/* Expansão do 2.1° nível -> Inserção de Tabelas dinâmicas */}
                                    <div id="hs-customize-tree-sub-collapse-two" className="hs-accordion-content hidden w-full transition-[height] duration-300" role="group" aria-labelledby="hs-customize-tree-sub-heading-two">
                                        {/* 2° nível- Tabelas Dinâmicas */}
                                        <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                            {/* Itens do 2° Nível -> Tabelas criadas pelo Usuário */}
                                            <div id="id_tables_insert" className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                            
                                            {/* Mappeia os elementos recebidos da API e adiciona dinamicamente na treeview*/}
                                            {tableList.length > 0 ? (
                                                tableList.map((table) => (
                                                <InsertClientElement key={table.table_name} name={table.table_name} />
                                                ))
                                            ) : (
                                                // se não houver elementos, nao adiciona nada
                                                <></>
                                            )}
                                            </div>
                                            {/* Fim dos itens do 2° Nível -> Tabelas criadas pelo Usuário */}
                                        </div>
                                        {/* Fim 2° nível- Tabelas Dinâmicas */}
                                    </div>
                                    {/* Fim Expansão do 2° nível -> Tabelas dinâmicas */}
                                </div>
                                {/* Fim do Primeiro elemento TABLES */}

                                {/* SEGUNDO ELEMENTO - VIEWS */}
                                <div className="hs-accordion active" role="treeitem" aria-expanded="false" id="hs-customize-tree-sub-heading-one">
                                    {/* 2.2 -> Cabeçalho Views */}
                                    <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                    <ExpansionButton 
                                            functionName={HandleGetDbElement} 
                                            schemaName="public" 
                                            elementName="views"
                                            hookName={setViewsList}
                                        />
                                        <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                            <ViewsIcon name={'Views'} />
                                        </div>
                                    </div>
                                    {/* Fim 2.2 -> Cabeçalho Views */}

                                    {/* Expansão do 2.2° nível -> Inserção dinâmicas */}
                                    <div id="hs-customize-tree-sub-collapse-two" className="hs-accordion-content hidden w-full transition-[height] duration-300" role="group" aria-labelledby="hs-customize-tree-sub-heading-two">
                                        {/* 2° nível- Dinâmicas */}
                                        <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                            {/* Itens do 2° Nível -> criadas pelo Usuário */}
                                            <div id="id_views_insert" className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                
                                                {/* Mappeia os elementos recebidos da API e adiciona dinamicamente na treeview*/}
                                                {viewsList.length > 0 ? (
                                                    viewsList.map((views) => (
                                                    <InsertClientElement key={views.view_name} name={views.view_name} />
                                                    ))
                                                ) : (
                                                    // se não houver elementos, nao adiciona nada
                                                    <></>
                                                )}
                                                
                                            </div>
                                            {/* Fim dos itens do 2° Nível -> criadas pelo Usuário */}
                                        </div>
                                        {/* Fim 2° nível- Dinâmicas */}
                                    </div>
                                    {/* Fim Expansão do 2° nível -> Inserção dinâmicas */}
                                </div>
                                {/* Fim do Segundo elemento VIEWS */}

                                {/* TERCEIRO ELEMENTO - FUNCTIONS */}
                                <div className="hs-accordion active" role="treeitem" aria-expanded="false" id="hs-customize-tree-sub-heading-one">
                                    {/* 2.3 -> Cabeçalho Functions */}
                                    <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                    <ExpansionButton 
                                            functionName={HandleGetDbElement} 
                                            schemaName="public" 
                                            elementName="functions"
                                            hookName={setFunctionsList}
                                        />
                                        <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                            <FunctionsIcon name={'Function'} />
                                        </div>
                                    </div>
                                    {/* Fim 2.3 -> Cabeçalho Functions */}

                                    {/* Expansão do 2.3° nível -> Inserção dinâmicas */}
                                    <div id="hs-customize-tree-sub-collapse-two" className="hs-accordion-content hidden w-full transition-[height] duration-300" role="group" aria-labelledby="hs-customize-tree-sub-heading-two">
                                        {/* 2° nível- Dinâmicas */}
                                        <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                            {/* Itens do 2° Nível -> criadas pelo Usuário */}
                                            <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                
                                                {/* Mappeia os elementos recebidos da API e adiciona dinamicamente na treeview*/}
                                                {functionsList.length > 0 ? (
                                                    functionsList.map((functions) => (
                                                    <InsertClientElement key={functions.function_name} name={functions.function_name} />
                                                    ))
                                                ) : (
                                                    // se não houver elementos, nao adiciona nada
                                                    <></>
                                                )}

                                            </div>
                                            {/* Fim dos itens do 2° Nível -> criadas pelo Usuário */}
                                        </div>
                                        {/* Fim 2° nível- Functions Dinâmicas */}
                                    </div>
                                    {/* Fim Expansão do 2° nível -> Inserção dinâmicas */}
                                </div>
                                {/* Fim do Terceiro elemento FUNCTIONS */}

                                {/* QUARTO ELEMENTO - TRIGGERS */}
                                <div className="hs-accordion active" role="treeitem" aria-expanded="false" id="hs-customize-tree-sub-heading-one">
                                    {/* 2.4 -> Cabeçalho Triggers */}
                                    <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                    <ExpansionButton 
                                            functionName={HandleGetDbElement} 
                                            schemaName="public" 
                                            elementName="triggers"
                                            hookName={setTriggersList}
                                        />
                                        <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                            <TriggersIcon name={'Triggers'} />
                                        </div>
                                    </div>
                                    {/* Fim 2.4 -> Cabeçalho Triggers */}

                                    {/* Expansão do 2.4° nível -> Inserção dinâmicas */}
                                    <div id="hs-customize-tree-sub-collapse-two" className="hs-accordion-content hidden w-full transition-[height] duration-300" role="group" aria-labelledby="hs-customize-tree-sub-heading-two">
                                        {/* 2° nível- Dinâmicas */}
                                        <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                            {/* Itens do 2° Nível criadas pelo Usuário */}
                                            <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                
                                                {/* Mappeia os elementos recebidos da API e adiciona dinamicamente na treeview*/}
                                                {triggersList.length > 0 ? (
                                                    triggersList.map((triggers) => (
                                                    <InsertClientElement key={triggers.trigger_name} name={triggers.trigger_name} />
                                                    ))
                                                ) : (
                                                    // se não houver elementos, nao adiciona nada
                                                    <></>
                                                )}
                                                
                                            </div>
                                            {/* Fim dos itens do 2° Nível -> criadas pelo Usuário */}
                                        </div>
                                        {/* Fim 2° nível- Dinâmicas */}
                                    </div>
                                    {/* Fim Expansão do 2° nível -> Inserção dinâmicas */}
                                </div>
                                {/* Fim do Quarto elemento TRIGGERS */}

                                {/* QUINTO ELEMENTO - PROCEDURES */}
                                <div className="hs-accordion active" role="treeitem" aria-expanded="false" id="hs-customize-tree-sub-heading-one">
                                    {/* 2.5 -> Cabeçalho Procedures */}
                                    <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                    <ExpansionButton 
                                            functionName={HandleGetDbElement} 
                                            schemaName="public" 
                                            elementName="procedures"
                                            hookName={setProceduresList}
                                        />
                                        <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                            <ProceduresIcon name={'Procedures'} />
                                        </div>
                                    </div>
                                    {/* Fim 2.5 -> Cabeçalho Procedures */}

                                    {/* Expansão do 2.5° nível -> Inserção dinâmicas */}
                                    <div id="hs-customize-tree-sub-collapse-two" className="hs-accordion-content hidden w-full transition-[height] duration-300" role="group" aria-labelledby="hs-customize-tree-sub-heading-two">
                                        {/* 2° nível- Dinâmicas */}
                                        <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                            {/* Itens do 2° Nível criadas pelo Usuário */}
                                            <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                               
                                                {/* Mappeia os elementos recebidos da API e adiciona dinamicamente na treeview*/}
                                                {proceduresList.length > 0 ? (
                                                    proceduresList.map((procedures) => (
                                                    <InsertClientElement key={procedures.procedure_name} name={procedures.procedure_name} />
                                                    ))
                                                ) : (
                                                    // se não houver elementos, nao adiciona nada
                                                    <></>
                                                )}
                                               
                                            </div>
                                            {/* Fim dos itens do 2° Nível -> criadas pelo Usuário */}
                                        </div>
                                        {/* Fim 2° nível- Dinâmicas */}
                                    </div>
                                    {/* Fim Expansão do 2° nível -> Inserção dinâmicas */}
                                </div>
                                {/* Fim do Quinto elemento PROCEDURES */}

                                {/* SEXTO ELEMENTO - ENUMS */}
                                <div className="hs-accordion active" role="treeitem" aria-expanded="false" id="hs-customize-tree-sub-heading-one">
                                    {/* 2.6 -> Cabeçalho Enums */}
                                    <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                                    <ExpansionButton 
                                            functionName={HandleGetDbElement} 
                                            schemaName="public" 
                                            elementName="enums"
                                            hookName={setEnumsList}
                                        />
                                        <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                            <EnumsIcon name={'Enums'} />
                                        </div>
                                    </div>
                                    {/* Fim 2.6 -> Cabeçalho Enums */}

                                    {/* Expansão do 2.6° nível -> Inserção dinâmicas */}
                                    <div id="hs-customize-tree-sub-collapse-two" className="hs-accordion-content hidden w-full transition-[height] duration-300" role="group" aria-labelledby="hs-customize-tree-sub-heading-two">
                                        {/* 2° nível- Dinâmicas */}
                                        <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                                            {/* Itens do 2° Nível criadas pelo Usuário */}
                                            <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                                                
                                                {/* Mappeia os elementos recebidos da API e adiciona dinamicamente na treeview*/}
                                                {enumsList.length > 0 ? (
                                                    enumsList.map((enums) => (
                                                    <InsertClientElement key={enums.enum_name} name={enums.enum_name} />
                                                    ))
                                                ) : (
                                                    // se não houver elementos, nao adiciona nada
                                                    <></>
                                                )}
                                                
                                            </div>
                                            {/* Fim dos itens do 2° Nível -> criadas pelo Usuário */}
                                        </div>
                                        {/* Fim 2° nível- Dinâmicas */}
                                    </div>
                                    {/* Fim Expansão do 2° nível -> Inserção dinâmicas */}
                                </div>
                                {/* Fim do Sexto elemento ENUMS */}
                            </div>
                        </div>
                    </div>
                    {/* Fim 1° Nível = Schemas */}
                </div>
            </div>
        </div>
    );
}
