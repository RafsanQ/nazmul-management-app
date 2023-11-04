import axios from "axios"

export const createNewTask = async (id: number, token: string, text: string) => {
    const response = await axios.post('http://localhost:3309/api/task/new', {
        Headers: {
            Authorization: 'Bearer ' + token
        },
        body: {
            text,
            employeeId: id
        }
    })

    return response;
}