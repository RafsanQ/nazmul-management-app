import axios from "axios"

export const getIdByEmail = async (email: string, userType: string, token: string) => {
    const response = await axios.post('http://localhost:3309/api/' + userType + '/new', {
        Headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return response;
}