import { ApiResponse } from "@/lib/types";
import axios from "axios"

async function createTaskHandler(payload: Object) {
    return axios.post(`/api/tasks`, payload)
        .then((response) => {
            console.log(response.data);
            const res: ApiResponse = response.data 
            return res
        })
        .catch((error) => {
            console.error(error);
            return {'status': 999, 'message': 'Something went wrong!!!'} as ApiResponse
        });
}

async function getTaskForDurationHandler(startTime: number, endTime: number) {
    console.log(process.env.BACKEND_URL)
    return axios.get(`/api/tasks?startTime=${startTime}&endTime=${endTime}`)
        .then((response) => {
            console.log(response.data);
            const res: ApiResponse = response.data 
            return res
        })
        .catch((error) => {
            console.error(error);
            return {'status': 999, 'message': 'Something went wrong!!!'} as ApiResponse
        });
}

export { createTaskHandler, getTaskForDurationHandler }