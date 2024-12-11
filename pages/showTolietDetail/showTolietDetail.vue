<template>
	<view>
		<div id="con_data">
			<div id="con_left">
				<p class="con_left_p">厕所位置：{{ placeData.Address }}</p>
				<p id="con_distance">距离：{{ distance }}</p>
			</div>
			<div style="width: 1rem;"></div>
			<div id="con_right">
				<p class="con_left_p">星级: {{ }}</p>
				<p class="con_left_p">评价人数: {{ }}</p>
				<button id="con_direction" class="con_btn" @click="">导航</button>
			</div>
		</div>
		<div class="overall_evaluation">
			<div id="gradeTotal">
				<div class="grade_list">
					<div class="grade_name">总体：</div>
					<div class="grade_detail">
						<uni-rate v-model="gradeTotal" @change="gradeTotalOnChange" allowHalf="true" size="28"
							margin="20" />
					</div>
				</div>
				<view v-if="showDetailGrade">
					<div class="grade_list">
						<div class="grade_name">环境：</div>
						<div class="grade_detail">
							<uni-rate v-model="gradeEnv" allowHalf="true" size="28" margin="20" />
						</div>
					</div>
					<div class="grade_list">
						<div class="grade_name">空气质量：</div>
						<div class="grade_detail">
							<uni-rate v-model="gradeAir" allowHalf="true" size="28" margin="20" />
						</div>
					</div>
				</view>

			</div>
			<button @click="submitGrade">提交评分</button>
		</div>
		<div class="evaluation_list">

		</div>
	</view>
</template>

<script>
	import {
		ref
	} from 'vue';
	const db = uniCloud.database();

	export default {
		setup(props, context) {
			const placeData = ref([]);
			const distance = ref(null);
			return {
				placeData,
				distance
			}
		},
		data() {
			return {
				gradeTotal: 0,
				gradeEnv: 0,
				gradeAir: 0,
				showDetailGrade: false
			}
		},
		onLoad: function(options) {
			console.log(options.id, options.distance);
			this.distance = options.distance;
			console.log("getComment");
			db.collection("toilet-data").where({
					_id: options.id
				}).get()
				.then(res => {
					this.placeData = res.result.data[0];
					console.log("onLoad接收数据", res.result.data[0]);
				})
		},
		methods: {
			gradeTotalOnChange: function(e) {
				!this.showDetailGrade ? this.showDetailGrade = true : null;
				// console.log(this.showDetailGrade)
			},
			submitGrade: function() {
				const submitData = {
					autrhor: "a1",
					grade_total: this.gradeTotal,
					grade_env: this.gradeEnv,
					grade_air: this.gradeAir,
					create_time: new Date().getTime(),
					toilet_id: this.placeData._id
				}
				console.log('submitGrade', submitData);
				// db.collection("toilet-comment-data").add(submitData).then(res => {
				// 	console.log("db.add", res)
				// })
			}
		}
	}
</script>


<style scoped>
	@import url('../mapPages/index.css');
	@import url("./showToiletDetail.css");
</style>