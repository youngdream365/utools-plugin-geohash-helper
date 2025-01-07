<template>
  <div class="geo-body">
    <div class="geo-title">
      <t-typography-title>GeoHash&nbsp;<ArrowLeftRight1Icon/>&nbsp;经纬度</t-typography-title>
    </div>

    <t-space direction="vertical" class="geo-from">
      <div>
        <t-input placeholder="GeoHash 编码"
                 size="large" clearable
                 v-model="geoData.geohash"
                 @change="onGeohashChange"
                 ref="geohashInputRef"/>
      </div>

      <div>
        <t-input placeholder="lng,lat 经纬度"
                 min="0" max="12" size="large" clearable
                 v-model="geoData.lngLatValue"
                 @change="onLngLatChange"/>
      </div>

      <div>
        <t-input-number style="width: 100%"
                        placeholder="Precision 精度" size="large"
                        allowInputOverLimit
                        max="12" min="1" step="1" theme="column"
                        v-model="geoData.precision"
                        @change="onPrecisionChange"/>
      </div>
    </t-space>

    <p class="geo-footer">
      <t-button theme="default" variant="text" @click="handleClick" style="color: rgba(0, 0, 0, 0.4);">
        @俊码奔腾
      </t-button>
    </p>

  </div>

  <t-drawer
      :footer="false"
      :preventScrollThrough="false"
      showOverlay
      header="什么是 GeoHash 编码？"
      closeOnEscKeydown
      :close-btn="true"
      size="50%"
      v-model:visible="visible"
  >
    <t-typography-paragraph>
      Geohash 是由 Gustavo Niemeyer 发明的一种地理位置标记算法。它是一种分级的数据结构，把空间划分为网格。Geohash
      属于空间填充曲线中的 Z 阶曲线（Z-order curve）的实际应用。该曲线属于 Hilbert Curve 希尔伯特曲线的一种。
    </t-typography-paragraph>

    <div>
      <div class="tdesign-demo-image-viewer__base">
        <t-image-viewer :images="[img1]">
          <template #trigger="{ open }">
            <div class="tdesign-demo-image-viewer__ui-image">
              <img alt="test" :src="img1" class="tdesign-demo-image-viewer__ui-image--img"/>
              <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open">
                <span><BrowseIcon size="1.4em"/> 预览</span>
              </div>
            </div>
          </template>
        </t-image-viewer>
      </div>
    </div>
    <div>
      <div class="tdesign-demo-image-viewer__base">
        <t-image-viewer :images="[img2]">
          <template #trigger="{ open }">
            <div class="tdesign-demo-image-viewer__ui-image">
              <img alt="test" :src="img2" class="tdesign-demo-image-viewer__ui-image--img"/>
              <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open">
                <span><BrowseIcon size="1.4em"/> 预览</span>
              </div>
            </div>
          </template>
        </t-image-viewer>
      </div>
    </div>

    <t-typography-paragraph>
      GeoHash 使用
      <t-typography-text code>0123456789bcdefghjkmnpqrstuvwxyz</t-typography-text>
      32个字符表示的 Base32 编码。包含数字 0~9 加上 26
      个位字母（剔除了4个易混淆的字母：a、i、l、o）。
    </t-typography-paragraph>
    <table>
      <thead>
      <tr>
        <th>&nbsp;0&nbsp;</th>
        <th>&nbsp;1&nbsp;</th>
        <th>&nbsp;2&nbsp;</th>
        <th>&nbsp;3&nbsp;</th>
        <th>&nbsp;4&nbsp;</th>
        <th>&nbsp;5&nbsp;</th>
        <th>&nbsp;6&nbsp;</th>
        <th>&nbsp;7&nbsp;</th>
        <th>&nbsp;8&nbsp;</th>
        <th>&nbsp;9&nbsp;</th>
        <th>10</th>
        <th>11</th>
        <th>12</th>
        <th>13</th>
        <th>14</th>
        <th>15</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>b</td>
        <td>c</td>
        <td>d</td>
        <td>e</td>
        <td>f</td>
        <td>g</td>
      </tr>
      </tbody>
    </table>

    <table>
      <thead>
      <tr>
        <th>16</th>
        <th>17</th>
        <th>18</th>
        <th>19</th>
        <th>20</th>
        <th>21</th>
        <th>22</th>
        <th>23</th>
        <th>24</th>
        <th>25</th>
        <th>26</th>
        <th>27</th>
        <th>28</th>
        <th>29</th>
        <th>30</th>
        <th>31</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>h</td>
        <td>j</td>
        <td>k</td>
        <td>m</td>
        <td>n</td>
        <td>p</td>
        <td>q</td>
        <td>r</td>
        <td>s</td>
        <td>t</td>
        <td>u</td>
        <td>v</td>
        <td>w</td>
        <td>x</td>
        <td>y</td>
        <td>z</td>
      </tr>
      </tbody>

    </table>

    <t-typography-title level="h5">精度和误差</t-typography-title>
    <t-typography-paragraph>
      Geohash 能够提供任意精度的分段级别，一般分 12 级。下表展示了各级别编码的误差范围。实际上每个具体的 GeoHash
      编码串表示的始终是一个矩形区域，并非数学上的一个点，所以存在精度误差：GeoHash 越长，精度越高，误差越小。
    </t-typography-paragraph>

    <table>
      <thead>
      <tr>
        <th>长度</th>
        <th></th>
        <th>cell 宽度</th>
        <th></th>
        <th>cell 高度</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>≤</td>
        <td>5,000km</td>
        <td>×</td>
        <td>5,000km</td>
      </tr>
      <tr>
        <td>2</td>
        <td>≤</td>
        <td>1,250km</td>
        <td>×</td>
        <td>625km</td>
      </tr>
      <tr>
        <td>3</td>
        <td>≤</td>
        <td>156km</td>
        <td>×</td>
        <td>156km</td>
      </tr>
      <tr>
        <td>4</td>
        <td>≤</td>
        <td>39.1km</td>
        <td>×</td>
        <td>19.5km</td>
      </tr>
      <tr>
        <td>5</td>
        <td>≤</td>
        <td>4.89km</td>
        <td>×</td>
        <td>4.89km</td>
      </tr>
      <tr>
        <td>6</td>
        <td>≤</td>
        <td>1.22km</td>
        <td>×</td>
        <td>0.61km</td>
      </tr>
      <tr>
        <td>7</td>
        <td>≤</td>
        <td>153m</td>
        <td>×</td>
        <td>153m</td>
      </tr>
      <tr>
        <td>8</td>
        <td>≤</td>
        <td>38.2m</td>
        <td>×</td>
        <td>19.1m</td>
      </tr>
      <tr>
        <td>9</td>
        <td>≤</td>
        <td>4.77m</td>
        <td>×</td>
        <td>4.77m</td>
      </tr>
      <tr>
        <td>10</td>
        <td>≤</td>
        <td>1.19m</td>
        <td>×</td>
        <td>0.596m</td>
      </tr>
      <tr>
        <td>11</td>
        <td>≤</td>
        <td>149mm</td>
        <td>×</td>
        <td>149mm</td>
      </tr>
      <tr>
        <td>12</td>
        <td>≤</td>
        <td>37.2mm</td>
        <td>×</td>
        <td>18.6mm</td>
      </tr>
      </tbody>
    </table>

    <t-typography-paragraph>
      我们可以利用 Geohash 的字符串长短来决定要划分区域的大小。这个对应关系可以参考上面表格里面 cell 的宽和高。一旦选定
      cell 的宽和高的可接受误差范围，那么 Geohash 字符串的长度就确定下来了。这样我们就把地图分成了一个个的矩形区域。
    </t-typography-paragraph>
    <t-typography-paragraph>
      Geohash 有一个和 Z 阶曲线相关的性质，那就是一个点附近的地方(但不绝对) hash
      字符串总是有公共前缀，并且公共前缀的长度越长，这两个点距离越近。这个性质常用在数据库中索引加快搜索。
    </t-typography-paragraph>

    <t-typography-title level="h5">临近搜索的边界误差</t-typography-title>
    <t-typography-paragraph>
      如下图，搜索距离红色点A最近的目标点。在同一个 cell 区域内拥有相同前缀的
      <t-typography-text code>WX4G0</t-typography-text>
      AB两点，甚至比
      <t-typography-text code>WX4G2</t-typography-text>
      的AC的距离更远。真实情况也是 AC 比 AB 距离更近。
    </t-typography-paragraph>

    <div>
      <div class="tdesign-demo-image-viewer__base">
        <t-image-viewer :images="[img3]">
          <template #trigger="{ open }">
            <div class="tdesign-demo-image-viewer__ui-image">
              <img alt="test" :src="img3" class="tdesign-demo-image-viewer__ui-image--img"/>
              <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open">
                <span><BrowseIcon size="1.4em"/> 预览</span>
              </div>
            </div>
          </template>
        </t-image-viewer>
      </div>
    </div>

    <t-typography-paragraph>
      这就是“公共前缀的长度越长，这两个点距离越近”这句话不绝对的原因。所以在实践中处理临近位置搜索时，不要遗漏边界点位，要将自身和
      8 个邻居一共 9 个 cell 的 geohash 前缀匹配的地址一并查询，做好初次筛选（精度足够的话，初筛能淘汰绝大部分数据）。最后再把初筛点位用经纬度距离公式计算，获取最终精确过滤的目标点。
    </t-typography-paragraph>

    <t-typography-title level="h5">使用注意</t-typography-title>
    <t-typography-paragraph>
      本工具提供的解码和编码的经纬度，均为 cell 矩形区域的中心经纬度。
    </t-typography-paragraph>

    <t-typography-title level="h5">参考来源</t-typography-title>
    <ul>
      <li>
        <t-link theme="default" size="small" href="https://en.wikipedia.org/wiki/Z-order_curve"> Wiki：Z-order_curve
        </t-link>
      </li>
      <li>
        <t-link theme="default" size="small" href="https://en.wikipedia.org/wiki/Geohash"> Wiki：Geohash</t-link>
      </li>
      <li>
        <t-link theme="default" size="small" href="http://geohash.co"> geohash.co</t-link>
      </li>
      <li>
        <t-link theme="default" size="small" href="https://www.cnblogs.com/nifengqibi/p/15039114.html"> 逆锋起笔 GeoHash
          C#版
        </t-link>
      </li>
    </ul>

    <p class="geo-footer">@俊码奔腾</p>
  </t-drawer>
