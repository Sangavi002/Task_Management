import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Button,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

export const CreateTaskModal = ({ isOpen, onClose, addTask }) => {
  const [formData, setFormData] = useState({
    username: "",
    task: "",
    status: "New Task",
  });

  const url = "https://todo-349ec-default-rtdb.asia-southeast1.firebasedatabase.app/Task.json";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (formData.username && formData.task) {
      try {
        
        await axios.post(url, formData);
        addTask({ ...formData, id: Date.now() });
        setFormData({ username: "", task: "", status: "New Task" });
        onClose();
        alert("Task created.")
      } catch (error) {
        console.error("Error posting data:", error);
      }
    } else {
      alert("Please fill out all fields!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Task</ModalHeader>
        <ModalBody>
          <Box mb="4">
            <Input
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              mb="2"
            />
            <Input
              placeholder="Enter Task"
              name="task"
              value={formData.task}
              onChange={handleChange}
              mb="2"
            />
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              mb="2"
            >
              <option value="NewTask">New Task</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Select>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr="3" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
