import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Admin() {
    const { user, fetchUserDetails, logout } = useAuth();

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handelLogout = async () => {
        try {
            await logout()
            //toast.success('Log Out Succesful')
        } catch {
            console.log('Erro while log out from home page: ', err)
            toast.error("Something Went Wrong")
        }
    }

    return (
        <div className='bg-white text-black p-4'>
            <h1>Admin page</h1>
            <p>Name: {user?.firstname} {user?.lastname}</p>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone_number}</p>
            <p>Role: {user?.role?.join(", ")}</p>
            <button className='bg-green-400' onClick={handelLogout}>Log out</button>
        </div>
    );
}

export default Admin;