import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getTreatments } from "../../api/userApi";
import { doctor } from '../../api/userApi'

const BookTrtmnt = () => {



    // Dummy data for slots
    const slots = [
        { id: 1, time: "9:00 AM - 10:00 AM" },
        { id: 2, time: "10:00 AM - 11:00 AM" },
        { id: 3, time: "11:00 AM - 12:00 PM" },
        // Add more slots if needed
    ];


    const [treatments, setTreatments] = useState([])
    const [selectedTreatment, setSelectedTreatment] = useState({})
    const [selectedSubTreatment, setSelectedSubTreatment] = useState('')
    const [loading, setLoading] = useState(true)

    const [doctorsForTrtmnt, setDoctorsForTrtmnt] = useState('')

    const [date,setDate] = useState('')
    // const [dateError,setDateError] = useState('')
    
    const currentDate = new Date().toISOString().split('T')[0]
    const handleTreatmentChange = (e) => {
        const selectedTreatment = treatments.find(item => item._id === e.target.value)
        setSelectedTreatment(selectedTreatment)
        setSelectedSubTreatment('')
    }

    const handleSubTreatmentChange = (e) => {
        console.log('selected sbtt--', e.target.value);
        const sbTrtmntId = e.target.value
        setSelectedSubTreatment(sbTrtmntId)

    }

    const handleDate = (e)=>{
        if(!selectedSubTreatment){
            console.log('select doctors');
            // setDateError('first select treatment and subTreatment')
            return
        }
        console.log('date',e.target.value);
        const dateForTrtmt = e.target.value
        setDate(e.target.value)
        
        const getDoctors = async (sbTrtmntId,date) => {
            console.log('sbtrt-------->',sbTrtmntId,'date------>',date);
           try {
            const slotData = {sbTrtmntId,date}
            const result = await doctor(slotData)
            console.log('dctr for trtmnt---', result?.data?.doctor);
            const doc = result?.data?.doctor
            doc.map((item)=>{
                console.log('ddddd-----',item);
            })
            setDoctorsForTrtmnt(result?.data?.doctor)
           } catch (error) {
            console.error('Error fetching doctors:', error);

           }
        }
        getDoctors(selectedSubTreatment,dateForTrtmt)
    }


    useEffect(() => {


        const fetchData = async () => {

            try {
                const result = await getTreatments()
                console.log('trtmnts--', result.data.filter((item) => item.status));
                const available_treatment = result.data.filter((item) => item.status)
                console.log('avlble trtmnt --', available_treatment);
                setTreatments(available_treatment)
            } catch (error) {
                console.log('err in fetching treatmnt', error.message);
            } finally {
                setLoading(false)
            }


        }
        fetchData()
    }, [])

 
    console.log('selected trtmnt', selectedTreatment);

    return (
        <div className="flex flex-col lg:flex-row   bg-gradient-to-r from-lime-400 via-lime-200 to-lime-400 m-10 p-5 shadow-md shadow-black rounded-lg">
            {/* Left side */}
            <div className="flex-1 p-4">
                {/* Select Treatment */}

                {loading ? (<p>loading...</p>) :
                    (
                        <>
                            <div className="mb-4">
                                <label htmlFor="treatment" className="block mb-2 font-serif">Select Treatment</label>
                                <select id="treatment" name='treatment' value={selectedTreatment?._id} onChange={handleTreatmentChange} className="w-full p-2 border rounded">
                                    {/* Options for treatments */}
                                    <option value='' >Select Treatment</option>
                                    {treatments.map((item) => (
                                        <option key={item?._id} value={item?._id}> {item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )
                }

                {loading ? (<p>loading...</p>) :
                    (<>
                        <div className="mb-4">
                            <label htmlFor="Streatment" className="block mb-2 font-serif">Select Sub Treatment</label>
                            <select id="Streatment" className="w-full p-2 border rounded" value={selectedSubTreatment} onChange={handleSubTreatmentChange}>
                                {/* Options for treatments */}
                                <option > Select SubTreatment</option>
                                {selectedTreatment.subTreatments ? (
                                    selectedTreatment.subTreatments.filter(item => item.status).map((item) => (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))
                                ) : (
                                    <option value="">Select Treatment First</option>
                                )}
                            </select>
                        </div>
                    </>)
                }

                 {/* Calendar */}
                 <div>
                    {/* Calendar component */}
                        <p className="font-serif">Choose a date:</p>
                        <input type="date"   onChange={handleDate} min={currentDate} className="border border-black"/>
                </div>


                {/* Select Doctor */}
                <div className="flex justify-center"><p className="font-serif">Available Doctors</p></div>
                <div className="mb-4 p-2  max-h-60 flex flex-col items-center overflow-hidden ">
                    <div className="w-full max-w-md overflow-y-scroll p-4 bg-[#f4fbdb] rounded-md  shadow-sm shadow-black">
                        {doctorsForTrtmnt.length>0 ?
                            (
                                doctorsForTrtmnt.map((doctor) => (
                                    <Card key={doctor.doctor._id} className="mb-2 h-28  bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 rounded-md shadow-md shadow-black">
                                        <CardBody className=" h-8 ">
                                            <Typography variant="h6" color="blue-gray" className="">
                                                {doctor.doctor.name}

                                            </Typography>
                                            {/* Other doctor details */}
                                        </CardBody>
                                        <CardFooter className="">
                                            <button 
                                            onClick={}
                                            className="h-7 px-3  text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                                            >Select Doctor</button>
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (<p>No Doctors Available </p>)
                        }
                    </div>
                </div>
               
            </div>


            <div className="bg-white w-1 rounded-md shadow-sm shadow-black"></div>
            {/* Right side */}
            <div className="flex-1 p-4 ">
                {/* Available slots */}
                <div className="grid grid-cols-1 gap-4 ">
                    {/* Slot cards */}
                    <div className="flex justify-center"> <h4 className="font-serif text-xl">Available slots</h4></div>
                    <div className="mb-4 p-2  max-h-80 flex flex-col items-center rounded-lg bg-[#eff6d5] overflow-hidden shadow-sm shadow-black">
                        <div className="w-3/4 max-w-md overflow-y-scroll p-3 ">
                            {slots.map((slot) => (
                                <Card key={slot.id} className="mt-6 w-auto bg-gradient-to-r from-lime-200 via-lime-100 to-lime-300 shadow-md shadow-black">
                                    <CardBody>
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            Doctor
                                        </Typography>
                                        <Typography>
                                            Slot Available
                                        </Typography>
                                    </CardBody>
                                    <CardFooter className="pt-0">
                                        <Button>Book Now</Button>
                                    </CardFooter>
                                </Card>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookTrtmnt;
