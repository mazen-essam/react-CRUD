import { useState, useContext } from "react";
import { TasksContext } from "../../store/TaskContext";
import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import Button from "../form/Button";
import loginImg from "../../assets/login.png";
import reactImg from "../../assets/Designer.png";

function LoginPage() {
  const { login } = useContext(TasksContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate("/form");
  };

  return (
    <>
      <div className="w-screen h-screen bg-slate-100 grid grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="md:col-span-1 col-span-3 px-6  rounded-md flex flex-col gap-4 mx-0  justify-center"
        >
            <img src={reactImg} className="w-24 md:mt-[-10rem] mb-6" alt="" />
          <h2 className="text-2xl font-semibold">Welcome to My React CRUD System <br /> please login</h2>
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
          <Button onClick={() => navigate("/signup")} className={"bg-red-400"}>
            signup
          </Button>
        </form>
        <div className="md:col-span-2  mx-0 background h-screen md:block hidden">
        </div>
      </div>
    </>
  );
}

export default LoginPage;
