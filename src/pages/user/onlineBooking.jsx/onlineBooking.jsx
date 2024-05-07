import { useEffect, useState } from "react";
import ImgComponent from "../../../components/imgCmpnt/ImgComponent";
import Nav from "../../../components/navbar/nav";
import { useSelector } from "react-redux";
import { bookings } from "../../../api/userApi";
import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from '../../../components/footer/footer'
import PageNotFound from "../../../components/error/pageNotfound";
import { FaSearch } from "react-icons/fa";
import 'ldrs/quantum'


const OnlineBooking = () => {
    const user = useSelector((state) => state.user.user);
    const [bookinsData, setBookingsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('')
    const pageSize = 6;

    const [fiterValue, setfilterVallue] = useState(null)

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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)

    }


    //search booking on the basis of doctor,treatment,status,subTreatment and filter on the amount
    const filteredData = bookinsData.filter((item) => {
        const doctor = `${item.doctorName}`.toLowerCase()
        const treatment = `${item.treatmentName}`.toLowerCase()
        const status = `${item.status}`.toLowerCase()
        const subTreatment = `${item.subTreatmentName}`.toLowerCase()
        const searchItem = searchTerm.toLowerCase()

        if (fiterValue) {
            const [min, max] = fiterValue.split('-').map(Number);
            const amount = Number(item.amount)

            return amount >= min && amount <= max;
        }

        return (doctor.includes(searchItem) || treatment.includes(searchItem) || status.includes(searchItem)
            || subTreatment.includes(searchItem))
    })

    const handleFilterChange = (event) => {
        const selected = event.target.value;
        console.log('seleted price', selected);
        setfilterVallue(selected)
    };

    return (

        <>
            <div className="flex justify-center">
                <Nav />
            </div>
            <ImgComponent text="Online Booking" />
            {/* search and filter  */}
            <div className="flex flex-col  items-center mb-5 ">

                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">

                    <div className="flex items-center border border-lime-200 shadow-sm   shadow-black rounded">
                        <span className="px-2 text-gray-500">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="search"
                            className="px-4 py-2"
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                    </div>

                    <div className="flex  items-center  border border-lime-200 shadow-sm   shadow-black rounded">
                        <span className="font-bold text-sm px-2 text-gray-500">Amount:</span>
                        <select
                            // value={selectedFilter}
                            onChange={handleFilterChange}
                            className=" py-2 "
                        >
                            <option value="">All</option>
                            <option value="100-300">100-300</option>
                            <option value="301-500">301-500</option>
                            <option value="501-1000">501-1000</option>
                            <option value="below300">Below 300</option>
                        </select>
                    </div>
                </div>

            </div >

            <div className="mb-4  p-3 flex flex-col   items-center ">
                <div
                    id="parentScrollDiv"
                    className="w-1/2 p-4 bg-[#f4fbdb] rounded-md shadow-sm shadow-black h-[500px] overflow-auto">
                    {bookinsData?.length > 0 ? (

                        <InfiniteScroll
                            dataLength={bookinsData?.length}
                            next={loadMoreBookings}
                            hasMore={hasMore}
                            // loader={<div className=" inset-0 flex items-center justify-center   bg-yellow-100   ">
                            //     <div className=" p-5 flex-row items-center justify-center   ">
                            //         <l-quantum
                            //             size="80"
                            //             speed="1"
                            //             color="green"
                            //         ></l-quantum>
                            //         <p className="text-light-green-800">loading...</p>
                            //     </div>
                            // </div>}
                            endMessage={<p className="text-center">No more bookings to load.</p>}
                            scrollableTarget="parentScrollDiv"
                        >
                            <div id="bookingHistoryDiv" className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {filteredData?.map((booking, index) => (
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
                                                booking?.status === 'Pending' ? (
                                                    <p className="text-orange-700 text-base font-bold">{booking?.status}</p>
                                                ) : (
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
                        <><PageNotFound /></>
                    )}

                </div>
            </div>

            {
                loading && <div className="h-screen inset-0 flex items-center justify-center   bg-yellow-100   ">
                    <div className=" p-5 flex-row items-center justify-center   ">
                        <l-quantum
                            size="80"
                            speed="1.25"
                            color="green"
                        ></l-quantum>
                        <p className="text-light-green-800">loading...</p>
                    </div>
                </div>
            }
            <Footer />
        </>

    );
};

export default OnlineBooking;
