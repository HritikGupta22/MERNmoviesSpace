import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';

function LogoutButton() {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const activeuser = JSON.parse(localStorage.getItem("user-moviesproj"));
    const apiUrl = import.meta.env.VITE_API_URL;
    


    const handleLogout = async() => {
        try {
            const res = fetch(`https://moviemernbackend.onrender.com/api/users/logout`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data  = (await res).json();
            console.log(data);
            if(data.error){
                // console.log(data.error);
                showToast("Error",data.error, "error");
                return;
            }
            
            localStorage.removeItem("user-moviesproj");
            setUser(null);
        } catch (error) {
            showToast("Error",error, "error");
        }
    };


  return (
    <Button 
    position={"fixed"}
    top={"10px"}
    right={"30px"}
    size={"md"}
    onClick={handleLogout}
    display={'block'}
    >
    <p>Logout</p>
    <p>{activeuser.username}</p>
    </Button>
  )
}

export default LogoutButton
