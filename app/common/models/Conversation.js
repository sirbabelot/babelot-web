"use strict";
var Conversation = (function () {
    function Conversation(roomId, nickname, fingerprint) {
        this.roomId = roomId;
        this.nickname = nickname;
        this.fingerprint = fingerprint;
        this.messages = [];
    }
    return Conversation;
}());
exports.Conversation = Conversation;
//# sourceMappingURL=Conversation.js.map