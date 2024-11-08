import { useState, useContext } from "react";
import { TasksContext } from "../../store/TaskContext";
import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import Button from "../form/Button";
import reactImg from "../../assets/Designer.png";

function SignupPage() {
  const { signup } = useContext(TasksContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password);
    navigate("/task");
  };

  return (
    <div className="w-screen h-screen bg-slate-100 grid grid-cols-3">
      <form
        onSubmit={handleSubmit}
        className="md:col-span-1 col-span-3 px-6  rounded-md flex flex-col gap-4 mx-0  justify-center"
        >
        <img src={reactImg} className="w-24 md:mt-[-10rem] mb-6" alt="" />

        <h2 className="text-2xl font-semibold">
          Welcome to My React CRUD System <br /> please Signup{" "}
        </h2>

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
        <Button type="submit">Sign Up</Button>
      </form>
      <div className="md:col-span-2  mx-0 background h-screen md:block hidden">
        </div>
    </div>
  );
}

export default SignupPage;
