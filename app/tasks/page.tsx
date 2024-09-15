'use client';
import { useEffect, useState } from "react";
import TaskList from "./(components)/task-list";
import { ApiResponse, Task } from "@/lib/types";
import { getTaskForDurationHandler } from "@/handlers/handlers";
import CreateTaskForm from "./(components)/create-task";
import { Plus } from "lucide-react";
import TaskItem from "./(components)/task-list";
import { getTodaysDate, getTodaysEndTime, getTodaysStartTime } from "@/lib/util";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = () => {
    setIsOpen(true);
  }

  useEffect(() => {
    async function getTasks() {
      const startOfDay = getTodaysStartTime();
      const endOfDay = getTodaysEndTime();
      const result: ApiResponse = await getTaskForDurationHandler(startOfDay, endOfDay);
      setTasks(result.data);
    }
    getTasks();
  }, [isOpen]);
  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-md space-y-2">
      <div className='flex justify-between item-centre'>
        <div>
          <h1 className="text-2xl font-bold text-black">{getTodaysDate()}</h1>
          <h2 className='text-2xl font-bold text-black'>Tasks</h2>
        </div>
        <div className='flex space-x-4'>
          <button onClick={handleCreate}><Plus color='gray' size={50} /></button>
          {isOpen && <CreateTaskForm setIsOpenFunction={setIsOpen} />}
        </div>
      </div>
      <div className="max-h-[700px] overflow-y-scroll">
        {tasks?.map((task, index) => (
          <TaskItem key={index} task={task} level={0} className='drop-shadow-xl' />
        ))}
      </div>
    </div>
  );
}