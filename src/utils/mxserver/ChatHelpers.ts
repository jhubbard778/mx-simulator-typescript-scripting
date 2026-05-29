
/**
 * Sends a message to all players in the server (except players ignoring chat)
 * 
 * This basically acts as a normal chat message, but sometimes you want to
 * edit/filter a chat message then send it through like normal.
 * 
 * Or you may want to broadcast something while not bothering people ignoring chat 
 * 
 * @param slotSender The slot of the sender of the message
 * @param message The message to send
 */
export const sendMessageToAllPlayers = (slotSender: number, message: string): void => {
    const senderIsPlayer = mxserver.get_status(slotSender) === "Player";

    for (let slot = 0; slot < mxserver.max_slots; slot++) {
        if (mxserver.get_status(slot) !== "Player") {
            mxserver.send(slot, message);
            return;
        }

        // If player and ignoring all, do not send
        // Or if ignoring spectators & sender is not also a player, do not send
        const ignore = mxserver.get_string("ignore", slot);
        if (ignore === "ALL" || (ignore === "SPECS" && !senderIsPlayer)) continue;

        mxserver.send(slot, message);
    }

    mxserver.write_demo_message(message);
}