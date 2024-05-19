import Nav from "../components/navbar/nav"
import PageNotfound from '../components/error/pageNotfound'

const PageNotFoundError = () => {
    return (
        <>
            <Nav/>
            <div className="flex justify-center items-center h-[38.5rem] ">
                <PageNotfound/>
            </div>
        </>
    )
}

export default PageNotFoundError