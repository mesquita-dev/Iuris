"use client";

import React, { useState } from "react";
import { CalendarDots, Monitor, Building, CaretDown } from "@phosphor-icons/react";
import { Pill } from "@/components/Pill";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useMeetingRequests } from "@/contexts/MeetingRequestsContext";

type StatusFilter = "novos" | "agendados" | "recusados";

export default function PedidosPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter[]>(["novos"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { meetingRequests, getNewRequestsCount } = useMeetingRequests();
  const newRequestsCount = getNewRequestsCount();

  const handleFilterChange = (status: StatusFilter, checked: boolean) => {
    if (checked) {
      setStatusFilter((prev) => [...prev, status]);
    } else {
      setStatusFilter((prev) => prev.filter((s) => s !== status));
    }
  };

  const filteredRequests = meetingRequests.filter((request) => {
    if (statusFilter.length === 0) return true;
    if (statusFilter.includes("novos") && request.status === "novo") return true;
    if (statusFilter.includes("agendados") && request.status === "agendado") return true;
    if (statusFilter.includes("recusados") && request.status === "recusado") return true;
    return false;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "novo":
        return <Badge status="info" label="Novo" hasIcon={false} size="md" />;
      case "agendado":
        return <Badge status="success" label="Agendado" hasIcon={false} size="md" />;
      case "recusado":
        return <Badge status="error" label="Recusado" hasIcon={false} size="md" />;
      default:
        return null;
    }
  };

  const getStatusCount = (status: StatusFilter) => {
    if (status === "novos") return meetingRequests.filter((r) => r.status === "novo").length;
    if (status === "agendados") return meetingRequests.filter((r) => r.status === "agendado").length;
    if (status === "recusados") return meetingRequests.filter((r) => r.status === "recusado").length;
    return 0;
  };

  return (
    <div className="bg-base-white p-x4 rounded-x2">
        <div className="flex items-center justify-between flex-wrap gap-x4 mb-x4">
          <div className="flex items-center gap-x3">
            <h1 className="font-sans text-[1.5rem] font-semibold leading-[2rem] text-base-black">
              Pedidos de reunião
            </h1>
            {newRequestsCount > 0 && (
              <span className="flex h-x6 w-x6 items-center justify-center rounded-x1000 bg-red-700 text-[0.75rem] font-sans font-bold leading-[0.75rem] text-base-white">
                {newRequestsCount}
              </span>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-x2 px-x4 h-[2.5rem] border border-gray-300 rounded-x2 bg-base-white text-base-black font-sans text-[1rem] font-normal leading-[1.25rem] hover:bg-gray-100 transition-colors"
            >
              <span>Mais recentes</span>
              <CaretDown size={20} weight="regular" />
            </button>
          </div>
        </div>

        <div>
          <p className="font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black pb-x3">
            Status
          </p>
          <div className="flex items-center gap-x4 flex-wrap mb-x6">
            <Pill
              version="checkbox"
              label={`Novos (${getStatusCount("novos")})`}
              checked={statusFilter.includes("novos")}
              onChange={(e) => handleFilterChange("novos", e.target.checked)}
            />
            <Pill
              version="checkbox"
              label={`Agendados (${getStatusCount("agendados")})`}
              checked={statusFilter.includes("agendados")}
              onChange={(e) => handleFilterChange("agendados", e.target.checked)}
            />
            <Pill
              version="checkbox"
              label={`Recusados (${getStatusCount("recusados")})`}
              checked={statusFilter.includes("recusados")}
              onChange={(e) => handleFilterChange("recusados", e.target.checked)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-x4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col p-x4 border border-gray-300 rounded-x2 bg-base-white w-full md:max-w-[calc(50%-8px)] lg:max-w-[calc(25%-12px)]"
              >
                <div className="flex items-center justify-between mb-[1.25rem]">
                  <div>{getStatusBadge(request.status)}</div>
                  <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-gray-600">
                    {request.receivedAt || request.scheduledAt || request.rejectedAt}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-x6">
                  <div className="flex items-center gap-x2">
                    <CalendarDots size={24} weight="regular" className="text-gray-600" />
                    <span className="font-sans text-[1rem] font-medium leading-[1.25rem] text-gray-600">
                      {request.dateTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-x2">
                    {request.meetingType === "online" ? (
                      <Monitor size={24} weight="regular" className="text-gray-600" />
                    ) : (
                      <Building size={24} weight="regular" className="text-gray-600" />
                    )}
                    <span className="font-sans text-[1rem] font-medium leading-[1.25rem] text-gray-600">
                      {request.meetingType === "online" ? "Online" : "Presencial"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-x1 mb-x4">
                  <p className="font-sans text-[0.875rem] font-medium leading-[1.125rem] text-gray-600">
                    Assunto
                  </p>
                  <h2 className="font-sans text-[1.5rem] font-medium leading-[1.75rem] text-base-black">
                    {request.subject}
                  </h2>
                </div>
                <div className="flex flex-col gap-x1 mb-x8">
                  <p className="font-sans text-[0.875rem] font-medium leading-[1.125rem] text-gray-600">
                    Solicitante
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans text-[1.5rem] font-medium leading-[1.75rem] text-base-black">
                      {request.requester}
                    </h3>
                    {request.isFirstContact && (
                      <span className="px-x3 py-[0.25rem] rounded-x1000 bg-gray-200 text-gray-700 font-sans text-[0.875rem] font-normal leading-[1.25rem]">
                        Primeiro contato
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-x4">
                  {request.status === "novo" && (
                    <>
                      <Button
                        variant="fill"
                        theme="primary"
                        size="lg"
                        label="Aceitar reunião"
                        className="w-fit"
                      />
                      <Button
                        variant="outline"
                        theme="danger"
                        size="lg"
                        label="Recusar"
                        className="w-fit"
                      />
                      <Button
                        variant="ghost"
                        theme="primary"
                        size="lg"
                        label="Detalhes"
                        className="w-fit"
                      />
                    </>
                  )}
                  {request.status === "agendado" && (
                    <>
                      <Button
                        variant="fill"
                        theme="primary"
                        size="lg"
                        label="Abrir agenda"
                        className="w-fit"
                      />
                      <Button
                        variant="outline"
                        theme="primary"
                        size="lg"
                        label="Reagendar"
                        className="w-fit"
                      />
                      <Button
                        variant="ghost"
                        theme="danger"
                        size="lg"
                        label="Cancelar"
                        className="w-fit"
                      />
                    </>
                  )}
                  {request.status === "recusado" && (
                    <Button
                      variant="ghost"
                      theme="primary"
                      size="lg"
                      label="Detalhes"
                      className="w-fit"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
    </div>
  );
}
