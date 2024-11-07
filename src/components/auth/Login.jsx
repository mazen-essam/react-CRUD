import  { useState, useContext } from "react";
import { TasksContext } from "../../store/TaskContext";
import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import Button from "../form/Button";

function LoginPage() {
  const { login } = useContext(TasksContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate("/tasks");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 w-2/5 mx-auto bg-slate-200 p-10 rounded-md flex flex-col gap-4"
    >
        <h2 className="text-2xl text-center">Login</h2>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className={"mb-0"}
      />
      <Input
        type="password"
        minLength={5}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className={"mt-0"}

      />
      <Button type="submit">Login</Button>
      <Button onClick={() => navigate("/signup")} className={'bg-red-400'}>signup</Button>
    </form>
  );
}

export default LoginPage;
