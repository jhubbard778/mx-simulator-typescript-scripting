// Exposes the games global variables
declare const mx: {
    /**
    * ###################################################
    * Variables
    * ###################################################
    */

    /** The maximum number of slots. */
    max_slots: number;

    /** The number of gates in the first lap. */
    first_lap_length: number;
    
    /**  The number of gates in any lap after lap 1. */
    normal_lap_length: number;

    /** The number of seconds in a game tic. Currently 0.0078125 (1/128). */
    seconds_per_tic: number;

    /** The number of physics steps in a second. Currently 128. */
    tics_per_second: number;

    /** The time since the session started in seconds. */
    seconds: number;

    /** A random seed per session for repeatable random numbers */
    seed: number;

    /**
    * ###################################################
    * Callback Functions
    * ###################################################
    */

    /** This is called once per frame. "seconds" is the time since the session started in seconds. */
    frame_handler: (seconds: number) => void;

    /**  This is called once per physics step. "seconds" is the time since the session started in seconds. */
    tic_handler: (seconds: number) => void;

    /** This is called when a script message is received. "msg" is the message sent by
     *  mx.broadcast_script_message() with the player number prepended to it.
     *  The player number is the number of players with slot numbers that are less than the sender's slot number.
    */
    script_message_handler: (msg: string) => void;


    /**
    * ###################################################
    * Billboard Functions
    * ###################################################
    */

    /** Finds the index of the first billboard that matches the texture.
     * @param texture the texture filename
     * @param start billboard index to start search at
     * @return billboard index if successful, otherwise -1
    */
    find_billboard(texture: string, start: string|number): number;

    /**
     * Adds a billboard
     * @param x The X coordinate
     * @param y The Y coordinate (ground relative)
     * @param z The Z coordinate
     * @param size how tall the billboard will be
     * @param aspect the aspect ratio
     * @param texture the texture filename
     * @return billboard index of -1 if billboard could not be added
     */
    add_billboard(
        x: number, y: number, z: number,
        size: number, aspect: number, texture: string
    ): number;

    /**
     * Sets billboard size
     * @param index the billboard index
     * @param size the new size of the billboard
     * @return 1 if successful, otherwise 0
     */
    size_billboard(index: number, size: number): Bit;

    /**
     * Sets billboard color
     * @param index the billboard index
     * @param r the red color component
     * @param g the green color component
     * @param b the blue color component
     * @param a the alpha color component
     * @return 1 if successful, otherwise 0
     */
    color_billboard(index: number, r: number, g: number, b: number, a: number): Bit;

    /**
     * Moves the billboard
     * @param index the billboard index
     * @param x The X coordinate
     * @param y The Y coordinate (ground relative)
     * @param z The Z coordinate
     * @return 1 if successful, otherwise 0
     */
    move_billboard(index: number, x: number, y: number, z: number): Bit;

    /**
     * Moves the billboard to the absolute position. Only difference between this and mx.move_billboard()
     * is that the y coordinate is no longer relative to the ground. It moves to the y coordinate specified exactly
     * @param index the billboard index
     * @param x The X coordinate
     * @param y The Y coordinate
     * @param z The Y coordinate
     * @return 1 if successful, otherwise 0
     */
    move_billboard_absolute(index: number, x: number, y: number, z: number): Bit;


    /**
    * ###################################################
    * Statue Functions
    * ###################################################
    */

    /**
     * Adds a statue. This function only works during the initial load and will fail if called from a hook afterwards.
     * @param x The X Coordinate
     * @param y The Y Coordinate (ground relative)
     * @param z The Z coordinate
     * @param angle The yaw angle
     * @param model The model filename
     * @param texture The texture filename
     * @param shape The collision/shape filename (currently ignored)
     * @return The statue index or -1 if the statue couldn't be added
     */
    add_statue(
        x: number, y: number, z: number, angle: number,
        model: string, texture: string, shape: string
    ): number;

    /**
     * Finds the index of the first statue that matches the model and texture.
     * If you use an empty string for either "model" or "texture" it will match all models/textures.
     * @param model The model filename
     * @param texture The texture filename
     * @param start The statue index to start the search at
     * @return The statue index if successful, otherwise -1
     */
    find_statue(model: string, texture: string, start: number): number;

    /**
     * Moves the statues. Statues with shp files are currently not movable.
     * @param index The statue index
     * @param x The X coordinate
     * @param y The Y coordinate (ground relative)
     * @param z The Z coordinate
     * @param a The yaw angle
     * @return 1 if statue was successfully moved, otherwise 0
     */
    move_statue(index: number, x: number, y: number, z: number, a: number): Bit;

    /**
     * Moves the statues. Statues with shp files are currently not movable.
     * Only difference between this and mx.move_statue() is that the y coordinate is
     * no longer relative to the ground. It moves to the y coordinate specified exactly
     * @param index The statue index
     * @param x The X coordinate
     * @param y The Y coordinate
     * @param z The Z coordinate
     * @param r The rotation. Is a 3x3 matrix in a 9 element array
     * @return 1 if statue was successfully moved, otherwise 0
     */
    move_statue_absolute(index: number, x: number, y: number, z: number, r: Mat3x3): Bit;

    /**
    * ###################################################
    * Pose Functions
    * ###################################################
    */


    /**
     * Creates a animation pose sequence.
     * @param anim The animation object
     * @return The sequence index
     */
    cache_pose_sequence(anim: Animation): number;

    /**
     * Poses the statue specified by "index".
     * @param index The statue index
     * @param nbones The number of bones
     * @param c The rest positions of the bones which is a nbones * 3 element array
     * @param t The translated positions of the bones which is a nbones * 3 element array
     * @param r The rotations of the bones which is a nbones * 3 * 3 element
     * @return 1 if successful, otherwise 0
     */
    pose_statue(index: number, nbones: number, c: number[], t: number[], r: number[]): Bit;

    /**
     * Poses the statue state specified by "index"
     * @param index The statue index
     * @param sequence The sequence cache index obtained from mx.cache_pose_sequence()
     * @param frame The frame number in the sequence to set the pose to.  If "frame" is not an integer
     *  it will interpolate between the two closest frames.
     * @return 1 if successful, otherwise 0
     */
    pose_statue_from_sequence(index: number, sequence: number, frame: number): Bit;


    /**
    * ###################################################
    * Texture Rendering Functions
    * ###################################################
    */

    /**
     * Clears and prepares an animated texture for drawing.
     * @param tid The texture ID of the animated texture
     * @return 1 if successful, otherwise 0
     */
    begin_custom_frame(tid: number): Bit;

    /**
     * Uploads a custom frame to the texture
     * @param tid The texture id
     * @return 1 if successful, otherwise 0
     */
    end_custom_frame(tid: number): Bit;

    /**
     * This copies a subsection from a frame of an animated texture to its target texture.
     * All coordinates are in whole image units where 0 is the minimum and 1 is the maximum.
     * @param tid The textured ID
     * @param frame The frame number of the seq file texture
     * @param sx The source X coordinate
     * @param sy The source Y coordinate
     * @param dx The destination X coordinate
     * @param dy The destination Y coordinate
     * @param w The width of the area to copy
     * @param h The height of the area to copy
     * @return 1 if successful, otherwise 0
     */
    paste_custom_frame(
        tid: number, frame: number,
        sx: number, sy: number,
        dx: number, dy: number,
        w: number, h: number
    ): Bit;


    /**
    * ###################################################
    * Sound Functions
    * ###################################################
    */

    /**
     * Adds a sound. Note: Max number of sound is 512 before it starts failing
     * @param filename is the filename for the sound samples which should be in headerless signed 16 bit format.
     * @return The sound index if successful, or -1 if the sound couldn't be added 
     */
    add_sound(filename: string): number;

    /**
     * Sets the sound frequency
     * @param index The sound index
     * @param freq The frequency in samples per second
     * @return 1 if successful, otherwise 0
     */
    set_sound_freq(index: number, freq: number): Bit;

    /**
     * Sets sound looping.
     * @param index The sound index
     * @param loop Specify looping or not. 1 for looping, 0 for not.
     * @return 1 if successful, otherwise 0
     */
    set_sound_loop(index: number, loop: Bit): Bit;

    /**
     * Sets sound position
     * @param index The sound index
     * @param x The X coordinate
     * @param y The Y coordinate
     * @param z The Z coordinate
     * @return 1 if successful, otherwise 0
     */
    set_sound_pos(index: number, x: number, y: number, z: number): Bit;

    /**
     * Sets the sound velocity
     * @param index The sound index
     * @param x The X coordinate
     * @param y The Y coordinate
     * @param z The Z coordinate
     * @return 1 if successful, otherwise 0
     */
    set_sound_vel(index: number, x: number, y: number, z: number): Bit;

    /**
     * Sets the sound volume
     * @param index The sound index
     * @param volume The new volume
     * @return 1 if successful, otherwise 0
     */
    set_sound_vol(index: number, volume: number): Bit;

    /**
     * Starts a sound
     * @param index The sound index
     * @return 1 if successful, otherwise 0
     */
    start_sound(index: number): Bit;

    /**
     * Stops a sound.
     * @param index The sound index
     * @return 1 if successful, otherwise 0
     */
    stop_sound(index: number): Bit;


    /**
    * ###################################################
    * Misc Functions
    * ###################################################
    */

    /** Returns the gate number associated with "timing_index".
     * @param timing_index The timing index
     * @return The gate number associated with the timing_index
     */
    gate_from_timing_position(timing_index: number): number;

    /** Returns the bike model string for "slot". (Not a 3d mesh but rather a model number like "yz125".)
     * @param slot The slot number to get the bike for
     * @return The bike model string, Returns an empty string if the slot is invalid
     */
    get_bike_model(slot: number): string;

    /**
     * Stores the camera position in "p" and the camera orientation in "r".
     * @param p The variable to store the 3 element position array into 
     * @param r The variable to store the 3x3 rotation matrix as a 9 element array into
     * @return void
     */
    get_camera_location(p?: Vec3, r?: Mat3x3): void;

    /**
     * Returns the terrain height at location "x", "z"
     * @param x The X coordinate
     * @param z The Z coordinate
     * @return The terrain height
     */
    get_elevation(x: number, z: number): number;

    /** Returns the number of laps in the race. (Meaning the number of laps
     *  to complete after the finish time expires.) */
    get_finish_laps(): number;

    /** Returns the finish time in seconds. (Meaning the amount of time before
     *  it starts counting finish laps.) */
    get_finish_time(): number;

    /**
     * Returns the contact depth of the front tire for slot number "slot"
     * @param slot The slot number
     * @return The contact depth of the front tire or 0 if the slot is not valid
     */
    get_front_contact_depth(slot: number): number;

    /**
     * Stores the contact patch position for the front tire.
     * @param slot The slot number
     * @param p The array where the 3 element vector will be stored
     * @return 1 if successful, otherwise 0
     */
    get_front_contact_position(slot: number, p?: Vec3): Bit;

    /**
     * Stores the velocity of the tire at the front tire's contact patch.
     * @param slot The slot number
     * @param v The array where the 3 element vector will be stored
     * @return 1 if successful, otherwise 0
     */
    get_front_contact_slip(slot: number, v?: Vec3): Bit;

    /**
     * Stores the velocity of the front tire's contact patch.
     * @param slot The slot number
     * @param v The array where the 3 element vector will be stored
     * @return 1 if successful, otherwise 0
     */
    get_front_contact_velocity(slot: number, v?: Vec3): Bit;

    /**
     * Returns the contact depth of the rear tire for slot number "slot"
     * @param slot The slot number
     * @return The contact depth of the rear tire or 0 if the slot is not valid
     */
    get_rear_contact_depth(slot: number): number;

    /**
     * Stores the contact patch position for the rear tire.
     * @param slot The slot number
     * @param p The array where the 3 element vector will be stored
     * @return 1 if successful, otherwise 0
     */
    get_rear_contact_position(slot: number, p?: Vec3): Bit;

    /**
     * Stores the velocity of the tire at the rear tire's contact patch.
     * @param slot The slot number
     * @param v The array where the 3 element vector will be stored
     * @return 1 if successful, otherwise 0
     */
    get_rear_contact_slip(slot: number, v?: Vec3): Bit;

    /**
     * Stores the velocity of the rear tire's contact patch.
     * @param slot The slot number
     * @param v The array where the 3 element vector will be stored
     * @return 1 if successful, otherwise 0
     */
    get_rear_contact_velocity(slot: number, v?: Vec3): Bit;

    /** Returns the gate drop time in seconds. If the gate has not dropped yet, returns -1. */
    get_gate_drop_time(): number;

    /** Get the client player's slot number */
    get_player_slot(): number;

    /** Returns 1 if the rider in "slot" is causing a yellow flag, otherwise 0. */
    get_rider_down(slot: number): Bit;

    /** Returns the rider's name for "slot" or an empty string if there is no rider for that slot. */
    get_rider_name(slot: number): string;

    /** Returns the rider's number for "slot" as a string or an empty string if there is no rider for that slot. */
    get_rider_number(slot: number): string;

    /** Returns the number of riders. */
    get_running_count(): number;

    /**
     * Returns the number of timing gates passed by the rider in the position specified by "n" in the running order.
     * @param n The position of the player in the running order to get the timing position for
     * @return Number of timing gates passed or 0 if n is out of range
     */
    get_running_order_position(n: number): number;

    /**
     * Returns the slot number of the rider in the position specified by "n" in the running order.
     * @param n The position of the player in the running order to get the timing position for
     * @return Slot number or 0 if n is out of range
     */
    get_running_order_slot(n: number): number;

    /**
     * Returns the time in tics when the rider in the position specified by "n" in the running order passed the last timing gate
     * @param n The position of the player in the running order to get the timing position for
     * @return Time in tics when rider passed the last timing gate or 0 if n is out of range
     */
    get_running_order_time(n: number): number;

    /** Returns the tile number at position "x", "z". */
    get_tile_number(x: number, z: number): number;

    /** Returns the time in seconds when the rider hit the gate specified by "timing_index" or -1 on error. */
    get_timing(slot: number, timing_index: number): number;

    /** Returns the number of gates passed by "slot" or -1 if the slot is invalid. */
    get_timing_position(slot: number): number;

    /** Writes "msg" to the console. */
    message(msg: string): void;

    /** Reads the texture from "filename" and returns the texture ID. Returns 0 on failure. */
    read_texture(filename: string): number;

    /** Sends a script message to the server. By default, the server will prepend the player number
     *  of the sender to the message and send the resulting message to all clients.
     *  The player number is the number of players with slot numbers that
     *  are less than the sender's slot number.
    */
    broadcast_script_message(message: string): void;

    /** Returns the zero based lap number for "timing_index", where "timing_index" is the number of gates passed. */
    index_to_lap(timing_index: number): number;

    /** Returns the timing index at the start of the specified lap. */    
    lap_to_index(lap: number): number;

    /** Returns the position of the bike in the specified slot in a 3 element array. Returns null for an invalid slot. */
    get_position(slot: number): Vec3|null;

    /** Returns the velocity of the bike in the specified slot in a 3 element array. Returns null for an invalid slot. */
    get_velocity(slot: number): Vec3|null;

    /** Returns an array of objects representing the running order.
     * Each object has the following properties:
     *  "slot" - the slot number,
     *  "position" - the number of gates passed,
     *  "time" - the time when the last gate was hit in seconds.
    */
    get_running_order(): RunningOrderPlayer[];
    
};

type Animation = {
    frame_count: number;
    bone_count: number;
    rest_centers: number[];
    poses: Pose[];
}

type Pose = {
    centers: number[];
    rotations: number[];
}

type Mat3x3 = [
    number, number, number,
    number, number, number,
    number, number, number
]

type Vec2 = [number, number];
type Vec3 = [number, number, number];

type Bit = 0 | 1;

type RunningOrderPlayer = {
    /** The players slot number */
    slot: number,
    /** The player's position in the timing index */
    position: number,
    /** The player's last hit timing gate time in seconds */
    time: number
}