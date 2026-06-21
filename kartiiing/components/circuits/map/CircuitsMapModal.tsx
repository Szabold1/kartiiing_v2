"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useBodyScrollLock } from "@/lib/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/lib/hooks/useEscapeKey";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ICircuit, ICircuitCoordinate } from "@kartiiing/shared";
import SearchBar from "@/components/shared/SearchBar";
import CircuitsMap from "@/components/circuits/map/CircuitsMap";
import {
  cn,
  lightDarkGlassBase,
  fetchUserLocation,
  lightDarkGlassHover,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getCircuitById, getCircuitCoordinates } from "@/lib/api";

type Props = {
  coordinates: ICircuitCoordinate[];
  isOpen: boolean;
  onClose: () => void;
};

export default function CircuitsMapModal({
  coordinates,
  isOpen,
  onClose,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const [selectedCircuit, setSelectedCircuit] = useState<ICircuit | null>(null);
  const [filteredCoords, setFilteredCoords] =
    useState<ICircuitCoordinate[]>(coordinates);
  const circuitCache = useRef<Map<number, ICircuit>>(new Map());

  // Fetch user location on open
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      const loc = await fetchUserLocation();
      setUserLocation(loc);
    })();
  }, [isOpen]);

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
      console.error("Error fetching filtered coordinates:", err);
      setFilteredCoords([]);
    }
  }, [searchQuery, coordinates]);

  // Fetch filtered coordinates from the API when search query changes
  useEffect(() => {
    if (!isOpen) return;

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [performSearch, isOpen]);

  // Handle circuit selection on map — fetch full data if not cached
  const handleCircuitSelect = useCallback(async (id: number) => {
    // Check cache first
    const cached = circuitCache.current.get(id);
    if (cached) {
      setSelectedCircuit(cached);
      return;
    }

    try {
      const circuit = await getCircuitById(id);
      circuitCache.current.set(id, circuit);
      setSelectedCircuit(circuit);
    } catch (error) {
      console.error("Error fetching circuit for popup:", error);
    }
  }, []);

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
            className="fixed inset-2 sm:inset-4 z-[100] flex flex-col bg-background rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
              mass: 0.8,
            }}
          >
            <div className="flex-1 relative">
              <CircuitsMap
                coordinates={filteredCoords}
                selectedCircuit={selectedCircuit}
                onCircuitSelect={handleCircuitSelect}
                onPopupClose={handlePopupClose}
                className="!min-h-0 !rounded-none !border-0 !shadow-none"
                initialCenter={userLocation}
              />

              {/* Floating search bar */}
              <div className="pointer-events-none inset-x-0 z-10 flex absolute top-4 left-4">
                <div
                  className={cn(
                    "pointer-events-auto flex items-center p-0 gap-3 rounded-lg",
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
                  "absolute top-4 right-4 h-10.5 rounded-lg text-foreground/80",
                  lightDarkGlassHover,
                )}
                aria-label="Close map"
              >
                <X className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">
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
