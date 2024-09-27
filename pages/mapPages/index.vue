<template>
	<div class="container">
		<div class="map_container">
			<map id="map" class="map" :latitude="latitude" :longitude="longitude"
			bindregionchange="onRegionChange"></map>

			<view @click="getLocation" class="posIcon">
				<img style="width: 24px; height: 24px;" src="../../static/imgs/icons8-my-location-50.png" alt="" />
			</view>
		</div>

		<div class="toiletsContainer">
			<div style="height: 1rem;"></div>
			<template v-if="placeDatas.length && placeDatas[0].Address">
				<div id="con_data" v-for="item in placeDatas" :key="item._id">
					<div id="con_left">
						<p>厕所名：{{ item.Address }}</p>
						<!-- <div>
							<p>星级: {{item.grade}}</p>
						</div>
						<p>评价人数: {{item.personNum}}</p> -->
					</div>
					<!-- <div style="width: 2rem;background-color: red;"></div> -->
					<div id="con_right">
						<p id="con_distance">距离：{{ item.longitude }}</p>
						<button id="con_detail" @click="goToiletDetail(item._id)">详情</button>
						<button id="con_direction" @click="goNavigation(item.latitude, item.longitude)">导航</button>
					</div>

				</div>
			</template>
		</div>
		<uni-rate v-model="gradeVal" @change="gradeOnChange" />
	</div>
	<div>
		<button @click="queryToiletData()">点击查询数据库</button>
		<!-- <button @click="getLocation">点击定位</button> -->
		<!-- <button @click="addMarker">点击添加中心点坐标</button> -->
	</div>
</template>

<script>
	import {
		ref,
		onMounted,
		onBeforeMount
	} from 'vue';
	const bmap = require('../../static/map/myMapUtils.js');
	const BMap = new bmap.MapUtils({
		id: 'map'
	});
	let getLocationObj = null;
	const db = uniCloud.database();

	export default {
		setup(props, context) {
			const latitude = ref(0),
				longitude = ref(0);
			const placeDatas = ref([]);

			// const placeDatas = [{
			// 		id: 1,
			// 		title: '名称',
			// 		latitude: 0,
			// 		longitude: 0,
			// 		grade: 3,
			// 		detail: '详情',
			// 		personNum: 100
			// 	},
			// 	{
			// 		id: 1,
			// 		title: '名称',
			// 		latitude: 0,
			// 		longitude: 0,
			// 		grade: 3,
			// 		detail: '详情',
			// 		personNum: 100
			// 	}
			// ];
			const getData = () => {
				console.log('getData');
				db.collection("toilet-data").where({
						Address: "太原市小店区真武路优客快捷酒店(真武路店)东南侧约70米"
					}).get()
					.then(res => {
						console.log(res)
					})
			};
			const getLocation = () => {
				BMap.moveToCenter(null, null);
			};
			const addMarker = () => {
				BMap.addMarker(0, latitude._value, longitude._value)
			}
			return {
				latitude,
				longitude,
				placeDatas,
				getData,
				getLocation,
				addMarker,
			}
		},
		data() {
			return {
				gradeVal: 2,
				southwest: null,
				northeast: null
			}
		},
		onReady() {
			this.mapCtx = BMap.createContext();
			// 获取位置、展示地图
			getLocationObj = [
				null,
				(res) => {
					console.log('success', this.latitude, res.latitude, res.longitude)
					this.latitude = res.latitude;
					this.longitude = res.longitude;
					this.addMarker();
					this.mapCtx.getRegion({
						success: (res) => {
							this.southwest = res.southwest;
							this.northeast = res.northeast;
							console.log('西南角：', res.southwest);
							console.log('东北角：', res.northeast);
						}
					});
				},
				(res) => {
					console.log('err', res)
				},
				() => {}
			]
			BMap.getWXLocation(...getLocationObj);
		},
		onRegionChange: function(e) {
			if (e.type === 'end' && (e.causedBy === 'drag' || e.causedBy === 'scale')) {
				this.mapCtx.getRegion({
					success: (res) => {
						this.southwest = res.southwest;
						this.northeast = res.northeast;
						console.log('西南角：', res.southwest);
						console.log('东北角：', res.northeast);
						this.queryToiletData();
					}
				});
			}
		},
		mounted() {},
		methods: {
			goToiletDetail(id) {
				console.log("click detail", id);
				uni.navigateTo({
					url: `/pages/showTolietDetail/showTolietDetail?id=${id}`
				})
			},

			goNavigation(latitude, longtitude) {
				console.log("goNavigation", latitude, longtitude)
			},

			gradeOnChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e))
			},

			queryToiletData() {
				console.log("queryToiletData", this.southwest, this.northeast, this.placeDatas)
				db.collection("toilet-data").where(
						`Latitude > ${this.southwest.latitude} && Latitude < ${this.northeast.latitude} && Longitude > ${this.southwest.longitude} && Longitude < ${this.northeast.longitude}`
					).get()
					.then(res => {
						// console.log(res.result.data);
						this.placeDatas = res.result.data;
						console.log('placeDatas', this.placeDatas)
					})
			},

		}
	}
</script>

<style scoped>
	@import url('./index.css');
</style>