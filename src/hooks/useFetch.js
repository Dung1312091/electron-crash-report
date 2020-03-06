import {
    useEffect,
    useState
} from "react"
const BASE_URL = "https://jsonplaceholder.typicode.com";
export default function (url) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${BASE_URL}${url}`);
                const data = await result.json();
                console.log({
                    data
                })
                setData(data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url])
    return {
        isLoading,
        isError,
        data
    }
}