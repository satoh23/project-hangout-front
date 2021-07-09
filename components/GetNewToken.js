export async function getNewToken() {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
    .then((token) => {
        if (token.ok) {
            return true
        } else {
            return false
        };
    });
}
