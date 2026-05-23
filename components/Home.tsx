import {
    BookOpenIcon,
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import logoLombokBertauhid from '/public/images/logo-lombok-bertauhid.jpg';
import Footer from "./Footer";

export default function Home() {
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
                    <div
                        className="group m-3 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[320px]"
                        key={key}
                    >
                        {/* Time & Badge */}
                        <div className="flex items-center justify-between bg-primary px-5 py-3 text-white">
                            <div className="flex items-center gap-2">
                                <ClockIcon className="h-5 w-5 text-secondary" />
                                <span className="font-bold tracking-wider">{lecturing.time}</span>
                            </div>
                            {lecturing.day.id === today.getDay() && (
                                <span className="inline-flex animate-pulse items-center rounded-full bg-red-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-red-200 backdrop-blur-sm border border-red-500/30">
                                    HARI INI
                                </span>
                            )}
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                            {/* Badges Container */}
                            <div className="mb-5 flex flex-wrap gap-2">
                                {lecturing.status && (
                                    <span className="rounded-md bg-pink-50 px-2.5 py-1 text-[10px] font-bold uppercase text-pink-600 ring-1 ring-inset ring-pink-600/20">
                                        {lecturing.status}
                                    </span>
                                )}
                                {lecturing.week && (
                                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-600 ring-1 ring-inset ring-blue-600/20">
                                        Pekan {lecturing.week}
                                    </span>
                                )}
                                {!lecturing.isAvailable && (
                                    <span className="rounded-md bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase text-red-600 ring-1 ring-inset ring-red-600/20">
                                        Libur
                                    </span>
                                )}
                            </div>

                            {/* Info Details */}
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-slate-50 p-2 text-secondary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <UserIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ustadz</p>
                                        <p className="text-lg font-bold text-slate-800 leading-tight">{lecturing.lecturer.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-slate-50 p-2 text-secondary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <BookOpenIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Materi & Kitab</p>
                                        <p className="font-bold text-slate-700 leading-snug">{lecturing.theme}</p>
                                        {lecturing.book && <p className="mt-1 text-sm italic text-slate-500">{lecturing.book}</p>}
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-slate-50 p-2 text-secondary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <MapPinIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Lokasi</p>
                                        <p className="font-bold text-slate-700">{lecturing.location.name}</p>
                                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{lecturing.location.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto border-t border-slate-100 bg-slate-50/50 px-6 py-3">
                            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                                <CalendarIcon className="h-4 w-4" />
                                <span>Kajian Rutin - {lecturing.day.name}</span>
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
            <Head>
                <title>Jadwal Ngaji Lombok</title>
                <meta name="description" content="Informasi Jadwal Kajian Rutin di Lombok" />
            </Head>
            <main className="font-sans flex justify-center w-full min-h-screen bg-slate-900/40">
                <div className="flex w-full flex-col min-h-screen bg-gradient-to-tr from-slate-50 via-slate-200 to-slate-50 p-2 shadow-lg sm:pt-4">
                    <div className="mb-3 flex items-center justify-center gap-4 rounded-lg bg-gradient-to-tr from-primary/10 via-primary/5 to-primary/10 p-4 shadow-md">
                        <Image src={logoLombokBertauhid} alt="Logo lombok bertauhid"
                            className="h-fit w-20 rounded-full" />
                        <div className="flex-1 text-center">
                            <h1 className="text-3xl font-bold text-primary sm:text-4xl">Jadwal Ngaji Lombok</h1>
                            <time className="mt-1 block text-sm text-slate-600">{dateFormatId(today)}</time>
                        </div>
                    </div>
                    <div className="mb-4 flex flex-wrap justify-center gap-2 px-2">
                        {["Semua Hari", "Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((dayName, index) => (
                            <button
                                key={index}
                                onClick={() => setFilterDay(index === 0 ? "" : String(index - 1))} // "Semua Hari" will reset filterDay to empty string
                                className={classNames(
                                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                                    {
                                        "bg-primary text-white shadow-md hover:bg-primary-dark":
                                            (filterDay === "" && index === 0) || // "Semua Hari" selected
                                            (filterDay !== "" && String(Number(filterDay) + 1) === String(index)), // Specific day selected
                                        "bg-slate-200 text-slate-700 hover:bg-slate-300":
                                            !((filterDay === "" && index === 0) || (filterDay !== "" && String(Number(filterDay) + 1) === String(index))),
                                    }
                                )}
                            >
                                {dayName}
                            </button>
                        ))}
                    </div>
                    <div className="flex w-full flex-wrap justify-center">
                        {lecturings.length > 0 && cards()}
                    </div>
                    <Footer />
                </div>
            </main>
        </>
    )
}
