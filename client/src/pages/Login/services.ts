import axios from "axios"


export const login = async (email: string, password: string, userType: string) => {
    const response = await axios.post('http://localhost:3309/api/' + userType + '/login', {
        "email": email,
        "password": password
    })

    return response;
}