'use client';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import React, { useState } from 'react';
import RoundCheckbox from './checkbox';
import { cn } from '@/lib/util';
import Tags from './tags';
import CreateTaskForm from './create-task';
import { Task } from '@/lib/types';


interface TaskListProps {
  tasks: Task[];
}

interface TaskItemProps {
  task: Task;
  level: number;
  className?: string;
}

// const TaskList: React.FC<TaskListProps> = ({tasks}) => {

//   const [isOpen, setIsOpen] = useState(false); 

//   const todayDate = new Date().toLocaleDateString('en-US', { month: 'long' })
//     + ' ' + new Date().toLocaleDateString('en-US', { day: 'numeric' })
//     + ', ' + new Date().getFullYear();

//   const handleCreate = () => {
//     setIsOpen(true);
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-md space-y-2">
//       <div className='flex justify-between item-centre'>
//         <div>
//           <h1 className="text-2xl font-bold text-black">{todayDate}</h1>
//           <h2 className='text-2xl font-bold text-black'>Tasks</h2>
//         </div>
//         <div className='flex space-x-4'>
//           <button onClick={handleCreate}><Plus color='gray' size={50} /></button>
//           {isOpen && <CreateTaskForm setIsOpenFunction={setIsOpen} />}
//         </div>
//       </div>
//       {tasks?.map((task, index) => (
//         <TaskItem key={index} task={task} level={0} className='drop-shadow-xl' />
//       ))}
//     </div>
//   );
// };



const TaskItem: React.FC<TaskItemProps> = ({ task, level, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn(`ml-${level * 20} p-2 rounded-lg w-full h-full`, className)}>
      <div
        className={`flex justify-between items-center cursor-pointer m-2`}
      >
        <div className='flex'>
          <div className='flex justify-center items-center mr-4'>
            <RoundCheckbox complete={task.status === 'Complete'} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-black truncate ...">{task.title}</span>
            <div className="flex space-x-2">
              {task.tags && task.tags.map((tag, index) => (
                <Tags key={index} id={tag.key} value={tag.value} />
              ))}
            </div>
          </div>
        </div>
        {task.children && task.children.length && <span onClick={handleToggle}>
          {isOpen ? <ChevronUp color='black' /> : <ChevronDown color='black' />}
        </span>}
      </div>
      {isOpen && task.children && (
        <div className="mt-2 space-y-2">
          {task.children.map((childTask, index) => (
            <TaskItem key={index} task={childTask} level={10} className='drop-shadow-xl m-2' />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskItem;

