import { useEffect, useState } from "react";
import ImgComponent from "../../../components/imgCmpnt/ImgComponent";
import Nav from "../../../components/navbar/nav";
import { useSelector } from "react-redux";
import { bookings } from "../../../api/userApi";

const OnlineBooking = () => {
    const user = useSelector((state) => state.user.user);
    const [bookinsData, setBookingsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            // Make an API call to fetch bookings data from backend
            const response = await bookings(user.email, page);
            console.log('response from backend-->', response);
            setBookingsData(response)

        } catch (error) {
            console.log("Error fetching bookings:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Function to handle scroll events and trigger fetching more data when reaching the bottom
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;
        fetchBookings();
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (

        <>
            <div className="flex justify-center">
                <Nav />
            </div>
            <ImgComponent text="Online Booking" />
            <div className="mb-4  p-3 flex flex-col   items-center overflow-hidden">
                <div className="w-1/2 overflow-y-scroll p-4 bg-[#f4fbdb] rounded-md shadow-sm shadow-black">
                    {bookinsData ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {bookinsData.map((booking, index) => (
                                <div
                                    key={index}
                                    className="max-w-sm overflow-hidden rounded-lg shadow-lg  bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300  "
                                >
                                    <div className="px-4 py-2 flex flex-row justify-center gap-4 items-center ">
                                        <div className="font-bold text-md">Doctor Name : </div>
                                        <h1 className="text-gray-700 text-base font-bold"> {booking.doctorName}</h1>
                                    </div>
                                    <div className="px-4 py-2 flex flex-row justify-center gap-4 items-center ">
                                        <div className="font-bold text-md  ">Treatment :</div>
                                        <p className="text-gray-700 text-base font-bold "> {booking.treatmentName}</p>
                                    </div>
                                    <div className="px-4 py-2 flex flex-row justify-center gap-4 items-center ">
                                        <div className="font-bold text-md ">Sub-Treatment :</div>
                                        <p className="text-gray-700 text-base font-bold">{booking.subTreatmentName}</p>
                                    </div>
                                    <div className="px-4 py-2 flex flex-row justify-center gap-4 items-center ">
                                        <div className="font-bold text-md ">Amount :</div>
                                        <p className="text-gray-700 text-base font-bold">{booking.amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No bookings</p>
                    )}

                </div>
            </div>

            {loading && <p className="text-center">Loading...</p>}
        </>

    );
};

export default OnlineBooking;
