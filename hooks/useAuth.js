import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useUser from "@hooks/useUser";
import { useUpdateUserDisplayNameMutation } from "@store/api/auth.api";
const useAuth = () => {

    const { setNewUser } = useUser();
    const [requesUpdateDisplayName, { isLoading: isLoadingRequestUpdateDisplayName }] =
    useUpdateUserDisplayNameMutation();
    
    const signIn = async (body) => {
        console.log('body', body);
        const currentUser = await createUserWithEmailAndPassword(auth, body.email, body.password);
        console.log('CURRENT USER', currentUser);
        const newUser = {
            uid: currentUser.user.uid,
            displayName: body.name + ' ' + body.last_name,
            email: currentUser.user.email,
            emailVerified: currentUser.user.emailVerified,
        }

        console.log('newUser to save', newUser);
        
        setNewUser(newUser);
        
        const bodyToPostUpdate = {
            "id": newUser.uid,
            "name": body.name,
            "last_name": body.last_name
        }

        await new Promise(resolve => setTimeout(async () => {
            const responseToUpdateUser = await requesUpdateDisplayName(bodyToPostUpdate);
            console.log('RESPONSE TO UPDATE', responseToUpdateUser);
            resolve()
        }, 2500));

        return currentUser;
    }
    return {
        signIn
    }
}

export default useAuth;