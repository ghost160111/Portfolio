import L from "leaflet";
import ImgSlider from "../components/Global/ImgSlider/ImgSlider";
import ReactiveElement, {
  sharedState,
} from "../plugins/ReactiveElement/Classes/ReactiveElement";
import AccorditionRight from "../components/Global/Accordition/AccorditionRight";
import TreePropsAccordition from "../components/Global/Accordition/components/TreeProps";
import { PlayFadeInAnimation } from "../plugins/ReactiveElement/Functions/PlayFadeInAnimation";
import { TreeObjectPoint } from "../state/Interfaces";
import { MapState, useMapStore } from "../state/MapStore";
import { fetchPoints } from "./../state/fetchPoints";
import { darkMapURL, initialLocation, mapWmsLayers, wmsLayers, wmsURL } from "./Constants";

export interface LeafletMapProps {
  tileLayerURL: string;
  initialView: [number, number];
  zoomLevel: number;
  minZoom?: number;
}

export type GeoJsonFeature = {
  type: "Feature";
  properties: TreeObjectPoint;
  geometry: {
    coordinates: [number, number];
    type: "Point";
  };
};

export type WmsLayerURLMap = Map<string, string>;

export interface WmsLayer {
  name: string;
  url: string;
  wmsLayer: L.TileLayer.WMS;
  isChecked: boolean;
}

export interface MapLayerType {
  id: number;
  slug: string;
  name: string;
  image: string;
  tile: L.TileLayer | L.TileLayer.WMS;
}

export class LeafletMap {
  public map: L.Map;
  public tileLayer: L.TileLayer;
  public tileLayerURL: string;
  public geoJsonLayer: L.LayerGroup<any>;
  public circleMarkerOptions: L.CircleMarkerOptions;
  public initialView: [number, number];
  public zoomLevel: number;
  public circleColorsHEX: string[];
  public customPopupStyleElement: HTMLElement;
  public customPopupStyles: string;
  public imgSliderInstance: ImgSlider;
  public points: TreeObjectPoint[];
  public lang: string;
  public geoJsonData: {};
  public wmsTileLayer: L.TileLayer.WMS;
  public wmsURL: string;
  public wmsLayers: WmsLayer[];
  public mapWmsLayers: MapLayerType[];

  constructor(props: LeafletMapProps) {
    this.wmsURL = wmsURL;
    this.wmsLayers = wmsLayers;
    this.mapWmsLayers = mapWmsLayers;

    this.lang = document.querySelector("html").lang;

    this.geoJsonData = {
      type: "FeatureCollection",
      features: [],
    };

    const tileLayerURL = props.tileLayerURL;
    const initialView = props.initialView;
    const zoomLevel = props.zoomLevel;

    this.setViewProps(initialView, zoomLevel);
    this.map = L.map("map").setView(this.initialView, this.zoomLevel);

    this.tileLayerURL = tileLayerURL;
    this.tileLayer = L.tileLayer(this.tileLayerURL, {
      attribution:
        '<a href="https://digitaltashkent.uz">Digital Tashkent Portal</a>',
      minZoom: props.minZoom ?? 10,
    });
    this.tileLayer.addTo(this.map);

    this.setCustomPopupStyles();
    this.imgSliderInstance = new ImgSlider();

    this.updateLayersLanguage();

    const htmlObserver = new MutationObserver(() => {
      this.lang = document.querySelector("html").lang;
      if (!sharedState.components["accordition-right"].refProxy["sort-is-active"]) {
        this.setTreePropsAccordition(this.selectedTreePoint);
      }

      this.updateLayersLanguage();
      this.updateLayers();
    });

    htmlObserver.observe(document.querySelector("html"), {
      attributeFilter: ["lang"],
      attributes: true,
    });

    // Register hook to update map markers
    useMapStore.getState().addHook((state: MapState) => {
      this.points = state.points;
      this.geoJsonData["features"] = state.features;

      if (this.geoJsonData["features"].length > 0) {
        if (!this.geoJsonLayer) {
          this.geoJsonLayer = L.layerGroup().addTo(this.map);
        }
        this.geoJsonLayer.clearLayers();

        L.geoJSON(this.geoJsonData["features"], {
          pointToLayer: (feature: GeoJsonFeature, latLng) => {
            const circleMarker: L.CircleMarker<any> = L.circleMarker(latLng, {
              radius: feature.properties.diameter * 1,
              color: feature.properties.color,
              fillColor: feature.properties.color,
              stroke: true,
              fillOpacity: 1,
            });

            circleMarker.on("click", (event: L.LeafletMouseEvent) => {
              this.onCircleClickHandler(event.target);
            });

            return circleMarker;
          },
        }).addTo(this.map);
      }
    });

    // Fetch initial points
    fetchPoints();

    setTimeout(() => {
      this.renderZoomControls();
    }, 1000);

    this.getCoords = this.getCoords.bind(this);
    this.map.on("click", this.getCoords);
  }

