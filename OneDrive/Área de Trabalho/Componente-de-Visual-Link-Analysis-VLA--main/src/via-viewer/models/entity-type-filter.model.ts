import { LucideIconInput } from "@lucide/angular"
import { EntityCategory } from "./vla-node.model"


export interface FilterOption {
    type: EntityCategory,
    color: string,
    label: string,
    active: boolean,
    icon: LucideIconInput
}