import Link from "next/link";

export default function Hero() {
    return (
        <div className="flex items-center h-screen pt-20 px-8 pb-8 bg-gradient-to-tr from-secondary">
            <div className="mx-auto text-center ">
                <h1 className="my-14 text-4xl">Buat Poster Info Kajian Anda Tanpa <strong className="line-through">Desain</strong> !</h1>
                <div className="flex justify-center sm:justify-start">
                    <Link href="/create-poster" className="p-4 bg-secondary text-white border-r-2 border-primary hover:bg-slate-600">Buat Poster</Link>
                    <Link href="/info-kajian-lombok" className="p-4 bg-secondary text-white hover:bg-slate-600">Info Kajian Lombok</Link>
                </div>

            </div>
        </div>
    )
}