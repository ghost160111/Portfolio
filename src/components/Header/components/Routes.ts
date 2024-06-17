import { Routes } from "../../../plugins/ReactiveElement/Interfaces/IRoutes";
import HomeView from "../../Views/Home";
import NewsView from "../../Views/News";
import PlantTreesView from "../../Views/PlantTrees";
import Error404 from "../../Views/Error404";
import { sharedState } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";
import AccorditionLeft from "../../Global/Accordition/AccorditionLeft";

const openAccorditionLeft = () => {
  sharedState.getComponent<AccorditionLeft>("accordition-left")
    .then((component: AccorditionLeft) => component.refProxy["is-active"] = true)
    .catch((err) => console.error(err));
}

const routes: Routes = {
  "/": {
    component: new HomeView(),
    title: "Home",
    callback() {
      openAccorditionLeft();
    }
  },
  "/news": {
    component: new NewsView(),
    title: "News"
  },
  "/plant-trees": {
    component: new PlantTreesView(),
    title: "Plant Trees"
  },
  "error-404": {
    component: new Error404(),
    title: "Error 404"
  }
}

export default routes;
