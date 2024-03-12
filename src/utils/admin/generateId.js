export const generateDocId = async ()=>{
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let id = ''

    for(let i=0;i<2;i++){
        id += letters.charAt(Math.floor(Math.random()*letters.length))
    }

    for(let i=0;i<5;i++){
        id+= numbers.charAt(Math.floor(Math.random()*numbers.length))
    }

    return id

}