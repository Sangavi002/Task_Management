import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Select,
  Input,
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  useBreakpointValue,
  TableContainer
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import axios from "axios";
import { CreateTaskModal } from "./CreateTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [role, setRole] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();

  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  const url = "https://todo-349ec-default-rtdb.asia-southeast1.firebasedatabase.app/Task";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${url}.json`);
        if (response.data) {
          const formattedTasks = Object.entries(response.data).map(([id, task]) => ({
            id,
            ...task,
          }));
          setTasks(formattedTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();

    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    if (storedRole) setRole(storedRole);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  
  const filteredTasks = tasks.filter((task) => {
    if (role === "admin") return true;
    if (role === "user" && task.username === username) return true;
    return false;
  });

  
  const statusFilteredTasks = filteredTasks.filter((task) => {
    if (!statusFilter) return true;
    return task.status === statusFilter;
  });


  const searchedTasks = statusFilteredTasks.filter((task) =>
    [task.username, task.task].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 500);

  const addTask = (newTask) => setTasks([...tasks, newTask]);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${url}/${id}.json`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      await axios.patch(`${url}/${updatedTask.id}.json`, updatedTask);
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p="6">
      <Box display="flex" mb={{base:"10px",md:"20px"}} flexDir={{ base: "row", md: "row" }}>
        {isMobile && (
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            onClick={onDrawerOpen}
            variant="outline"
            marginRight="auto"
            display={{ base: "block", md: "none" }}
          />
        )}
        <Box w={{ base: "100%", md: "92%" }} mb={{ base: "0px", md: "0" }}>
          <Heading textAlign="center" fontSizesize={{base:"30px"}} color="#AE445A">Task Management</Heading>
        </Box>
        <Box marginLeft="auto" w={{ base: "0%", md: "8%" }}>
          {!isMobile && (
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Box>
      <Box mb="4" display="flex">
        {!isMobile && (
          <>
          <Box >
            {role === "admin" && (
              <Button colorScheme="blue" mb="4" onClick={onCreateOpen} w="100%">
                Create a Task
              </Button>
            )}
          </Box>
          <Box display="flex" w="35%" ml="auto">
            <Input
              placeholder="Search by Username, Task"
              mb="4"
              onChange={(e) => handleSearch(e.target.value)}
              width="100%"
            />
            <Select
              mb="4"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              placeholder="Filter by Status"
              width="100%"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Select>
          </Box>
        </>
        )}
      </Box>
      
      <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Box mb="4">
              {role === "admin" && (
                <Button colorScheme="blue" mb="4" onClick={onCreateOpen} w="100%">
                  Create a Task
                </Button>
              )}
              <Input
                placeholder="Search by Username, Task"
                mb="4"
                onChange={(e) => handleSearch(e.target.value)}
                width="100%"
              />
              <Select
                mb="4"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                placeholder="Filter by Status"
                width="100%"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
              <Button colorScheme="red" w="100%" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <CreateTaskModal isOpen={isCreateOpen} onClose={onCreateClose} addTask={addTask} />
      <EditTaskModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        task={currentTask}
        updateTask={updateTask}
      />

      <TableContainer 
        overflowX={{ base: "auto", md: "unset" }} 
        w="100%">
        <Table variant="simple" mt="4">
          <Thead>
            <Tr bg="#FFE31A" >
              <Th>S.No</Th>
              <Th>Username</Th>
              <Th>Task</Th>
              <Th>Status</Th>
              <Th>Edit</Th>
              {role === "admin" && <Th>Delete</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {searchedTasks.length > 0 ? (
              searchedTasks.map((task, index) => (
                <Tr key={task.id}>
                  <Td>{index + 1}</Td>
                  <Td>{task.username}</Td>
                  <Td>{task.task}</Td>
                  <Td>{task.status}</Td>
                  <Td>
                    <Button
                      bg="green"
                      color="white"
                      size="sm"
                      onClick={() => {
                        setCurrentTask(task);
                        onEditOpen();
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                  {role === "admin" && (
                    <Td>
                      <Button colorScheme="red" size="sm" onClick={() => deleteTask(task.id)}>
                        Delete
                      </Button>
                    </Td>
                  )}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={role === "admin" ? 6 : 5} textAlign="center">
                  No results found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

    </Box>
  );
};
