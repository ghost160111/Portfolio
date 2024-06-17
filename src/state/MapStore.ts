// @ts-ignore
import { create } from 'zustand';
import { TreeObjectPoint, Volunteer } from './Interfaces';
import { GeoJsonFeature } from '../map/LeafletMap';

interface FilterCriteria {
  name?: string;
  height?: number;
  width?: number;
  diameter?: number;
}

export interface MapState {
  features: GeoJsonFeature[];
  points: TreeObjectPoint[];
  volunteers: Volunteer[];
  hooks: Array<(state: MapState) => void>;
  layersURLs: string[];
  filterCriteria: FilterCriteria;
  setFilterCriteria: (criteria: FilterCriteria) => void;
  applyFilters: () => void;
  addHook: (hook: (state: MapState) => void) => void;
  setFeatures: (features: GeoJsonFeature[]) => void;
  setPoints: (points: TreeObjectPoint[]) => void;
  setVolunteers: (volunteers: Volunteer[]) => void;
  triggerHooks: () => void;
  setLayers: (layers: string[]) => void;
  setLayer: (layer: string) => void;
}

export const useMapStore = create<MapState>((set) => ({
  features: [],
  points: [],
  volunteers: [],
  hooks: [],
  layersURLs: [],
  filterCriteria: {},
  setFilterCriteria: (criteria: FilterCriteria) => set((state: MapState) => {
    state.filterCriteria = { ...state.filterCriteria, ...criteria };
    state.applyFilters();
  }),
  applyFilters: () => set((state: MapState) => {
    const filteredFeatures = state.features.filter((feature: GeoJsonFeature) => {
      const { name, height, width, diameter } = state.filterCriteria;
      const featureProps = feature.properties;

      if (name && !featureProps[localStorage.getItem("lang")].name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }

      if (height && featureProps.height !== height) {
        return false;
      }

      if (width && featureProps.width !== width) {
        return false;
      }

      if (diameter && featureProps.diameter !== diameter) {
        return false;
      }

      return true;
    });

    state.features = filteredFeatures;
    state.triggerHooks();
  }),
  addHook: (hook: any) => set((state: MapState) => ({
    hooks: [...state.hooks, hook]
  })),
  setFeatures: (features: GeoJsonFeature[]) => set((state: MapState) => {
    state.features = features;
    state.triggerHooks();
    return state;
  }),
  setPoints: (points: TreeObjectPoint[]) => set((state: MapState) => {
    state.points = points;
    state.triggerHooks();
    return state;
  }),
  setVolunteers: (volunteers: Volunteer[]) => set((state: MapState) => {
    state.volunteers = volunteers;
    state.triggerHooks();
    return state;
  }),
  triggerHooks: () => set((state: MapState) => {
    state.hooks.forEach((hook) => hook(state));
    return state;
  }),
  setLayers: (layers: string[]) => set((state: MapState) => ({
    layersURLs: layers
  })),
  setLayer: (layer: string) => set((state: MapState) => {
    const newLayers = [...state.layersURLs];

    if (!newLayers.includes(layer)) {
      newLayers.push(layer);
    }

    state.layersURLs = newLayers;
    state.triggerHooks();
    return state;
  }),
  toggleLayer: (layerName: string) => set((state: MapState) => {
    const isLayerActive = state.layersURLs.includes(layerName);

    if (isLayerActive) {
      return {
        layersURLs: state.layersURLs.filter((layer) => layer !== layerName),
      };
    } else {
      return {
        layersURLs: [...state.layersURLs, layerName],
      };
    }
  })
}));
