import FieldSearchAndFilter from "../components/Fields/FieldSearchAndFilter";
import FieldTable from "../components/Fields/FieldTable";
import AddFieldButton from "../components/Fields/AddFieldButton";

export default function Fields() {
    const mockFieldsData = [
        {
            id: 1,
            name: "Sojabohnen",
            size: 15,
            status: "Bepflanzt",
            statusColor: "text-green-600",
            image: "https://via.placeholder.com/50",
        },
        {
            id: 2,
            name: "Weizen",
            size: 10,
            status: "Brachliegend",
            statusColor: "text-yellow-600",
            image: "https://via.placeholder.com/50",
        },
        {
            id: 3,
            name: "Frühlingszwiebeln",
            size: 8,
            status: "Erntebereit",
            statusColor: "text-blue-600",
            image: "https://via.placeholder.com/50",
        },
    ];

    const handleShowDetails = (field) => {
        console.log("Details für Feld:", field);
    };

    const handleEditField = (field) => {
        console.log("Feld bearbeiten:", field);
    };

    const handleDeleteField = (field) => {
        console.log("Feld löschen:", field);
    };

    const handleAddField = () => {
        console.log("Feld hinzufügen");
    };

    return (
        <div className="pt-16 flex flex-col items-center min-h-screen bg-gray-100 px-6">
            <div className="w-full max-w-4xl">
                <FieldSearchAndFilter
                    onSearch={(value) => console.log("Suche:", value)}
                    onFilterStatus={() => console.log("Status filtern")}
                    onFilterSize={() => console.log("Größe filtern")}
                />
                <FieldTable
                    fields={mockFieldsData}
                    onDetails={handleShowDetails}
                    onEdit={handleEditField}
                    onDelete={handleDeleteField}
                />
                <AddFieldButton onAddField={handleAddField} />
            </div>
        </div>
    );
}
