import type { ReactNode } from 'react';

interface UIGridOverlayProps {
    children: ReactNode;
    debug?: boolean;
    mobileBreakpoint?: 'sm' | 'md' | 'lg';
}

export const UIGridOverlay: React.FC<UIGridOverlayProps> = ({
    children,
    debug = false,
    mobileBreakpoint = 'md'
}) => {
    // Generate debug grid lines if debug mode is enabled
    const DebugGrid = () => {
        if (!debug) return null;

        return (
            <>
                {/* Vertical grid lines */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Left third */}
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-red-400 opacity-30"></div>
                    {/* Center */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-400 opacity-50"></div>
                    {/* Right third */}
                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-red-400 opacity-30"></div>
                </div>

                {/* Horizontal grid lines */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Top third */}
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-red-400 opacity-30"></div>
                    {/* Center */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-red-400 opacity-50"></div>
                    {/* Bottom third */}
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-red-400 opacity-30"></div>
                </div>

                {/* Zone labels for debugging */}
                <div className="absolute inset-0 pointer-events-none text-xs font-mono text-red-500">
                    {/* Top row */}
                    <div className="absolute top-2 left-2">top-left</div>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">top-center</div>
                    <div className="absolute top-2 right-2">top-right</div>

                    {/* Middle row */}
                    <div className="absolute top-1/2 left-2 transform -translate-y-1/2">center-left</div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">center</div>
                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2">center-right</div>

                    {/* Bottom row */}
                    <div className="absolute bottom-2 left-2">bottom-left</div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">bottom-center</div>
                    <div className="absolute bottom-2 right-2">bottom-right</div>
                </div>
            </>
        );
    };

    return (
        <div
            className={`
        fixed inset-0 pointer-events-none z-[100]
        ${mobileBreakpoint === 'sm' ? 'sm:block' : ''}
        ${mobileBreakpoint === 'md' ? 'md:block' : ''}
        ${mobileBreakpoint === 'lg' ? 'lg:block' : ''}
      `}
            data-ui-grid-overlay="true"
        >
            {/* Debug grid visualization */}
            <DebugGrid />

            {/* UI Elements Container */}
            <div className="relative w-full h-full">
                {children}
            </div>
        </div>
    );
};
