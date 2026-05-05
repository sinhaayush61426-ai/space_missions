import { Skeleton } from "@/components/ui/skeleton";
import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";

const ExoplanetDetailSkeleton = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <Starfield />
      <Navbar />
      <div className="pt-24 px-6">
        <div className="container mx-auto">
          <Skeleton className="h-6 w-40 mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-32 rounded-full" />
              </div>
              <Skeleton className="h-14 w-72" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-4 w-48" />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-card border border-border/50 rounded-xl p-4">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Skeleton className="w-full max-w-lg aspect-square rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

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

      <div className="py-12 px-6">
        <div className="container mx-auto">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-56 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border/50 rounded-xl p-6">
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExoplanetDetailSkeleton;
