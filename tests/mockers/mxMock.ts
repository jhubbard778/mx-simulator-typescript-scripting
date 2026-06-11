import { faker } from "@faker-js/faker/locale/en";
import { allBikeModels } from "../../src/utils/BikeHelpers";

const firstLapLength = faker.number.int({min: 7, max: 34});
const normalLapLength = faker.number.int({min: 26, max: 50})

export const mxMock = {
    // Variables
    max_slots: 160,
    first_lap_length: firstLapLength,
    normal_lap_length: normalLapLength,
    seconds_per_tick: 1 / 128,
    tics_per_second: 128,
    seconds: faker.number.float({min: 0, max: 3600}),
    seed: faker.number.int({min: 0, max: Math.pow(2, 16) - 1}),

    // Callback functions
    frame_handler: vi.fn(),
    tic_handler: vi.fn(),
    script_message_handler: vi.fn(),

    // Billboard functions
    find_billboard: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 128})),
    add_billboard: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 128})),
    size_billboard: vi.fn().mockReturnValue(1),
    color_billboard: vi.fn().mockReturnValue(1),
    move_billboard: vi.fn().mockReturnValue(1),
    move_billboard_absolute: vi.fn().mockReturnValue(1),

    // Statue functions
    add_statue: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 256})),
    find_statue: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 256})),
    move_statue: vi.fn().mockReturnValue(1),
    move_statue_absolute: vi.fn().mockReturnValue(1),

    // Pose functions
    cache_pose_sequence: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 64})),
    pose_statue: vi.fn().mockReturnValue(1),
    pose_statue_from_sequence: vi.fn().mockReturnValue(1),

    // Texture Rendering Functions
    begin_custom_frame: vi.fn().mockReturnValue(1),
    end_custom_frame: vi.fn().mockReturnValue(1),
    paste_custom_frame: vi.fn().mockReturnValue(1),

    // Sound functions
    add_sound: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 512})),
    set_sound_freq: vi.fn().mockReturnValue(1),
    set_sound_loop: vi.fn().mockReturnValue(1),
    set_sound_pos: vi.fn().mockReturnValue(1),
    set_sound_vel: vi.fn().mockReturnValue(1),
    set_sound_vol: vi.fn().mockReturnValue(1),
    start_sound: vi.fn().mockReturnValue(1),
    stop_sound: vi.fn().mockReturnValue(1),

    // Misc functions
    gate_from_timing_position: vi.fn().mockImplementation((index: number): number => {
        return index % (normalLapLength + firstLapLength);
    }),
    get_bike_model: vi.fn().mockImplementation(() => faker.helpers.arrayElement(allBikeModels)),
    get_camera_location: vi.fn().mockImplementation((p: number[], r: number[]) => {
        const position: Vec3 = [
            faker.number.int({ min: 0, max: 2048 }),
            faker.number.int({ min: 0, max: 128 }),
            faker.number.int({ min: 0, max: 2048 })
        ];

        const rotation: Mat3x3 = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];

        // Populate p and r with values
        p.splice(0, p.length, ...position);
        r.splice(0, r.length, ...rotation);
    }),
    get_elevation: vi.fn().mockImplementation(() => faker.number.int({ min: -20, max: 150 })),
    get_finish_laps: vi.fn().mockReturnValue(faker.number.int({min: 2, max: 4})),
    get_finish_time: vi.fn().mockReturnValue(faker.number.int({min: 2, max: 4})),
    
    get_front_contact_depth: vi.fn().mockImplementation(() => faker.number.int({min: -64, max: 128})),
    get_front_contact_position: vi.fn().mockImplementation((slot: number, p: number[]): Bit => {
        const position = [
            faker.number.int({ min: 0, max: 2048 }),
            faker.number.int({ min: 0, max: 256 }),
            faker.number.int({ min: 0, max: 2048 })
        ];

        p.splice(0, p.length, ...position);
        return 1;
    }),
    get_front_contact_slip: vi.fn().mockImplementation((slot: number, v: number[]): Bit => {
        const velocity = [
            faker.number.int({ min: 0, max: 75 }),
            faker.number.int({ min: 0, max: 25 }),
            faker.number.int({ min: 0, max: 75 })
        ];

        v.splice(0, v.length, ...velocity);
        return 1;
    }),
    get_front_contact_velocity: vi.fn().mockImplementation((slot: number, v: number[]): Bit => {
        const velocity = [
            faker.number.int({ min: 0, max: 75 }),
            faker.number.int({ min: 0, max: 25 }),
            faker.number.int({ min: 0, max: 75 })
        ];

        v.splice(0, v.length, ...velocity);
        return 1;
    }),

    get_rear_contact_depth: vi.fn().mockImplementation(() => faker.number.int({min: -64, max: 128})),
    get_rear_contact_position: vi.fn().mockImplementation((slot: number, p: number[]): Bit => {
        const position = [
            faker.number.int({ min: 0, max: 2048 }),
            faker.number.int({ min: 0, max: 256 }),
            faker.number.int({ min: 0, max: 2048 })
        ];

        p.splice(0, p.length, ...position);
        return 1;
    }),
    get_rear_contact_slip: vi.fn().mockImplementation((slot: number, v: number[]): Bit => {
        const velocity = [
            faker.number.int({ min: 0, max: 75 }),
            faker.number.int({ min: 0, max: 25 }),
            faker.number.int({ min: 0, max: 75 })
        ];

        v.splice(0, v.length, ...velocity);
        return 1;
    }),
    get_rear_contact_velocity: vi.fn().mockImplementation((slot: number, v: number[]): Bit => {
        const velocity = [
            faker.number.int({ min: 0, max: 75 }),
            faker.number.int({ min: 0, max: 25 }),
            faker.number.int({ min: 0, max: 75 })
        ];

        v.splice(0, v.length, ...velocity);
        return 1;
    }),

    get_gate_drop_time: vi.fn().mockReturnValue(faker.number.float({min: 8, max: 14})),
    get_player_slot: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 39})),
    get_rider_down: vi.fn().mockImplementation(() => {
        return faker.datatype.boolean({probability: 0.1}) ? 1 : 0;
    }),
    get_rider_name: vi.fn().mockImplementation(() => faker.person.fullName),
    get_rider_number: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 999})),

    get_running_count: vi.fn().mockImplementation(() => faker.number.int({min: 1, max: 40})),
    get_running_order_slot: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 39})),
    get_running_order_position: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 512})),
    get_running_order_time: vi.fn().mockImplementation(() => faker.number.float({min: 0, max: 1800})),

    get_tile_number: vi.fn().mockImplementation(() => faker.number.int({min: 1, max: 10})),
    get_timing: vi.fn().mockImplementation((slot: number, timing_index: number) => {
        return faker.number.float({min: timing_index * 1, max: timing_index * 5 });
    }),
    get_timing_position: vi.fn().mockImplementation(() => faker.number.int({min: 0, max: 512})),

    message: vi.fn(),
    read_texture: vi.fn().mockImplementation(() => faker.number.int({min: 1, max: 256})),
    broadcast_script_message: vi.fn(),

    index_to_lap: vi.fn().mockImplementation((index: number) => {
        if (index < firstLapLength) return 0;

        return Math.floor((index - firstLapLength) / normalLapLength) + 1;
    }),
    lap_to_index: vi.fn().mockImplementation((lap: number) => {
        if (lap === 0) return 0;
        if (lap === 1) return firstLapLength;
        return lap * normalLapLength + firstLapLength;
    }),
    get_position: vi.fn().mockImplementation((): Vec3 => {
        return [
            faker.number.int({ min: 0, max: 2048 }),
            faker.number.int({ min: 0, max: 128 }),
            faker.number.int({ min: 0, max: 2048 })
        ];
    }),
    get_velocity: vi.fn().mockImplementation((): Vec3 => {
        return [
            faker.number.int({ min: 0, max: 75 }),
            faker.number.int({ min: 0, max: 25 }),
            faker.number.int({ min: 0, max: 75 })
        ];
    }),

    get_running_order: vi.fn().mockReturnValue([{
        slot: 0,
        position: 0,
        time: 0
    }]),
};