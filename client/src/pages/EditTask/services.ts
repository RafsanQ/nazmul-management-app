import axios from "axios"

export const getTaskInfo = async (taskId: number, token: string) => {
    const response = await axios.get('http://localhost:3309/api/task/' + taskId, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return response;
}

export const updateTaskInstruction = async (taskId: number, token: string, text: string) => {
    const response = await axios.put('http://localhost:3309/api/task/edit/' + taskId,
    {
        text,
    },
    {
        headers: {
            Authorization: 'Bearer ' + token
        },
    }
    )
    return response;
}

export const updateDueAmount = async (taskId: number, officeAssistantId: number, token: string, dueAmount: number) => {
    const response = await axios.put('http://localhost:3309/api/task/' + taskId,
    {
        dueAmount,
        officeAssistantId
    },
    {
        headers: {
            Authorization: 'Bearer ' + token
        },
    }
    )
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

