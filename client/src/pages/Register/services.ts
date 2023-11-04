import axios from "axios"

export const registerApi = async (email: string, password: string, userType: string, phone: string, name: string) => {
    const response = await axios.post('http://localhost:3309/api/' + userType + '/new', {
        "name": name,
        "email": email,
        "password": password,
        "phone": phone
    })

    return response;
}