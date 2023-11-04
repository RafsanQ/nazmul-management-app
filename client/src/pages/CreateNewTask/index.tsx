import {
    Button,
    Center,
    Text,
    useToast,
} from "@chakra-ui/react";
import FieldInput from "../../components/FieldInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { RootState } from "../../store";
import { createNewTask, getIdByEmail } from "./services";
import { useSelector } from "react-redux";

function Index() {
    const [instruction, setInstruction] = useState<string>("");
    const toast = useToast();
    const navigate = useNavigate();

    const handleInstructionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInstruction(e.target.value);
    const userEmail: string = useSelector((state: RootState) => state.email);
    const userType: string = useSelector((state: RootState) => state.userType);
    const token: string = useSelector((state: RootState) => state.token);

    if(userEmail == '' || token == ''){
        navigate('/login');
    }

    const handleCreateNewTask = async () => {
        if (instruction === "") {
            toast({
                title: "Please enter a valid instruction",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const employeeId: number = await getIdByEmail(userEmail, userType, token);
            console.log(token);
            await createNewTask(employeeId, token, instruction);
            toast({
                title: "Task posted successfully",
                status: "success",
                duration: 3000,
                isClosable: true, 
            });
            navigate('/');
            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data;
                console.log(error.response);
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
                Create a New Task
            </Text>
            <FieldInput
                text="Instruction"
                name="instruction"
                type="text"
                value={instruction}
                onChange={handleInstructionChange}
            />

            <Button
                colorScheme="blue"
                marginTop="2em"
                marginBottom="1em"
                onClick={handleCreateNewTask}
            >
                Request
            </Button>
        </Center>
    );
}

export default Index;
