import axios from "axios"

export const getAllTasksApi = async (token: string) => {
    const response = await axios.get('http://localhost:3309/api/task', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    return response;
}

export const getTasksBySpecificEmployeeApi = async (email: string, token: string) =>  {
    const response = await axios.get('http://localhost:3309/api/task/employee/' + email, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    return response;
}