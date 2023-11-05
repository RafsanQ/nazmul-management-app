import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react'

interface IMenu{
    userType: string;
    status: string;
}

function ActionMenu(props: IMenu){
    return (
        <Menu>
            <MenuButton as={Button}>
                Actions
            </MenuButton>
            <MenuList>
                {props.userType == 'employee' && <MenuItem>Edit</MenuItem>}
                {(props.userType == 'office-assistant' && props.status != "Completed" ) && <MenuItem>Update</MenuItem>}
                {(props.userType == 'office-assistant' && props.status == 'PendingPayment') && <MenuItem>Mark as Complete</MenuItem>}
                {((props.userType == 'employee' && props.status == 'Requested') || (props.userType == 'office-assistant' && props.status == 'Completed')) && <MenuItem>Delete</MenuItem>}
            </MenuList>
        </Menu>
    )
}

export default ActionMenu;