</template>

<style>
.geo-title {
  margin-bottom: 10px;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  cursor: default; /* 保持光标不变 */
}

.geo-body {
  background-color: #dfdfdf;
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  height: 100vh; /* 容器高度设置为视口高度 */
  min-width: 600px;
  min-height: 400px;
}

.geo-from {
  padding-bottom: 30px;
  width: 300px;
}

.geo-from > div {
  margin-bottom: 15px;
}

.geo-footer {
  color: rgba(0, 0, 0, 0.4);
  margin-top: 10px;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  cursor: default; /* 保持光标不变 */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

.tdesign-demo-image-viewer__ui-image {
  width: 100%;
  height: 100%;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: var(--td-radius-small);
  overflow: hidden;
}

.tdesign-demo-image-viewer__ui-image--hover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--td-text-color-anti);
  line-height: 22px;
  transition: 0.2s;
}

.tdesign-demo-image-viewer__ui-image:hover .tdesign-demo-image-viewer__ui-image--hover {
  opacity: 1;
  cursor: pointer;
}

.tdesign-demo-image-viewer__ui-image--img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  position: absolute;
}

.tdesign-demo-image-viewer__ui-image--footer {
  padding: 0 16px;
  height: 56px;
  width: 100%;
  line-height: 56px;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  color: var(--td-text-color-anti);
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  box-sizing: border-box;
}

