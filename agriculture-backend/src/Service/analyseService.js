//Dieser Code wurde bearbeitet von Philipp Pister

import { getFieldById } from "./fieldService.js";
import { cropOptimalValues } from "../data/cropOptimalValues.js";
import { fetchWeatherDataFromDB } from "../routes/weather.js"; // Importiere Wetterdaten aus der Route

/**
 * Wasserverbrauchsanalyse
 * Berechnet den empfohlenen Wasserverbrauch basierend auf Felddaten und Wetterbedingungen.
 * @param {number|string} fieldId - Die ID des Feldes.
 * @returns {Promise<Object>} - Das Analyseergebnis.
 */
export async function waterConsumptionAnalysis(fieldId) {
    try {
        console.log(`Starte Wasserverbrauchsanalyse für Feld ID: ${fieldId}`);
        const field = await getFieldById(fieldId);
        if (!field) {
            throw new Error(`Feld mit ID ${fieldId} nicht gefunden.`);
        }
        console.log(`Felddaten:`, field);

        // Heutiges Wetter aus der DB abrufen
        const todayISO = new Date().toISOString().split("T")[0];
        const weatherData = await fetchWeatherDataFromDB(); // Wetterdaten aus der DB abrufen
        const todayWeather = weatherData.find((entry) => entry.date === todayISO);

        if (!todayWeather) {
            throw new Error(`Keine Wetterdaten für das heutige Datum (${todayISO}) gefunden.`);
        }

        const rainProbability = todayWeather.rain_probability;
        const temperature = todayWeather.temperature || 25; // Fallback auf 25°C

        console.log(`Wetterdaten für heute: Regenwahrscheinlichkeit: ${rainProbability}%, Temperatur: ${temperature}°C`);

        // Berechnung des Wasserbedarfs
        const cropBaseWaterNeed = {
            Sojabohnen: 30, // Basismenge in mm pro Tag
            Weizen: 25,
            Mais: 35,
            Kartoffeln: 20,
        };

        const crop = field.crop || "Allgemein";
        const baseNeed = cropBaseWaterNeed[crop] || 25; // Default-Wert zu 25 mm
        const rainAdjustment = (rainProbability / 100) * -baseNeed * 0.8; // Bis zu -80% bei 100% Regen
        const temperatureAdjustment = temperature > 25 ? (temperature - 25) * 2 : 0; // +2 mm pro °C über 25°C
        const soilMoistureAdjustment = field.moisture < 30 ? 10 : 0; // +10 mm bei niedriger Feuchtigkeit

        const waterNeedPerHectare = Math.max(0, baseNeed + rainAdjustment + temperatureAdjustment + soilMoistureAdjustment);
        const totalWaterNeed = field.size * waterNeedPerHectare; // Gesamtwasserbedarf

        console.log(`Wasserbedarf pro Hektar: ${waterNeedPerHectare} mm, Gesamtwasserbedarf: ${totalWaterNeed} Liter`);

        return {
            fieldId: field.id,
            fieldName: field.name,
            rainProbability,
            temperature,
            waterNeedPerHectare,
            totalWaterNeed, // Gesamtmenge in Litern
            message: `Empfohlene Bewässerung: Feld '${field.name}' benötigt ca. ${totalWaterNeed.toFixed(1)} Liter Wasser pro Tag basierend auf den aktuellen Wetterbedingungen.`,
        };
    } catch (error) {
        console.error("Fehler in waterConsumptionAnalysis:", error);
        throw error;
    }
}

/**
 * Nährstoffoptimierungsanalyse
 * Berechnet die notwendigen Anpassungen der pH-Werte und Nährstoffe basierend auf den optimalen Werten für die angebauten Pflanzen.
 * @param {number|string} fieldId - Die ID des Feldes.
 * @returns {Promise<Object>} - Das Analyseergebnis.
 */
export async function optimizeNutrients(fieldId) {
    try {
        console.log(`Starte Nährstoffoptimierungsanalyse für Feld ID: ${fieldId}`);
        const field = await getFieldById(fieldId);
        if (!field) {
            throw new Error(`Feld mit ID ${fieldId} nicht gefunden.`);
        }
        console.log(`Felddaten:`, field);

        const crop = field.crop;
        if (!crop || !cropOptimalValues[crop]) {
            throw new Error(`Keine optimalen Werte für '${crop}' definiert.`);
        }

        const { optimalPh, optimalNutrients } = cropOptimalValues[crop];
        const nutrientAdjustment = optimalNutrients - field.nutrients;
        const phAdjustment = optimalPh - field.ph_value;

        console.log(`Optimaler pH-Wert: ${optimalPh}, Aktueller pH-Wert: ${field.ph_value}`);
        console.log(`Optimale Nährstoffe: ${optimalNutrients}, Aktuelle Nährstoffe: ${field.nutrients}`);

        return {
            crop,
            optimalPh,
            optimalNutrients,
            currentPh: field.ph_value,
            currentNutrients: field.nutrients,
            nutrientAdjustment: nutrientAdjustment.toFixed(1),
            phAdjustment: phAdjustment.toFixed(1),
            message: `Für ${crop} sollte der pH-Wert um ${phAdjustment.toFixed(
                1
            )} angepasst werden. Die Nährstoffe sollten um ${nutrientAdjustment.toFixed(1)} kg/ha geändert werden.`,
        };
    } catch (error) {
        console.error("Fehler in optimizeNutrients:", error);
        throw error;
    }
}

/**
 * Kombination beider Analysen: Wasserverbrauch und Nährstoffoptimierung
 * @param {number|string} fieldId - Die ID des Feldes.
 * @returns {Promise<Object>} - Kombiniertes Analyseergebnis.
 */
export async function combinedAnalysis(fieldId) {
    try {
        const waterAnalysis = await waterConsumptionAnalysis(fieldId);
        const nutrientAnalysis = await optimizeNutrients(fieldId);

        return {
            waterAnalysis,
            nutrientAnalysis,
            message: `Analyse abgeschlossen für Feld '${waterAnalysis.fieldName}'`,
        };
    } catch (error) {
        console.error("Fehler in combinedAnalysis:", error);
        throw error;
    }
}
