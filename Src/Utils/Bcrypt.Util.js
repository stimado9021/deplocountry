import Bcrypt from "bcrypt"



export async function EncriptarPassword(password){
    try {
        const hashToPassword = await Bcrypt.hash(password,10)
        console.log("Contraseña hasheada",hashToPassword)
        return hashToPassword
    } catch (error) {
        console.error("Error al encriptar la contraseña",error)
        return false
    }
}

export async function ComparePassword(password,hashToPassword){
   try {
    const match = await Bcrypt.compare(password,hashToPassword)
    console.log("Contraseña hasheada",match)
    if(match){
        console.log("Las contraseñas coiciden")
        return true
    }else{
        console.log("Hay un error las contraseñas no coiciden")
        return false
    }
    
   } catch (error) {
    console.error("Error:",error.message)
   }
}