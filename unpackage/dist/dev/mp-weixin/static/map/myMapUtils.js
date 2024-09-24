/**
 * @class
*/
class MapUtils {
	/**
	 * 封装微信原生的地图接口类
	 * 
	 * @constructor
	 */
	constructor(param) {
		this.id = param["id"]
	}
	createContext(){
		wx.createMapContext(this.id);
	}
	getWXLocation(type, success, fail, complete) {
		type = type || 'gcj02',
			success = success || function() {};
		fail = fail || function() {};
		complete = complete || function() {};
		wx.getLocation({
			type: type,
			success: success,
			fail: fail,
			complete: complete
		});
	}
}

module.exports.MapUtils = MapUtils;