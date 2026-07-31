import { allBikeModels, bikeModelGameToSkin } from "@/utils/BikeHelpers";
import { faker } from "@faker-js/faker/locale/en";
import { readFileSync } from "node:fs";

export const MAX_SLOTS = 160;

type TrackData = { trackinfo: string, time: number, laps: number }

const mockTrackListData: TrackData[] = [
    { trackinfo: 'trackinfo/rabbithill.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/alcrest.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/locust.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/x1b.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/overhill.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/smithtown.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/glenside.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/buddscreek.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/ridge.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/redbud.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/mooch.trackinfo', time: 0, laps: 5 },
    { trackinfo: 'trackinfo/waterloo.trackinfo', time: 0, laps: 5 }
];

export const mockTrackData: (TrackData & { trackinfo_content: string })[] = mockTrackListData.map((data) => {
    return {
        ...data,
        trackinfo_content: readFileSync(`./tests/assets/${data.trackinfo}`, 'utf-8')
    }
});

export const emptySlotInfo: SlotInfo = {
    bike: "", bikeskin: "", helmetskin: "",
    name: "", number: "", ping: 0,
    rank: "Nobody", riderskin: "",
    status: "Empty", uid: 0, wheelskin: ""
}

export const mockPlayers: SlotInfo[] = Array(MAX_SLOTS).fill(0).map((_, index): SlotInfo => {
    if (faker.datatype.boolean({ probability: 0.6 })) return emptySlotInfo;
    
    const bike = faker.helpers.arrayElement(allBikeModels);
    return {
        bike: bike,
        bikeskin: bikeModelGameToSkin(bike),
        helmetskin: "",
        name: faker.person.fullName(),
        number: faker.number.int({ min: 1, max: 999 }).toString(),
        ping: faker.number.int({min: 40, max: 120}),
        rank: faker.helpers.weightedArrayElement([
            { value: "Admin", weight: 2 },
            { value: "Marshal", weight: 5 },
            { value: "Nobody", weight: 93 }
        ]),
        riderskin: "",
        status: faker.helpers.weightedArrayElement([
            { value: "Reserved", weight: 1 },
            { value: "Spectator", weight: 15 },
            { value: "Player", weight: 80 },
            { value: "Zombie", weight: 4 }
        ]),
        uid: faker.number.int({min: 1, max: 60000}),
        wheelskin: ""
    };
});