import Footer from "../../../components/footer/footer";
import Body from "../../../components/homeBody/body";
import Nav from "../../../components/navbar/nav";


const Home = () => {


    return (
        <>
            <div >
                <div className=" flex justify-center">
                <Nav />
                </div>
                
                <div className="">
                    <img className="w-full object-fill lg:h-96 rounded-xl " src='/hmImg1-transformed.jpeg' alt='' />
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