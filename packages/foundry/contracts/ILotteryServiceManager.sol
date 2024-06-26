// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface ILotteryServiceManager {
    // EVENTS
    event NewTaskCreated(uint32 indexed taskIndex, Task task);

    event TaskResponded(uint32 indexed taskIndex, Task task, address operator);

    // STRUCTS
    struct Task {
        uint32 lotteryId;
        string lotteryAddress;
        string[] allowedYieldProtocols;
        uint32 taskCreatedBlock;
    }

    // FUNCTIONS
    // NOTE: this function creates new task.
    function createNewTask(
        uint32 lotteryId,
        string calldata lotteryAddress,
        string[] calldata allowedYieldProtocols
    ) external;

    // NOTE: this function is called by operators to respond to a task.
    function respondToTask(
        Task calldata task,
        uint32 referenceTaskIndex,
        bytes calldata signature
    ) external;
}