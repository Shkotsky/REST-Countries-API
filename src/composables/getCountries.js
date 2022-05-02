import { ref } from 'vue'

const error = ref(null);
const isPending = ref(false);


const countries = async (api) => {
    error.value = null;
    isPending.value = true;
    try {
        const res = await fetch(api);
        if (res.ok) {
            const data = await res.json()
            error.value = null;
            isPending.value = false;
            return data
        } else {
            if (res.status == "404") {
                throw new Error("Page not found 404...")
            } else {
                throw new Error("Something went wrong...")
            }

        }

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


