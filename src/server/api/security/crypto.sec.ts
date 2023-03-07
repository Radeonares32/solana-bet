import Crypto from 'cryptr'

const cryptr = new Crypto("Radeonares32")

export const encrypt = (text: any | any[]) => {
    try {
        return cryptr.encrypt(JSON.stringify(text))
    }
    catch (err) {
        return {
            Error: err
        }
    }

}

export const decrypt = (text: any | any[]) => {
    try {
        return JSON.parse(cryptr.decrypt(text))
        
    } catch (err) {
        return {
            Error: err
        }
    }

}
