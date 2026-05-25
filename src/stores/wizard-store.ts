import { create } from "zustand";
import type {
  ContactData,
  Interesse,
  MatchResult,
  Porte,
  Urgencia,
  WizardStep,
} from "@/types/wizard";
import { WIZARD_ORDER } from "@/types/wizard";

type WizardState = {
  currentStep: WizardStep;
  interesse: Interesse | null;
  dor: string | null;
  observacaoLivre: string | null;
  porte: Porte | null;
  urgencia: Urgencia | null;
  match: MatchResult | null;
  scheduledDate: string | null;
  scheduledSlot: string | null;
  contact: ContactData | null;
  meetLink: string | null;
  waUrl: string | null;
  submitting: boolean;
  errorMessage: string | null;
  modalOpen: boolean;
  modalState: "idle" | "submitting" | "success";

  setStep: (step: WizardStep) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
  setInteresse: (interesse: Interesse) => void;
  setDor: (dor: string) => void;
  setObservacaoLivre: (text: string | null) => void;
  setPorte: (porte: Porte) => void;
  setUrgencia: (urgencia: Urgencia) => void;
  setMatch: (match: MatchResult) => void;
  setScheduledDate: (date: string) => void;
  setScheduledSlot: (slot: string | null) => void;
  setContact: (contact: ContactData) => void;
  setSubmitting: (b: boolean) => void;
  setError: (msg: string | null) => void;
  setConfirmation: (meetLink: string, waUrl: string) => void;
  openModal: () => void;
  closeModal: () => void;
  setModalState: (s: "idle" | "submitting" | "success") => void;
};

const INITIAL = {
  currentStep: "interesse" as WizardStep,
  interesse: null,
  dor: null,
  observacaoLivre: null,
  porte: null,
  urgencia: null,
  match: null,
  scheduledDate: null,
  scheduledSlot: null,
  contact: null,
  meetLink: null,
  waUrl: null,
  submitting: false,
  errorMessage: null,
  modalOpen: false,
  modalState: "idle" as const,
};

function stepIndex(s: WizardStep): number {
  return WIZARD_ORDER.indexOf(s);
}

export const useWizard = create<WizardState>((set, get) => ({
  ...INITIAL,
  setStep: (step) => set({ currentStep: step }),
  next: () => {
    const i = stepIndex(get().currentStep);
    const nextStep = WIZARD_ORDER[Math.min(i + 1, WIZARD_ORDER.length - 1)];
    set({ currentStep: nextStep });
  },
  prev: () => {
    const i = stepIndex(get().currentStep);
    const prevStep = WIZARD_ORDER[Math.max(i - 1, 0)];
    set({ currentStep: prevStep });
  },
  reset: () => set({ ...INITIAL }),
  setInteresse: (interesse) =>
    set({ interesse, dor: null, observacaoLivre: null }),
  setDor: (dor) => set({ dor }),
  setObservacaoLivre: (text) => set({ observacaoLivre: text }),
  setPorte: (porte) => set({ porte }),
  setUrgencia: (urgencia) => set({ urgencia }),
  setMatch: (match) => set({ match }),
  setScheduledDate: (date) => set({ scheduledDate: date, scheduledSlot: null }),
  setScheduledSlot: (slot) => set({ scheduledSlot: slot }),
  setContact: (contact) => set({ contact }),
  setSubmitting: (submitting) => set({ submitting }),
  setError: (errorMessage) => set({ errorMessage }),
  setConfirmation: (meetLink, waUrl) =>
    set({ meetLink, waUrl, submitting: false, errorMessage: null }),
  openModal: () => set({ modalOpen: true, modalState: "idle" }),
  closeModal: () => set({ modalOpen: false }),
  setModalState: (s) => set({ modalState: s }),
}));

export { stepIndex };
