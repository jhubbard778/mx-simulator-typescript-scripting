import { randomIntegerBetween, randomNumberBetween } from "../src/utils/NumberHelpers";

const mxMock = {
    // Variables
    max_slots: 160,
    first_lap_length: randomIntegerBetween(7, 34),
    normal_lap_length: randomIntegerBetween(26, 50),
    seconds_per_tick: 1 / 128,
    tics_per_second: 128,
    seconds: randomNumberBetween(0, 3600),
    seed: randomIntegerBetween(0, Math.pow(2, 16) - 1),

    // Callback functions
    frame_handler: vi.fn(),
    tic_handler: vi.fn(),
    script_message_handler: vi.fn(),

    // Billboard functions
    find_billboard: vi.fn().mockImplementation(() => randomIntegerBetween(0, 128)),
    add_billboard: vi.fn().mockImplementation(() => randomIntegerBetween(0, 128)),
    size_billboard: vi.fn().mockReturnValue(1),
    color_billboard: vi.fn().mockReturnValue(1),
    move_billboard: vi.fn().mockReturnValue(1),
    move_billboard_absolute: vi.fn().mockReturnValue(1),

    // Statue functions
    add_statue: vi.fn().mockImplementation(() => randomIntegerBetween(0, 256)),
    find_statue: vi.fn().mockImplementation(() => randomIntegerBetween(0, 256)),
    move_statue: vi.fn().mockReturnValue(1),
    move_statue_absolute: vi.fn().mockReturnValue(1),

    // Pose functions
    cache_pose_sequence: vi.fn().mockImplementation(() => randomIntegerBetween(0, 64)),
    pose_statue: vi.fn().mockReturnValue(1),
    pose_statue_from_sequence: vi.fn().mockReturnValue(1),

    // Texture Rendering Functions
    begin_custom_frame: vi.fn().mockReturnValue(1),
    end_custom_frame: vi.fn().mockReturnValue(1),
    paste_custom_frame: vi.fn().mockReturnValue(1),

    // Sound functions
    add_sound: vi.fn().mockImplementation(() => randomIntegerBetween(0, 512)),
    set_sound_freq: vi.fn().mockReturnValue(1),
    set_sound_loop: vi.fn().mockReturnValue(1),
    set_sound_pos: vi.fn().mockReturnValue(1),
    set_sound_vel: vi.fn().mockReturnValue(1),
    set_sound_vol: vi.fn().mockReturnValue(1),
    start_sound: vi.fn().mockReturnValue(1),
    stop_sound: vi.fn().mockReturnValue(1),

    // Misc functions
    gate_from_timing_position: vi.fn(),
    get_bike_model: vi.fn(),
    get_camera_location: vi.fn(),
    get_elevation: vi.fn(),
    get_finish_laps: vi.fn(),
    get_finish_time: vi.fn(),
    
    get_front_contact_depth: vi.fn(),
    get_front_contact_position: vi.fn(),
    get_front_contact_slip: vi.fn(),
    get_front_contact_velocity: vi.fn(),

    get_rear_contact_depth: vi.fn(),
    get_rear_contact_position: vi.fn(),
    get_rear_contact_slip: vi.fn(),
    get_rear_contact_velocity: vi.fn(),

    get_gate_drop_time: vi.fn(),
    get_player_slot: vi.fn(),
    get_rider_down: vi.fn(),
    get_rider_name: vi.fn(),
    get_rider_number: vi.fn(),

    get_running_count: vi.fn(),
    get_running_order_position: vi.fn(),
    get_running_order_time: vi.fn(),

    get_tile_number: vi.fn(),
    get_timing: vi.fn(),
    get_timing_position: vi.fn(),

    message: vi.fn(),
    read_texture: vi.fn(),
    broadcast_script_message: vi.fn(),

    index_to_lap: vi.fn(),
    lap_to_index: vi.fn(),
    get_position: vi.fn(),
    get_velocity: vi.fn(),

    get_running_order: vi.fn().mockReturnValue([{
        slot: 0,
        position: 0,
        time: 0
    }]),
};

(global as any).mx = mxMock;

const mxserverMock = {
    max_slots: 160,

    get_uid: vi.fn(),
    get_rank: vi.fn(),
    get_status: vi.fn(),
    get_slot_info: vi.fn(),

    file_to_string: vi.fn(),
    string_to_file: vi.fn(),
    append_string_to_file: vi.fn(),

    system: vi.fn(),
    schedule_command: vi.fn(),
    
    broadcast: vi.fn(),
    send: vi.fn(),
    send_script_message: vi.fn(),
    write_demo_message: vi.fn(),
    write_demo_script_message: vi.fn(),

    log: vi.fn(),

    get_number: vi.fn(),
    get_string: vi.fn(),

    // Callback functions
    connect_handler: vi.fn(),
    disconnect_handler: vi.fn(),
    timing_handler: vi.fn(),

    info_handler: vi.fn(),
    command_handler: vi.fn(),
    chat_handler: vi.fn(),
    
    start_handler: vi.fn(),
    finish_handler: vi.fn(),
    
    tic_handler: vi.fn(),
    second_handler: vi.fn(),
    ready_handler: vi.fn(),
    script_message_handler: vi.fn()
};

(global as any).mxserver = mxserverMock;
