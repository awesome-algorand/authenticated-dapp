import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Credential = {
  id: string,
  device: string,
}

type Address = {
  name: string,
  credentials: Credential[]
}

type Addresses = {
  [k: string]: Address
}

type CredentialStore = {
  addresses: Addresses,
  update: (address: Address) => void,
  remove: (address: Address) => void,
}
export const useCredentialStore = create<CredentialStore>(
  persist<CredentialStore>(
    (set, get) => ({
      addresses: {},
      update: (address) => set((state) => ({ addresses: { ...get().addresses, [address.name]: address } })),
      remove: (address) => set((state) => {
        const addresses = { ...get().addresses };
        delete addresses[address.name];
        return { addresses };
      }),
    }),
  { name: 'avicennia-credential-store', storage: createJSONStorage(() => localStorage) }
  ),
);
