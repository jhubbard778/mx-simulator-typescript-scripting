declare const mxserver: {
    /** This is the maximum number of slots compiled into the server. */
    max_slots: number;

    /** Returns the UID for the given slot number as a number. */
    get_uid(slotnumber: number): number;

    /** Returns the rank for the given slot as a string. */
    get_rank(slotnumber: number): "Nobody" | "Marshal" | "Admin";

    /** Returns the status for the given slot as a string. */
    get_status(slotnumber: number): "Empty" | "Reserved" | "Spectator" | "Player" | "Zombie";

    /** Returns a string containing the specified file. */
    file_to_string(filename: string): string;

    /** Writes the string to a file. */
    string_to_file(filename: string, string: string): void;

    /** Appends the string to a file. */
    append_string_to_file(filename: string, string: string): void;

    /** Runs "string" as a shell command. */
    system(string: string): void;

    /** This runs an "at" command.
     * E.g. mxserver.schdedule_command("at +10 broadcast Hello, world!") */
    schedule_command(commandline: string): void;

    /** Broadcasts a message on the server. */
    broadcast(message: string): void;

    /** Sends "message" to the client in "slotnumber". */
    send(slotnumber: number, message: string): void;

    /** Sends script message "message" to the client in "slotnumber". */
    send_script_message(slotnumber: number, message: string): void;

    /** Writes "message" into the server demo. */    
    write_demo_message(message: string): void;

    /** Writes script message "message" into the server demo. */
    write_demo_script_message(message: string): void;

    /** Writes "message" to stderr. */
    log(message: string): void;

    /** Returns the number associated with "name" with optional array index
     * @remarks For `"erode"`, the returned value is 1024x the inputted value.
    */
    get_number(name: MXServerNumberName): number;
    get_number(name: MXServerNumberArrayName): number[];
    get_number(name: MXServerNumberArrayName, index: number): number;

    /** Returns the string associated with "name" with optional array index */
    get_string(name: MXServerStringName): string;
    get_string(name: MXServerNumberArrayName): string[];
    get_string(name: MXServerStringArrayName, index: number): string;

    /**
    * ###################################################
    * Callback Functions
    * ###################################################
    */

    /**
     * This is called when a client connects to the server.
     * @param slotnumber The client's slot number.
     */
    connect_handler: (slotnumber: number) => void;

    /**
     * This is called when a client disconnects from the server.
     * @param slotnumber The client's slot number.
     * @remarks It is possible to get a disconnect without a corresponding connect
     *  if the client fails to initialize completely. 
     */
    disconnect_handler: (slotnumber: number) => void;

    /**
     * This is called when a client hits a timing gate.
     * @param slotnumber The client's slot number
     * @param position The client's position in the timing array
     * @param time The time in 1/128 second race time tics in which the client hit the gate
     */
    timing_handler: (slotnumber: number, position: number, time: number) => void;

    /**
     * This is called when an info packet is received from a client and
     *  before the client's message is checked for server commands.
     * @param slotnumber The client's slot number
     * @param message The message that the client sent
     * @returns 1 if the server should not continue processing the message and 0 otherwise.
     */
    info_handler: (slotnumber: number, message: string) => Bit;

    /**
     * This is called when the server receives a command it doesn't recognize.
     * @param slotnumber The client's slot number or
     *  mxserver.max_slots if the command isn't associated with a client
     * @param commandline The command line to execute
     * @returns 1 if the server should not continue processing the message and 0 otherwise.
     */
    command_handler: (slotnumber: number, commandline: string) => Bit;

    /**
     * This is called when a chat message is received from a client.
     * @param slotnumber The client's slot number
     * @param message The message that the client sent
     * @returns 1 if the server should not continue processing the message and 0 otherwise.
     */
    chat_handler: (slotnumber: number, message: string) => Bit;

    /** This is called after a restart. */
    start_handler: () => void;

    /** This is called before a restart. */
    finish_handler: () => void;

    /** This is called at a rate of 128 times per second. This is not
     * perfectly accurate and can skip a beat if the server is running slow. */
    tic_handler: () => void;

    /** This is called once every second.  This is not perfectly accurate and
     * can skip a beat if the server is running slow. */
    second_handler: () => void;

    /** This is called when the client in the specified slot is ready. */
    ready_handler: (slotnumber: number) => void;

    /** This is called when a script message is received from a client.
     * "slotnumber" is the client's slot number.  "message" is the message
     * that the client sent. */
    script_message_handler: (slotnumber: number, message: string) => void;

}

type SlotInfo = {
    bike: string;
    riderskin: string;
    bikeskin: string;
    wheelskin: string;
    helmetskin: string;
    uid: number;
    name: string;
    status: "Empty" | "Reserved" | "Spectator" | "Player" | "Zombie";
    rank: "Nobody" | "Marshal" | "Admin",
    ping: number;
}

type MXServerNumberName = 'drop_time' | 'erode' | 'finish_laps' | 'finish_time'
    | 'first_lap_length' | 'gate_count' | 'holeshot_index' | 'max_slots' | 'normal_lap_length'
    | 'race_time' | 'track_count' | 'ping';

type MXServerNumberArrayName = 'finish_laps_list' | 'finish_time_list' | 'muted' | 'uid';

type MXServerStringName = "track_dir" | "track_name";
type MXServerStringArrayName = "bikeinfo" | "ignore" | "rank" | "status" | "track_list";
