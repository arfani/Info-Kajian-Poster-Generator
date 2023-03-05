import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useState } from "react";
import InputGroup from "../components/form/input-group";
export default function CreatePoster() {
    const [speaker, setSpeaker] = useState('');
    const [theme, setTheme] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [PIC, setPIC] = useState('');
    const [isShowPoster, setIsShowPoster] = useState(false);

    const Inputs = [
        { id: "speaker", type: "text", label: "Speaker / Pemateri", value: speaker, onChange: (e: any) => setSpeaker(e.target.value) },
        { id: "theme", type: "text", label: "Judul / Tema", value: theme, onChange: (e: any) => setTheme(e.target.value) },
        { id: "date", type: "text", label: "Tanggal", value: date, onChange: (e: any) => setDate((e.target.value).getDate()) },
        { id: "time", type: "text", label: "Waktu", value: time, onChange: (e: any) => setTime(e.target.value) },
        { id: "location", type: "text", label: "Lokasi", value: location, onChange: (e: any) => setLocation(e.target.value) },
        { id: "pic", type: "text", label: "PIC", value: PIC, onChange: (e: any) => setPIC(e.target.value) }
    ]
    return (
        <div className="p-2 bg-secondary">
            <form className="md:flex md:flex-wrap">
                <h1 className="w-full m-4 text-2xl text-center font-bold font-serif">Isi Data Kajian</h1>
                {Inputs.map((item, i) =>
                    <InputGroup key={i}
                        id={item.id}
                        type={item.type}
                        label={item.label}
                        value={item.value}
                        onChange={(e: any) => item.onChange(e)}
                    />
                )}
                <button className="m-2 px-5 bg-primary text-white p-2 rounded text-center"
                    onClick={(e) => { e.preventDefault(); setIsShowPoster(true); }}>Generate Poster</button>
            </form>
            <Modal isShown={isShowPoster}
                speaker={speaker}
                theme={theme}
                date={date}
                time={time}
                location={location}
                pic={PIC}
                setIsShowPoster={setIsShowPoster}
            />
        </div >
    )
}

interface Lecturing {
    isShown: boolean,
    speaker: string,
    theme: string,
    date: string,
    time: string,
    location: string,
    pic: string,
    setIsShowPoster: (close: boolean) => void,
}

const Modal = ({ isShown, speaker, theme, date, time, location, pic, setIsShowPoster }: Lecturing) => {
    const items = [
        { label: 'Bersama :', value: speaker },
        { label: 'Tema :', value: theme },
        { label: 'Tanggal :', value: date },
        { label: 'Waktu :', value: time },
        { label: 'Lokasi :', value: location },
        { label: 'PIC :', value: pic },
    ]

    return (
        <div className={classNames("flex-col justify-center items-center w-full h-full fixed top-0 bottom-0 right-0 left-0 bg-primary",
            {
                "flex": isShown, "hidden": !isShown
            })}>
            <button className="text-stone-200 font-bold" onClick={() => setIsShowPoster(false)}>X</button>
            <div className="w-[28rem] h-[32rem] sm:w-[35rem] sm:h-[35rem] m-2">
                <div className="w-full h-full 
                bg-[url('/images/bg-poster.webp')] bg-cover bg-no-repeat bg-center">
                    <h1 className="bg-secondary text-stone-800 font-bold mb-2 sm:mb-0 mt-5 sm:mt-8 inline-block py-2 pl-12 sm:pl-16 pr-3 text-xl font-serif">
                        Info Kajian Lombok
                    </h1>
                    {
                        items.map((item, i) => <Item label={item.label} value={item.value} key={i} />)
                    }
                    <div className="text-xs mt-16 ml-[6.5rem] sm:mt-20 sm:ml-32 text-secondary font-bold">kajianpostergenerator.vercel.app</div>
                </div>
            </div>
        </div >
    )
}

const Item = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex flex-col ml-28 sm:ml-36 mr-16 sm:mr-20 text-gray-200 mt-2 sm:mt-4 font-bold">
            <div className="text-sm flex">
                <ArrowsPointingInIcon width={10} /> <span className="pl-1">{label}</span>
            </div>
            <div>
                {value}
            </div>
        </div>
    )
}