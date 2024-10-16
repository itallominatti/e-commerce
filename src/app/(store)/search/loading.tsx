import { Skeleton } from "@/components/skeleton";

export default function Search() {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm">
                Carregando...
            </p>

            <div className="grid grid-cols-3 gap-6">
                <Skeleton className="group relative flex rounded-lg bg-zinc-900 overflow-hidden justify-center items-end" />
                <Skeleton className="group relative flex rounded-lg bg-zinc-900 overflow-hidden justify-center items-end" />
                <Skeleton className="group relative flex rounded-lg bg-zinc-900 overflow-hidden justify-center items-end" />
            </div>
        </div>
    );
}