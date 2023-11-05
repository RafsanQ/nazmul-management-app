import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

interface IMenu{
    taskId: number;
    userType: string;
    status: string;
}

function ActionMenu(props: IMenu){
    const navigate = useNavigate();

    const handleEditPageNavigation = () => {
        navigate('/edit-task?task-id=' + props.taskId);
    }

    return (
        <Menu>
            <MenuButton as={Button}>
                Actions
            </MenuButton>
            <MenuList>
                {props.userType == 'employee' && <MenuItem onClick={handleEditPageNavigation}>Edit</MenuItem>}
                {(props.userType == 'office-assistant' && props.status != "Completed" ) && <MenuItem onClick={handleEditPageNavigation}>Update</MenuItem>}
                {(props.userType == 'office-assistant' && props.status == 'Pending Payment') && <MenuItem>Mark as Complete</MenuItem>}
                {((props.userType == 'employee' && props.status != 'Pending Payment') || (props.userType == 'office-assistant' && props.status == 'Completed')) && <MenuItem>Delete</MenuItem>}
            </MenuList>
        </Menu>
    )
}

export default ActionMenu;
