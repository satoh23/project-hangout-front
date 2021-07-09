import Link from "next/link";


export default function EditBlog() {

    return (
        <div className="mx-auto border-dashed flex-wrap flex w-full justify-center items-center border-b border-pink-200 pb-4 mb-4">
                <Link href={`/blog/editList`}>
                <article className="flex cursor-pointer overflow-hidden border rounded-lg shadow-md w-1/3 h-14 ml-3 bg-indigo-400 hover:bg-white hover:border hover:border-indigo-400 text-white hover:text-indigo-400">
                    <div className="items-center text-center justify-between leading-tight w-full m-auto font-bold text-xl">
                        ブログを編集する
                    </div>
                </article>
                </Link>
                <Link href={`/blog/create`}>
                <article className="flex cursor-pointer overflow-hidden border rounded-lg shadow-md w-1/3 h-14 ml-3 bg-red-400 hover:bg-white hover:border hover:border-red-400 text-white hover:text-red-400">
                    <div className="items-center text-center justify-between leading-tight w-full m-auto font-bold text-xl">
                        ブログの新規作成
                    </div>
                </article>
                </Link>
        </div>
    );
}