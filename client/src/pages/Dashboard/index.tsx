import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { getAllTasksApi, getTasksBySpecificEmployeeApi } from "./services";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Center,
  Badge
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

function Index() {
  const userEmail: string = useSelector((state: RootState) => state.email);
  const token: string = useSelector((state: RootState) => state.token);
  const userType: string = useSelector((state: RootState) => state.userType);
  const navigate = useNavigate();
  const toast = useToast();

  if (userEmail == "" && token == "") {
    navigate("/login");
  }

  interface IEmployee {
    id: number;
    name: string;
    email: string;
    phone: string;
  }

  interface Idata {
    id: number;
    text: string;
    dueAmount: number;
    status: string;
    employee: IEmployee;
    officeAssistant: IEmployee;
    createdAt: string;
    updatedAt: string;
  }

  const [dataToShow, setDataToShow] = useState<Idata[]>([]);

  const fetchTasks = async () => {
    try {
      let response: AxiosResponse;
      if (userType == "employee") {
        response = await getTasksBySpecificEmployeeApi(
          userEmail,
          token
        );
      } else {
        response = await getAllTasksApi(token);
      }
      setDataToShow(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        toast({
          title: "Error fetching data",
          status: "error",
          description: error.message,
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    console.log(dataToShow);
  }, []);

  return (
    <Center marginY={10} marginX='10%' bg='gray.200' borderRadius='5px' paddingX='1%' paddingY='2%' display='flex' flexDir='column'>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Instruction</Th>
              <Th>Due Amount</Th>
              <Th>Status</Th>
              { userType != 'employee' && <Th>Assigned By</Th>}
              <Th>Assigned On</Th>
              <Th>Completed On</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataToShow.map((task) => (
              <Tr key={task.id}>
                <Td>{task.id}</Td>
                <Td>{task.text}</Td>
                <Td>{task.dueAmount}</Td>
                <Td><Badge variant='solid' fontSize='0.8em' colorScheme= {task.status == 'Requested' ? 'purple' : task.status == 'Completed' ? 'green' : 'red' }>{task.status}</Badge></Td>
                { userType != 'employee' && <Td>{task.employee.name}</Td>}
                <Td>{task.createdAt}</Td>
                <Td>{task.updatedAt}</Td>
                <Td>Actions</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
}

export default Index;
