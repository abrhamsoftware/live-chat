import { projectAuth } from "@/firebase/config";
import { ref } from "vue"


const error = ref(null)

const signup = async (email, password, displayName) => {

    error.value = null;

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw Error('Could not complete signup ')
        }

        await res.user.updateProfile({ displayName });
        error.value = null;

        return res;
    } catch (err) {
        error.value = err.message;
        console.log('Error ', error.value)

    }

}


const useSignup = () => {

    return { error, signup }
}


export default useSignup