.tdesign-demo-image-viewer__ui-image--title {
  flex: 1;
}

.tdesign-demo-popup__reference {
  margin-left: 16px;
}

.tdesign-demo-image-viewer__ui-image--icons .tdesign-demo-icon {
  cursor: pointer;
}

.tdesign-demo-image-viewer__base {
  width: 160px;
  height: 160px;
  margin: 10px;
  border: 4px solid var(--td-bg-color-secondarycontainer);
  border-radius: var(--td-radius-medium);
}
</style>

<script lang="ts" setup>
import {ref, reactive, onMounted} from 'vue';
import {BrowseIcon, ArrowLeftRight1Icon} from 'tdesign-icons-vue-next';
import {ButtonProps, MessagePlugin} from 'tdesign-vue-next';
import GeoHashHelper from './geo-hash-helper'; // 导入 geohash 库

// 创建ref来引用t-input组件
const geohashInputRef = ref<HTMLInputElement | null>(null);

// 在组件挂载后，聚焦到输入框
onMounted(() => {
  if (geohashInputRef.value) {
    geohashInputRef.value.focus();
  }
});

const img1 = './doc/Four-level_Z.svg';
const img2 = './doc/Geohash-grid.webp';
const img3 = "./doc/neighbor8box-distance.jpg";

