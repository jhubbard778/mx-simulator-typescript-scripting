import { sendMessageToAllPlayers } from "@/utils/mxserver/ChatHelpers";

test('send message to all players', () => {
    const sendSpy = vi.spyOn(mxserver, 'send');

    sendMessageToAllPlayers(0, "Hello world!");
    expect(sendSpy).toHaveBeenCalledTimes(mxserver.max_slots);
    expect(sendSpy).toHaveBeenCalledWith(0, "Hello world!");
    expect(sendSpy).toHaveBeenCalledWith(mxserver.max_slots >> 1, "Hello world!");
    expect(sendSpy).toHaveBeenCalledWith(mxserver.max_slots - 1, "Hello world!");
});