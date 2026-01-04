import { Skeleton } from "@/components/ui/skeleton";

const PlanetDetailSkeleton = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pt-24 px-6">
        <div className="container mx-auto">
          {/* Back button skeleton */}
          <Skeleton className="h-6 w-40 mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Planet Info skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-16 w-64" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>

              {/* Stats Grid skeleton */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-card border border-border/50 rounded-xl p-4">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Planet skeleton */}
            <div className="flex items-center justify-center">
              <Skeleton className="w-64 h-64 sm:w-80 sm:h-80 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Facts Section skeleton */}
      <div className="py-12 px-6 mt-8">
        <div className="container mx-auto">
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card border border-border/50 rounded-xl p-4">
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline skeleton */}
      <div className="py-12 px-6">
        <div className="container mx-auto">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-56 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
                <div className="flex-1 bg-card border border-border/50 rounded-xl p-4">
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetailSkeleton;
