/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function OutputQuery ({editorRef}) {

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue()
        if (!sourceCode) return;
        
    }



    return(
        <div className="">
            
        </div>
    )
}