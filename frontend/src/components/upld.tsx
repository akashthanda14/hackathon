export const UploadPage=()=>{


    return <>
       <div className="w-full flex flex-row min-h-screen bg-gray-100 p-2 relative">
                {/* Left Sidebar */}
                <div className="w-44 bg-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center hidden sm:flex">
                    {/* User Avatar */}
                    <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center text-white text-lg font-semibold mb-3">
                        U
                    </div>
                    {/* Divider */}
                    <div className="w-full border-b border-gray-300 mb-3"></div>
                    {/* Placeholder Content */}
                    <div className="text-gray-700 font-medium">Dashboard</div>
                </div>

                {/* Right Content */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 w-full">
                    <h1 className="font-bold text-3xl mb-4">What you want to ask?</h1>
                    
                    {/* Input Container - Responsive */}
                    <div className="hidden sm:flex w-2/3 flex-row items-center gap-2 p-4 bg-white border border-gray-300 rounded-md ">
                        <input
                            type="text"
                            placeholder="Enter your query"
                            className="w-full h-12 px-4 border-none outline-none text-gray-900"
                        />
                        <button className="bg-black text-white p-3 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-arrow-up-from-line"
                            >
                                <path d="m18 9-6-6-6 6" />
                                <path d="M12 3v14" />
                                <path d="M5 21h14" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Chat-style input for small screens */}
                <div className="sm:hidden fixed bottom-0 w-full p-3 flex items-center gap-2 ">
                    <input
                        type="text"
                        placeholder="Enter your query"
                        className="flex-1 px-4 py-3 border border-gray-300 outline-none text-gray-900  rounded-lg"
                    />
                    <button className="bg-black text-white p-3 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-up-from-line"
                        >
                            <path d="m18 9-6-6-6 6" />
                            <path d="M12 3v14" />
                            <path d="M5 21h14" />
                        </svg>
                    </button>
                </div>

                {/* Disclaimer */}
                <div className="absolute bottom-0 w-full text-center py-2 text-gray-500 font-thin hidden sm:block">
                    It gives the summary of the pdf given to it
                </div>
            </div>
    </>
}