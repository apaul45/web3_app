import React from "react";
import { useEffect, useState } from "react";

// Using metamask (which can connect to eth, and act as a wallet) to interact with test blockchain
import { MetaMaskSDK } from "@metamask/sdk";

// ethers is used to interact with a blockchain network
// Abstracts out the network, contracts, etc into js objects/classes
import { Contract, ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils";
import { Task } from "../types";

export const BlockChainContext = React.createContext({});

// @ts-ignore
export const BlockChainProvider = ({ children }) => {
  useEffect(() => {
    getAccounts();
    getTodoList();
  }, []);

  const [account, setAccount] = useState<string>("");
  const [todoList, setTodoList] = useState<Task[]>([]);

  const { ethereum } = window; // Metamask exposes a ethereum object in window that can be used to interact w/network

  const getAccounts = async () => {
    if (!ethereum) return;

    try {
      // Making a RPC (which is how Metamask talks to Infura, who talks to Eth)
      // to the blockchain network (the one set on metamask) to retrieve accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // @ts-ignore
      setAccount(accounts[0]);
    } catch {}
  };

  const getContract = async () => {
    //Provider = abstraction for connection to blockchain network
    const provider = new ethers.providers.Web3Provider(ethereum as any);

    // Signer = abstraction for access to private key to sign/authorize transactions
    const signer = provider.getSigner();

    const smartContract = new Contract(contractAddress, contractAbi, signer);

    console.log({ provider, signer, smartContract });

    return smartContract;
  };

  const getTodoList = async () => {
    const contract: Contract = await getContract();

    let taskList: [][] = await contract?.getTodoList();

    const tasks = taskList.map((task: Array<any>) => {
      return {
        id: task[0].toNumber(),
        content: task[1],
        completed: task[2],
      };
    }) as unknown as Task[];

    setTodoList(tasks);
  };

  const addTask = async (content: string) => {
    const contract: Contract = await getContract();
    await contract.createTask(content);

    let newTodoList = todoList;
    newTodoList.push({ id: newTodoList.length + 1, content, completed: false });
    setTodoList(newTodoList);
  };

  return (
    <BlockChainContext.Provider value={{ todoList, addTask, account }}>
      {children}
    </BlockChainContext.Provider>
  );
};

export default BlockChainProvider;