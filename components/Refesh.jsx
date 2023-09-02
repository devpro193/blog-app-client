import axios from "axios";
import { useEffect } from "react";
import { popUp } from "./Modal";
import { useCookies } from "react-cookie";

export function Refesh(parallelVortex, parallel) {
    const [cookie, setCookie] = useCookies(["parallel"])
    useEffect(() => {
        if (parallelVortex && !parallel) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.SERVER_URL}/user/refresh`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parallelVortex}`
                },
            };

            axios.request(config)
                .then((response) => {
                    setCookie("parallel", response.data.parallel, {
                        maxAge: 60 * 60
                    })
                    window.location.reload()
                })
                .catch((err) => {
                    popUp(err.message)
                });
        }
    }, [])
}