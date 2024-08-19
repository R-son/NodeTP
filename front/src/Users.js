import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [affichage, setAffichage] = useState(false);

    const list = async () => {
        await axios.get(`/users`)
            .then(res => {
                console.log(res)
                setUsers(res.data)
                setAffichage(true)
            })
    }
    useEffect(() => {list()}, [])
}