import { Component } from "./component";

export interface Project {
    id: number;
    name: string;
    description?: string;
    components: Component[];
}
