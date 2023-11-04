import axios from "axios"

export const createNewTask = async (id: number, token: string, text: string) => {
    const response = await axios.post('http://localhost:3309/api/task/new', 
    {
        text,
        employeeId: id
    },
    {
        headers: {
            Authorization: 'Bearer ' + token
        },
    }
    )
    console.log(response);
    return response;
}

export const getIdByEmail = async (email: string, userType: string, token: string) => {
    const response = await axios.get('http://localhost:3309/api/' + userType + '/by-email/' + email, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return response.data.id;
}

