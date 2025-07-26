import { useEffect, useState } from "react";
import SchemaIcon from "../components/Schema";
import ExpansionButton from "../components/ExpansionButton";
import TableIcon from "../components/Tables";
import ViewsIcon from "../components/Views";
import FunctionsIcon from "../components/Functions";
import TriggersIcon from "../components/Triggers";
import ProceduresIcon from "../components/Procedures";
import EnumsIcon from "../components/Enums";
import { getDatabaseElement } from "../api/databaseElements";
import TreeSection from "../components/TreeSection"; 

export default function Treeview() {
    const [tableList, setTableList] = useState([]);
    const [viewsList, setViewsList] = useState([]);
    const [functionsList, setFunctionsList] = useState([]);
    const [triggersList, setTriggersList] = useState([]);
    const [proceduresList, setProceduresList] = useState([]);
    const [enumsList, setEnumsList] = useState([]);

    

    useEffect(() => {
    const hasData = tableList.length > 0 || viewsList.length > 0 || functionsList.length > 0;
    

    if (!hasData) return;

    const timeout = setTimeout(() => {
        if (window.HSStaticMethods?.autoInit) {
            window.HSStaticMethods.autoInit();
        }
    }, 200);

    return () => clearTimeout(timeout);
}, [tableList, viewsList, functionsList]);

    const handleExpand = async (elementName, hookName) => {
        try {
            const result = await getDatabaseElement("public", elementName);
            hookName(result);

           
            setTimeout(() => {
                if (window.HSStaticMethods) {
                    window.HSStaticMethods.autoInit();
                }
            }, 100);
        } catch (error) {
            console.error(error);
        }
    }

    const sections = [
        { title: 'Tables', IconComponent: TableIcon, elementName: 'tables', list: tableList, hookName: setTableList },
        { title: 'Views', IconComponent: ViewsIcon, elementName: 'views', list: viewsList, hookName: setViewsList },
        { title: 'Functions', IconComponent: FunctionsIcon, elementName: 'functions', list: functionsList, hookName: setFunctionsList },
        { title: 'Triggers', IconComponent: TriggersIcon, elementName: 'triggers', list: triggersList, hookName: setTriggersList },
        { title: 'Procedures', IconComponent: ProceduresIcon, elementName: 'procedures', list: proceduresList, hookName: setProceduresList },
        { title: 'Enums', IconComponent: EnumsIcon, elementName: 'enums', list: enumsList, hookName: setEnumsList },
    ];

    return (
        <div className="h-full w-full overflow-y-auto p-2 overflow-scroll">
            <div className="hs-accordion-treeview-root overflow-y-auto overflow-x-auto w-full" role="tree" aria-orientation="vertical">
                <div className="hs-accordion-group" role="group" data-hs-accordion-always-open="">
                    <div className="hs-accordion active" role="treeitem" aria-expanded="false" id="hs-customize-tree-heading-one">
                        <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full whitespace-nowrap">
                            <ExpansionButton />
                            <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                                <SchemaIcon name={'Public'}/>
                            </div>
                        </div>
                        <div id="hs-customize-tree-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-customize-tree-heading-one">
                            <div className="hs-accordion-group ps-7 overflow-y-auto overflow-x-auto w-full relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" role="group" data-hs-accordion-always-open="">
                                
                                {/* 6. Mapeamos o array de configuração para renderizar cada seção */}
                                {sections.map(section => (
                                    <TreeSection
                                        key={section.elementName}
                                        title={section.title}
                                        IconComponent={section.IconComponent}
                                        list={section.list}
                                        onExpand={() => handleExpand(section.elementName, section.hookName)}
                                    />
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}