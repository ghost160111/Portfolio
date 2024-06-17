import NavLogo from "./components/NavLogo";
import NavMapSelector from "./components/NavMapSelector";
import NavTreeStat from "./components/NavTreeStat";
import NavLinks from "./components/NavLinks";
import NavLogin from "./components/NavLogin";
import NavSettings from "./components/NavSettings";
import NavLang from "./components/NavLang";
import NavSearch from "./components/NavSearch";

const AppHeader = () => {
  const header = document.querySelector(".header");

  const components = {
    "nav-logo": new NavLogo({ logo: "#greentashkent" }),
    "nav-map-selector": new NavMapSelector(),
    "nav-tree-stat": new NavTreeStat({ apiUrl: "Enter API url..." }),
    "nav-settings": new NavSettings(),
    "nav-links": new NavLinks(),
    "nav-lang": new NavLang(),
    "nav-search": new NavSearch(),
    // "nav-login": new NavLogin()
  };

  let ml32: string = "ml-32";
  let headerMargins: string[] = [
    "nav-map-selector",
    "nav-tree-stat",
    "nav-settings",
    // "nav-login",
    "nav-search"
  ];

  for (let key of headerMargins) {
    components[key].classList.add(ml32);
  }

  let navLeft: HTMLElement = header.querySelector(".nav__left");
  let navRight: HTMLElement = header.querySelector(".nav__right");

  navLeft.append(
    components["nav-logo"],
    components["nav-map-selector"],
    components["nav-tree-stat"],
    components["nav-settings"]
  );

  navRight.append(
    components["nav-links"],
    components["nav-lang"],
    components["nav-search"],
    // components["nav-login"]
  );

  // somehow solved problem using resize event, need to bind it to watcher inside of NavTreeStat component!
  const updateNavSettingsPosition = () => {
    if (window.innerWidth <= 639) {
      components["nav-tree-stat"].classList.remove("ml-32");
      components["nav-settings"].style.left = `${(components["nav-tree-stat"].offsetWidth + (components["nav-settings"].offsetWidth / 2) - 12) / 16}rem`;

      if (components["nav-tree-stat"].offsetWidth >= 600) {
        components["nav-settings"].style.top = "3rem";
        components["nav-settings"].style.left = "5rem";
      }
    } else {
      components["nav-tree-stat"].classList.add("ml-32");
    }
  }

  updateNavSettingsPosition();
  window.addEventListener("resize", updateNavSettingsPosition);
}

export default AppHeader;
