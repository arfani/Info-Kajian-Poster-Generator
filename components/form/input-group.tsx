interface InnputGroup {
    id: string,
    value: string,
    label: string,
    type: string,
}

export default function InputGroup(props: InnputGroup) {
    const { id, value, label, type } = props;
    return (
        <div className="flex flex-col p-2 
        md:flex-1">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} value={value}
                className="bg-gray-50 rounded p-1 my-1"
            />
        </div>
    )
}