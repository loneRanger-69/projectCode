function FieldOverview() {
    const fields = [
        { name: "Feld 1", size: "15 ha", status: "Bepflanzt" },
        { name: "Feld 2", size: "10 ha", status: "Brachliegend" },
    ];

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2">Feldübersicht</h2>
            <table className="w-full text-sm">
                <thead>
                <tr>
                    <th className="text-left">Feldname</th>
                    <th className="text-left">Größe</th>
                    <th className="text-left">Status</th>
                </tr>
                </thead>
                <tbody>
                {fields.map((field, index) => (
                    <tr key={index}>
                        <td>{field.name}</td>
                        <td>{field.size}</td>
                        <td>{field.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default FieldOverview;
