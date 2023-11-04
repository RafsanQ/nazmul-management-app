import { Input } from '@chakra-ui/react'

interface Iprops {
    text: string,
    type: string,
    value: string,
    name: string
    onChange(e: React.FormEvent<HTMLInputElement>): void
}

function FieldInput(props: Iprops) {
    return (
        <Input id={props.name} variant='flushed' name={props.name} placeholder={props.text} type={props.type} onChange={props.onChange} bg="white" padding={4} margin={2} marginX={0} borderRadius='5px' />
    );
}

export default FieldInput;