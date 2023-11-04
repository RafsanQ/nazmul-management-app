import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast
} from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '../store'
import { logout } from "../features/auth";


function Navbar() {
    const userEmail: string = useSelector((state: RootState) => state.email);
    const userName: string = useSelector((state: RootState) => state.name);
    const token: string = useSelector((state: RootState) => state.token);
    const userType: string = useSelector((state: RootState) => state.userType);
    const dispatch = useDispatch();
    const toast = useToast();

    const isSignedIn = userEmail == '' || userName == '' || token == '' || userType == '' ? false : true;


    const handleLogOut = () => {
        dispatch(
            logout()
        )
        toast({
            title: "Logged Out Successfully",
            status: 'success',
            duration: 3000,
            isClosable: true
        })
    }

    return (
        <Box className='navbar' bg='slategray ' color='gainsboro ' h='7vh' fontFamily='Arial' fontSize='xl' fontWeight='bold' letterSpacing='0.1em' paddingY="1ex" paddingX="2%">
            <a href='/'>Nazmul Management System</a>
            {
                isSignedIn &&
                (<div className='logOutMenu'>
                    <Menu>
                        <MenuButton as={Button}  >
                            {userName}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={handleLogOut}>Create New Task</MenuItem>
                            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                        </MenuList>
                    </Menu>
                </div>)
            }
        </Box>
        
    );
}

export default Navbar;