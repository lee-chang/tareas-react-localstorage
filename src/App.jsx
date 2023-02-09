import { useState, useEffect } from "react";
import { Container } from "./components/Container";
import { TaskCreator } from "./components/TaskCreator";
import { TaskTable } from "./components/TaskTable";
import { TaskBanner } from "./components/TaskBanner";
import { VisibilityControl } from "./components/VisibilityControl";
function App() {
  const [userName, setUserName] = useState("Lee");
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    let datos = localStorage.getItem("tasks");
    if (datos) {
      setTaskItems(JSON.parse(datos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  function createNewTask(taskName) {
    if (!taskItems.find((task) => task.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  }

  function toggleTask(task) {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  }

  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskBanner userName={userName} taskItems={taskItems} />
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable
          title="Tareas pendientes"
          tasks={taskItems}
          toggleTask={toggleTask}
        />

        <VisibilityControl
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
          isChecked={showCompleted}
        />
        {showCompleted ? (
          <TaskTable
            title={"Tareas completadas"}
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        ) : null}
      </Container>
    </main>
  );
}

export default App;
