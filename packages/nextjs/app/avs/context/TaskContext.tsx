import React, { ReactNode, createContext, useContext, useState } from "react";

interface Task {
  lotteryId: number;
  lotteryAddress: string;
  yieldProtocol: string;
  taskIndex: number;
  taskCreatedBlock: number;
  allowedYieldProtocols: string[];
}

interface TaskContextProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [task, setTask] = useState<Task>({ 
    lotteryId: 0, 
    lotteryAddress: "", 
    yieldProtocol: "", 
    taskIndex: 0, 
    allowedYieldProtocols: [], 
    taskCreatedBlock: 0 });
    return <TaskContext.Provider value={{ task, setTask }}>{children}</TaskContext.Provider>;
};

export const useTask = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
