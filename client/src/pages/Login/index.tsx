import { 
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Button,
    Center,
    Text
} from "@chakra-ui/react";
import FieldInput from "../../components/FieldInput";
import PasswordInput from "../../components/PasswordInput";
import { login } from "./services";
import { useState } from "react";

function Index() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    
    const isError = email === '' || password === ''


    const handleLogIn = async () => {
        await login(email, password);
    }
    


    return (
        <Center marginY={20} marginX='30%' bg='gray.200' borderRadius='5px' padding={20} display='flex' flexDir='column'>
            <FormControl isInvalid={isError} isRequired >
                <Text color='slategray' fontWeight='bold' fontFamily='Arial' fontSize='3xl' marginY={5}>Log In</Text>
                <FieldInput text='Email' type='email' value={email} onChange={handleEmailChange} />
                <PasswordInput value={password} onChange={handlePasswordChange} />
                <Button colorScheme='blue' marginTop='2em' onClick={handleLogIn}>Log In</Button>
            </FormControl>
        </Center>
    );
}

export default Index;