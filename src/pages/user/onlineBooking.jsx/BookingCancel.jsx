import { Link } from "react-router-dom"
import Nav from "../../../components/navbar/nav"

const BookingCancel = () => {
  return (
    <>
    <Nav />

    <div
        className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"

        id="modal-id"
    >
        <div className="absolute bg-black opacity-80 inset-0 z-0" />
        <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-[#F9FFE1] ">
            {/*content*/}
            <div className="">
                {/*body*/}
                <div className="text-center p-5 flex-auto justify-center">
                    <h2 className="text-xl font-bold py-4  text-red-900">Payment Failed</h2>
                    <p className="text-md text-blue-900 px-8">
                        Slot booking cancelled
                    </p>
                </div>
                {/*footer*/}
                <div className="p-3  mt-2 text-center space-x-4 md:block">

                  <Link to='/treatment'>
                  <button className="mb-2 md:mb-0 bg-[#d8e088] border   px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-black rounded-full hover:shadow-lg hover:bg-[#c9d172]">
                        Continue
                    </button>
                  </Link>  

                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default BookingCancel