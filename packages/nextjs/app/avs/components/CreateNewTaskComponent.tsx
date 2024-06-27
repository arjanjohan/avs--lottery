"use client";

import { useCallback, useEffect, useState } from "react";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";
import externalContracts from "~~/contracts/externalContracts";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

// Function to generate random names
function generateRandomName(): string {
  const adjectives = ["Quick", "Lazy", "Sleepy", "Noisy", "Hungry"];
  const nouns = ["Fox", "Dog", "Cat", "Mouse", "Bear"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomName = `${adjective}${noun}${Math.floor(Math.random() * 1000)}`;
  return randomName;
}

const avsContractAddress = deployedContracts[17000].LotteryServiceManager.address;
const abi = deployedContracts[17000].LotteryServiceManager.abi;

const CreateNewTaskComponent: React.FC = () => {
  const [lotteryId, setLotteryId] = useState<number>(0);
  const [lotteryAddress, setLotteryAddress] = useState<string>("");
  const [allowedYieldProtocols, setAllowedYieldProtocols] = useState<string[]>([]);  
  const [spamTasks, setSpamTasks] = useState<boolean>(false);
  const [privateKey, setPrivateKey] = useState<string>("");
  const { writeContractAsync: createNewTask, isPending } = useScaffoldWriteContract("LotteryServiceManager");
  const { chain } = useAccount();
  const { targetNetwork } = useTargetNetwork();

  const writeDisabled = !chain || chain?.id !== targetNetwork.id;

  const handleCreateTask = async () => {
    try {
      console.log("Creating task...");
      await createNewTask({
        functionName: "createNewTask",
        args: [lotteryId, lotteryAddress, allowedYieldProtocols],
      });
      console.log("Task created successfully");
    } catch (error) {
      console.error("Error setting greeting:", error);
    }
  };

  const handleSpamTasks = useCallback(
    async (randomName: string) => {
      try {
        if (!privateKey) {
          // TODO: add popup with error
          // TODO: check valid private key
          console.error("Private key is required for spamming tasks");
          return;
        }

        const provider = new ethers.JsonRpcProvider(targetNetwork.rpcUrls.default.http[0]);
        const wallet = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(avsContractAddress, abi, wallet);

        console.log(`Creating new task with name: ${randomName}`);
        const tx = await contract.createNewTask(randomName);
        await tx.wait();
        console.log("Task created successfully");
      } catch (error) {
        console.error("Error creating task with spam:", error);
      }
    },
    [privateKey, targetNetwork.rpcUrls.default.http],
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (spamTasks) {
      interval = setInterval(() => {
        const randomName = generateRandomName();
        handleSpamTasks(randomName);
      }, 5000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [spamTasks, privateKey, handleSpamTasks]);

  return (
    <div>
      


      <StyledInput
        type="number"
        value={lotteryId}
        onChange={e => setLotteryId(Number(e.target.value))}
        name="Lottery ID"
        disabled={spamTasks}
      />
      <StyledInput
        type="text"
        value={lotteryAddress}
        onChange={e => setLotteryAddress(e.target.value)}
        name="Lottery Address"
        disabled={spamTasks}
      />
      <StyledInput
        type="text"
        value={allowedYieldProtocols.join(',')}
        onChange={e => setAllowedYieldProtocols(e.target.value.split(','))}
        name="Allowed Yield Protocols (comma separated)"
        disabled={spamTasks}
      />

      <StyledButton
        onClick={handleCreateTask}
        disabled={writeDisabled || isPending || spamTasks}
        isPending={isPending}
        className="btn-accent"
        pendingText="Creating..."
      >
        Create Task
      </StyledButton>
    </div>
  );
};

export default CreateNewTaskComponent;
