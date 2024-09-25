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
	 * 传入(null, null)时重新获取定位信息并移动地图
	 * 
	 * @@param {Float} latitude
	 * @@param {Float} longitude
	 */
	async moveToCenter(latitude, longitude) {
		const that = this;
		if (latitude === null || longitude === null) {
			this.getWXLocation(
				null,
				(res) => {
					// console.log('success + this', that, latitude, longitude)
					that.myMoveToLocation(res.latitude, res.longitude)
				},
				(res) => {
					console.log('err', res)
				},
				() => {}
			)
		} else {
			that.myMoveToLocation(latitude, longitude)
		}

	}
	/**
	 * 对微信地图API中moveToLocation的封装
	 * 
	 * @param {float} latitude 
	 * @param {float} longitude 
	 */
	myMoveToLocation(latitude, longitude) {
		const that = this;
		that.mapCtx.moveToLocation({
			longitude: longitude, // 指定的经度
			latitude: latitude, // 指定的纬度
			success: function() {
				console.log("移动到指定经纬度", latitude, longitude)
			},
			fail: function(err) {
				console.error('移动到指定位置失败：', err);
			},
		});
	}

	/**
	 * 添加标记点
	 * 
	 * @param {float} latitude 
	 * @param {float} longitude 
	 */
	addMarker(id, latitude, longitude){
		console.log("初始", id, latitude, longitude)
		const that = this;
		that.mapCtx.addMarkers({
			markers: [{
				id: id,
				latitude: latitude,
				longitude: longitude,
				iconPath: '../../static/imgs/marker_red.png',
				width: '20px',
				height: '26px'
			}],
			success: res => console.log("成功添加market", latitude, longitude)
		})
	}
}

module.exports.MapUtils = MapUtils;