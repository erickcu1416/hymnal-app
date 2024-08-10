import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useUser from "@hooks/useUser";
import { useUpdateUserDisplayNameMutation } from "@store/api/auth.api";
import { useNavigation } from "@react-navigation/native";
const useAuth = () => {

    const { user, setNewUser } = useUser();
    const navigator = useNavigation();
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

        await sendEmailVerificationForUser()

        await new Promise(resolve => setTimeout(async () => {
            const responseToUpdateUser = await requesUpdateDisplayName(bodyToPostUpdate);
            resolve()
        }, 5000));

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
        
        setNewUser(newUser);
        return logInResponse;
    }

    const sendEmailVerificationForUser = async () => {
        await sendEmailVerification(auth.currentUser);
    }

    const sendEmailPassworResetEmailUser = async (email) => {
        await sendPasswordResetEmail(auth, email);
    }

    const reloadUser = async () => {
        await auth.currentUser.reload();
        const newUser = auth.currentUser;
        setNewUser(newUser);
        navigator.navigate('App')
    }

    const validateEmailVerify = () => {
        if (!user) {
            navigator.navigate('WelcomePage');
        }
        if (user && !user.emailVerified) {
            navigator.navigate('VerifyContent', {
                screen: 'VerifyEmailPage', params: {
                    email: user.email
                }
            });
          }
        
        if (user && user.emailVerified) {
            navigator.navigate('App');
        }
    }

    const validateEmailOnRegisterOrLogin = (userResponse) => {
        if (userResponse.user && !userResponse.user.emailVerified) {
            navigator.navigate('VerifyEmailProccesAuth', {
              email: userResponse.user.email
            })
          }
        
        if (userResponse.user && userResponse.user.emailVerified) {
            navigator.navigate('App');
        }
    }


    return {
        signUp,
        logIn,
        validateEmailVerify,
        validateEmailOnRegisterOrLogin,
        sendEmailVerificationForUser,
        reloadUser,
        sendEmailPassworResetEmailUser
    }
}

export default useAuth;