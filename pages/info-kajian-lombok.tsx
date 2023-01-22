import { Playfair_Display } from "@next/font/google";

const playfairD = Playfair_Display({ subsets: ['latin'] })

export default function InfoKajianLombok() {
    const studies = [
        {
            day: "Ahad",
            time: "ba'da maghrib",
            lecturer: "Muhammad Iqbal, Lc.",
            book: "Tauhid",
            theme: "Tauhid",
            location_id: "1",
            isAvailable: true,
        },
        {
            day: "Ahad",
            time: "ba'da maghrib",
            lecturer: "Muhammad Iqbal, Lc.",
            book: "Tauhid",
            theme: "Tauhid",
            location_id: "1",
            isAvailable: false,
        }
    ]

    const studyLocations = [
        {
            id: "1",
            name: "Masjid Aisyah Lawata",
            address: "Jln. Soromandi no.01 Lawata - Mataram - Lombok - NTB."
        }
    ]

    const cards = studies.map((kajian, key) => {
        return (
            <div className="m-2 rounded-lg drop-shadow-lg 
            hover:drop-shadow-2xl hover:-translate-y-1
            transition-all duration-200 [&>div]:p-2 w-full" key={key}
            >
                <div className="flex justify-center bg-slate-600 text-slate-50 rounded-t-sm uppercase font-bold">
                    <h2>{kajian.day} {!kajian.isAvailable && <span className="text-red-500">- Libur !!</span>}</h2>
                </div>
                <div className="flex flex-col bg-slate-300 !pb-3">
                    <div className="row flex">
                        <div className="w-16">Ustadz</div>
                        <div className="whitespace-nowrap">: {kajian.lecturer}</div>
                    </div>
                    <div className="row flex">
                        <div className="w-16">Tema</div>
                        <div className="whitespace-nowrap">: {kajian.theme}</div>
                    </div>
                    <div className="row flex">
                        <div className="w-16">Kitab</div>
                        <div className="whitespace-nowrap">: {kajian.book}</div>
                    </div>
                    <div className="row flex">
                        <div className="w-16">Waktu</div>
                        <div className="whitespace-nowrap">: {kajian.time}</div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <main className={`flex justify-center w-screen h-screen
        bg-gradient-to-b from-slate-50 via-slate-300 to-slate-50 ${playfairD.className}`}
        >
            <div className="box flex flex-col p-2 m-8 drop-shadow-2xl rounded
            bg-slate-50 sm:bg-slate-500"
            >
                <div className="text-center mb-3">
                    <h1 className="text-xl font-semibold">Info Kajian Lombok</h1>
                    <p>Lokasi : {studyLocations[0].name}</p>
                    <p className="font-thin">{studyLocations[0].address}</p>
                </div>
                <div className="flex flex-wrap flex-1">
                    {cards}
                </div>
                <footer className="text-center">❤️ by <a href="http://fb.com/muhammadarfanihidayat">rfun</a></footer>
            </div>
        </main>
    )
}