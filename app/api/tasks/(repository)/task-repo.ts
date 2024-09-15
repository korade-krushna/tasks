import { pool, toCamelCase } from "@/lib/db";
import { CreateTaskRequest, Task } from "@/lib/types";


async function save(task: CreateTaskRequest){
    return await pool.query(`INSERT INTO tasks (title, priority, status, parent_id, tags) VALUES ($1, $2, $3, $4, $5)`,
         [task.title, task.priority, 'Incomplete', task.parentId, task.tags]);
}

async function findByCreatedAtBetween(startTime: number, endTime: number) : Promise<Task[]> {
    console.log(`SELECT * FROM tasks WHERE created_at BETWEEN ${startTime} AND ${endTime}`)
    const result = (await pool.query(`SELECT * FROM tasks WHERE created_at BETWEEN $1 AND $2`, [startTime, endTime])).rows;
    return result.map((task: any) => toCamelCase(task))
}

export { save, findByCreatedAtBetween }