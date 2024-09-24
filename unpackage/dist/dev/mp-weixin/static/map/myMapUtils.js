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

	/**
	 * 创建地图上下文
	 */
	createContext() {
		this.mapCtx = wx.createMapContext(this.id);
		return this.mapCtx;
	}

	/**
	 * 使用微信接口进行定位
	 * 
	 * @param {string} type 坐标类型
	 * @param {Function} success 成功执行
	 * @param {Function} fail 失败执行
	 * @param {Function} complete 完成后执行
	 */
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

	/**
	 * 获取当前地图中心点位置
	 * 
	 * @param {Function} success 成功执行
	 * @param {Function} fail 失败执行
	 */
	getCenterLocation(success, fail) {
		const that = this;
		success = success || function(res) {
			console.log('中心点经度：', res.longitude);
			console.log('中心点纬度：', res.latitude);
		};
		fail = fail || function(err) {
			console.error('获取中心点失败：', err);
		}
		this.mapCtx.getCenterLocation({
			success: success,
			fail: fail,
		});
	}

	/**
	 * 修改地图中心经纬度
	 * 
	 * @@param {Float} latitude
	 * @@param {Float} longitude
	 */
	async moveToCenter(latitude, longitude) {
		const that = this;
		if (latitude == 0 || longitude == 0) {
			this.getWXLocation(
				null,
				(res) => {
					// console.log('success + this', that, latitude, longitude)
					latitude = res.latitude;
					longitude = res.longitude
					that.mapCtx.moveToLocation({
						longitude: res.longitude, // 指定的经度
						latitude: res.latitude, // 指定的纬度
						success: function() {
							console.log("移动到指定经纬度", latitude, longitude)
						},
						fail: function(err) {
							console.error('移动到指定位置失败：', err);
						},
					});
				},
				(res) => {
					console.log('err', res)
				},
				() => {}
			)
		}
		// await console.log(latitude, longitude, typeof latitude)
		// 调用 moveToLocation 方法将地图移动到指定的经纬度
		// await this.mapCtx.moveToLocation({
		// 	longitude: longitude, // 指定的经度
		// 	latitude: latitude, // 指定的纬度
		// 	success: function() {
		// 		console.log("移动到指定经纬度", latitude, longitude)
		// 	},
		// 	fail: function(err) {
		// 		console.error('移动到指定位置失败：', err);
		// 	},
		// });
	}
}

module.exports.MapUtils = MapUtils;