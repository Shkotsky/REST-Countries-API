import { ref } from 'vue'

const error = ref(null);
const isPending = ref(false);


const countries = async (api) => {
    error.value = null;
    try {
        const res = await fetch(api);
        const data = await res.json()
        error.value = null;
        isPending.value = false;
        console.log("PRAVI CALL", api);
        return data
    } catch (err) {
        console.log(err.message);
        error.value = err.message
    }
    isPending.value = false;
 
}

const getCountries = () => {
    return { error, isPending, countries }
}

export default getCountries


