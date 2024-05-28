import './footer.css'


const Footer = () => {



    // const backgroundImage = {
    //     backgroundImage: 'url("footer-bg.jpg")',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     width: '100%',
    //     position: 'relative',

    // };
    // style={backgroundImage}

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="  items-center p-2 bg-[#78350f] lg:h-[250px] lg:w-2/3 w-full">
                <div className="address bg-transparent text-white rounded-md p-2 ">
                    <ul className="text-wrap bg-transparent font-bold p-2 rounded-lg">
                        <li className="bg-transparent">SRD AYURVEDICS & NURSING HOME</li>
                        <li className="bg-transparent">PULAMANTHOLE</li>
                        <li className="bg-transparent">Pulamanthole (PO)</li>
                        <li className="bg-transparent">Malappuram</li>
                        <li className="bg-transparent">Kerala</li>
                        <li className="bg-transparent">Phone. +91 0000000006</li>
                    </ul>

                </div>

                <div className=" p-5 text-center">
                    <span className="text-xs text-white">© 2024 Copyright :</span>
                    <a className="font-extralight text-xs  font-sans text-white" href="">
                        protected
                    </a>
                </div>
            </div>

            <div className="w-full lg:w-1/3">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d88862.5720360894!2d75.50127007282127!3d11.896371927053664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1716833235916!5m2!1sen!2sin"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>


    );
}

export default Footer;
