import Link from "next/link";
import Image from 'next/image'


export default function Blog({ blog, isEdit=false }) {

    return (
        <div className="mb-2 mt-2 mr-1 ml-1">
            <div className="my-1 px-1 lg:my-4 lg:px-4">
            <Link href={isEdit ? `/blog/edit/${blog.id}` : `/blog/befor-purchase/${blog.id}`}>
                <article className="flex cursor-pointer overflow-hidden border rounded-lg shadow-md w-full sm:w-3/4 lg:w-3/5 sm:m-auto mb-3">
                    <Image
                        src={blog.thumbnail ? blog.thumbnail : "/NoImage.jpg"} 
                        alt="icon" 
                        className="border rounded-lg"
                        width={190}
                        height={160}/>
                    <div className="items-center justify-between leading-tight w-full relative">
                        <div className="pl-3 pr-3 pt-1 pb-1 border-b border-pink-200 font-semibold border-dashed">
                            {blog.title}
                        </div>
                        <div className="pl-3 pr-3 pt-1 text-xs sm:text-sm line-clamp-3 text-gray-800">
                            {blog.summary}
                        </div>
                        <div className="absolute right-3 bottom-1 text-gray-600">
                            <span className="text-xs">{blog.genre ? blog.genre : "なし"} / </span><span className="font-bold text-sm sm:text-base sm:ml-3">{String(Math.floor(blog.price)).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')} P</span>
                        </div>
                        <div className="absolute left-1 bottom-1 text-pink-300 w-32 sm:w-auto truncate">
                            <span className="text-xs">{blog.author}</span>
                        </div>
                    </div>
                </article>
            </Link>
            </div>
        </div>
    );
}