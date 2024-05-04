import { useEffect, useState } from "react";
import ImgComponent from "../../../components/imgCmpnt/ImgComponent";
import Nav from "../../../components/navbar/nav";
import { useSelector } from "react-redux";
import { bookings } from "../../../api/userApi";
import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from '../../../components/footer/footer'

const OnlineBooking = () => {
    const user = useSelector((state) => state.user.user);
    const [bookinsData, setBookingsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 6;


    const fetchBookings = async (pageNumber) => {
        setLoading(true);
        try {
            // Make an API call to fetch bookings data from backend
            const response = await bookings(user.email, pageNumber, pageSize);
            console.log('response from backend-->', response);
            if (pageNumber === 1) {
                setBookingsData(response);
            } else {
                setBookingsData((prevData) => [...prevData, ...response]);
            }

            if (response.length < pageSize) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch (error) {
            console.log("Error fetching bookings:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings(1);
    }, []);

    const loadMoreBookings = () => {
        setPage(page + 1);
        fetchBookings(page + 1);

    };


    

    return (

        <>
            <div className="flex justify-center">
                <Nav />
            </div>
            <ImgComponent text="Online Booking" />
            <div className="mb-4  p-3 flex flex-col   items-center ">
                <p className=" flex justify-center px-12 py-3 mb-4 text-black text-base font-bold shadow-sm shadow-black  bg-gradient-to-r from-lime-400 via-lime-200 to-lime-400 ">Bookings List</p>

                <div
                    id="parentScrollDiv"
                    className="w-1/2 p-4 bg-[#f4fbdb] rounded-md shadow-sm shadow-black h-[500px] overflow-auto">
                    {bookinsData.length > 0 ? (

                        <InfiniteScroll
                            
                            dataLength={bookinsData.length}
                            next={loadMoreBookings}
                            hasMore={hasMore}
                            loader={<p className="text-center">Loading...</p>}
                            endMessage={<p className="text-center">No more bookings to load.</p>}
                            scrollableTarget="parentScrollDiv"
                        >
                            <div id="bookingHistoryDiv" className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {bookinsData.map((booking, index) => (
                                    <div
                                        key={index}

                                        className="max-w-sm py-3 overflow-hidden rounded-lg shadow-lg  bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300  "
                                    >
                                        <div className="px-4  flex flex-row justify-center gap-2 items-center ">
                                            <div className="font-bold text-sm">Doctor Name : </div>
                                            <h1 className="text-gray-700 text-base font-bold"> {booking.doctorName}</h1>
                                        </div>
                                        <div className="px-4  flex flex-row justify-center gap-2 items-center ">
                                            <div className="font-bold text-sm  ">Treatment :</div>
                                            <p className="text-gray-700 text-base font-bold "> {booking.treatmentName}</p>
                                        </div>
                                        <div className="px-4  flex flex-row justify-center gap-2 items-center ">
                                            <div className="font-bold text-sm ">Sub-Treatment :</div>
                                            <p className="text-gray-700 text-base font-bold">{booking.subTreatmentName}</p>
                                        </div>
                                        <div className="px-4  flex flex-row justify-center gap-2 items-center ">
                                            <div className="font-bold text-sm ">Consulting Date:</div>
                                            <p className="text-red-700 text-base font-bold">
                                                {new Date(booking?.consultationDate).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="px-4  flex flex-row justify-center gap-2 items-center ">
                                            <div className="font-bold text-sm ">Booking Date:</div>
                                            <p className="text-blue-700 text-base font-bold">
                                                {new Date(booking?.bookingDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="px-4  flex flex-row justify-center gap-2 items-center ">
                                            <div className="font-bold text-sm ">Status:</div>
                                            {
                                            booking?.status ==='Pending' ?(
                                            <p className="text-orange-700 text-base font-bold">{booking?.status}</p>
                                             ):(                                            
                                             <p className="text-greeen-700 text-base font-bold">{booking?.status}</p>
                                            )
                                            }
                                        </div>
                                        <div className="px-4  flex flex-row justify-center gap-2 items-center ">
                                            <div className="font-bold text-sm ">Amount :</div>
                                            <p className="text-gray-700 text-base font-bold">{booking.amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </InfiniteScroll>


                    ) : (
                        <p className="text-center">No bookings</p>
                    )}

                </div>
            </div>

            {loading && <p className="text-center">Loading...</p>}
            <Footer/>
        </>

    );
};

export default OnlineBooking;
