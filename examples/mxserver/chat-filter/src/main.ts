const badWords: string[] = ['employement', 'job', 'occupation', 'shift', 'overtime', 'deadline'];

const chatFilter = (slot: number, message: string): Bit => {
    if (badWords.indexOf(message) !== -1) return 1;
    return chatFilterPrev(slot, message);
}

var chatFilterPrev = mxserver.chat_handler;
mxserver.chat_handler = chatFilter;