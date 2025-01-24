// src/Service/analyseService.js

import { getFieldById } from "./fieldService.js";
import { cropOptimalValues } from "../data/cropOptimalValues.js";

/**
 * Wasserverbrauchsanalyse
 * Berechnet den empfohlenen Wasserverbrauch basierend auf Felddaten.
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

        // Berechnung: Empfohlene Bewässerungsmenge (Liter pro Tag)
        let factor;
        if (field.moisture < 50) {
            factor = 800; // Liter pro Hektar pro Tag
        } else if (field.moisture >= 50 && field.moisture <= 70) {
            factor = 500;
        } else {
            factor = 200;
        }
        const recommendedIrrigation = field.size * factor;

        console.log(`Empfohlene Bewässerung: ${recommendedIrrigation} Liter`);

        return {
            fieldId: field.id,
            fieldName: field.name,
            recommendedIrrigation, // Gesamtmenge in Litern
            info: `Empfehlung: Bewässere Feld '${field.name}' mit ca. ${recommendedIrrigation} Litern pro Tag.`
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
            )} angepasst werden. Die Nährstoffe sollten um ${nutrientAdjustment.toFixed(1)} kg/ha geändert werden.`
        };
    } catch (error) {
        console.error("Fehler in optimizeNutrients:", error);
        throw error;
    }
}