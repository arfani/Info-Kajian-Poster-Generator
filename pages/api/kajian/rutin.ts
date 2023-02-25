import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    interface Lecturing {
        "day": number,
        "time": string,
        "lecturer": number,
        "book": string,
        "theme": string,
        "location": number,
        "isAvailable": boolean,
        "pekan": number,
        "status": string
    }

    interface Day {
        id: number,
        name: string
    }

    interface Lecturer {
        id: number,
        name: string,
        kunyah: string,
        wa: string,
        address: string
    }

    interface Lecturer {
        id: number,
        name: string,
        address: string,
        detail_address: string
    }

    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file studies.json
    const fileContents = await fs.readFile(jsonDirectory + '/lecturing/routine.json', 'utf8');
    const fileContentsDays = await fs.readFile(jsonDirectory + '/days.json', 'utf8');
    const fileContentsLecturers = await fs.readFile(jsonDirectory + '/lecturing/lecturers.json', 'utf8');
    const fileContentsLocations = await fs.readFile(jsonDirectory + '/lecturing/locations.json', 'utf8');

    const days = JSON.parse(fileContentsDays);
    const lecturers = JSON.parse(fileContentsLecturers);
    const locations = JSON.parse(fileContentsLocations);

    const lecturing = JSON.parse(fileContents).map((item: Lecturing) => {
        const day = days.find((day: Day) => day.id === item.day)
        item.day = day || item.day

        const lecturer = lecturers.find((lecturer: Lecturer) => lecturer.id === item.lecturer)
        item.lecturer = lecturer || item.lecturer

        const location = locations.find((location: Lecturer) => location.id === item.location)
        item.location = location || item.location

        return item
    });


    //Return the content of the data file in json format
    res.status(200).json(lecturing);
}