import {useSearchParams} from "react-router-dom";

const usePushToSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const pushToSearch = (obj: { [key: string]: string}): void => {
    for (const key in obj) {
      if (obj[key] !== '' && obj[key]) {
        searchParams.set(key, obj[key])
      } else {
        searchParams.delete(key)
      }
      setSearchParams(searchParams)
    }
  }
  return {
    pushToSearch,
    searchParams
  }
};

export { usePushToSearch }
