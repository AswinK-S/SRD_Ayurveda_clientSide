import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    // Button,
} from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getSlots } from "../../api/doctorApi";


const Slots = () => {

    const [slot, setSlot] = useState([])

    const getSlot = async (id) => {
        try {
            let result = await getSlots(id)
            console.log('rslt', result.data.slot);
            if (result?.data?.slot) {
                const slots = result.data.slot.sort((a, b) => new Date(a.date) - new Date(b.date))
                console.log('srtd slts', slots);
                setSlot(slots)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('doctortoken')
        if (token) {
            const decode = jwtDecode(token)
            getSlot(decode.id)
        }
    }, [])



    return (
        <>
            <div className='w-full gap-10 flex flex-wrap flex-row justify-center my-10'>

                {slot.length > 0 ? (

                    slot.map((singleSlot, index) => (
                        <Card key={`slot-${index}`} className="mt-6 w-auto bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Created Slots
                                </Typography>
                                <Typography>
                                    <p className="flex ">Date : <p>{new Date(singleSlot.date).toLocaleDateString()}</p></p>
                                    <p className="flex">Shift : <p>{singleSlot.shift}</p></p>
                                    {/* <p className="flex">Id of Doc : <p>{}</p></p>  */}
                                    <p className="flex">Available token : <p>{singleSlot.count}</p></p>

                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                {/* <Button>cancel</Button> */}
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <>
                        <span>
                            <h1>No Slots created</h1>
                        </span>
                    </>
                )}
            </div>
        </>

    );
}

export default Slots




