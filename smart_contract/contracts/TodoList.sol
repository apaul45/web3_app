// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.13;

// Smart contract is application running on blockchain:
// ie, it's a program stored on blockchain that when run (on EVM),
// agrees to contract that it'll perform as intended

// When deployed to a blockchain, smart contracts are just
// compiled bytecode with a given location. Users then interact
// with smart contracts by interacting with bytecode

contract TodoList {
  uint public taskCount = 0; // State variable that's stored on blockchain, public keyword provides readonly fn
  
  constructor() public {
    createTask("Create more tasks!");
  }
    
  struct Task {
    uint id;
    string content;
    bool completed;
  }
  
  event ToggledTask(Task task);
  event EditedTask(Task task);
  
  Task[] public tasks;
  
  function getTodoList() public view returns (Task[] memory) {
    return tasks;
  }
  
  function createTask(string memory _content) public returns (Task[] memory) {
    tasks.push(Task(taskCount, _content, false));
    taskCount++;
    return tasks;
  }
  
  function editTask(uint _id, string memory _content) public {
    Task memory _task = tasks[_id];
    _task.content = _content;
    tasks[_id] = _task;
    emit EditedTask(_task);
  }
  
  function toggleTask(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit ToggledTask(_task);
  }
}