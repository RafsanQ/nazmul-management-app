import axios from "axios"

export const getAllTasksApi = async () => {
    const response = await axios.post('http://localhost:3309/api/task');
    return response;
}

export const getTasksBySpecificEmployee = async () =>  {
    const response = await axios.post('http://localhost:3309/api/task');
    return response;
}