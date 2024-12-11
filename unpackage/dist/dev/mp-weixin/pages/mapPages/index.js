"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const bmap = require("../../static/map/myMapUtils.js");
const BMap = new bmap.MapUtils({
  id: "map"
});
let getLocationObj = null;
const db = common_vendor.Zs.database();
const _sfc_main = {
  setup(props, context) {
    const latitude = common_vendor.ref(0), longitude = common_vendor.ref(0);
    const placeDatas = common_vendor.ref([]);
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
      gradeVal: 2,
      southwest: null,
      northeast: null
    };
  },
  onReady() {
    this.mapCtx = BMap.createContext();
    getLocationObj = [
      null,
      (res) => {
        console.log("success", this.latitude, res.latitude, res.longitude);
        this.latitude = res.latitude;
        this.longitude = res.longitude;
        this.addMarker();
        this.mapCtx.getRegion({
          success: (res2) => {
            this.southwest = res2.southwest;
            this.northeast = res2.northeast;
            console.log("西南角：", res2.southwest);
            console.log("东北角：", res2.northeast);
          }
        });
      },
      (res) => {
        console.log("err", res);
      },
      () => {
      }
    ];
    BMap.getWXLocation(...getLocationObj);
  },
  onRegionChange: function(e) {
    if (e.type === "end" && (e.causedBy === "drag" || e.causedBy === "scale")) {
      this.mapCtx.getRegion({
        success: (res) => {
          this.southwest = res.southwest;
          this.northeast = res.northeast;
          console.log("西南角：", res.southwest);
          console.log("东北角：", res.northeast);
          this.queryToiletData();
        }
      });
    }
  },
  mounted() {
  },
  methods: {
    goToiletDetail(id, distance) {
      console.log("click detail", id, distance);
      common_vendor.index.navigateTo({
        url: `/pages/showTolietDetail/showTolietDetail?id=${id}&distance=${distance}`
      });
    },
    goNavigation(latitude, longtitude) {
      console.log("goNavigation", latitude, longtitude);
    },
    gradeOnChange(e) {
      console.log("rate发生改变:" + JSON.stringify(e));
    },
    queryToiletData() {
      db.collection("toilet-data").where(
        `Latitude > ${this.southwest.latitude} && Latitude < ${this.northeast.latitude} && Longitude > ${this.southwest.longitude} && Longitude < ${this.northeast.longitude}`
      ).get().then((res) => {
        this.calcDis(res.result.data);
        this.placeDatas = res.result.data;
        console.log("placeDatas", this.placeDatas);
      });
    },
    calcDis(arr) {
      arr.forEach((placeData) => {
        let distance = BMap.calcDistance(this.latitude, this.longitude, placeData.Latitude, placeData.Longitude);
        distance = Math.floor(distance * 1e3);
        placeData.distance = distance + "m";
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.latitude,
    b: $setup.longitude,
    c: common_assets._imports_0$2,
    d: common_vendor.o((...args) => $setup.getLocation && $setup.getLocation(...args)),
    e: $setup.placeDatas.length && $setup.placeDatas[0].Address
  }, $setup.placeDatas.length && $setup.placeDatas[0].Address ? {
    f: common_vendor.f($setup.placeDatas, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.Address),
        b: common_vendor.t(item.distance),
        c: common_vendor.o(($event) => $options.goToiletDetail(item._id, item.distance), item._id),
        d: common_vendor.o(($event) => $options.goNavigation(item.latitude, item.longitude), item._id),
        e: item._id
      };
    }),
    g: common_vendor.t(),
    h: common_vendor.t()
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c0ff98ac"]]);
wx.createPage(MiniProgramPage);
