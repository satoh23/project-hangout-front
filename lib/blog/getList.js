import fetch from "node-fetch";

export async function getAllBlogData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/list-blog/`),
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
    );
    const blogs = await res.json();
    const fillterdBlogs = blogs.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );
    return fillterdBlogs;
}

export async function getAllBlogIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/list-blog/`)
    );
    const blogs = await res.json();

    return blogs.map((blog) => {
        return {
            params: {
                id: String(blog.id),
            },
        };
    });
}

export async function getBlogData(id) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/detail-blog-befor-purchase/${id}/`)
        );
    const blog = await res.json();

    return {
        blog,
    };
}

export async function getAllAuthorIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/female-user-list/`)
    );
    const author = await res.json();

    return author.map((author) => {
        return {
            params: {
                id: String(author.id),
            },
        };
    });
}

export async function getAllBlogList(id) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/detail-blog-author/${id}/`),
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
    );
    const blogList = await res.json();
    const fillterdBlogList = blogList.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );
    return fillterdBlogList;
}
