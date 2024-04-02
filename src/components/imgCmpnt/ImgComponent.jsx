
// eslint-disable-next-line react/prop-types
const ImgComponent = ({text}) => {
    return (

        <div>
            <div className= "p-5  h-[200px] relative" >
                <img src="/ayurveda.jpeg" className = " w-full h-full object-cover rounded-md shadow-md shadow-black "  />
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2font-extrabold text-4xl font-extrabold text-white dark:text-white" >
                          { text }
                     </div>
            </div>
        </div>
    
  )
}

export default ImgComponent