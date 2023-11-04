import axios from "axios"


export const login = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3309/api/employee/login', {
        "email": "fahim@faisal.com",
        "password": "1234"
    })

    console.log(response)
}