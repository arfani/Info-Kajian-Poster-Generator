import { Playfair_Display } from "@next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from 'swr'

const playfairD = Playfair_Display({ subsets: ['latin'] })
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function InfoKajianLombok() {

    const [studyLocations, setStudyLocations] = useState()

    const studies = [
        {
            day: "Ahad",
            time: "Ba'da Maghrib",
            lecturer: "Muhammad Iqbal, ST",
            book: "-",
            theme: "Metode-metode Nabawi meluruskan kesalahan",
            location_id: "1",
            isAvailable: true,
        },
        {
            day: "Senin",
            time: "Ba'da Maghrib",
            lecturer: "Ibnu Hibban, Lc. MA",
            book: "Arbain An - Nawawi",
            theme: "Inspirasi Ilmiah Hadits al-Arba'in an-Nawawiah",
            location_id: "1",
            isAvailable: true,
        },
        {
            day: "Selasa",
            time: "Ba'da Maghrib",
            lecturer: "Hakam bin Abdurrahman bin Hizam,  Lc.",
            book: "المفيد في مهمات التوحي",
            theme: "Aqidah Tauhid",
            location_id: "1",
            isAvailable: true,
        },
        {
            day: "Rabu",
            time: "Ba'da Maghrib",
            lecturer: "Sufyan Bafin Zen, MA.",
            book: "-",
            theme: "-",
            location_id: "1",
            isAvailable: true,
        },
        {
            day: "Kamis",
            time: "Ba'da Maghrib",
            lecturer: "Mufy Hanif Thalib, Lc",
            book: "-",
            theme: "-",
            location_id: "1",
            isAvailable: true,
        },
        {
            day: "Jum'at",
            time: "Ba'da Maghrib",
            lecturer: "Abu Ziyan Johan Saputra Halim, MHI",
            book: "-",
            theme: "-",
            location_id: "1",
            isAvailable: true,
        },
        {
            day: "Sabtu",
            time: "Ba'da Maghrib",
            lecturer: "Fakhruddin Abdurrahman, Lc. MPd",
            book: "-",
            theme: "-",
            location_id: "1",
            isAvailable: true,
        },
    ]

    const { data, error, isLoading } = useSWR('/api/study-locations', fetcher);

    useEffect(() => {
        if (data) {
            const dataJson = JSON.parse(data)
            setStudyLocations(dataJson)
            console.log(dataJson);

        }

    }, [data])
    if (error) return <div>Failed to load data</div>
    if (isLoading) return <div>loading...</div>

    const cards = studies.map((kajian, key) => {
        return (
            <div className="m-2 rounded-lg drop-shadow-lg 
            hover:drop-shadow-md hover:-translate-y-1
            transition-all duration-200 [&>div]:p-2 w-full sm:flex-1" key={key}
            >
                <div className="flex justify-center bg-slate-600 text-slate-50 rounded-t-sm uppercase font-bold">
                    <h2>{kajian.day} {!kajian.isAvailable && <span className="text-red-500">- Libur !!</span>}</h2>
                </div>
                <div className="flex flex-col bg-slate-200 !pb-3 !px-4">
                    <div className="row mb-2">
                        <div className="w-fit font-semibold">Ustadz :</div>
                        <div className="sm:whitespace-nowrap">{kajian.lecturer}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="w-fit font-semibold">Tema :</div>
                        <div className="sm:whitespace-nowrap">{kajian.theme}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="w-fit font-semibold">Kitab :</div>
                        <div className="sm:whitespace-nowrap">{kajian.book}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="w-fit font-semibold">Waktu :</div>
                        <div className="sm:whitespace-nowrap">{kajian.time}</div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            <div className="bg-[url('/images/bg-slate.jpg')] w-screen h-screen fixed -z-10"></div>
            <main className={`flex justify-center w-screen h-screen bg-opacity-80 z-10
        bg-slate-100 ${playfairD.className}`}
            >
                <div className="box flex flex-col w-full p-2 my-6 sm:pt-4 mx-10 drop-shadow-lg rounded
            bg-gradient-to-tr from-slate-50 via-slate-200 to-slate-50 overflow-y-auto"
                >
                    <div className="text-center mb-3">
                        <h1 className="text-xl font-semibold">Info Kajian Lombok</h1>
                        <p>Lokasi : {studyLocations ? studyLocations[0].name : ""}</p>
                        <p className="font-thin">{studyLocations ? studyLocations[0].address : ""}</p>
                    </div>
                    <div className="flex flex-wrap flex-1">
                        {cards}
                    </div>
                    <footer className="text-center pt-4 pb-1 text-sm">❤️ by <a href="http://fb.com/muhammadarfanihidayat">rfun</a></footer>
                </div>
            </main>
        </>
    )
}