  //#region METHODS
  public renderZoomControls(): void {
    const leafletZoomControlNode = document.querySelector(".leaflet-control-zoom");
    const leafletZoomOutControlNode = leafletZoomControlNode.querySelector(".leaflet-control-zoom-out");
    const knowMyLocationControlNode = document.createElement("a");
    let locationOutput: string;
    let locationCoords: number[];

    knowMyLocationControlNode.setAttribute("class","leaflet-control-know-my-location");
    knowMyLocationControlNode.setAttribute("title", "My location");
    knowMyLocationControlNode.setAttribute("role", "button");
    knowMyLocationControlNode.setAttribute("aria-label", "My location");
    knowMyLocationControlNode.innerHTML = /*html*/ `
      <span aria-hidden="true">
        <img src="data:image/svg+xml,%3Csvg width='22' height='22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.195 10.083a8.245 8.245 0 00-7.278-7.278v-.972A.92.92 0 0011 .917a.92.92 0 00-.917.916v.972a8.245 8.245 0 00-7.278 7.278h-.972A.92.92 0 00.917 11a.92.92 0 00.916.917h.972a8.245 8.245 0 007.278 7.278v.972a.92.92 0 00.917.916.92.92 0 00.917-.916v-.972a8.245 8.245 0 007.278-7.278h.972a.92.92 0 00.916-.917.92.92 0 00-.916-.917h-.972zM11 17.417A6.412 6.412 0 014.583 11 6.412 6.412 0 0111 4.583 6.412 6.412 0 0117.417 11 6.412 6.412 0 0111 17.417z' fill='%23fff'/%3E%3C/svg%3E" alt="Know my location" />
      </span>
    `;

    leafletZoomControlNode.insertBefore(knowMyLocationControlNode, leafletZoomOutControlNode);

    knowMyLocationControlNode.addEventListener("click", () => {
      const showPosition = (position: GeolocationPosition): void => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        locationCoords = [lat, lng];

        const userLocationCircleMarker: L.CircleMarker<any> = L.circleMarker([lat, lng], { radius: 50 }).addTo(this.map);

        this.map.setView([lat, lng], 15);

        const popup = userLocationCircleMarker.bindPopup(/*html*/`
          <div class="leaflet-my-location-popup">
            <span>This is your approximate location!</span>
            <button type="button" class="leaflet-remove-point-btn">Remove</button>
          </div>
        `);

        popup.openPopup();

        userLocationCircleMarker.on("click", () => {
          popup.openPopup();
          this.map.setView([lat, lng], 15);

          const removePointBtn: HTMLButtonElement = document.querySelector(".leaflet-remove-point-btn");
          removePointBtn.addEventListener("click", () => {
            userLocationCircleMarker.removeFrom(this.map);
          });
        });

        const removePointBtn: HTMLButtonElement = document.querySelector(".leaflet-remove-point-btn");
        removePointBtn.addEventListener("click", () => {
          userLocationCircleMarker.removeFrom(this.map);
        });
      };

      const showError = (error: GeolocationPositionError): void => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            locationOutput = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            locationOutput = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            locationOutput = "The request to get user location timed out.";
            break;
          default:
            locationOutput = "An unknown error occurred.";
            break;
        }
      };

