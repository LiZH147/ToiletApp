<template>
	<div class="container">
		<div class="map_container">
			<map class="map" :latitude="latitude" :longitude="longitude" :markers="markers"
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
</template>

<script>
	import {
		ref,
		onMounted,
		onBeforeMount
	} from 'vue';
	const bmap = require('../../static/map/bmap-wx.js');
	const BMap = new bmap.BMapWX({
		ak: 'USr6JFLIBsbvx5EicRRmPmE7Mi3QsVDX'
	})

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
			]
			return {
				latitude,
				longitude,
				placeDatas,

			}
		},
		data() {
			return {
				gradeVal: 2
			}
		},
		mounted() {
			// 获取位置、展示地图
			const getLocationObj = [
				null,
				(res) => {
					// console.log('success', res.latitude, res.longitude)
					this.latitude = res.latitude;
					this.longitude = res.longitude
				},
				(res) => {
					console.log('err', res)
				},
				() => {}
			]
			BMap.getWXLocation(...getLocationObj)
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
			}
		}
	}
</script>

<style scoped>
	@import url('./index.css');
</style>