import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiResponse } from "./types";
import toast from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleToast(res: ApiResponse){
    if(res.status === 200 && res.message ) {
        toast.success(res.message)
    } else if(res.status === 999 && res.message ) {
        toast.error(res.message)
    }
}

export function getTodaysDate(){
  return new Date().toLocaleDateString('en-US', { month: 'long' })
    + ' ' + new Date().toLocaleDateString('en-US', { day: 'numeric' })
    + ', ' + new Date().getFullYear();
}

export function getTodaysStartTime(){
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0).getTime();
}

export function getTodaysEndTime(){
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999).getTime();
}
