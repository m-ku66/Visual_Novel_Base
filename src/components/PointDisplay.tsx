interface PointDisplayProps {
    points: {
        universal: Record<string, number>;
        route: Record<string, number>;
        prologue: Record<string, number>;
    };
}

export function PointDisplay({ points }: PointDisplayProps) {
    return (
        <div className="flex flex-col gap-2 text-xs">
            {Object.entries(points.universal).length > 0 && (
                <div className="bg-blue-600/80 backdrop-blur-sm border border-blue-500 px-3 py-1 rounded-full">
                    <span className="text-blue-200">Universal: </span>
                    <span className="text-white font-bold">
                        {Object.values(points.universal).reduce((a, b) => (a as number) + (b as number), 0) as React.ReactNode}
                    </span>
                </div>
            )}
            {Object.entries(points.route).length > 0 && (
                <div className="bg-green-600/80 backdrop-blur-sm border border-green-500 px-3 py-1 rounded-full">
                    <span className="text-green-200">Route: </span>
                    <span className="text-white font-bold">
                        {Object.values(points.route).reduce((a, b) => (a as number) + (b as number), 0) as React.ReactNode}
                    </span>
                </div>
            )}
            {Object.entries(points.prologue).length > 0 && (
                <div className="bg-purple-600/80 backdrop-blur-sm border border-purple-500 px-3 py-1 rounded-full">
                    <span className="text-purple-200">Prologue: </span>
                    <span className="text-white font-bold">
                        {Object.values(points.prologue).reduce((a, b) => (a as number) + (b as number), 0) as React.ReactNode}
                    </span>
                </div>
            )}
        </div>
    );
}
