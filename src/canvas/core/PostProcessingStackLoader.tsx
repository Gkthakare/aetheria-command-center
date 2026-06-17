"use client";

import { lazy, Suspense } from "react";

const PostProcessingStack = lazy(() =>
  import("@/canvas/core/PostProcessingStack").then((module) => ({
    default: module.PostProcessingStack,
  })),
);

export function PostProcessingStackLoader() {
  return (
    <Suspense fallback={null}>
      <PostProcessingStack />
    </Suspense>
  );
}
