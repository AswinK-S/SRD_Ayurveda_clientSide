import BookTrtmnt from "../../../components/User/BookTrtmnt"
import Footer from "../../../components/footer/footer"
import ImgComponent from "../../../components/imgCmpnt/ImgComponent"
import Nav from "../../../components/navbar/nav"


const BookTreatment = () => {
    return (
        <>
            <div>
                <div className=" flex justify-center ">
                    <Nav />
                </div>
                <ImgComponent text='Online Booking'  />
                <div className="mx-auto max-w-screen-lg">
                    <BookTrtmnt />
                </div>
            </div>
            <Footer />

        </>
    )
}

export default BookTreatment