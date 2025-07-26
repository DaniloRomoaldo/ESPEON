/* eslint-disable react/prop-types */
import ExpansionButton from "./ExpansionButton";
import ExpandableTreeItem from "./ExpandableTreeItem";

export default function TreeSection({ title, IconComponent, list, onExpand }) {
    return (
        <div className="hs-accordion active" role="treeitem" aria-expanded="false">
            <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
                <ExpansionButton functionName={onExpand} />
                <div className="grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                    <IconComponent name={title} />
                </div>
            </div>
            <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group">
                <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
                    <div className="hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer" role="treeitem">
                        
                        {list.length > 0 && list.map((item, index) => {
                            const itemName = item[Object.keys(item)[0]];
                            return <ExpandableTreeItem key={`${itemName}-${index}`} name={itemName} />;
                        })}

                    </div>
                </div>
            </div>
        </div>
    );
}