const useHttp = async (requestConfig, applyData) => {
    try {
        const res = await fetch(`https://openmarket.weniv.co.kr${requestConfig.url}`, {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!res.ok) {
            throw new Error("Request failed!");
        }

        const data = await res.json();
        applyData(data);
    } catch (err) {
        console.log(err);
    }
}

export default useHttp;