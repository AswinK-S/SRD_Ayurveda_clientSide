import './footer.css'


const Footer = () => {



    const backgroundImage = {
        backgroundImage: 'url("footer-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',

    };

    return (
        <div>
            <div className="flex lg:h-[200px]  items-center p-5" style={backgroundImage}>
                <div className="address bg-transparent text-white rounded-md p-2  shadow-lg">
                    <ul className=' text-wrap  bg-transparent font-bold p-2  rounded-lg  '>
                        <li className='bg-transparent'>PULAMANTHOLE</li>
                        <li className='bg-transparent'>SRD AYURVEDICS & NURSING HOME</li>
                        <li className='bg-transparent'>Pulamanthole (PO)</li>
                        <li className='bg-transparent'>Malappuram</li>
                        <li className='bg-transparent'>Kerala</li>
                        <li className='bg-transparent'>Phone. +91 0000000006</li>
                    </ul>
                </div>
            </div>

        </div>

    );
}

export default Footer;
