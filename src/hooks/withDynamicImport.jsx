import { lazy, Suspense } from "react";

import { Loader } from "../components/Loader/Loader";

export const withDynamicImport = (callback, loading) => {
const LazyElement = lazy(callback);

  if (!loading) {
    return (props) => {
      return (
        <Suspense>
          <LazyElement {...props} />
        </Suspense>
      );
    };
  }

  const defaultLoadingEl = <Loader />;

  const loadingEl = loading === true ? defaultLoadingEl : loading;

  return (props) => {
    return (
        <Suspense fallback={loadingEl}>
            <LazyElement {...props}/>
        </Suspense>
    )
  }
}