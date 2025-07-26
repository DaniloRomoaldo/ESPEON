/* eslint-disable react/prop-types */
export default function ExpansionButton({ functionName }) {
    return (
        <button
            type="button"
            className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            // Passa o objeto de evento (e) para a função
            onClick={(e) => functionName(e)}
        >
            <svg
                className="hs-accordion-active:rotate-90 transition duration-300 size-2.5 text-gray-600 dark:text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
            </svg>
        </button>
    );
}