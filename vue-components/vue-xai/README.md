# vue-xai

Vue.js based component exposing some xai widgets.

```
<xai-image
  src="http://img.jpg"
  max-height="100"
  max-width="200"

  :areas="[{name: "cat", area: [23, 55, 23, 55] }]"

  :area-selected="["cat", "dog"]"
  area-selected-opacity="1"
  area-opacity="0.2"

  @area-selection-change="change(selected-array)"


  :heatmaps="[{name: "cat", map: TypedArray(w*h)}]"

  heatmap-opacity
  heatmap-color-preset
  :heatmap-color-range="[0, 1]"
  heatmap-active="cat"
  :heatmap-color-mode="full"
/>
```

## Build for PyWebVue

```
npm i
npm run build
```
