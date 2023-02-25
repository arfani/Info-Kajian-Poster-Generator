import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import logoLombokBertauhid from '/public/images/logo-lombok-bertauhid.jpg';

export default function InfoKajianLombok() {
    const today = new Date()

    const [lecturings, setLecturings] = useState([])
    const [filterDay, setFilterDay] = useState("")

    useEffect(() => {
        getLecturings()
    }, [filterDay])

    const getLecturings = () => {
        axios('/api/kajian/rutin')
            .then(({ data }) => {
                setLecturings(data)
            })
            .catch(({ message }) => {
                toast.error(message)
            })
    }

    interface Lecturing {
        "day": {
            id: number,
            name: string
        },
        "time": string,
        "lecturer": {
            id: number,
            name: string,
            kunyah: string,
            wa: string,
            address: string
        },
        "book": string,
        "theme": string,
        "location": {
            id: number,
            name: string,
            address: string,
            detail_address: string
        },
        "isAvailable": boolean,
        "week": number,
        "status": string
    }

    const cards = () => lecturings
        .map((lecturing: Lecturing, key) => {
            if (lecturing.day.id == (filterDay || today.getDay()))
                return (
                    <div className="m-2 rounded-lg drop-shadow-lg transition-all duration-200 
            [&>div]:p-2 sm:flex-1" key={key}
                    >
                        <div className="flex justify-center items-center bg-slate-600 text-slate-50 rounded-t-sm">
                            <div className="uppercase font-bold font-sans">{lecturing.time}</div>
                            {lecturing.day.id === today.getDay() && <div className="bg-slate-300 p-1 px-3 m-2">
                                <span className="text-red-500 animate-pulse text-sm">
                                    Kajian hari ini
                                </span>
                            </div>}
                        </div>
                        <div className="flex flex-col bg-slate-200 !pb-3 !px-4">
                            <div className="flex sm:whitespace-nowrap">
                                {lecturing.status && <div className="inline-block bg-pink-500 p-2 text-red-50">{lecturing.status}</div>}
                                {lecturing.week && <div className="inline-block bg-blue-500 p-2 text-red-50">Pekan {lecturing.week}</div>}
                                {!lecturing.isAvailable && <div className="inline-block bg-red-500 p-2 text-red-50">Libur !!</div>}
                            </div>
                            <div className="row mb-2">
                                <div className="w-fit font-semibold">Ustadz :</div>
                                <div className="sm:whitespace-nowrap">{lecturing.lecturer.name}</div>
                            </div>
                            <div className="row mb-2">
                                <div className="w-fit font-semibold">Tema :</div>
                                <div className="sm:whitespace-nowrap">{lecturing.theme}</div>
                            </div>
                            <div className="row mb-2">
                                <div className="w-fit font-semibold">Kitab :</div>
                                <div className="sm:whitespace-nowrap">{lecturing.book}</div>
                            </div>
                            <div className="row mb-2">
                                <div className="w-fit font-semibold">Lokasi :</div>
                                <div className="sm:whitespace-nowrap">{lecturing.location.name}</div>
                                <p className="text-xs text-slate-600">{lecturing.location.address}</p>
                            </div>
                            <div className="row mb-2">
                                <div className="w-fit font-semibold">Waktu :</div>
                                <div className="sm:whitespace-nowrap">{`${lecturing.day.name} - ${lecturing.time} (kajian rutin) `}</div>
                            </div>
                        </div>
                    </div>
                )
        })

    const dateFormatId = (date: Date) => {
        var tahun = date.getFullYear();
        var bulan: string | number = date.getMonth();
        var tanggal = date.getDate();
        var hari: string | number = date.getDay();

        switch (hari) {
            case 0: hari = "Minggu"; break;
            case 1: hari = "Senin"; break;
            case 2: hari = "Selasa"; break;
            case 3: hari = "Rabu"; break;
            case 4: hari = "Kamis"; break;
            case 5: hari = "Jum'at"; break;
            case 6: hari = "Sabtu"; break;
        }
        switch (bulan) {
            case 0: bulan = "Januari"; break;
            case 1: bulan = "Februari"; break;
            case 2: bulan = "Maret"; break;
            case 3: bulan = "April"; break;
            case 4: bulan = "Mei"; break;
            case 5: bulan = "Juni"; break;
            case 6: bulan = "Juli"; break;
            case 7: bulan = "Agustus"; break;
            case 8: bulan = "September"; break;
            case 9: bulan = "Oktober"; break;
            case 10: bulan = "November"; break;
            case 11: bulan = "Desember"; break;
        }
        var dateIdFormat = hari + ", " + tanggal + " " + bulan + " " + tahun
        return dateIdFormat
    }

    return (
        <>
            <main className={`font-sans flex justify-center w-screen min-h-screen bg-opacity-40 bg-slate-900`}>
                <div className="flex flex-col w-full p-2 sm:pt-4 drop-shadow-lg rounded
            bg-gradient-to-tr from-slate-50 via-slate-200 to-slate-50"
                >
                    <div className="flex items-center mb-3 py-2 bg-gradient-to-tr from-slate-300 via-slate-200 to-slate-300">
                        <Image src={logoLombokBertauhid} alt="Logo lombok bertauhid"
                            className="w-20 rounded-full m-3 sm:mx-6 md:mx-20 h-fit" />
                        <div className="text-center flex-1">
                            <h1 className="text-2xl font-semibold">Info Kajian Lombok</h1>
                            <time>{dateFormatId(today)}</time>
                        </div>
                    </div>
                    <div className="filter">
                        <select className="py-2 px-4 bg-slate-300 mx-2" name="day"
                            onChange={(e) => setFilterDay(e.target.value)}>
                            <option value="">==pilih hari==</option>
                            <option value="0">Ahad</option>
                            <option value="1">Senin</option>
                            <option value="2">Selasa</option>
                            <option value="3">Rabu</option>
                            <option value="4">Kamis</option>
                            <option value="5">Jumat</option>
                            <option value="6">Sabtu</option>
                        </select>
                    </div>
                    <div className="flex flex-wrap justify-center w-fit">
                        {lecturings.length > 0 && cards()}
                    </div>
                    <footer className="text-center pt-4 pb-1 text-sm">built with ❤️ by <a href="https://arfani.github.io">rfun</a></footer>
                </div>
            </main>
        </>
    )
}