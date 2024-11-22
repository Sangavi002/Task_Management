import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";

export const EditTaskModal = ({ isOpen, onClose, task, updateTask }) => {
  const [formData, setFormData] = useState({
    username: task?.username || "",
    task: task?.task || "",
    status: task?.status || "",
  });

  const role = localStorage.getItem("role"); 

  useEffect(() => {
    setFormData({
      username: task?.username || "",
      task: task?.task || "",
      status: task?.status || "",
    });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    updateTask({ ...task, ...formData });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb="4">
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isReadOnly={role !== "admin"}
              placeholder="Username"
            />
          </Box>
          <Box mb="4">
            <label htmlFor="task">Task</label>
            <Input
              id="task"
              name="task"
              value={formData.task}
              onChange={handleChange}
              isReadOnly={role !== "admin"}
              placeholder="Task"
            />
          </Box>
          <Box mb="4">
            <label htmlFor="status">Status</label>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Select status"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Select>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr="3" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
