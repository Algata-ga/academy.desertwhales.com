import useSWRInfinite from "swr/infinite";
import useSWR from "swr";

const useSearch = (query) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const params = Object.keys(query).reduce(
        (prev, x) => prev + `&${x}=${query[x]}`,
        ""
    );
    const { data, error } = useSWR(`/api/search?${params}`, fetcher);
    return {
        data: data,
        isLoading: !data && !error,
        isError: error,
    };
};

export default useSearch;
