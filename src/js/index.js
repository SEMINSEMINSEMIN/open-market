const modules = {};

const load = async (file) => {
    modules[file] = await import(`./views/${file}.js`);
};

const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
        (result) => result[1]
    );

    return Object.fromEntries(
        keys.map((key, i) => {
            return [key, values[i]];
        })
    );
};

const navigateTo = (url) => {
    history.pushState(null, "", url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: "Home" },
        { path: "/login", view: "Login" },
        { path: "/signup", view: "SignUp" },
        { path: "/item/:id", view: "Detail" },
        { path: "/cart", view: "Cart" },
        { path: "/order", view: "Order" },
        { path: "/dashboard", view: "DashBoard" },
        { path: "/upload", view: "ProductUpload" },
    ];

    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path)),
        };
    });

    let match = potentialMatches.find(
        (potentialMatches) => potentialMatches.result !== null
    );

    if (!match) {
        const curPath = location.pathname;
        const Error = await import(`./views/Error.js`);
        const error = new Error.default();
        error.test();
    } else {
        const view = match.route.view;

        if (!modules[view]) {
            // $loading.style.cssText = "display: block";
            await load(view);
        }

        const viewRender = new modules[view].default(getParams(match));
        viewRender.test();
        // if ($loading.style.display === "block") $loading.style.cssText = "display: none";
    }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});
