import React, { useEffect, useState } from 'react';
import { createTaskHandler } from '@/handlers/handlers';
import { ApiResponse } from '@/lib/types';
import toast from 'react-hot-toast';
import { handleToast } from '@/lib/util';

const CreateTaskForm = ({ setIsOpenFunction }: { setIsOpenFunction: any }) => {
  const [tags, setTags] = useState([{ key: '', value: '' }]);
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium',
  });

  const handleTagChange = (index:number, field:string, value:string) => {
    const newTags: any = [...tags];
    newTags[index][field] = value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    if (tags.length < 5) {
      setTags([...tags, { key: '', value: '' }]);
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpenFunction(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleCloseDialog = () => {
    setIsOpenFunction(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    let payload = { ...data, tags: tags };
    const response: ApiResponse = await createTaskHandler(payload);
    handleToast(response);
    setIsOpenFunction(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl text-black font-semibold mb-4">Create Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="w-full px-3 py-2 border rounded text-black"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="w-full px-3 py-2 border rounded text-black"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">Tags (max 5)</label>
              {tags.map((tag, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Key"
                    className="w-1/2 px-2 py-1 border rounded mr-2 text-black"
                    value={tag.key}
                    onChange={(e) => handleTagChange(index, 'key', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="w-1/2 px-2 py-1 border rounded mr-2 text-black"
                    value={tag.value}
                    onChange={(e) => handleTagChange(index, 'value', e.target.value)}
                    required
                  />
                  {tags.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleRemoveTag(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {tags.length < 5 && (
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={handleAddTag}
                >
                  + Add Tag
                </button>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-black px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateTaskForm;
