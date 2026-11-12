
import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from "react";

import type { Registration } from "../data/courses";

// Define what the Context shares
export type RegistrationContextValue = {
    registrations: Registration[];
    addRegistration: (
        registration: Omit<Registration, "id">
    ) => void;
    removeRegistration: (id: string) => void;
};

// Create the Context
export const RegistrationContext =
    createContext<RegistrationContextValue | null>(null);

// Define Provider props
type RegistrationProviderProps = {
    children: ReactNode;
};

// Create the Provider
export function RegistrationProvider({children}: RegistrationProviderProps) {

    const [registrations, setRegistrations] =
        useState<Registration[]>([]);

    function addRegistration(
        registration: Omit<Registration, "id">
    ) {
        setRegistrations(prev => [
            ...prev,
            {
                ...registration,
                id: crypto.randomUUID()
            }
        ]);
    }

    function removeRegistration(id: string) {
        setRegistrations(prev =>
            prev.filter(registration => registration.id !== id)
        );
    }

    return (
        <RegistrationContext.Provider
            value={{
                registrations,
                addRegistration,
                removeRegistration
            }}
        >
            {children}
        </RegistrationContext.Provider>
    );
}

export function useRegistrations() {
  const context = useContext(RegistrationContext);

  if (context === null) {
    throw new Error(
      "useRegistrations must be used within a RegistrationProvider"
    );
  }

  return context;
}