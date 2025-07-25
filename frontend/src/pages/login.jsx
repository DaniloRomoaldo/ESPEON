import {useForm} from "react-hook-form"
import {useMutation} from "@tanstack/react-query"
import { login } from "../api/login";
import { useState } from "react"; 

export default function Login() {

    const {
        register,
        handleSubmit,
        formState: {isSubmitting}
        
    } = useForm();

    const [errorMessage, setErrorMessage] = useState(null);

    const {mutateAsync: autenticate} = useMutation({
        mutationFn: login,
        onSuccess: () => {
            window.location.href = "/home"; // O navigate causou problema com a maniulação do DOM pelo preline
        },
        onError: (error) => {
            setErrorMessage(error.message);
        }
    })

   
    async function handleLogin(data) {
        setErrorMessage(null);
        await autenticate({email: data.email, password: data.password})
    }

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
                    <form onSubmit={handleSubmit(handleLogin)}
                    className="flex-grow flex flex-col justify-between space-y-3 sm:space-y-6" action="#" method="POST">
                        {/* Campos do Formulário */}
                        <div>
                            {/* Campo de Email */}
                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm text-white opacity-30 font-extralight">
                                    Email
                                </label>
                                <div className="mt-1 sm:mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full bg-[rgba(217,217,217,0.1)] rounded-sm text-neutral-300 h-8 sm:h-10 px-2 sm:px-3"
                                        {...register("email")}
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
                                        id="password"
                                        type="password"
                                        name="password"
                                        autoComplete="password"
                                        required
                                        className="block w-full bg-[rgba(217,217,217,0.1)] rounded-sm text-neutral-300 h-8 sm:h-10 px-2 sm:px-3"
                                        {...register("password")}
                                    />
                                </div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs sm:text-sm text-white opacity-30 font-extralight text-right hover:opacity-100 cursor-pointer"
                                >
                                    Reset password?
                                </label>
                                {/* Mensagem de Erro de Login */}
                                {errorMessage && (
                                    <div className="flex items-center gap-2 text-[rgb(204,154,53)]">
                                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                        <span className="font-light">{errorMessage}</span> 
                                    </div>
                                      
                                    )}
                            </div> 

                            {/* Seleção de Ambiente */}
                            <p className="text-center text-white opacity-70 font-extralight text-[16px] sm:text-[20px] mt-15 sm:mt-10">
                                Choose your Ambient
                            </p>
                            <select
                                id="ambient_id"
                                className="block w-full bg-[rgba(217,217,217,0.1)] rounded-sm h-8 sm:h-10 text-neutral-300 text-center text-[16px] sm:text-[20px] cursor-pointer mt-2 sm:mt-4"
                                {...register("ambient", { defaultValue: "postgres" })}
                            >
                                <option value="postgres" className="text-gray-900">PostgreSQL</option>
                                <option value="mongo">MongoDB</option>
                            </select>
                        </div>

                        {/* Botão de Login */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="text-white bg-gradient-to-br from-purple-700 to-blue-600 font-medium rounded-lg text-xs sm:text-sm px-4 py-2 text-center opacity-60 hover:opacity-100 cursor-pointer"
                                disabled={isSubmitting}
                            >
                                Login
                            </button>
                        </div>

                        {/* Link "Forgot your password?" */}
                        <p className="text-center text-white opacity-30 hover:opacity-100 font-extralight text-[16px] sm:text-[20px] cursor-pointer">
                            Forgot your password?
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}