export enum eNavAction {
    First,
    Previous,
    Next,
    Last
}
export class KNavInfo {
    public from: number;
    public to: number;
    public action: eNavAction;
}