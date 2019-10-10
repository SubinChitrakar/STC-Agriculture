import * as fertilizerComponentFunctionality from "../model/fertilizerComponents.js";

export function addFertilizerComponent(newFertilizerComponent) {
    return fertilizerComponentFunctionality.addFertilizerComponent(newFertilizerComponent);
}

export function readAll() {
    return fertilizerComponentFunctionality.readAllFertilizerComponent();
}

export function readComponent(fertilizerId) {
    return fertilizerComponentFunctionality.readFertilizerComponentFromFertilizerId(fertilizerId);
}

export function updateFertilizerComponent(updatedFertilizerComponent) {
    return fertilizerComponentFunctionality.updateFertilizerComponent(updatedFertilizerComponent);
}

export function deleteFertilizerComponent(fertilizerComponentId) {
    return fertilizerComponentFunctionality.deleteFertilizerComponent(fertilizerComponentId);
}

