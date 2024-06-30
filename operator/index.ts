import { ethers } from "ethers";
import * as dotenv from "dotenv";
import axios from "axios";
import { delegationABI } from "./abis/delegationABI";
import { contractABI } from './abis/contractABI';
import { registryABI } from './abis/registryABI';
import { avsDirectoryABI } from './abis/avsDirectoryABI';
dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const operatorWallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const delegationManagerAddress = process.env.DELEGATION_MANAGER_ADDRESS!;
const contractAddress = process.env.CONTRACT_ADDRESS!;
const stakeRegistryAddress = process.env.STAKE_REGISTRY_ADDRESS!;
const avsDirectoryAddress = process.env.AVS_DIRECTORY_ADDRESS!;

const movementLotteryAddress = process.env.MOVEMENT_LOTTERY_ADDRESS!;

const delegationManager = new ethers.Contract(delegationManagerAddress, delegationABI, operatorWallet);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
const registryContract = new ethers.Contract(stakeRegistryAddress, registryABI, wallet);
const avsDirectory = new ethers.Contract(avsDirectoryAddress, avsDirectoryABI, operatorWallet);

// Finds a lottery instance by id and returns the yield protocol address used by it
const getYieldProtocolAddress = async (lotteryId: number) => {
    const url = `https://aptos.devnet.m1.movementlabs.xyz/v1/accounts/${movementLotteryAddress}/resources`;
    try {
        const response = await axios.get(url);
        const lotteriesManager = response.data.find((item: any) => item.type.includes("lottery::LotteriesManager"));
        if (lotteriesManager) {
            const lottery = lotteriesManager.data.lotteries.data.find((item: any) => item.key == lotteryId.toString());
            if (lottery) {
                // Return the yield protocol address used by this lottery
                return lottery.value.yield_protocol_addr;
            }
        }
    } catch (error) {
        console.error("Error fetching lottery creator address:", error);
    }
    return null;
};

const signAndRespondToTask = async (taskIndex: number, lotteryId: number, lotteryAddress: string, allowedYieldProtocols: string[], taskCreatedBlock: number) => {
    
    const yieldProtocolAddress = await getYieldProtocolAddress(lotteryId);
    if (!yieldProtocolAddress) {
        console.error("Yield protocol address not found for lottery.");
        return;
    }
    
    const messageHash = ethers.utils.solidityKeccak256(["string"], [yieldProtocolAddress]);
    const messageBytes = ethers.utils.arrayify(messageHash);
    const signature = await operatorWallet.signMessage(messageBytes);

    console.log(
        `Signing and responding to task ${taskIndex}`
    )

    const tx = await contract.respondToTask(
        { 
            lotteryId: lotteryId, 
            lotteryAddress: lotteryAddress,
            allowedYieldProtocols: allowedYieldProtocols,
            taskCreatedBlock: taskCreatedBlock
        },
        taskIndex,
        signature
    );
    await tx.wait();
    console.log(`Responded to task.`);
};

const registerOperator = async () => {
    const tx1 = await delegationManager.registerAsOperator({
        earningsReceiver: await operatorWallet.address,
        delegationApprover: "0x0000000000000000000000000000000000000000",
        stakerOptOutWindowBlocks: 0
    }, "");
    await tx1.wait();
    console.log("Operator registered on EL successfully");

    const salt = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    const expiry = Math.floor(Date.now() / 1000) + 3600; // Example expiry, 1 hour from now

    // Define the output structure
    let operatorSignature = {
        expiry: expiry,
        salt: salt,
        signature: ""
    };

    // Calculate the digest hash using the avsDirectory's method
    const digestHash = await avsDirectory.calculateOperatorAVSRegistrationDigestHash(
        operatorWallet.address, 
        contract.address, 
        salt, 
        expiry
    );

    // Sign the digest hash with the operator's private key
    const signingKey = new ethers.utils.SigningKey(process.env.PRIVATE_KEY!);

    // const signingKey = new ethers.utils.SigningKey(process.env.OPERATOR_PRIVATE_KEY!);
    const signature = signingKey.signDigest(digestHash);
    
    // Encode the signature in the required format
    operatorSignature.signature = ethers.utils.joinSignature(signature);

    const tx2 = await registryContract.registerOperatorWithSignature(
        operatorWallet.address,
        operatorSignature
    );
    await tx2.wait();
    console.log("Operator registered on AVS successfully");
};

const monitorNewTasks = async () => {
    await contract.createNewTask("EigenWorld");

    contract.on("NewTaskCreated", async (taskIndex: number, task: any) => {
        console.log(`New task detected with id, ${task.lotteryId} for lottery address ${task.lotteryAddress}`);
        await signAndRespondToTask(taskIndex, task.lotteryId, task.lotteryAddress, task.allowedYieldProtocols, task.taskCreatedBlock);
    });

    console.log("Monitoring for new tasks...");
};

const main = async () => {
    await registerOperator();
    monitorNewTasks().catch((error) => {
        console.error("Error monitoring tasks:", error);
    });
};

main().catch((error) => {
    console.error("Error in main function:", error);
});