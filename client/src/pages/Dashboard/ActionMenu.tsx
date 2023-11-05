import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { updateDueAmount } from '../EditTask/services';
import axios from 'axios';
import { getIdByEmail } from './services';

interface IMenu{
    taskId: number;
    userType: string;
    status: string;
    officeAssistantEmail: string;
    token: string;
}

function ActionMenu(props: IMenu){
    const navigate = useNavigate();
    const toast = useToast();

    const handleEditPageNavigation = () => {
        navigate('/edit-task?task-id=' + props.taskId);
    }

    const hanldeCompletion = async () => {
        try {
            const assistantId = await getIdByEmail(props.officeAssistantEmail, props.userType, props.token);
            await updateDueAmount(props.taskId, assistantId, props.token, 0);
            navigate('/');
            toast({
                title: "Task Completed successfully",
                position: 'top',
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            
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
            }
        }
    }

    return (
        <Menu>
            <MenuButton as={Button}>
                Actions
            </MenuButton>
            <MenuList>
                {props.userType == 'employee' && <MenuItem onClick={handleEditPageNavigation}>Edit</MenuItem>}
                {(props.userType == 'office-assistant' && props.status != "Completed" ) && <MenuItem onClick={handleEditPageNavigation}>Update</MenuItem>}
                {(props.userType == 'office-assistant' && props.status == 'Pending Payment') && <MenuItem onClick={hanldeCompletion}>Mark as Complete</MenuItem>}
                {((props.userType == 'employee' && props.status != 'Pending Payment') || (props.userType == 'office-assistant' && props.status == 'Completed')) && <MenuItem>Delete</MenuItem>}
            </MenuList>
        </Menu>
    )
}

export default ActionMenu;
