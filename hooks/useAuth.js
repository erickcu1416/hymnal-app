import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useUser from "@hooks/useUser";
import { useUpdateUserDisplayNameMutation } from "@store/api/auth.api";
const useAuth = () => {

    const { setNewUser } = useUser();
    const [requesUpdateDisplayName, { isLoading: isLoadingRequestUpdateDisplayName }] =
    useUpdateUserDisplayNameMutation();
    
    const signUp = async (body) => {
        const currentUser = await createUserWithEmailAndPassword(auth, body.email, body.password);
        const newUser = {
            uid: currentUser.user.uid,
            displayName: body.name + ' ' + body.last_name,
            email: currentUser.user.email,
            emailVerified: currentUser.user.emailVerified,
        }
        
        setNewUser(newUser);
        
        const bodyToPostUpdate = {
            "id": newUser.uid,
            "name": body.name,
            "last_name": body.last_name
        }

        await new Promise(resolve => setTimeout(async () => {
            const responseToUpdateUser = await requesUpdateDisplayName(bodyToPostUpdate);
            resolve()
        }, 2500));

        return currentUser;
    }

    const logIn = async (body) => {
        const logInResponse = await signInWithEmailAndPassword(auth, body.email, body.password);

        const newUser = {
            uid: logInResponse.user.uid,
            displayName: logInResponse.user.displayName,
            email: logInResponse.user.email,
            emailVerified: logInResponse.user.emailVerified,
        }

        console.log('newUser to save', newUser);
        
        setNewUser(newUser);
        return logInResponse;
    }


    return {
        signUp,
        logIn
    }
}

export default useAuth;