

export function TrtmntEdtModal({setTrtmntModal}) {




    return (



        <>


            <div
                className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"

                id="modal-id"
            >
                <div className="absolute bg-black opacity-80 inset-0 z-0" />
                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-[#E7EE9D]">
                    {/*content*/}
                    {/* <div className=" mt-8 p-10 rounded-md shadow-2xl bg-[#E7EE9D]"> */}
                        <div className="flex justify-center mb-5 mt-5">
                            <h2 className="text-2xl font-semibold mb-4">Add Treatment</h2>
                        </div>

                        <form onSubmit=''>
                            <div className="flex flex-row gap-5 justify-around">
                                <div className="">
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                            Treatment Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value=''
                                            onChange=''
                                            className="border rounded-md p-2 w-full"
                                        />
                                    </div>
                                    {/* {errorMessage && <p className='text-red-500 text-sm'> {errorMessage}</p>} */}

                                    {/* {subTreatments.map((subTreatment, index) => ( */}

                                    <div className="mb-4" key=''>
                                        <label htmlFor='' className="block text-gray-600 text-sm font-medium mb-2">
                                            Add SubTreatments
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                id=''
                                                name=''
                                                value=''
                                                onChange=''
                                                className="border rounded-md p-2 w-full"
                                            />
                                            {/* {index === subTreatments.length - 1 && ( */}
                                            <button type="button" onClick='' className="ml-2">
                                                +
                                            </button>
                                            {/* )} */}
                                        </div>
                                    </div>
                                    {/* ))} */}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-[#CEB047] text-white py-2 px-4 rounded-md hover:bg-[#dfc258]"
                                >
                                    Add Treatment
                                </button>
                            </div>
                        </form>

                         {/*footer*/}
                         <div className="p-3  mt-2 text-center space-x-4 md:block">
                            <button onClick={()=>setTrtmntModal(false)} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                Cancel
                            </button>
                            {/* <button onClick={handleStatus} className="mb-2 md:mb-0 bg-[#d8e088] border   px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-black rounded-full hover:shadow-lg hover:bg-[#c9d172]">
                                Continue
                            </button> */}
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </>


    );
}

export default TrtmntEdtModal