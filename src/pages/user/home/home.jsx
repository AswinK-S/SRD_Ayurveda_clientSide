import Footer from "../../../components/footer/footer";
import Body from "../../../components/homeBody/body";
import Nav from "../../../components/navbar/nav";

const Home = ()=>{
    return(
        <>
        <Nav/>
        <div className="">
            <h1>home</h1>
            <img className="w-full max-h-[450px] " src='/hmImg1.jpg' alt=''/>
        </div>
        <Body/>
        <Footer/>
        </>
    )
}

export default Home