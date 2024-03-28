import Footer from "../../../components/footer/footer";
import Body from "../../../components/homeBody/body";
import Nav from "../../../components/navbar/nav";


const Home = () => {


    return (
        <>
            <div >
            <div className="sticky top-0  flex justify-center bg-gradient-to-r from-lime-100 via-lime-100 to-lime-50">
                <Nav />
                </div>
                
                <div className="">
                    <img className="w-full object-fill   " src='/inner-bg.jpg' alt='' />
                </div>
                <div className=" flex items-center justify-center ">
                    <Body />
                </div>
                <Footer />
            </div>

        </>
    )
}

export default Home