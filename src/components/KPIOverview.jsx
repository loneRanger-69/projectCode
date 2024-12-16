function KPIOverview() {
    const kpis = {
        totalFields: 10,
        plantedFields: 8,
        harvestedFields: 4,
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2">Betriebsauslastung (KPIs)</h2>
            <p>Gesamtfelder: <span className="font-medium">{kpis.totalFields}</span></p>
            <p>Bepflanzte Felder: <span className="font-medium">{kpis.plantedFields}</span></p>
            <p>Geerntete Felder: <span className="font-medium">{kpis.harvestedFields}</span></p>
        </div>
    );
}

export default KPIOverview;
