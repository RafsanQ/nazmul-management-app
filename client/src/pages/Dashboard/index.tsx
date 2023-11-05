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
  Badge,
} from "@chakra-ui/react";
import ActionMenu from './ActionMenu'
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
    initialAmount: number;
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
          position: 'top',
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
  }, [dataToShow]);

  return (
    <Center marginY={10} marginX='5%' bg='gray.200' borderRadius='5px' paddingX='1%' paddingY='2%' display='flex' flexDir='column'>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Instruction</Th>
              <Th>Initial Amount</Th>
              <Th>Due Amount</Th>
              <Th>Status</Th>
              { userType != 'employee' && <Th>Requested By</Th>}
              <Th>Undertaken By</Th>
              <Th>Requested On</Th>
              <Th>Completed On</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataToShow.map((task) => (
              <Tr key={task.id}>
                <Td>{task.id}</Td>
                <Td>{task.text}</Td>
                <Td>{task.initialAmount}</Td>
                <Td>{task.dueAmount}</Td>
                <Td><Badge variant='solid' fontSize='0.8em' colorScheme= {task.status == 'Requested' ? 'purple' : task.status == 'Completed' ? 'green' : 'red' }>{task.status}</Badge></Td>
                { userType != 'employee' && <Td>{task.employee.name}</Td>}
                <Td>{ task.officeAssistant ? task.officeAssistant.name : ''}</Td>
                <Td>{task.createdAt.substring(0, 10)}</Td>
                
                <Td>{task.status == 'Completed' ? task.updatedAt.substring(0, 10) : ''}</Td>
                
                <Td><ActionMenu userType={userType} status={task.status} taskId={task.id} officeAssistantEmail={userEmail} token={token}/></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
}

export default Index;
