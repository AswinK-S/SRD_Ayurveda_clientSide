import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosApi from '../../services/api'
import Nav from '../navbar/nav'

const TreatmentDetail = () => {
    const { id } = useParams()
    const [treatment, setTreatment] = useState('')

    useEffect(() => {
        (async function fetchData() {
            if (id) {
                const response = await axiosApi.get('/')
            }
        })
    }, [id])
    return (

        <div className='w-full min-h-screen'>
            <Nav />
            <div className='w-full h-20 bg-yellow-200' >

            </div>

            <div className='w-full flex justify-center items-center'>
                <div className=' w-[70%] m-12 flex h-96 rounded-2xl justify-evenly bg-[#E7EE9D]'>
                    <div className='w-[35%] border-r-4 h-full justify-center items-center gap-y-8 flex flex-col  '>
                        <div className='min-w-[40%] min-h-9 rounded-lg flex '> <select className='w-full rounded-lg text-center' name="" id="">
                            <option value="">sample</option></select></div>
                        <div className='min-w-[40%] min-h-9 rounded-lg flex '> <select className='w-full rounded-lg text-center' name="" id="">
                            <option value="">sample</option></select></div>
                        <div className='min-w-[40%] min-h-9 rounded-lg flex '> <input type='date' className='w-full rounded-lg' value="" /></div>
                    </div>
                    <div className='w-[65%] p-8'>
                        <div className='w-full'><h1 className='text-center'>AVAILABLE SLOTS</h1></div>

                        <div className="w-full p-7">
                            <div className="grid text-white grid-cols-1 place-items-center md:grid-cols-2 gap-4">
                                <div className='border p-3  rounded-md bg-[#BB5F37]'>10:00 am to 12:00 pm</div>
                                <div className='border p-3 rounded-md bg-[#BB5F37]'>10:00 am to 12:00 pm</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TreatmentDetail