const visible = ref(false);
const handleClick: ButtonProps['onClick'] = () => {
  visible.value = true;
};

let geoData = reactive({
  geohash: '',
  lng: '',
  lat: '',
  precision: '',
  lngLatValue: ''
});

const resetGeoData = () => {
  geoData = reactive({
    geohash: '',
    lng: '',
    lat: '',
    precision: '',
    lngLatValue: ''
  });
}

// 当 geohash 发生变化时，更新经纬度
const onGeohashChange = (newGeohash: string) => {
  if (geoData.geohash.length < 1) {
    resetGeoData();
    return;
  }
  // 限制长度
  if (geoData.geohash.length > 12) {
    geoData.geohash = geoData.geohash.slice(0, 12);
    MessagePlugin.closeAll();
    MessagePlugin.warning(" geohash 最长12位");
    return;
  }
  // 校验非法字符（base32，排除了：a/i/l/o）
  if (!(/^[0123456789bcdefghjkmnpqrstuvwxyz]{0,12}$/.test(geoData.geohash))) {
    geoData.geohash = geoData.geohash.replace(/[^0-9a-z]/g, '');
    geoData.lngLatValue = '';
    MessagePlugin.closeAll();
    MessagePlugin.warning(" geohash 存在非法字符");
    return;
  }

  geoData.precision = geoData.geohash.length;
  // 保留 8 位小数
  const {longitude, latitude} = GeoHashHelper.decode(newGeohash);
  geoData.lng = ((longitude[0] + longitude[1]) / 2).toFixed(8);
  geoData.lat = ((latitude[0] + latitude[1]) / 2).toFixed(8);

  geoData.lngLatValue = `${geoData.lng},${geoData.lat}`;
};

// 当经纬度发生变化时，更新 geohash
const onLngLatChange = () => {
  if (geoData.lngLatValue.length < 1) {
    resetGeoData();
  }
  let lngLat = geoData.lngLatValue.split(",");
  if (lngLat.length < 2) {
    return;
  }
  const lng = lngLat[0].trim();
  const lat = lngLat[1].trim();
  if (!(/^-?\d+(\.\d+)?$/).test(lng) || !(/^-?\d+(\.\d+)?$/).test(lat)) {
    console.log(lng + "##" + lat)
    return;
  }
  if (lng > 180 || lng < -180 || lat > 90 || lat < -90) {
    console.log(lng + "$$$$" + lat);
    MessagePlugin.closeAll();
    MessagePlugin.warning(" 经纬度范围错误。经度[-180,180]，纬度[-90,90]");
    return;
  }
  // precision 若无值设为 12
  if (!geoData.precision || geoData.precision === '') {
    geoData.precision = 12;
  }
  geoData.geohash = GeoHashHelper.encode(lng, lat, geoData.precision);
  console.log(geoData.geohash);

};

const onPrecisionChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
  // 精度取整数，默认12
  if (changeParams !== undefined) {
    const roundedValue = Math.round(changeParams);
    if (roundedValue >= 1 && roundedValue <= 12) {
      geoData.precision = roundedValue;
    } else {
      geoData.precision = 12;
    }
  } else {
    geoData.precision = 1;
  }

  if (triggerAndData.type === 'add') {
    geoData.geohash = (geoData.geohash + 'z').slice(0, 12);
    onGeohashChange(geoData.geohash);
  } else if (triggerAndData.type === 'reduce') {
    geoData.geohash = geoData.geohash.slice(0, geoData.precision);
    onGeohashChange(geoData.geohash);
  }
};

</script>