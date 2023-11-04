import { 
    FormControl,
    Button,
    Center,
    Text,
    Radio,
    RadioGroup,
    Stack
} from "@chakra-ui/react";
import FieldInput from "../../components/FieldInput";
import PasswordInput from "../../components/PasswordInput";
import { login } from "./services";
import { useState } from "react";


function Index() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('employee')

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    
    const isError = email === '' || password === ''



    const handleLogIn = async () => {


        const response = await login(email, password, userType);
        
        const employeeId: number = response.employee.id;
        const employeeName: string = response.employee.name
        const employeeEmail: string = response.employee.email

        console.log(employeeId, employeeName, employeeEmail, userType);
    }
    


    return (
        <Center marginY={20} marginX='30%' bg='gray.200' borderRadius='5px' padding={20} display='flex' flexDir='column'>
            <FormControl isInvalid={isError} isRequired >
                <Text color='slategray' fontWeight='bold' fontFamily='Arial' fontSize='3xl' marginY={5}>Log In</Text>
                <FieldInput text='Email' type='email' value={email} onChange={handleEmailChange} />
                <PasswordInput value={password} onChange={handlePasswordChange} />
                <RadioGroup onChange={setUserType} value={userType}>
                    <Stack direction='row'>
                        <Radio value='employee'>Regular Employee</Radio>
                        <Radio value='office-assistant'>Office Assistant</Radio>
                    </Stack>
                </RadioGroup>
                <Button colorScheme='blue' marginTop='2em' onClick={handleLogIn}>Log In</Button>
            </FormControl>
        </Center>
    );
}

export default Index;