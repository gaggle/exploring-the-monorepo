"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiAnalytics = void 0;
const logging_1 = require("logging");
const log = logging_1.getLogger('analytics');
class ApiAnalytics {
    foundAllUsers(ip, length) {
        log.info('found all users', { ip, numUsers: length, timestamp: Date.now() });
    }
}
exports.ApiAnalytics = ApiAnalytics;
//# sourceMappingURL=index.js.map