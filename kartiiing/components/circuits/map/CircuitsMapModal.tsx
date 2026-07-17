'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useBodyScrollLock } from '@/lib/hooks/useBodyScrollLock';
import { useEscapeKey } from '@/lib/hooks/useEscapeKey';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ICircuit, ICircuitCoordinate } from '@kartiiing/shared';
import { SearchBar } from '@/components/shared/SearchBar';
import { CircuitsMap } from '@/components/circuits/map/CircuitsMap';
import { useShallow } from 'zustand/shallow';
import { useUserLocationStore } from '@/lib/stores/userLocationStore';
import { cn, lightDarkGlassBase, lightDarkGlassHover } from '@/lib/utils';
import { calculateDistance } from '@/lib/utils/locationUtils';
import { Button } from '@/components/ui/button';
import { getCircuitById, getCircuitCoordinates } from '@/lib/api';

type Props = {
  coordinates: ICircuitCoordinate[];
  isOpen: boolean;
  onClose: () => void;
};

export function CircuitsMapModal({ coordinates, isOpen, onClose }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCircuit, setSelectedCircuit] = useState<ICircuit | null>(null);
  const [filteredCoords, setFilteredCoords] =
    useState<ICircuitCoordinate[]>(coordinates);
  const circuitCache = useRef<Map<number, ICircuit>>(new Map());

  const { userLocation, locationSource } = useUserLocationStore(
    useShallow((s) => ({
      userLocation: s.userLocation,
      locationSource: s.locationSource,
    })),
  );
  // Close on Escape key
  useEscapeKey(isOpen, onClose);
  // Prevent body scroll when modal is open
  useBodyScrollLock(isOpen);
  // Trap Tab/Shift+Tab focus within the modal
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, modalRef);

  const performSearch = useCallback(async () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setFilteredCoords(coordinates);
      return;
    }

    try {
      const result = await getCircuitCoordinates(trimmed);
      setFilteredCoords(result);
    } catch (err) {
      console.error('Error fetching filtered coordinates:', err);
      setFilteredCoords([]);
    }
  }, [searchQuery, coordinates]);

  // Reset search state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setFilteredCoords(coordinates);
      setSelectedCircuit(null);
    }
  }, [isOpen, coordinates]);

  // Sync filteredCoords when coordinates prop changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCoords(coordinates);
    }
  }, [coordinates, searchQuery]);

  // Fetch filtered coordinates from the API when search query changes
  useEffect(() => {
    if (!isOpen) return;

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [performSearch, isOpen]);

  // Handle circuit selection on map — fetch full data if not cached
  const handleCircuitSelect = useCallback(
    async (id: number) => {
      // Check cache first
      const cached = circuitCache.current.get(id);
      if (cached) {
        setSelectedCircuit(cached);
        return;
      }

      try {
        const circuit = await getCircuitById(id);
        const circuitWithDistance: ICircuit = { ...circuit };
        if (userLocation) {
          circuitWithDistance.distance = Math.round(
            calculateDistance(userLocation, circuit.coordinates),
          );
        }
        circuitCache.current.set(id, circuitWithDistance);
        setSelectedCircuit(circuitWithDistance);
      } catch (error) {
        console.error('Error fetching circuit for popup:', error);
      }
    },
    [userLocation],
  );

  const handlePopupClose = useCallback(() => {
    setSelectedCircuit(null);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={onClose}
          />

          {/* Full-screen map modal */}
          <motion.div
            ref={modalRef}
            className="bg-background fixed inset-2 z-[100] flex flex-col overflow-hidden rounded-3xl shadow-xl sm:inset-4"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 35,
              mass: 0.8,
            }}
          >
            <div className="relative flex-1">
              <CircuitsMap
                coordinates={filteredCoords}
                selectedCircuit={selectedCircuit}
                userLocation={userLocation}
                onCircuitSelect={handleCircuitSelect}
                onPopupClose={handlePopupClose}
                className="!min-h-0 !rounded-none !border-0 !shadow-none"
                initialCenter={userLocation}
                initialZoom={locationSource === 'gps' ? 6 : 4}
              />

              {/* Floating search bar */}
              <div className="pointer-events-none absolute inset-x-0 top-4 left-4 z-10 flex">
                <div
                  className={cn(
                    'pointer-events-auto flex items-center gap-3 rounded-lg p-0',
                    lightDarkGlassBase,
                  )}
                >
                  <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder="Search... (e.g. Lonato)"
                  />
                </div>
              </div>

              {/* Close button — top-right corner, above the map's NavigationControl */}
              <Button
                onClick={onClose}
                className={cn(
                  'text-foreground/80 absolute top-4 right-4 h-10.5 w-10.5 rounded-lg sm:w-fit',
                  lightDarkGlassHover,
                )}
                aria-label="Close map"
              >
                <X className="h-5 w-5" />
                <span className="hidden text-sm font-medium sm:inline">
                  Close
                </span>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
