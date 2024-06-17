import { useMapStore } from './MapStore';
import { treesURL } from '../constants/API_URL';
import WorkerHandler from '../web_workers/classes/WorkerHandler';
// @ts-ignore
import FetchRequestWorker from '../web_workers/fetch_request.worker';
import { TreeObjectPoint } from './Interfaces';
import { GeoJsonFeature } from '../map/LeafletMap';

const INTERVAL_TIME_SECONDS = 30;

export const fetchPoints = () => {
  const fetchWorker = new WorkerHandler(FetchRequestWorker, (event: MessageEvent) => {
    const data = event.data;
    useMapStore.getState().setPoints(data.trees);

    const points: TreeObjectPoint[] = useMapStore.getState().points;
    const featuresGenerated: GeoJsonFeature[] = [];

    points.forEach((point: TreeObjectPoint) => {
      const coords: string[] = point.coords.split(",");
      let latStr: string = coords[0].trim();
      let lngStr: string = coords[1].trim();
      let lat: number = Number(latStr);
      let lng: number = Number(lngStr);

      featuresGenerated.push({
        type: "Feature",
        properties: point,
        geometry: {
          coordinates: [lng, lat],
          type: "Point"
        }
      });
    });

    useMapStore.getState().setFeatures(featuresGenerated);
  });

  fetchWorker.postMessage(treesURL);
};

setInterval(fetchPoints, INTERVAL_TIME_SECONDS * 1000); // Fetch data every 30 seconds
