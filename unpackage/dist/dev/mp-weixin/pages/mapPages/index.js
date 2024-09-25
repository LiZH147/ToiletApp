"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const bmap = require("../../static/map/myMapUtils.js");
const BMap = new bmap.MapUtils({
  id: "map"
});
let getLocationObj = null;
const db = common_vendor.Vs.database();
const _sfc_main = {
  setup(props, context) {
    const latitude = common_vendor.ref(0), longitude = common_vendor.ref(0);
    const placeDatas = [
      {
        id: 1,
        title: "名称",
        latitude: 0,
        longitude: 0,
        grade: 3,
        detail: "详情",
        personNum: 100
      },
      {
        id: 1,
        title: "名称",
        latitude: 0,
        longitude: 0,
        grade: 3,
        detail: "详情",
        personNum: 100
      }
    ];
    const getData = () => {
      console.log("getData");
      db.collection("toilet-data").where({
        Address: "太原市小店区真武路优客快捷酒店(真武路店)东南侧约70米"
      }).get().then((res) => {
        console.log(res);
      });
    };
    const getLocation = () => {
      BMap.moveToCenter(null, null);
    };
    const addMarker = () => {
      BMap.addMarker(0, latitude._value, longitude._value);
    };
    return {
      latitude,
      longitude,
      placeDatas,
      getData,
      getLocation,
      addMarker
    };
  },
  data() {
    return {
      gradeVal: 2
    };
  },
  mounted() {
    this.mapCtx = BMap.createContext();
    getLocationObj = [
      null,
      (res) => {
        console.log("success", this.latitude, res.latitude, res.longitude);
        this.latitude = res.latitude;
        this.longitude = res.longitude;
        this.addMarker();
      },
      (res) => {
        console.log("err", res);
      },
      () => {
      }
    ];
    BMap.getWXLocation(...getLocationObj);
  },
  methods: {
    goToiletDetail(id) {
      console.log("click detail", id);
      common_vendor.index.navigateTo({
        url: `/pages/showTolietDetail/showTolietDetail?id=${id}`
      });
    },
    goNavigation(latitude, longtitude) {
      console.log("goNavigation", latitude, longtitude);
    },
    gradeOnChange(e) {
      console.log("rate发生改变:" + JSON.stringify(e));
    }
  }
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.latitude,
    b: $setup.longitude,
    c: common_assets._imports_0$2,
    d: common_vendor.o((...args) => $setup.getLocation && $setup.getLocation(...args)),
    e: $setup.placeDatas[0].title
  }, $setup.placeDatas[0].title ? {
    f: common_vendor.f($setup.placeDatas, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.grade),
        c: common_vendor.t(item.personNum),
        d: common_vendor.t(item.longitude),
        e: common_vendor.o(($event) => $options.goToiletDetail(item.id)),
        f: common_vendor.o(($event) => $options.goNavigation(item.latitude, item.longitude))
      };
    })
  } : {}, {
    g: common_vendor.o($options.gradeOnChange),
    h: common_vendor.o(($event) => $data.gradeVal = $event),
    i: common_vendor.p({
      modelValue: $data.gradeVal
    }),
    j: common_vendor.o((...args) => $setup.getData && $setup.getData(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c0ff98ac"]]);
wx.createPage(MiniProgramPage);
