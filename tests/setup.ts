import { faker } from "@faker-js/faker/locale/en";
import { randomIntegerBetween } from "../src/utils/NumberHelpers";
import { mxMock } from "./mockers/mxMock";
import { mxserverMock } from "./mockers/mxserverMock";

beforeEach(() => {
    faker.seed(randomIntegerBetween(0, Math.pow(2, 16) - 1));
});

(global as any).mx = mxMock;
(global as any).mxserver = mxserverMock;
