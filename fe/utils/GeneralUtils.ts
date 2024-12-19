import { URLParams } from "@/app/models/General";
import { isNumber } from "util";

const firstPage = process.env.FIRST_PAGE || "0";
const pageSize = process.env.PAGE_SIZE || "5";
const defaultSort = process.env.DEFAULT_SORT || "";

export const getURLParams = async (params?: Promise<URLParams>) => {
    const searchParams = await params;

    const search = searchParams?.search || '';
    const sort = searchParams?.sort || defaultSort;

    const tempSize = searchParams?.size || pageSize;
    const size = parseInt(tempSize) > 0 ? tempSize : pageSize;

    const tempPage = searchParams?.page || firstPage;
    const page = tempPage >= firstPage ? tempPage : firstPage;

    return { ...searchParams, search, page, size, sort }
}
export function parseDatetime(date: Date | string) {
    if (typeof date === "string") {
        date = new Date(date)
    }
    return date.toLocaleDateString("en-UK", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}