import { useState } from "react"
import InputGroup from "../components/form/input-group";

const CreatePoster = () => {
    const [speaker, setSpeaker] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('general');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [PIC, setPIC] = useState('');
    // const [socialMedias, setSocialMedias] = useState([]);

    return (
        <>
            <form className="md:flex md:flex-wrap">
                <h2 className="w-full m-2">Isi Data Kajian</h2>
                <InputGroup id="title" label="Judul / Tema" value={title} type="text" />
                <InputGroup id="speaker" label="Speaker / Pemateri" value={speaker} type="text" />
                <InputGroup id="type" label="Jenis Kajian" value={type} type="text" />
                <InputGroup id="date" label="Tanggal" value={date} type="date" />
                <InputGroup id="time" label="Jam" value={time} type="text" />
                <InputGroup id="location" label="Lokasi" value={location} type="text" />
                <InputGroup id="pic" label="PIC" value={PIC} type="text" />
                <div className="md:w-full">
                    <input className="m-4 bg-secondary text-white p-2 rounded" type="submit" value="Tampilkan Poster" />
                </div>
            </form>
            <Modal />
        </>
    )
}

export default CreatePoster

const Modal = () => {
    return (
        <div className="flex justify-center items-center w-full h-full fixed top-0 bottom-0 right-0 left-0 bg-secondary bg-opacity-70">
            <div className="w-[calc(100vw-4rem)] h-[calc(100vh-4rem)] bg-secondary">
                Hii
            </div>
        </div>
    )
}