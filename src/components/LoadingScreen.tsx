interface LoadingScreenProps {
    className?: string;
}

export function LoadingScreen({ className = '' }: LoadingScreenProps) {
    return (
        <div className={`fixed inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white font-serif ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg p-8 shadow-2xl">
                    <div className="text-center">
                        <p className="text-xl">Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
