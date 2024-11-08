import Input from "./Input";
import Button from "./Button";
import { useContext, useState, useEffect } from "react";
import { TasksContext } from "../../store/TaskContext";
function Form({ setIsEdit, isEdit }) {
  const { tasks, addTask, editTask } = useContext(TasksContext);

  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [date, setDate] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    console.log(isEdit);
    if (isEdit) {
      setName(isEdit.name);
      setDes(isEdit.description);
      setDate(
        isEdit.date ? new Date(isEdit.date).toISOString().split("T")[0] : ""
      );
      setIsComplete(isEdit.status);
    }
  }, [isEdit]);
  const handleChange = (e) => {
    if (e.target.value === "complete") {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
    console.log(isComplete);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      editTask(isEdit.id, name, des, isComplete, date);
      setIsEdit(null);
    } else {
      addTask(name, des, date, isComplete);
    }
    setName("");
    setDes("");
    setDate("");
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="TaskName">Task Name :</label>
      <br />
      <Input
        type="text"
        id="TaskName"
        name="TaskName"
        placeholder="Enter Task Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="TaskDescription">Task Description :</label>
      <br />
      <Input
        type="text"
        id="TaskDescription"
        name="TaskDescription"
        placeholder="Enter Task Description"
        required
        value={des}
        onChange={(e) => setDes(e.target.value)}
      />

      <label htmlFor="TaskDate">Task Date :</label>
      <br />
      <Input
        type="date"
        id="TaskDate"
        name="TaskDate"
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label htmlFor="TaskState">Task State :</label>
      <br />
      <select
        name="status "
        className="p-2 rounded-md w-full my-6"
        value={isComplete ? "complete" : "incomplete"}
        onChange={(e) => handleChange(e)}
      >
        <option value="complete">Complete</option>
        <option value="incomplete">InComplete</option>
      </select>
      <Button type="submit" className={"w-full"}>
        {isEdit ? "Update" : "Add a new task"}
      </Button>
    </form>
  );
}

export default Form;
