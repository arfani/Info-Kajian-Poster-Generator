import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import logoLombokBertauhid from '/public/images/logo-lombok-bertauhid.jpg'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function InfoKajianLombok() {
    const studies = [
        [
            {
                day: "Ahad",
                time: "Ba'da Subuh",
                lecturer: "Muharrar bin Mikail, Lc",
                book: "-",
                theme: "-",
                location_id: "1",
                isAvailable: true,
            }, {

                day: "Ahad",
                time: "Ba'da Maghrib",
                lecturer: "Muhammad Iqbal, ST",
                book: "-",
                theme: "Metode-metode Nabawi meluruskan kesalahan",
                location_id: "1",
                isAvailable: true,
            }
        ]
        ,
        [
            {
                day: "Senin",
                time: "Ba'da Maghrib",
                lecturer: "Ibnu Hibban, Lc. MA",
                book: "Arbain An - Nawawi",
                theme: "Inspirasi Ilmiah Hadits al-Arba'in an-Nawawiah",
                location_id: "1",
                isAvailable: true,
            }
        ],
        [
            {
                day: "Selasa",
                time: "Ba'da Subuh",
                lecturer: "Ahmad Firdaus, Lc",
                book: "الارشاد إلى صحيح الاعتقاد",
                theme: "-",
                location_id: "1",
                isAvailable: true,
            },
            {
                day: "Selasa",
                time: "Ba'da Ashar",
                lecturer: "Lalu Ahmad Yani, Lc",
                book: "الأصول الثلاثة",
                theme: "TIGA LANDASAN UTAMA",
                location_id: "1",
                isAvailable: true,
                pekan: "1",
                status: "PENGAJIAN KHUSUS MUSLIMAH"
            },
            {
                day: "Selasa",
                time: "Ba'da Ashar",
                lecturer: "Jamaludin, Lc",
                book: "-",
                theme: "-",
                location_id: "1",
                isAvailable: true,
                pekan: "3",
                status: "PENGAJIAN KHUSUS MUSLIMAH"
            },
            {
                day: "Selasa",
                time: "Ba'da Maghrib",
                lecturer: "Hakam bin Abdurrahman bin Hizam, Lc",
                book: "المفيد في مهمات التوحي",
                theme: "Aqidah Tauhid",
                location_id: "1",
                isAvailable: true,
            }
        ],
        [
            {
                day: "Rabu",
                time: "Ba'da Subuh",
                lecturer: "Hakam bin Abdurrahman bin Hizam, Lc",
                book: "-",
                theme: "-",
                location_id: "1",
                isAvailable: true,
            },
            {
                day: "Rabu",
                time: "Ba'da Maghrib",
                lecturer: "Sufyan Bafin Zen, MA",
                book: "-",
                theme: "-",
                location_id: "1",
                isAvailable: true,
            }
        ],
        [
            {
                day: "Kamis",
                time: "Ba'da Subuh",
                lecturer: "Jamaluddin, Lc",
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
            }
        ],
        [
            {
                day: "Jum'at",
                time: "Ba'da Subuh",
                lecturer: "Abu Ziyan Johan Saputra Halim, MHI",
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
            }
        ],
        [
            {
                day: "Sabtu",
                time: "Ba'da Maghrib",
                lecturer: "Fakhruddin Abdurrahman, Lc. MPd",
                book: "Tafsir Al-Muyassar",
                theme: "Tafsir Al-Qur'an",
                location_id: "1",
                isAvailable: true,
            }
        ],
    ]

    let { data: studyLocations, error, isLoading } = useSWR('/api/study-locations', fetcher);

    if (error) return <div>Failed to load data</div>
    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-tr from-slate-500 to-slate-500 via-slate-50">
                <div className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] md:w-[100px] md:h-[100px]
                 animate-spin rounded-full border-r-2 border-slate-700"></div>
            </div>
        )
    }
    if (studyLocations) {
        studyLocations = JSON.parse(studyLocations)
    }
    const cards = studies.map((kajian, key) => {

        const days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

        return (
            <div className="m-2 rounded-lg drop-shadow-lg 
            transition-all duration-200 [&>div]:p-2 w-full sm:flex-1" key={key}
            >
                <div className="flex justify-center bg-slate-600 text-slate-50 rounded-t-sm uppercase font-bold font-sans">
                    <h2>{days[key]}</h2>
                </div>
                {kajian.map((item, key) => {
                    return (
                        <div className="flex flex-col bg-slate-200 !pb-3 !px-4" key={key}>
                            <div className="flex sm:whitespace-nowrap">
                                <h3 className="bg-slate-300 w-fit px-3 py-2 font-semibold inline-block
                                border-l-2 border-slate-800">Waktu : {item.time}</h3>
                                {item.status && <div className="inline-block bg-pink-500 p-2 text-red-50">{item.status}</div>}
                                {item.pekan && <div className="inline-block bg-blue-500 p-2 text-red-50">Pekan {item.pekan}</div>}
                                {!item.isAvailable && <div className="inline-block bg-red-500 p-2 text-red-50">Libur !!</div>}
                            </div>
                            <div className="row mb-2">
                                <div className="w-fit font-semibold">Ustadz :</div>
                                <div className="sm:whitespace-nowrap">{item.lecturer}</div>
                            </div>
                            <div className="row mb-2">
                                <div className="w-fit font-semibold">Tema :</div>
                                <div className="sm:whitespace-nowrap">{item.theme}</div>
                            </div>
                            <div className="row mb-2">
                                <div className="w-fit font-semibold">Kitab :</div>
                                <div className="sm:whitespace-nowrap">{item.book}</div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    })

    return (
        <>
            <div className="bg-[url('/images/bg-slate.jpg')] w-screen h-screen fixed -z-10"></div>
            <main className={`font-sans flex justify-center w-screen bg-opacity-40 bg-slate-900`}
            >
                <div className="box flex flex-col w-full p-2 my-6 sm:pt-4 mx-6 drop-shadow-lg rounded
            bg-gradient-to-tr from-slate-50 via-slate-200 to-slate-50 "
                >
                    <div className="flex mb-3">
                        <Image src={logoLombokBertauhid} alt="Logo lombok bertauhid"
                            className="w-20 rounded-full m-3 sm:mx-6 md:mx-20 h-fit" />
                        <div className="text-center flex-1">
                            <h1 className="text-xl font-semibold">Info Kajian Lombok</h1>
                            <p>Lokasi : {studyLocations[0].name}</p>
                            <p className="font-thin">{studyLocations[0].address}</p>
                            <h2 className="bg-slate-200 w-fit mx-auto pl-2 py-1 pr-3 border-l-2 border-slate-400">Kajian Rutin</h2>
                        </div>
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