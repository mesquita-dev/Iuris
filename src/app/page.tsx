"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Copy,
  Info,
} from "@phosphor-icons/react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useMeetingRequests } from "@/contexts/MeetingRequestsContext";

export default function Home() {
  const { getNewRequestsCount } = useMeetingRequests();
  const newRequestsCount = getNewRequestsCount();

  useEffect(() => {
    document.title = "Página inicial | Iuris";
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_22rem]">
      <div className="flex flex-col gap-2 2xl:gap-6">
        <h1 className="font-sans text-3xl font-bold leading-8 tracking-[-0.02em] text-base-black">
          Seja bem-vindo, Guilherme
        </h1>

        <div className="flex flex-col gap-4 rounded border bg-base-white p-4 2xl:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1 max-w-[630px] 2xl:max-w-[1000px]">
            <h2 className="font-sans text-lg font-medium leading-7 text-base-black">
              Complete o seu perfil
            </h2>
            <p className="font-sans text-sm 2xl:text-base font-normal leading-5 text-gray-600">
              Você preencheu 80% da informações mas ainda faltam algumas para
              enriquecer o seu perfil
            </p>
          </div>
          <Button
            variant="fill"
            theme="primary"
            size="lg"
            label="Completar meu perfil"
            className="w-fit"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between gap-4 rounded border bg-base-white p-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-sans text-lg font-medium leading-7 text-base-black">
                Novos pedidos
              </h2>
                <p className="font-sans text-sm 2xl:text-base font-normal leading-5 text-gray-600">
                Não deixe seus possíveis clientes esperando.
              </p>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-sans text-5xl font-bold leading-tight text-base-black">
                {newRequestsCount}
              </h3>
              <Link href="/pedidos">
                <Button
                  variant="outline"
                  theme="primary"
                  size="lg"
                  label="Ver os novos pedidos"
                  customIconRight={ArrowRight}
                  className="w-fit"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded border bg-base-white p-4">
            <h2 className="font-sans text-lg font-medium leading-7 text-base-black">
              Reuniões nos próximos 7 dias
            </h2>
            <h3 className="font-sans text-5xl font-bold leading-tight text-base-black">
              64
            </h3>
          </div>

          <div className="flex flex-col gap-6 rounded border bg-base-white p-4">
            <h2 className="font-sans text-lg font-medium leading-7 text-base-black">
              Próxima reunião
            </h2>
            <div className="flex flex-col gap-2">
              <p className="font-sans text-sm sm:text-base leading-5 text-base-black">
                <span className="text-sm font-normal text-gray-600">Assunto: </span>
                <span className="text-sm font-medium">Cancelamento/Reembolso</span>
              </p>
              <p className="font-sans text-sm sm:text-base leading-5 text-base-black">
                <span className="text-sm font-normal text-gray-600">Solicitante: </span>
                <span className="text-sm font-medium">Lucas Mesquita</span>
              </p>
              <p className="font-sans text-sm sm:text-base leading-5 text-base-black">
                <span className="text-sm font-normal text-gray-600">Horário e modalidade: </span>
                <span className="text-sm font-medium">Hoje, 09:00 - 10:00 • Online</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Button
                  variant="fill"
                  theme="primary"
                  size="lg"
                  label="Entrar na reunião"
                  className="w-fit"
                />
                <Button
                  variant="outline"
                  theme="primary"
                  size="lg"
                  label=""
                  customIconLeft={Copy}
                  hasIconLeft={true}
                  className="w-fit"
                />
                <Button
                  variant="ghost"
                  theme="primary"
                  size="lg"
                  label=""
                  customIconLeft={Info}
                  hasIconLeft={true}
                  className="w-fit"
                />
            </div>
          </div>
        </div>
      </div>

      <aside className="flex flex-col gap-4 rounded border bg-base-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-lg font-medium leading-7 text-base-black">
            Agenda de hoje
          </h2>
          <time className="font-sans text-sm sm:text-base font-normal leading-6 text-gray-600">
            29/12
          </time>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { time: "08:00", hasMeeting: true },
            { time: "09:00", hasMeeting: true },
            { time: "10:00", hasMeeting: true },
            { time: "11:00", hasMeeting: true },
            { time: "12:00", hasMeeting: false },
            { time: "13:00", hasMeeting: false, blocked: true },
            { time: "14:00", hasMeeting: false, blocked: true },
            { time: "15:00", hasMeeting: false, blocked: true },
            { time: "16:00", hasMeeting: true },
            { time: "17:00", hasMeeting: true },
            { time: "18:00", hasMeeting: true },
            { time: "19:00", hasMeeting: true },
          ].map((slot, index) => (
            <div key={index} className="flex items-center gap-3">
              <time className="w-12 shrink-0 font-sans text-sm font-normal leading-5 text-gray-600">
                {slot.time}
              </time>
              {slot.blocked ? (
                <div className="flex flex-1 items-center rounded border border-gray-300 bg-gray-100 px-3 py-2">
                  <p className="font-sans text-sm font-normal leading-5 text-gray-600">
                    Agenda bloqueada
                  </p>
                </div>
              ) : slot.hasMeeting ? (
                <div className="flex flex-1 flex-col gap-1 rounded border border-blue-300 bg-blue-800 px-3 py-2">
                  <p className="font-sans text-sm font-medium leading-5 text-base-white">
                    Cancelamento/Reembolso
                  </p>
                  <div className="flex gap-4">
                    <time className="font-sans text-xs font-normal leading-4 text-gray-200">
                      Ter, 23 Jan 08:00 - 09:00
                    </time>
                    <p className="font-sans text-xs font-normal leading-4 text-gray-200">
                      Presencial
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-8 w-full items-center">
                  <div className="w-full border-b border-gray-200" />
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