      if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, {
          enableHighAccuracy: true,
        });
      }
    });

  }

  public onCircleClickHandler = (circleMarker: L.CircleMarker<any>) => {
    if (window.innerWidth <= 1024) {
      this.setMobileTreeProps(
        this.imgSliderInstance,
        circleMarker,
        circleMarker.getLatLng(),
        circleMarker.feature.properties
      );

      const OFFSET = 0.007; // Adjust this value as needed
      let latlng = circleMarker.getLatLng();
      let newCenter = L.latLng(latlng.lat + OFFSET, latlng.lng);
      this.map.setView(newCenter, 20);
    } else {
      this.setTreePropsAccordition(circleMarker.feature.properties);
      this.map.setView(circleMarker.getLatLng(), 20);
    }
  };

  public setViewProps(initialView: [number, number], zoomLevel: number): void {
    this.initialView = initialView;
    this.zoomLevel = zoomLevel;
  }

  public setCustomPopupStyles(): void {
    this.customPopupStyleElement = document.createElement("style");
    this.customPopupStyles = /*css*/ `
      .leaflet-popup {
        font-family: "Golos Text", sans-serif;
      }

      .leaflet-popup-content-wrapper {
        background: #0000007A;
        color: var(--white);
        border-radius: 0.5rem;

        width: 26.75rem;
      }

      .leaflet-popup-content {
        width: 100% !important;
        margin: 0;
        padding: 13px 24px 13px 20px;
      }

      .leaflet-popup-close-button {
        zoom: 1.5;
      }

      .leaflet-popup-tip {
        background: #0000007A;
      }

      .leaflet-my-location-popup {
        display: flex;
        flex-flow: column;
        width: 100%;
        height: 100%;
      }

      .leaflet-remove-point-btn {
        position: relative;
        background: var(--white);
        color: var(--black);
        padding: 0.5rem 1rem;;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        max-width: 5rem;
        margin-top: 1rem;
        transition: all 0.3s ease;
      }

      .leaflet-remove-point-btn:hover {
        opacity: 0.75;
      }
    `;
    this.customPopupStyleElement.textContent = this.customPopupStyles;
    document.head.appendChild(this.customPopupStyleElement);
  }

  public createPopupTemplate(props: TreeObjectPoint): string {
    let popupContent: string;

    // customize it when you start building mobile
    popupContent = /*html*/ `
      <article class="popup-leaflet-container-special">
        <strong>ID:</strong> ${props.id} <br>
        <strong>Title Name:</strong> ${props[this.lang].name} <br>
        <div class="img-slider"></div>
        <strong>Type:</strong> ${props[this.lang].type} <br>
        <strong>Height:</strong> ${props.height} <br>
        <strong>Thickness:</strong> ${props[this.lang].name} <br>
        <strong>Diameter:</strong> ${props.diameter} <br>
        <strong>Address:</strong> ${props.address} <br>
        <strong>Coordinates:</strong> ${props[this.lang].coordinates} <br>
        <strong>Volunteer:</strong> ${props[this.lang].volunteer} <br>
        <strong>Balance Holder:</strong> ${props[this.lang].holder} <br>
        <strong>Last Date Update:</strong> ${props.date_update} <br>
      </article>
    `;

    return popupContent;
  }

  public setMobileTreeProps(
    imgSliderInstance: ImgSlider,
    pointMarker: any,
    center: any,
    props: TreeObjectPoint,
    popup?: any
  ): void {
    const popupContent: string = this.createPopupTemplate(props);

    if (pointMarker) {
      pointMarker.bindPopup(popupContent).openPopup();
    }

    if (popup) {
      popup.setLatLng(center).setContent(popupContent).openOn(this.map);
    }

    setTimeout(() => {
      const imgSliderContainer: HTMLElement = document.querySelector(
        ".leaflet-popup-content .img-slider"
      );

      try {
        if (imgSliderContainer) {
          imgSliderContainer.innerHTML = "";
          imgSliderContainer.appendChild(imgSliderInstance);

          imgSliderInstance.refs["img-wrapper"].style.width = "100%";
          imgSliderInstance.refs["img-wrapper"].style.minHeight = "12.5625rem";

          imgSliderInstance.setImages();
          imgSliderInstance.refProxy["img-selected-url"] = props.image_url[0];
          imgSliderInstance.refProxy[
            "current-page"
          ] = `1/${props.image_url.length}`;
          imgSliderInstance.refProxy["treeId"] = props.id;
          imgSliderInstance.refProxy["img-list"] = props.image_url;
        }
      } catch (err) {
        console.error(err);
      }
    }, 250);
  }

  public selectedTreePoint: TreeObjectPoint;

  public setTreePropsAccordition(props: TreeObjectPoint): void {
    sharedState
      .getComponent("accordition-right")
      .then((accRight: AccorditionRight) => {
        accRight.refProxy["is-active"] = true;
        accRight.refProxy["sort-is-active"] = false;

        let treeProps: TreePropsAccordition | ReactiveElement = accRight.components["tree-props-accordition"];
        let data: {} = treeProps.refProxy;
        let values: {} = data["values"];

        values["treeId"] = props.id;
        values["titleName"] = props[this.lang].name;
        values["height"] = props.height;
        values["thickness"] = props.width;
        values["diameter"] = props.diameter;
        values["address"] = props.address;
        values["coordinates"] = props.coords;
        values["volunteer"] = props[this.lang].volunteer;
        values["balanceHolder"] = props[this.lang].holder;
        values["lastDateUpdated"] = props.date_update;

        let image_urls: string[] = [];
        props.image_url.forEach((imgURL: string) => {
          let newURL: string = "upload/" + imgURL;
          image_urls.push(newURL);
        });

        values["imgList"] = image_urls;

        this.selectedTreePoint = props;

        PlayFadeInAnimation(treeProps, 1000);
      })
      .catch((err) => console.error(err));
  }

  public setWMSLayerCheck(layerName: string, toggleValue: boolean): void {
    this.wmsLayers.forEach((layer: WmsLayer) => {
      if (layer.url === layerName) {
        layer.isChecked = toggleValue;
      }
    });

    this.updateLayers();
  }

  public updateLayers(): void {
    this.wmsLayers.forEach((layer: WmsLayer) => {
      if (layer.isChecked) {
        layer.wmsLayer.addTo(this.map);
      } else {
        layer.wmsLayer.removeFrom(this.map);
      }
    });
  }

  // Add this method to the LeafletMap class
  public filterGeoJSONByProperties(filters: { [key: string]: any }): void {
    const filteredFeatures = this.geoJsonData["features"].filter(
      (feature: GeoJsonFeature) => {
        return Object.keys(filters).every((key) => {
          if (
            filters[key] === undefined ||
            filters[key] === null ||
            filters[key] === ""
          ) {
            return true;
          }
          return feature.properties[key] == filters[key];
        });
      }
    );

    if (!this.geoJsonLayer) {
      this.geoJsonLayer = L.layerGroup().addTo(this.map);
    }
    this.geoJsonLayer.clearLayers();

    L.geoJSON(filteredFeatures, {
      pointToLayer: (feature: GeoJsonFeature, latLng) => {
        const circleMarker: L.CircleMarker<any> = L.circleMarker(latLng, {
          radius: feature.properties.diameter * 2,
          color: feature.properties.color,
          fillColor: feature.properties.color,
          stroke: true,
          fillOpacity: 1,
        });

        circleMarker.on("click", (event: L.LeafletMouseEvent) => {
          this.onCircleClickHandler(event.target);
        });

        return circleMarker;
      },
    }).addTo(this.map);
  }

  public updateLayersLanguage(): void {
    let currentLangForMap: string;

    switch (this.lang) {
      case "oz":
        currentLangForMap = "uz_lt";
        break;
      case "uz":
        currentLangForMap = "uz_kr";
        break;
      case "ru":
        currentLangForMap = "ru";
        break;
    }

    for (let i = 0; i < this.wmsLayers.length; ++i) {
      let wmsLayer: WmsLayer = this.wmsLayers[i];

      switch (wmsLayer.name) {
        case "toshkent_sh_mahallalar":
          wmsLayer.wmsLayer.removeFrom(this.map);
          wmsLayer.url = `green_geoserver_db:Toshkent_sh_mahallalar_585_${currentLangForMap}`;
          wmsLayer.wmsLayer.setParams({
            layers: `green_geoserver_db:Toshkent_sh_mahallalar_585_${currentLangForMap}`,
          });
          wmsLayer.wmsLayer.addTo(this.map);
          break;
        case "toshkent_chegara":
          wmsLayer.wmsLayer.removeFrom(this.map);
          wmsLayer.url = `green_geoserver_db:Toshkent_chegara_${currentLangForMap}`;
          wmsLayer.wmsLayer.setParams({
            layers: `green_geoserver_db:Toshkent_chegara_${currentLangForMap}`,
          });
          wmsLayer.wmsLayer.addTo(this.map);
          break;
      }
    }

    this.updateLayers();
  }

  public setTileLayerToMap(layerName: string): void {
    this.mapWmsLayers.forEach((layer: MapLayerType) => {
      if (layer.slug === layerName) {
        layer.tile.addTo(map.map);
      } else {
        layer.tile.removeFrom(map.map);
      }
    });
  }
  //#endregion

  public async getCoords(evt: L.LeafletMouseEvent): Promise<void> {
    let mapZoom: number = this.map.getZoom();
    let stopExec: boolean;

    this.geoJsonData["features"].forEach((feature: GeoJsonFeature) => {
      let props = feature.properties;
      let latLng: string[] = props.coords.split(",");
      let lat: number;
      let lng: number;

      latLng.forEach((coord: string) => coord.trim());
      lat = Number(latLng[0]);
      lng = Number(latLng[1]);

      if (lat === evt.latlng.lat && lng === evt.latlng.lng) {
        stopExec = true;
        return;
      }
    });

    if (stopExec) {
      return;
    }

    try {
      let point = this.map.latLngToContainerPoint(evt['latlng']);
      let size = this.map.getSize();

      let layers: string;
      let query_layers: string = layers;
      let setZoomLevel: number;

      this.wmsLayers.forEach((wmsLayer: WmsLayer) => {
        if (mapZoom <= 14) {
          if (wmsLayer.name === "toshkent_chegara" && wmsLayer.isChecked === true) {
            layers = wmsLayer.url;
            setZoomLevel = 12;
          }
        } else {
          if (wmsLayer.name === "toshkent_sh_mahallalar" && wmsLayer.isChecked === true) {
            layers = wmsLayer.url;
            setZoomLevel = 16;
          }
        }
      });

      if (!layers) {
        return;
      }

      console.group("GET_COORDS");
      let params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        styles: "",
        transparent: true,
        version: "1.1.1",
        format: "image/png",
        bbox: this.map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        tiled: true,
        layers: layers,
        query_layers: query_layers,
        FEATURE_COUNT: 1,
        info_format: "application/json"
      };

      params[params.version === '1.3.0' ? 'i' : 'x'] = Math.floor(point.x);
      params[params.version === '1.3.0' ? 'j' : 'y'] = Math.floor(point.y);

      let url: string = (wmsURL + L.Util.getParamString(params, wmsURL, true));
      console.log(url);

      let fetchResponse: any = await fetch(url);
      let data: any;

      try {
        if (!fetchResponse.ok) {
          throw "Response wasn't ok!";
        }
        data = await fetchResponse.json();
      } catch (err) {
        console.error(err);
      }

      let geoJson: any = data;
      let props: any;
      let name: string;
      let areaInHec: number;
      let areaInKM: number;

      const convertHecToKM = (input: number): number => input * 0.01;

      if (geoJson.features && geoJson.features[0]) {
        props = geoJson.features[0].properties;
        areaInHec = props.area;
        areaInKM = convertHecToKM(areaInHec);

        switch (this.lang) {
          case "ru": name = props["name_ru"]; break;
          case "oz": name = props["name_uz_lt"]; break;
          case "uz": name = props["name_uz_kr"]; break;
          default: console.warn("Undefined lang value!"); break;
        }

        let popup = this.tileLayer.bindPopup(`${name} - ${areaInKM.toPrecision(2)} km`);
        popup.openPopup(evt['latlng']);
        this.map.setView(evt['latlng']);
      }

      console.log(geoJson);
    } catch (e) {
      console.warn(e);
    }
    console.groupEnd();
  }
}

export let map: LeafletMap;

try {
  map = new LeafletMap({
    tileLayerURL: darkMapURL,
    initialView: initialLocation,
    zoomLevel: 12,
    minZoom: 1,
  });
} catch (err) {
  console.error(err);
}
