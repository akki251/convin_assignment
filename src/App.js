import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import TaskBoard from "./components/TaskBoard";
function App() {
  return (
    <div>
      <NextUIProvider>
        <Toaster />
        <TaskBoard />
      </NextUIProvider>
    </div>
  );
}

export default App;
