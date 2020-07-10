export interface Country
{
    id: number;

    iso: string;
    name: string;
    niceName: string;
    iso3: string;
    numCode: number | null;
    phoneCode: number | null;
}
