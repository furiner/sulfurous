import { Integration } from "../Integration";

export type IntegrationEvent = "enable" | "request";

// INTEGRATION EVENTS
export type IntegrationEventFunction =
    IntegrationEventFunctionBody
    & {
        eventName?: IntegrationEvent
    }

export type IntegrationEventFunctionBody = (...args: any[]) => void;
