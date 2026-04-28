"use strict";
/**
 * Timeline Scrubber Component Tests
 *
 * This test suite validates the Timeline Scrubber implementation
 * according to Wave 4 requirements.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var fs = require("fs");
var path = require("path");
(0, globals_1.describe)('Timeline Scrubber Component', function () {
    var appRoot = path.resolve(__dirname);
    var componentPath = path.join(appRoot, 'TimelineScrubber.tsx');
    (0, globals_1.describe)('File existence', function () {
        (0, globals_1.it)('should have the timeline scrubber component file', function () {
            (0, globals_1.expect)(fs.existsSync(componentPath)).toBe(true);
        });
    });
    (0, globals_1.describe)('Component structure and implementation', function () {
        var content = fs.readFileSync(componentPath, 'utf-8');
        (0, globals_1.it)('should be a client component', function () {
            (0, globals_1.expect)(content).toContain("'use client'");
        });
        (0, globals_1.it)('should export a default function', function () {
            (0, globals_1.expect)(content).toMatch(/export default function TimelineScrubber/);
        });
        (0, globals_1.it)('should define TimelineScrubberProps interface', function () {
            (0, globals_1.expect)(content).toContain('interface TimelineScrubberProps');
            (0, globals_1.expect)(content).toContain('runs: FuzzingRun[]');
            (0, globals_1.expect)(content).toContain('onSelectRun: (runId: string) => void');
        });
        (0, globals_1.it)('should handle loading state', function () {
            (0, globals_1.expect)(content).toContain('isLoading');
            (0, globals_1.expect)(content).toContain('animate-pulse');
        });
        (0, globals_1.it)('should handle error state', function () {
            (0, globals_1.expect)(content).toContain('error');
            (0, globals_1.expect)(content).toContain('Failed to load timeline');
        });
        (0, globals_1.it)('should implement keyboard accessibility', function () {
            (0, globals_1.expect)(content).toContain('onKeyDown={handleKeyDown}');
            (0, globals_1.expect)(content).toContain('tabIndex={0}');
            (0, globals_1.expect)(content).toContain('role="slider"');
            (0, globals_1.expect)(content).toContain('aria-label="Timeline Scrubber"');
            (0, globals_1.expect)(content).toContain('ArrowRight');
            (0, globals_1.expect)(content).toContain('ArrowLeft');
        });
        (0, globals_1.it)('should have a premium design with glassmorphism', function () {
            (0, globals_1.expect)(content).toContain('backdrop-blur');
            (0, globals_1.expect)(content).toContain('bg-white/80');
            (0, globals_1.expect)(content).toContain('dark:bg-zinc-950/80');
        });
        (0, globals_1.it)('should show run details in a grid', function () {
            (0, globals_1.expect)(content).toContain('grid');
            (0, globals_1.expect)(content).toContain('Status');
            (0, globals_1.expect)(content).toContain('Product Area');
            (0, globals_1.expect)(content).toContain('Risk Level');
            (0, globals_1.expect)(content).toContain('Seeds');
        });
        (0, globals_1.it)('should use badges for status and severity', function () {
            (0, globals_1.expect)(content).toMatch(/function StatusBadge/);
            (0, globals_1.expect)(content).toMatch(/function SeverityBadge/);
        });
        (0, globals_1.it)('should be responsive', function () {
            (0, globals_1.expect)(content).toContain('md:flex-row');
            (0, globals_1.expect)(content).toContain('lg:grid-cols-4');
        });
        (0, globals_1.it)('should have navigation buttons', function () {
            (0, globals_1.expect)(content).toContain('title="Previous Run"');
            (0, globals_1.expect)(content).toContain('title="Next Run"');
            (0, globals_1.expect)(content).toContain('handleIndexChange(index - 1)');
            (0, globals_1.expect)(content).toContain('handleIndexChange(index + 1)');
        });
        (0, globals_1.it)('should use animations/transitions', function () {
            (0, globals_1.expect)(content).toContain('transition-all');
            (0, globals_1.expect)(content).toContain('duration-300');
            (0, globals_1.expect)(content).toContain('animate-pulse');
        });
    });
    (0, globals_1.describe)('Integration and edge cases', function () {
        var content = fs.readFileSync(componentPath, 'utf-8');
        (0, globals_1.it)('should handle empty runs list', function () {
            (0, globals_1.expect)(content).toContain('if (runs.length === 0) return null');
        });
        (0, globals_1.it)('should clamp index if runs change', function () {
            (0, globals_1.expect)(content).toContain('setIndex(runs.length - 1)');
        });
        (0, globals_1.it)('should display formatted numbers', function () {
            (0, globals_1.expect)(content).toContain('toLocaleString()');
        });
        (0, globals_1.it)('should handle large lists by thinning ticks', function () {
            (0, globals_1.expect)(content).toContain('runs.length > 20');
        });
    });
});
