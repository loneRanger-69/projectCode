// Home.jsx
import WeatherOverview from "../components/WeatherOverview";
import FieldOverview from "../components/FieldOverview";
import ResourceUsage from "../components/ResourceUsage";
import ToDoList from "../components/ToDoList";
import KPIOverview from "../components/KPIOverview";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Wetterübersicht */}
            <div className="mb-6 w-full max-w-md mx-auto">
                <WeatherOverview />
            </div>

            {/* Grid-Container für die Kästen */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                <FieldOverview />
                <ResourceUsage />
                <ToDoList />
                {/* <KPIOverview /> */}  {/* Hier auskommentiert weil Funktion überflüssig */}
            </div>
        </div>
    );
}



export default Home;
