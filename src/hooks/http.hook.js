import { useCallback } from "react"

export const useHttp = () => {
    const request = useCallback(async (url, methood = 'GET', body = null, headers = { "ContentType": "application/json"}) => {

        try {
            const response = await fetch(url, {methood, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (e) {
            return e;
        }

    }, []);

    return {request};
}
