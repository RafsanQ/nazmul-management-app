import { 
    FormControl,
    Button,
    Center,
    Text,
    Radio,
    RadioGroup,
    Stack,
    useToast
} from "@chakra-ui/react";
import { useDispatch } from 'react-redux'
import { login } from '../../features/auth'
import FieldInput from "../../components/FieldInput";
import PasswordInput from "../../components/PasswordInput";
import { loginApi } from "./services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Index() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('employee');
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    
    const isError = email === '' || password === ''



    const handleLogIn = async () => {

        if(!email || !password) {
            toast({
                title: "Please enter your email and password",
                status: 'error',
                duration: 3000,
                isClosable: true
            })
            return
        }
        
        
        try{
            const response = await loginApi(email, password, userType);

            const employeeEmail: string = response.data.employee.email;
            const employeeToken: string = response.data.token;

            toast({
                title: "Signed in successfully",
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            
            dispatch(
                login({
                    email: employeeEmail,
                    token: employeeToken,
                    userType: userType
                })
            );
            
            navigate('/');

        }catch(error){
            if(axios.isAxiosError(error) && error.response){
                const errorMessage = error.response.data;
                toast({
                    title: errorMessage,
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                })
            }
            else{
                throw error;
            }
        }
    }
    


    return (
        <Center marginY={20} marginX='30%' bg='gray.200' borderRadius='5px' padding={20} display='flex' flexDir='column'>
            <FormControl isInvalid={isError} isRequired >
                <Text color='slategray' fontWeight='bold' fontFamily='Arial' fontSize='3xl' marginY={5}>Log In</Text>
                <FieldInput text='Email' type='email' value={email} onChange={handleEmailChange} />
                <PasswordInput value={password} onChange={handlePasswordChange} />
                <br />
                <RadioGroup onChange={setUserType} value={userType}>
                    <Stack direction='row'>
                        <Radio value='employee'>Regular Employee</Radio>
                        <br />
                        <Radio value='office-assistant'>Office Assistant</Radio>
                    </Stack>
                </RadioGroup>
                <Button colorScheme='blue' marginTop='2em' onClick={handleLogIn}>Log In</Button>
            </FormControl>
        </Center>
    );
}

export default Index