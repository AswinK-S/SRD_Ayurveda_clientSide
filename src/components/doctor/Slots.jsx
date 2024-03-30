import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { getSlots } from "../../api/doctorApi";


const Slots = () => {

    const getSlot = async(id)=>{
        try {
            let result = await getSlots(id)
            console.log('rslt',result);
        } catch (error) {
           console.log(error.message); 
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('doctortoken')
        if(token){
            const decode = jwtDecode(token)
            getSlot(decode.id)
        }
    },[])

    return (
        <>
            <Card className="mt-6 w-96  bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Selected Slot
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>cancel</Button>
                </CardFooter>
            </Card>
        </>

    );
}

export default Slots




