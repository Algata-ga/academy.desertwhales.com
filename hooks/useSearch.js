import useSWRInfinite from "swr/infinite";
import useSWR from "swr";

const useSearch = (query) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, error } = useSWR(`/api/search?${query}`, fetcher);
    return {
        data: data,
        isLoading: !data && !error,
        isError: error,
    };
};

export default useSearch;
