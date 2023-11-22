// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.13;

contract TodoList {
  uint public taskCount = 0; // State variable that's stored on blockchain, public keyword provides readonly fn
  
  constructor() public {
    createTask("Create new task");
  }
    
  struct Task {
    uint id;
    string content;
    bool completed;
  }
  
  mapping(uint => Task) public tasks;
  
  function createTask(string memory _conent) public {
    taskCount++;
    tasks[taskCount] = Task(taskCount, _conent, false);
  }
}