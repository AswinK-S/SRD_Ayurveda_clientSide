
import '../../tailwind.module.css'
import './body.css'

const Body = () => {
    return (
        <>
            <div className="container   py-5 px-4  ">

                <div className='flex w-full   items-center flex-col gap-10  lg:p-4'>

                    <div className="flex  justify-evenly items-center p-2     " >

                        <div className='m-4  '>
                            <img className='rounded-3xl img-fluid h-[350px] w-[500px] hover:translate-y-4 cursor-pointer shadow-xl shadow-blue-gray-200' src="/product-bg.jpg" alt="" />
                        </div>

                        <div className=' p-10 bg-gradient-to-r from-lime-200 via-lime-100 to-lime-200 rounded-3xl shadow-lg shadow-blue-gray-200   h-full m-4  w-3/6'>

                            <p className='text-md  '>
                                SRD AYURVEDA
                                Under the guidance of Ashtavaidyan Pulamanthol Mooss, the pioneer of Ayurveda in Kerala, <br />
                                SRD Ayurveda Hospital started its operations in the year 1988. Backed by the centuries old tradition, <br />
                                experience and expertise of Pulamanthol Mana, SRD has become synonymous to authentic ayurveda in Kerala. <br />
                                Located on the banks of river Kunti, SRD is blessed with divine and august ambience, which harmonizes a <br />
                                holistic well being of mind and body for every person who comes to SRD. A GMP certified company, <br />
                                SRD believes in employing traditional methods and equipments for treatment, not compromising the quality and authenticity.
                            </p>

                        </div>

                    </div>


                    <div className="flex  justify-evenly items-center p-2  ">

                        <div className='  p-10 bg-gradient-to-r from-lime-200 via-lime-100 to-lime-200 rounded-3xl shadow-lg shadow-blue-gray-200 h-full m-4  w-3/6 '>

                            <p className='text-md transition-transform transform hover:animate-shake '>
                                Ayurveda is India’s contribution to the world in the field of medicine. Ayurveda has been in practice
                                from time immemorial. Even though there are some references about Ayurveda in ancient texts and Vedas,
                                the exact time period at which the practice started is still a topic of debate among the experts.
                                Ayurveda is a way of living for holistic well being of an individual; it is not just a treatment.
                                The aim of Ayurveda is to prevent diseases and to preserve life (Swasthasya Swasthyarakshnam) by eliminating
                                the root cause of the disease. Ayurveda is based on the premise that, not only the cosmic system, but also the
                                human body has the ‘Pancha Mahabhutas’-prithvi,ap,tejas,vayu and akasha. These elements are represented in a
                                human body in the form of three “doshas”, called as “tridosha”- Vata, Pitta and Kapha.
                            </p>
                        </div>

                        <div className='m-4  '>
                            <img className='rounded-3xl img-fluid  cursor-pointer shadow-xl shadow-blue-gray-200 h-[350px] w-[500px] hover:translate-x-4' src=" /hmImg2.jpg" alt="" />
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Body;
