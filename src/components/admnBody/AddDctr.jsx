
const AddDctr = () => {
    return (
        <>
        <div className="flex justify-center mb-8 ">
            <div className=" w-1/2 mt-8 p-10 rounded-md shadow-2xl bg-[#E7EE9D]">
                <div className="flex justify-center mb-5 mt-5">
                <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>
                </div>
                
                <form onSubmit=''>
                    {/* Add your form fields here */}

                    <div className="flex flex-row  gap-5  justify-around">
                        <div className="  w-1/2">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                    Name
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

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value=''
                                    onChange=''
                                    className="border  rounded-md p-2 w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                    Mob
                                </label>
                                <input
                                    type="number"
                                    id="mob"
                                    name="mob"
                                    value=''
                                    onChange=''
                                    className="border  rounded-md p-2 w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value=''
                                    onChange=''
                                    className="border  rounded-md p-2 w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="Cpassword"
                                    name="Cpassword"
                                    value=''
                                    onChange=''
                                    className="border  rounded-md p-2 w-full"
                                />
                            </div>
                        </div>

                        <div className=" w-1/2">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                    Address
                                </label>
                                <textarea
                                    type="text"
                                    id="address"
                                    name="address"
                                    value=''
                                    onChange=''
                                    className="border  rounded-md p-2 w-full"
                                />
                            </div>


                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                    Experience
                                </label>
                                <input
                                    type="text"
                                    id="exp"
                                    name="exp"
                                    value=''
                                    onChange=''
                                    className="border  rounded-md p-2 w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                    Doctors Id
                                </label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value=''
                                    onChange=''
                                    className="border  rounded-md p-2 w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="treatments" className="block text-gray-600 text-sm font-medium mb-2">
                                    Treatment
                                </label>
                                <select
                                    id="treatments"
                                    name="treatments"
                                    value=''
                                    onChange=''
                                    className="border  rounded-md p-2 w-full"
                                >
                                    <option value="treatment1">Treatment 1</option>
                                    {/* Add more treatment options as needed */}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="treatments" className="block text-gray-600 text-sm font-medium mb-2">
                                    Sub Treatment
                                </label>
                                <select
                                    id="Streatments"
                                    name="Streatments"
                                    value=''
                                    onChange=''
                                    className="border  rounded-md p-2 w-full"
                                >
                                    <option value="treatment1">Treatment 1</option>
                                    {/* Add more treatment options as needed */}
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* Repeat the above structure for other form fields */}

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-[#CEB047] text-white py-2 px-4 rounded-md hover:bg-[#dfc258]"
                        >
                            Add Doctor
                        </button>
                    </div>
                </form>
            </div >
        </div >
        </>
    )
}

export default AddDctr