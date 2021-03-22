import { useEffect, useState } from 'react'
import { PREBUILD_WKOUT } from '../constants/index'
interface exercise {
    bodypart: String;
    description: String;
    difficulty: number;
    equimpent: null;
    id: number;
    link: String;
    name: String;
}
interface data {
    slug: String;
    user: String;
    difficulty: number;
    exercises: exercise[];
}
const useFetchedData = () => {
    const [array, setArray] = useState([])
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { Accept: 'application/json' }
        };
        fetch(PREBUILD_WKOUT, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(typeof (data))
                data.map((element: data) => {
                    element["slug"] = element["slug"].charAt(6).toUpperCase() + element["slug"].slice(7)
                })
                setArray(data)
            });
    }, [])
    return array
}
export default useFetchedData;