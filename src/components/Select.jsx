const Select =({ label, value, onChange, options}) => {

    return(
        <div className="flex flex-col text-sm">
        <label className="text-gray-600 mb-1 font-medium">{label}</label>
        <select className="border rounded-lg px-3 py-2 outline-none focus:ring focus:border-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}>
            <option value="">All</option>
            {options.map((o, index) => (
                <option key={index} value={o}>
                    {o}
                </option>
            ))}
        </select>
        </div>
    );
};

export default Select;