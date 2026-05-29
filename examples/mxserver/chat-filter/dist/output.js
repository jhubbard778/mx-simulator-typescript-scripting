var badWords = ['employement', 'job', 'occupation', 'shift', 'overtime', 'deadline'];
var chatFilter = function chatFilter(slot, message) {
  if (badWords.indexOf(message) !== -1) return 1;
  return chatFilterPrev(slot, message);
};
var chatFilterPrev = mxserver.chat_handler;
mxserver.chat_handler = chatFilter;
