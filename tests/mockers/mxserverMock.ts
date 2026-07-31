import { MXTicConverter } from "@/utils/mxserver/TicConversions";
import { faker } from "@faker-js/faker/locale/en";
import { emptySlotInfo, MAX_SLOTS, mockPlayers, mockTrackData } from "./mockServerData";

const firstLapLength = faker.number.int({min: 7, max: 34});
const normalLapLength = faker.number.int({min: 26, max: 50});

const serverData = {
    numbers: {
        drop_time: faker.number.float({min: 8, max: 14}) * MXTicConverter.ticsPerSecond,
        erode: 0, // Note: get_number returns 1024x this value
        finish_laps: mockTrackData[0].laps,
        finish_time: MXTicConverter.minutesToTics(mockTrackData[0].time),
        first_lap_length: firstLapLength,
        gate_count: firstLapLength + normalLapLength,
        holeshot_index: faker.number.int({min: 1, max: 5}),
        max_slots: MAX_SLOTS,
        normal_lap_length: normalLapLength,
        race_time: faker.number.int({ min: 0, max: mockTrackData[0].time }) * MXTicConverter.ticsPerSecond as MXTics,
        track_count: mockTrackData.length,
        ping: faker.number.int({min: 40, max: 120})
    } satisfies Record<MXServerNumberName|MXServerNumberNameTics, number>,

    numberArrays: {
      finish_time_list: mockTrackData.map((data) => MXTicConverter.minutesToTics(data.time)),
      finish_laps_list: mockTrackData.map((data) => data.laps),
      muted: [],
      uid: [],
    } satisfies Record<MXServerNumberArrayName, number[]>,
    
    strings: {
      track_dir: 'waterloo',
      track_name: 'Waterloo Valley',
    } satisfies Record<MXServerStringName, string>,

    stringArrays: {
      bikeinfo: [] as string[],
      ignore: [] as Array<'ALL' | 'SPECS' | 'NONE'>,
      rank: [] as Array<'Nobody' | 'Marshal' | 'Admin'>,
      status: [] as Array<'Empty' | 'Reserved' | 'Spectator' | 'Player' | 'Zombie'>,
      track_list: mockTrackData.map((data) => data.trackinfo),
    } satisfies { [K in MXServerStringArrayName]: MXServerStringArrayValues[K][] },  
}

export const mxserverMock = {
    max_slots: MAX_SLOTS,

    get_uid: vi.fn().mockImplementation((slot: number): number => {
      if (slot < 0 || slot >= mockPlayers.length) return 0;
      return mockPlayers[slot].uid;
    }),
    get_rank: vi.fn().mockImplementation((slot: number) => {
      if (slot < 0 || slot >= mockPlayers.length) return 0;
      return mockPlayers[slot].rank;
    }),
    get_status: vi.fn().mockImplementation((slot: number): SlotStatus => {
        if (slot < 0 || slot >= mockPlayers.length) return "Empty";
        return mockPlayers[slot].status;
    }),
    get_slot_info: vi.fn().mockImplementation((slot: number): SlotInfo => {
        if (slot < 0 || slot >= mockPlayers.length) return emptySlotInfo;
        return mockPlayers[slot];
    }),

    file_to_string: vi.fn().mockImplementation((filename: string): string => {
        const trackData = mockTrackData.find((data) => data.trackinfo === filename);
        if (trackData) return trackData.trackinfo_content;
    
        return '';
    }),
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

    get_number: vi.fn((name: MXServerNumberName | MXServerNumberArrayName, index?: number) => {
          if (name in serverData.numbers) {
            return serverData.numbers[name as MXServerNumberName];
          }

          const arr = serverData.numberArrays[name as MXServerNumberArrayName];
          return index !== undefined ? arr[index] : arr;
        }) as {
          (name: MXServerNumberName): number;
          (name: MXServerNumberArrayName, index?: number): number;
        },
    get_string: vi.fn(<T extends MXServerStringArrayName>(
          name: MXServerStringName | MXServerStringArrayName,
          index?: number
        ) => {
          if (name in serverData.strings) {
            return serverData.strings[name as MXServerStringName];
          }

          const arr = serverData.stringArrays[name as T];
          return index !== undefined ? arr[index] : arr;
        }) as {
          <T extends MXServerStringArrayName>(name: T, index?: number): MXServerStringArrayValues[T];
          (name: MXServerStringName): string;
        },

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

export const getMockServerData = () => serverData;

export const setMockServerData = (overrides: {
  numbers?: Partial<typeof serverData.numbers>;
  numberArrays?: Partial<typeof serverData.numberArrays>;
  strings?: Partial<typeof serverData.strings>;
  stringArrays?: Partial<typeof serverData.stringArrays>;
}) => {
  if (overrides.numbers) Object.assign(serverData.numbers, overrides.numbers);
  if (overrides.numberArrays) Object.assign(serverData.numberArrays, overrides.numberArrays);
  if (overrides.strings) Object.assign(serverData.strings, overrides.strings);
  if (overrides.stringArrays) Object.assign(serverData.stringArrays, overrides.stringArrays);
}