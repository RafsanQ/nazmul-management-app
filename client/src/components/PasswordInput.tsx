import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

interface Iprops {
    name: string,
    value: string,
    onChange(e: React.FormEvent<HTMLInputElement>): void
}


function PasswordInput(props: Iprops) {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size="md" >
            <Input 
                name={props.name}
                pr="4.5rem"
                variant='flushed'
                bg="white"
                type={show ? "text" : "password"}
                placeholder="Password"
                borderRadius='5px'
                padding={4}
                value={props.value}
                onChange={props.onChange}
                marginY={2}
            />
            <InputRightElement width="4.5rem" marginY="1ex">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}

export default PasswordInput;
