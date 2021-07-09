import fetch from "node-fetch";

export async function getAllUserData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/female-user-list/`),
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
    );
    const staticUsers = await res.json();
    return staticUsers;
}

export async function getAllUserIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/female-user-list/`)
    );
    const users = await res.json();

    return users.map((user) => {
        return {
            params: {
                id: String(user.id),
            },
        };
    });
}

export async function getUserData(id) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/detail-user/${id}/`)
        );
    const user = await res.json();

    return {
        user,
    };
}