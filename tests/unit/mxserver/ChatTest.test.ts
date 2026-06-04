import { sendMessageToAllPlayers } from "../../../src/utils/mxserver/ChatHelpers";

test('send message to all players', () => {
    sendMessageToAllPlayers(0, "Hello world!");
    expect(mxserver.send).toHaveBeenCalledTimes(mxserver.max_slots);    
});