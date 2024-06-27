import React, { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";
import { ethers, keccak256, toUtf8Bytes, getBytes } from "ethers";
import { useAccount, useSignMessage } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

const RespondToTaskComponent: React.FC = () => {
  const { task } = useTask();
  const [lotteryId, setLotteryId] = useState<number>(task.lotteryId);
  const [lotteryAddress, setLotteryAddress] = useState<string>(task.lotteryAddress);
  const [taskIndex, setTaskIndex] = useState<number>(task.taskIndex);
  const [taskCreatedBlock, setTaskCreatedBlock] = useState<number>(task.taskCreatedBlock);
  const [allowedYieldProtocols, setAllowedYieldProtocols] = useState<string[]>(task.allowedYieldProtocols); // TODO: make sure to transform this to an array of strings
  const [yieldProtocol, setYieldProtocol] = useState<string>("");

  useEffect(() => {
    setLotteryId(task.lotteryId);
    setLotteryAddress(task.lotteryAddress);
    setTaskIndex(task.taskIndex);
    setTaskCreatedBlock(task.taskCreatedBlock);
  }, [task]);

  const { chain } = useAccount();
  const { targetNetwork } = useTargetNetwork();
  const { writeContractAsync: respondToTask, isPending } = useScaffoldWriteContract("HelloWorldServiceManager");
  const { signMessageAsync } = useSignMessage();

  const writeDisabled = !chain || chain?.id !== targetNetwork.id;

  const handleRespondToTask = async () => {
    // Check if all fields are filled
    if (!lotteryId || !lotteryAddress || !taskIndex || !taskCreatedBlock || !yieldProtocol) {
      // TODO: add popup with error
      return;
    }

    try {
      const message = yieldProtocol;
      const messageHashBytes = getBytes(keccak256(toUtf8Bytes(message)));
      const signature = await signMessageAsync({ message: { raw: messageHashBytes } });

      console.log(`Signing and responding to task ${taskIndex}`);

      await respondToTask({
        functionName: "respondToTask",
        args: [{ lotteryId: lotteryId, lotteryAddress: lotteryAddress, allowedYieldProtocols: allowedYieldProtocols, taskCreatedBlock: taskCreatedBlock }, taskIndex, signature],      });
      console.log("Task responded to successfully");
    } catch (error) {
      console.error("Error responding to task:", error);
    }
  };

  return (
    <div>
      <StyledInput type="number" value={lotteryId} onChange={e => setLotteryId(Number(e.target.value))} name="Lottery Id" />
      <StyledInput type="text" value={lotteryAddress} onChange={e => setLotteryAddress(e.target.value)} name="Lottery Address" />

      <StyledInput
        type="number"
        value={taskIndex}
        onChange={e => setTaskIndex(Number(e.target.value))}
        name="Task Index"
      />

      <StyledInput
        type="number"
        value={taskCreatedBlock}
        onChange={e => setTaskCreatedBlock(Number(e.target.value))}
        name="Task Created Block"
      />

      <StyledInput
        type="text"
        value={yieldProtocol}
        onChange={e => setYieldProtocol(e.target.value)}
        name="Yield protocol used"
      />

      <StyledButton
        onClick={handleRespondToTask}
        disabled={writeDisabled || isPending}
        isPending={isPending}
        className="btn-accent"
        pendingText="Responding..."
      >
        Respond to Task
      </StyledButton>
      
    </div>
  );
};

export default RespondToTaskComponent;
