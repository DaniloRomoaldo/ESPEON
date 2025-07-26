import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/login'); 
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4 sm:space-y-8 bg-gray-900 p-4 sm:p-6 md:p-8">
            {/* Título CEFET-MG */}
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
                CEFET - MG
            </h1>

            {/* Container do Formulário */}
            <div className="bg-[#202024] opacity-80 rounded-lg mb-4 sm:mb-10 h-auto min-h-[70vh] sm:min-h-[60vh] w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] max-w-[500px] p-4 sm:p-6 md:p-8 flex flex-col overflow-y-auto">
                {/* Título S.H.I.P. */}
                <h1 className="text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6">
                    ESPEON
                </h1>

                {/* Formulário */}
                <div className="w-full mx-auto flex-grow flex flex-col justify-between">
                    <form className="flex-grow flex flex-col justify-between space-y-3 sm:space-y-6" action="#" method="POST">
                        {/* Campos do Formulário */}
                        <div>
                            {/* Campo de Email */}
                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm text-white opacity-30 font-extralight">
                                    Email
                                </label>
                                <div className="mt-1 sm:mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full bg-[rgba(217,217,217,0.1)] rounded-sm text-neutral-300 h-8 sm:h-10 px-2 sm:px-3"
                                    />
                                </div>
                            </div>

                            {/* Campo de Senha */}
                            <div className="mt-4 sm:mt-6">
                                <label htmlFor="password" className="block text-xs sm:text-sm text-white opacity-30 font-extralight">
                                    Password
                                </label>
                                <div className="mt-1 sm:mt-2">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="password"
                                        required
                                        className="block w-full bg-[rgba(217,217,217,0.1)] rounded-sm text-neutral-300 h-8 sm:h-10 px-2 sm:px-3"
                                    />
                                </div>
                            </div>

                            {/* Campo de Confirmação de Senha */}
                            <div className="mt-4 sm:mt-6">
                                <label htmlFor="confirm_password" className="block text-xs sm:text-sm text-white opacity-30 font-extralight">
                                    Confirm Password
                                </label>
                                <div className="mt-1 sm:mt-2">
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        id="password_confirm"
                                        autoComplete="password"
                                        required
                                        className="block w-full bg-[rgba(217,217,217,0.1)] rounded-sm text-neutral-300 h-8 sm:h-10 px-2 sm:px-3"
                                    />
                                </div>
                            </div>
                            {/* Botão de Registro */}
                            <div className="flex justify-between items-center mt-8">
                                
                                <button type="button" onClick={handleBack} className="text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                                    voltar
                                </button>
                                <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs sm:text-sm px-4 py-2 text-center">
                                    Register
                                 </button>

                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}