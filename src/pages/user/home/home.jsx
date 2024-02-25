import Footer from "../../../components/footer/footer";
import Body from "../../../components/homeBody/body";
import Nav from "../../../components/navbar/nav";

const Home = ()=>{
    return(
        <>
        <Nav/>
        <div className="">
            <img className="w-full object-fill lg:h-96 rounded-xl " src='/hmImg1-transformed.jpeg' alt=''/>
        </div>
        <Body/>
        <Footer/>
        </>
    )
}

export default Home