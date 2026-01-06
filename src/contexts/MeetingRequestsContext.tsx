"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface MeetingRequest {
  id: string;
  status: "novo" | "agendado" | "recusado";
  dateTime: string;
  meetingType: "online" | "presencial";
  subject: string;
  requester: string;
  isFirstContact?: boolean;
  receivedAt?: string;
  scheduledAt?: string;
  rejectedAt?: string;
}

interface MeetingRequestsContextType {
  meetingRequests: MeetingRequest[];
  setMeetingRequests: (requests: MeetingRequest[]) => void;
  getNewRequestsCount: () => number;
}

const MeetingRequestsContext = createContext<MeetingRequestsContextType | undefined>(undefined);

const initialRequests: MeetingRequest[] = [
  {
    id: "1",
    status: "novo",
    dateTime: "Ter, 23 Jan • 14:00 - 14:30",
    meetingType: "online",
    subject: "Cancelamento/Reembolso",
    requester: "Lucas M.",
    isFirstContact: true,
    receivedAt: "Recebido há 2h",
  },
  {
    id: "2",
    status: "agendado",
    dateTime: "Ter, 23 Jan • 14:00 - 14:30",
    meetingType: "presencial",
    subject: "Cancelamento/Reembolso",
    requester: "Lucas Mesquita",
    scheduledAt: "Agendado em 29/12/2025",
  },
  {
    id: "3",
    status: "recusado",
    dateTime: "Ter, 23 Jan • 14:00 - 14:30",
    meetingType: "online",
    subject: "Cancelamento/Reembolso",
    requester: "Lucas M.",
    rejectedAt: "Recusado há 2h",
  },
];

export function MeetingRequestsProvider({ children }: { children: ReactNode }) {
  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>(initialRequests);

  const getNewRequestsCount = () => {
    return meetingRequests.filter((request) => request.status === "novo").length;
  };

  return (
    <MeetingRequestsContext.Provider
      value={{
        meetingRequests,
        setMeetingRequests,
        getNewRequestsCount,
      }}
    >
      {children}
    </MeetingRequestsContext.Provider>
  );
}

export function useMeetingRequests() {
  const context = useContext(MeetingRequestsContext);
  if (context === undefined) {
    throw new Error("useMeetingRequests must be used within a MeetingRequestsProvider");
  }
  return context;
}

