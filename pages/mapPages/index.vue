<template>
	<div class="container">
		<div class="map_container">
			<map id="map" class="map" :latitude="latitude" :longitude="longitude" :markers="markers"
				@marker-tap="markerTap"></map>
		</div>

		<div class="toiletsContainer">
			<div style="height: 1rem;"></div>
			<div id="con_data" v-if="placeDatas[0].title" v-for="item in placeDatas">
				<div id="con_left">
					<p>厕所名：{{ item.title }}</p>
					<div>
						<p>星级: {{item.grade}}</p>
					</div>
					<p>评价人数: {{item.personNum}}</p>
				</div>
				<!-- <div style="width: 2rem;background-color: red;"></div> -->
				<div id="con_right">
					<p id="con_distance">距离：{{ item.longitude }}</p>
					<button id="con_detail" @click="goToiletDetail(item.id)">详情</button>
					<button id="con_direction" @click="goNavigation(item.latitude, item.longitude)">导航</button>
				</div>

			</div>
		</div>
		<uni-rate v-model="gradeVal" @change="gradeOnChange" />
	</div>
	<div>
		<button @click="getData">点击查询数据库</button>
		<button @click="getLocation">点击定位</button>
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
			const placeDatas = [{
					id: 1,
					title: '名称',
					latitude: 0,
					longitude: 0,
					grade: 3,
					detail: '详情',
					personNum: 100
				},
				{
					id: 1,
					title: '名称',
					latitude: 0,
					longitude: 0,
					grade: 3,
					detail: '详情',
					personNum: 100
				}
			];
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
				BMap.getCenterLocation();
				BMap.moveToCenter(0, 0);
			};
			return {
				latitude,
				longitude,
				placeDatas,
				getData,
				getLocation,
			}
		},
		data() {
			return {
				gradeVal: 2
			}
		},
		mounted() {
			// 获取位置、展示地图
			getLocationObj = [
				null,
				(res) => {
					console.log('success', res.latitude, res.longitude)
					this.latitude = res.latitude;
					this.longitude = res.longitude
				},
				(res) => {
					console.log('err', res)
				},
				() => {}
			]
			BMap.getWXLocation(...getLocationObj);
			this.mapCtx = BMap.createContext();
		},
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

		}
	}
</script>

<style scoped>
	@import url('./index.css');
</style>