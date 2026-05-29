let currentTimingIndices: Record<number, number> = {};

export const setCurrentTimingGates = (): void => {
    const runningOrder = mx.get_running_order();
    for (const { slot, position: timingGateIndex } of runningOrder) {
        const previous = currentTimingIndices[slot] ?? -1;

        if (timingGateIndex === previous) continue;

        // If we rewinded in a demo
        const isRewinded = timingGateIndex < previous;
        currentTimingIndices[slot] = timingGateIndex;
        
        // Dont broadcast message if time was rewinded in demo
        if (isRewinded) continue;
        mx.message(`Slot ${slot} is at timing gate index ${timingGateIndex}!`);
    }
}