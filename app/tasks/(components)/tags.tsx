
export default function Tags({ id, value }: { id: string, value: string }) {
    return (
        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 
        rounded-full dark:bg-gray-200 dark:text-purple-400 border border-purple-400">{id}: {value}
        </span>
    )
}