export const formValidation = (formData) => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobRegex = /^\d{10}$/;

    console.log(formData.treatment ," trtmnt ",);
    console.log(formData.doctor_id ," id ",);
    console.log(formData.subTreatment ," subtrtmnt ",);


    if (!formData.name) {
        errors.name = 'Name cannot be empty.';
    } else if (formData.name.trim() === '') {
        errors.name = 'Name cannot contain only spaces.';
    } else if(!nameRegex.test(formData.name)){
        errors.name='Name must contain at least 3 letters'
    }

    if (!formData.email) {
        errors.email = 'Email cannot be empty.';
    } else if (formData.email.trim() === '') {
        errors.email = 'Email cannot contain only spaces.';
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address.';
    }

    if (!formData.mob) {
        errors.mob = 'Mobile number cannot be empty.';
    } else if (formData.mob.trim() === '') {
        errors.mob = 'Mobile number cannot contain only spaces.';
    } else if (!mobRegex.test(formData.mob)) {
        errors.mob = 'Please enter a valid mobile number.';
    }


    if(!formData.password){
        errors.password= 'password cannot be empty.';
    }else if(formData.password.trim()===''){
        errors.password ="password cannot contain only spaces"
    }

    if(!formData.address){
        errors.address ="address cannot be empty"
    }else if(formData.address.trim()==='' || formData.address.length<6){
        errors.address='enter valid address'
    }

    if(!formData.experience){
        errors.experience= 'experience cannot be empty'
    }else if(formData.experience.trim()===''){
        errors.experience = 'experience cannot contain only spaces'
    }

    if(!formData.doctor_id){
        errors.doctor_id ='doctor cannot be empty'
    }else if(formData.doctor_id.trim()===''){
        errors.doctor_id='id cannot contain only spaces'
    }    

    if(!formData.treatment){
        errors.treatment = 'treatment cannot be empty'
    }else if(formData.treatment.trim()===''){
        errors.treatment ='treatment cannot contain only spaces'
    }

    if(!formData.subTreatment){
        errors.subTreatment = 'sub treatment cannot be empty'
    }else if(formData.subTreatment.trim()===''){
        errors.subTreatment = 'subtreatment cannot contain only spaces'
    }


    // Add more validation logic as needed for other fields

    return errors;
};

