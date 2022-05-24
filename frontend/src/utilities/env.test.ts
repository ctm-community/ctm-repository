import { getPublicPath, getRestAPI } from "utilities/env";

it("getPublicPath test undefined PUBLIC_URL", () => {
    delete process.env.PUBLIC_URL;
    expect(process.env.PUBLIC_URL).toBe(undefined);

    expect(getPublicPath("img/some_image.png")).toBe("/img/some_image.png");
    expect(getPublicPath("/idk.png")).toBe("/idk.png");
});

it("getPublicPath test defined PUBLIC_URL", () => {
    process.env.PUBLIC_URL = "somedomain.local";
    expect(process.env.PUBLIC_URL).toBe("somedomain.local");

    expect(getPublicPath("img/some_image.png")).toBe("somedomain.local/img/some_image.png");
    expect(getPublicPath("/idk.png")).toBe("somedomain.local/idk.png");
});

it("getPublicPath test defined PUBLIC_URL with /", () => {
    process.env.PUBLIC_URL = "somedomain.local/";
    expect(process.env.PUBLIC_URL).toBe("somedomain.local/");

    expect(getPublicPath("img/some_image.png")).toBe("somedomain.local/img/some_image.png");
    expect(getPublicPath("/idk.png")).toBe("somedomain.local/idk.png");
});

it("getRestAPI test prod", () => {
    process.env.NODE_ENV = "production";
    process.env.REACT_APP_USE_PRODUCTION_API = "";

    process.env.REACT_APP_PRODUCTION_API = "prod";
    process.env.REACT_APP_DEVELOPMENT_API = "dev";

    expect(getRestAPI()).toBe("prod");

    process.env.NODE_ENV = "dev";

    expect(getRestAPI()).toBe("dev");

    process.env.REACT_APP_USE_PRODUCTION_API = "true";

    expect(getRestAPI()).toBe("prod");

    delete process.env.REACT_APP_PRODUCTION_API;

    expect(getRestAPI).toThrow(Error);

    process.env.REACT_APP_PRODUCTION_API = "prod";

    process.env.REACT_APP_USE_PRODUCTION_API = "false";

    delete process.env.REACT_APP_DEVELOPMENT_API;

    expect(getRestAPI).toThrow(Error);
});
