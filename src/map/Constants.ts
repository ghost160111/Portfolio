import { MapLayerType, WmsLayer } from "./LeafletMap";
import L from "leaflet";

const initialLocation: [number, number] = [41.31076180847114, 69.27980650407957];
const darkMapURL: string = "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png";
const wmsURL: string = "https://maps.digitaltashkent.uz:8184/geoserver/gwc/service/wms?";

const wmsLayers: WmsLayer[] = [
  {
    name: "NDVI",
    url: "green_geoserver_db:lulc2016_2023",
    wmsLayer: L.tileLayer.wms(wmsURL, {
      layers: "green_geoserver_db:lulc2016_2023",
      tileSize: 256,
      format: "image/png",
      transparent: true,
      opacity: 0,
      zoomOffset: -1,
      maxZoom: 18,
      zIndex: 99999,
    }),
    isChecked: false,
  },
  {
    name: "areas_with_many_years_planted_record",
    url: "green_geoserver_db:green_zones_trees",
    wmsLayer: L.tileLayer.wms(wmsURL, {
      layers: "green_geoserver_db:green_zones_trees",
      tileSize: 256,
      format: "image/png",
      transparent: true,
      opacity: 1,
      zoomOffset: -1,
      maxZoom: 18,
      zIndex: 999999,
    }),
    isChecked: false,
  },
  {
    name: "parks",
    url: "green_geoserver_db:Parklar_umumiy_maydon",
    wmsLayer: L.tileLayer.wms(wmsURL, {
      layers: "green_geoserver_db:Parklar_umumiy_maydon",
      tileSize: 256,
      format: "image/png",
      transparent: true,
      opacity: 1,
      zoomOffset: -1,
      maxZoom: 18,
      zIndex: 999999,
    }),
    isChecked: false,
  },
  {
    name: "toshkent_sh_mahallalar",
    url: "green_geoserver_db:Toshkent_sh_mahallalar_585_ru",
    wmsLayer: L.tileLayer.wms(wmsURL, {
      layers: "green_geoserver_db:Toshkent_sh_mahallalar_585_ru",
      tileSize: 256,
      format: "image/png",
      transparent: true,
      opacity: 1,
      zoomOffset: -1,
      maxZoom: 18,
      zIndex: 9999999,
    }),
    isChecked: false,
  },
  {
    name: "toshkent_chegara",
    url: "green_geoserver_db:Toshkent_chegara_ru",
    wmsLayer: L.tileLayer.wms(wmsURL, {
      layers: "green_geoserver_db:Toshkent_chegara_ru",
      tileSize: 256,
      format: "image/png",
      transparent: true,
      opacity: 1,
      zoomOffset: -1,
      maxZoom: 18,
      zIndex: 99999999,
    }),
    isChecked: false,
  },
];

const mapWmsLayers: MapLayerType[] = [
  {
    id: 1,
    slug: "sputnik",
    name: "Спутник",
    image: "/images/OSM.png",
    tile: L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      maxZoom: 21,
      attribution:
        "&copy; <a href=\"https://www.google.com/maps\" target='_blank'>Google Карты</a>",
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }),
  },
  {
    id: 2,
    slug: "light",
    name: "Светлая",
    image: "/images/google.png",
    tile: L.tileLayer.wms(
      "https://maps.digitaltashkent.uz:8184/geoserver/gwc/service/wms",
      {
        maxZoom: 21,
        layers: "maps_dark:uz_cache_gray_new_1",
        tileSize: 256,
        format: "image/png",
        transparent: true,
        opacity: 1,
        attribution:
          " <a href=\"https://digitaltashkent.uz\" target='_blank'>Digital Tashkent Portal</a>",
      }
    ),
  },
  {
    id: 3,
    slug: "dark",
    name: "Тёмная",
    image: "/images/dark.png",
    tile: L.tileLayer.wms(
      "https://maps.digitaltashkent.uz:8184/geoserver/gwc/service/wms?",
      {
        maxZoom: 21,
        layers: "maps_dark:uz_cache_dark_new",
        tileSize: 256,
        format: "image/png",
        transparent: true,
        opacity: 1,
        attribution:
          " <a href=\"https://digitaltashkent.uz\" target='_blank'>Digital Tashkent Portal</a>",
      }
    ),
  },
];

export {
  initialLocation,
  darkMapURL,
  wmsURL,
  wmsLayers,
  mapWmsLayers
};
