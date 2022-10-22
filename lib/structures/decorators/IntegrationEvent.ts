import { Integration } from "../Integration";
import { IntegrationEvent, IntegrationEventFunction } from "../types/IntegrationEvent";
import { RouteFunction } from "../types/RouteFunction";

export function IntegrationEvent(event: IntegrationEvent) {
    return function (target: Integration, _: string, descriptor: TypedPropertyDescriptor<IntegrationEventFunction>) {
        descriptor.value!.eventName = event;
    }
}