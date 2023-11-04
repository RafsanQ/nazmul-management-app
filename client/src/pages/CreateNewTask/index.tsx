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
import FieldInput from "../../components/FieldInput";
import PasswordInput from "../../components/PasswordInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Index() {

    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: ''
    });
    const [userType, setUserType] = useState('employee');
    const toast = useToast();
    const navigate = useNavigate();

    const handleEmployeeDataChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmployeeData({
        ...employeeData,
        [e.target.name]: e.target.value
    });


    
    const handleRegister = async () => {

        if(employeeData.email === '' || employeeData.password === '' || employeeData.name === '' || employeeData.phone === '') {
            toast({
                title: "Please fill out all of the required fields",
                status: 'error',
                duration: 3000,
                isClosable: true
            })
            return;
        }

        if(employeeData.password !== employeeData.repeatPassword) {
            toast({
                title: "Passwords do not match",
                status: 'error',
                duration: 3000,
                isClosable: true
            })
            return;
        }
        
        try{
            await registerApi(employeeData.email, employeeData.password, userType, employeeData.phone, employeeData.name);

            toast({
                title: "Employee Registered Successfully",
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            
            navigate('/login');

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
        <Center marginY={20} marginX='30%' bg='gray.200' borderRadius='5px' paddingX={20} paddingTop='2%' paddingBottom='3%' display='flex' flexDir='column'>
            <FormControl isRequired >
                <Text color='slategray' fontWeight='bold' fontFamily='Arial' fontSize='3xl' marginY={5}>Register a New Employee</Text>
                <FieldInput text='Name' name='name' type='text' value={employeeData.name} onChange={handleEmployeeDataChange} />
                <FieldInput text='Email' name='email' type='email' value={employeeData.email} onChange={handleEmployeeDataChange} />
                <FieldInput text='Phone Number' name='phone' type='number' value={employeeData.phone} onChange={handleEmployeeDataChange} />
                
                <PasswordInput name='password' value={employeeData.password} onChange={handleEmployeeDataChange} />
                <PasswordInput name='repeatPassword' value={employeeData.repeatPassword} onChange={handleEmployeeDataChange} />
                <br />
                <RadioGroup onChange={setUserType} value={userType}>
                    <Stack direction='row'>
                        <Radio value='employee'>Regular Employee</Radio>
                        <br />
                        <Radio value='office-assistant'>Office Assistant</Radio>
                    </Stack>
                </RadioGroup>
                <Button colorScheme='blue' marginTop='2em' marginBottom='1em' onClick={handleRegister}>Register</Button>
                <Text>Already have an account? <Link className="link" to='/login'>Sign in</Link> instead</Text>
            </FormControl>
        </Center>
    );
}

export default Index