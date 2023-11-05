import {
    Button,
    Center,
    Text,
    useToast,
    NumberInput,
    NumberInputField,
    FormLabel,
} from "@chakra-ui/react";
import FieldInput from "../../components/FieldInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import type { RootState } from "../../store";
import { updateTaskInstruction, getIdByEmail, getTaskInfo, updateDueAmount } from "./services";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";



function Index() {
    const [instruction, setInstruction] = useState<string>("");
    const [dueAmount, setDueAmount] = useState<number>(0);
    const toast = useToast();
    const navigate = useNavigate();

    const [taskId] = useSearchParams();
    const id = Number(taskId.get("task-id"));

    const handleInstructionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInstruction(e.target.value);

    const handleDueAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDueAmount(Number(e.target.value));

    const userEmail: string = useSelector((state: RootState) => state.email);
    const userType: string = useSelector((state: RootState) => state.userType);
    const token: string = useSelector((state: RootState) => state.token);

    const fetchTaskInfoFromApi = async () => {
        try {
            const response: AxiosResponse = await getTaskInfo(id, token);
            setInstruction(response.data.text);
            setDueAmount(response.data.dueAmount);
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
    }

    useEffect(() => {
        fetchTaskInfoFromApi();
    }, []);

    const handleUpdateTask = async () => {
        if (instruction === "") {
            toast({
                title: "Please enter a valid instruction",
                position: 'top',
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            if (userType === 'employee') {
                await updateTaskInstruction(id, token, instruction);
                toast({
                    title: "Task updated successfully",
                    position: 'top',
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/');
                return;
            }
            const employeeId: number = await getIdByEmail(userEmail, userType, token);
            await updateDueAmount(id, employeeId, token, dueAmount);
            toast({
                title: "Task updated successfully",
                position: 'top',
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
            return;

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data;
                toast({
                    title: errorMessage,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw error;
            }
        }
    };

    return (
        <Center
            marginY={20}
            marginX="30%"
            bg="gray.200"
            borderRadius="5px"
            paddingX={20}
            paddingTop="2%"
            paddingBottom="3%"
            display="flex"
            flexDir="column"
        >
            <Text
                color="slategray"
                fontWeight="bold"
                fontFamily="Arial"
                fontSize="3xl"
                marginY={5}
            >
                {userType == 'employee' ? 'Edit' : 'Update'} Task
            </Text>
            <FieldInput
                text="instruction"
                name="instruction"
                type="text"
                readonly={userType == 'employee' ? false : true}
                value={instruction}
                onChange={handleInstructionChange}
            />
            <FormLabel marginTop="1em">Due Amount</FormLabel>
            <NumberInput bg='white' borderRadius='5px' defaultValue={0} value={dueAmount} >
                <NumberInputField onChange={handleDueAmountChange} readOnly={userType == 'office-assistant' ? false : true}/>
            </NumberInput>

            <Button
                colorScheme="blue"
                marginTop="2em"
                marginBottom="1em"
                onClick={handleUpdateTask}
            >
                Request
            </Button>
        </Center>
    );
}

export default Index;
