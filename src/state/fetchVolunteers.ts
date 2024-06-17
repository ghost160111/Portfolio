import { useMapStore } from "./MapStore";
import { volunteersURL } from "../constants/API_URL";
// @ts-ignore
import FetchRequestWorker from "../web_workers/fetch_request.worker";
import { Volunteer } from "./Interfaces";
import WorkerHandler from "../web_workers/classes/WorkerHandler";

export const INTERVAL_TIME_SECONDS = 30;

export const fetchVolunteers = () => {
  const fetchWorker = new WorkerHandler(FetchRequestWorker, (event: MessageEvent) => {
    const data = event.data;
    const volunteers: Volunteer[] = data.volonteers;

    useMapStore.getState().setVolunteers(volunteers);
  });

  fetchWorker.postMessage(volunteersURL);
};

setInterval(fetchVolunteers, INTERVAL_TIME_SECONDS * 1000);
