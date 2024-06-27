"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import EventsTable from "./EventsTable";
import { PaginationButton } from "./PaginationButton";
import { useTask } from "../context/TaskContext";

const EventListenerComponent: React.FC = () => {
  const { address } = useAccount();
  const { setTask } = useTask();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [watchEvents, setWatchEvents] = useState<boolean>(true);
  const [responseStatuses, setResponseStatuses] = useState<{ [key: number]: boolean }>({});
  const ITEMS_PER_PAGE = 5; // This should match the ITEMS_PER_PAGE from the PaginationButton component

  const { data: events, error: eventsError } = useScaffoldEventHistory({
    contractName: "LotteryServiceManager",
    eventName: "NewTaskCreated",
    fromBlock: 100n,
    watch: watchEvents,
  });

  const { data: helloWorldServiceManagerContract } = useScaffoldContract({
    contractName: "LotteryServiceManager",
  });

  useEffect(() => {
    const fetchStatuses = async () => {
      if (!events || events.length === 0 || !helloWorldServiceManagerContract || !address) return;

      const statuses = await Promise.all(events.map(async (event) => {
        const isTaskResponded = await helloWorldServiceManagerContract.read.allTaskResponses([address, event.args.taskIndex]);
        return { index: event.args.taskIndex, responded: isTaskResponded !== "0x" };
      }));

      const statusMap = statuses.reduce((acc, status) => {
        acc[status.index] = status.responded;
        return acc;
      }, {});

      setResponseStatuses(statusMap);
    };

    fetchStatuses();
  }, [events, helloWorldServiceManagerContract, address]);

  const handleActionClick = (event: Event) => {
    setTask({
      lotteryId: event.args.task.lotteryId,
      lotteryAddress: event.args.task.lotteryAddress,
      yieldProtocol: "",
      taskIndex: event.args.taskIndex,
      taskCreatedBlock: event.args.task.taskCreatedBlock,
      allowedYieldProtocols: event.args.task.allowedYieldProtocols,
    });
  };

  // Pagination logic
  const totalItems = events ? events.length : 0;
  const currentEvents = events ? events.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE) : [];

  return (
    <div className="w-full max-w-4xl bg-base-200 p-6 rounded-lg shadow-md">
      {helloWorldServiceManagerContract &&<div>
      {eventsError && <p>Error loading events: {eventsError}</p>}
      {events && events.length > 0 ? (
        <>
          <EventsTable events={currentEvents} responseStatuses={responseStatuses} handleActionClick={handleActionClick} />
        </>
      ) : (
        <p>No events found.</p>
      )}
      <div className="flex justify-between items-center mt-5">
        <div className="mt-5 justify-end flex gap-3 mx-5">
          <span className="self-center text-accent-content font-medium">Watch tasks</span>
          <input
            type="checkbox"
            checked={watchEvents}
            onChange={() => setWatchEvents(!watchEvents)}
            className="toggle toggle-primary bg-primary hover:bg-primary border-primary"
          />
        </div>
        <PaginationButton currentPage={currentPage} totalItems={totalItems} setCurrentPage={setCurrentPage} />
        </div>
        </div>
      }
    </div>
  );
};

export default EventListenerComponent;
