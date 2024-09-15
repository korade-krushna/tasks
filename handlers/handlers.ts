import { ApiResponse } from "@/lib/types";
import axios from "axios"

const BASE_URL = process.env.BACKEND_URL || "http://localhost:3000"

async function createTaskHandler(payload: Object) {
    return axios.post(`${BASE_URL}/api/tasks`, payload)
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
    return axios.get(`${BASE_URL}/api/tasks?startTime=${startTime}&endTime=${endTime}`)
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