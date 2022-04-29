import { ref } from 'vue'

const useSearch = () => {

    const match = ref(null);
    const notFound = ref(null)
    const query = async (input, fallbackData) => {
        notFound.value = null;
        try {
            if (input.value != "") {
                const res = await fetch(`https://restcountries.com/v2/name/${input.value}`);

                if (!res.ok) throw new Error("Country not Found!");

                return match.value = await res.json();
            }
        } catch (error) {
            notFound.value = error;
            console.log(error.message);
            return fallbackData;
        }
    }

    return { notFound, query }

}

export default useSearch