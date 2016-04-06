"use strict";
var Request = (function () {
    function Request(id, email, nickname, img_url, channel) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.img_url = img_url;
        this.channel = channel;
    }
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=Request.js.map