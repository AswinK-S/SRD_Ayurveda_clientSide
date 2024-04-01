import ImgComponent from "../../../components/imgCmpnt/ImgComponent"
import Nav from "../../../components/navbar/nav"

const OnlineBooking = ()=>{
    
    return(
        <>
             <div className=" flex justify-center">
                <Nav />
                </div>
                <ImgComponent text='Online Booking'/>
            <div>
                <h1>Online Booking</h1>
            </div>

        </>
    )
}

export default OnlineBooking