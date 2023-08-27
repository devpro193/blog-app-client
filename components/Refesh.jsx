import axios from "axios";
import { useEffect } from "react";
import { popUp } from "./Modal";

export function Refesh(parallelVortex, parallel) {
    useEffect(() => {
        if (parallelVortex && !parallel) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/user/refresh',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parallelVortex}`
                },
                withCredentials: true,
            };

            axios.request(config)
                .then((response) => {
                    window.location.reload()
                })
                .catch((err) => {
                    popUp(err.message)
                });
        }
    }, [])
}