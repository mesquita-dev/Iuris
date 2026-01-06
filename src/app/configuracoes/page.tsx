"use client";

import React, { useState } from "react";
import { Tabs } from "@/components/Tabs";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Pill } from "@/components/Pill";
import { CreditCard, CurrencyCircleDollar, User, Eye, EyeSlash, Download } from "@phosphor-icons/react";

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<string>("plano-pagamento");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const [notificacoesReuniao, setNotificacoesReuniao] = useState({
    email: true,
    whatsapp: false,
    sms: false,
  });
  
  const [notificacoesPagamento, setNotificacoesPagamento] = useState({
    email: true,
    whatsapp: true,
    sms: false,
  });

  const tabs = [
    {
      id: "plano-pagamento",
      label: "Plano e pagamento",
      icon: CreditCard,
      hasIcon: true,
    },
    {
      id: "historico-pagamentos",
      label: "Histórico de pagamentos",
      icon: CurrencyCircleDollar,
      hasIcon: true,
    },
    {
      id: "minha-conta",
      label: "Minha conta",
      icon: User,
      hasIcon: true,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "plano-pagamento":
        return (
          <div className="flex flex-col lg:flex-row lg:justify-between gap-x6">
            <div className="flex flex-col gap-x6">
              <h2 className="font-sans text-[1.5rem] font-semibold leading-[2rem] text-base-black">
                Informações do plano
              </h2>
              <div className="flex gap-[64px]">
              <div className="flex flex-col gap-x2">
                <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                  Plano
                </span>
                <p className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                  Gratuito
                </p>
              </div>
              <div className="flex flex-col gap-x2">
                <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                  Valor do plano
                </span>
                <p className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                  R$ 0,00
                </p>
              </div>
              <div className="flex flex-col gap-x2">
                <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                  Status da assinatura
                </span>
                <Badge
                  status="success"
                  label="Ativa"
                  hasIcon={false}
                  size="md"
                />
              </div>
              <div className="flex flex-col gap-x2">
                <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                  Data da próxima cobrança
                </span>
                <p className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                  19/12/2025
                </p>
              </div>
              </div>
            </div>

            <div className="flex flex-col gap-x6">
              <div className="flex items-center gap-[120px]">
                <h2 className="font-sans text-[1.5rem] font-semibold leading-[2rem] text-base-black">
                  Forma de pagamento
                </h2>
                <div className="flex gap-x4">
                  <button
                    type="button"
                    className="font-sans text-[1rem] font-normal leading-[1.25rem] text-red-600 hover:underline"
                  >
                    Cancelar assinatura
                  </button>
                  <Button
                    variant="outline"
                    theme="primary"
                    size="lg"
                    label="Atualizar forma de pagamento"
                  />
                </div>
              </div>
              <div className="flex gap-[120px]">
                <div className="flex flex-col gap-x2">
                  <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                    Tipo
                  </span>
                  <p className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                    Cartão de crédito
                  </p>
                </div>
                <div className="flex flex-col gap-x2">
                  <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                    Cartão
                  </span>
                  <p className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                    Visa **** 1234
                  </p>
                </div>
                <div className="flex flex-col gap-x2">
                  <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                    Validade
                  </span>
                  <p className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                    08/26
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "historico-pagamentos":
        const pagamentos = [
          {
            data: "10/12/2025",
            periodo: "Dez/2025",
            valor: "R$ 49,90",
            status: "Pago" as const,
            formaPagamento: "Visa **** 1234",
            temRecibo: true,
          },
          {
            data: "10/11/2025",
            periodo: "Nov/2025",
            valor: "R$ 49,90",
            status: "Pendente" as const,
            formaPagamento: "Visa **** 1234",
            temRecibo: false,
          },
          {
            data: "10/10/2025",
            periodo: "Out/2025",
            valor: "R$ 49,90",
            status: "Falhou" as const,
            formaPagamento: "Visa **** 1234",
            temRecibo: false,
          },
          {
            data: "10/09/2025",
            periodo: "Set/2025",
            valor: "R$ 49,90",
            status: "Pago" as const,
            formaPagamento: "Visa **** 1234",
            temRecibo: true,
          },
          {
            data: "10/08/2025",
            periodo: "Ago/2025",
            valor: "R$ 49,90",
            status: "Pendente" as const,
            formaPagamento: "Visa **** 1234",
            temRecibo: false,
          },
        ];

        const getStatusBadge = (status: string) => {
          switch (status) {
            case "Pago":
              return <Badge status="success" label="Pago" hasIcon={false} size="lg" />;
            case "Pendente":
              return <Badge status="warning" label="Pendente" hasIcon={false} size="lg" />;
            case "Falhou":
              return <Badge status="error" label="Falhou" hasIcon={false} size="lg" />;
            default:
              return null;
          }
        };

        return (
          <div>
            <h2 className="font-sans text-[1.5rem] font-semibold leading-[2rem] text-base-black mb-x4">
              Seu histórico de pagamento
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-x3 px-x4 font-sans text-[1rem] font-medium leading-[1.25rem] text-base-black">
                      Data do pagamento
                    </th>
                    <th className="text-left py-x3 px-x4 font-sans text-[1rem] font-medium leading-[1.25rem] text-base-black">
                      Período
                    </th>
                    <th className="text-left py-x3 px-x4 font-sans text-[1rem] font-medium leading-[1.25rem] text-base-black">
                      Valor pago
                    </th>
                    <th className="text-left py-x3 px-x4 font-sans text-[1rem] font-medium leading-[1.25rem] text-base-black">
                      Status
                    </th>
                    <th className="text-left py-x3 px-x4 font-sans text-[1rem] font-medium leading-[1.25rem] text-base-black">
                      Forma de pagamento
                    </th>
                    <th className="text-left py-x3 px-x4 font-sans text-[1rem] font-medium leading-[1.25rem] text-base-black">
                      Recibo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pagamentos.map((pagamento, index) => (
                    <tr key={index}>
                      <td className="py-x4 px-x4 font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                        {pagamento.data}
                      </td>
                      <td className="py-x4 px-x4 font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                        {pagamento.periodo}
                      </td>
                      <td className="py-x4 px-x4 font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                        {pagamento.valor}
                      </td>
                      <td className="py-x4 px-x4">
                        {getStatusBadge(pagamento.status)}
                      </td>
                      <td className="py-x4 px-x4 font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black">
                        {pagamento.formaPagamento}
                      </td>
                      <td className="py-x4 px-x4">
                        {pagamento.temRecibo ? (
                          <Button
                            variant="outline"
                            theme="primary"
                            size="md"
                            label="Baixar recibo"
                            customIconLeft={Download}
                            hasIconLeft={true}
                          />
                        ) : (
                          <span className="font-sans text-[1rem] font-normal leading-[1.25rem] text-gray-400">
                            -
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "minha-conta":
        return (
          <div className="flex flex-col gap-[48px]">
            <div className="flex flex-col gap-x4">
              <h2 className="font-sans text-[1.5rem] font-semibold leading-[2rem] text-base-black">
                Dados da conta
              </h2>
              <div className="flex gap-[80px]">
                <div className="flex items-start justify-between gap-x8">
                  <div className="flex flex-col gap-x2">
                    <span className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                      Email
                    </span>
                    <p className="font-sans text-[1.25rem] font-normal leading-[1.5rem] text-base-black">
                      lmesquita2k@gmail.com
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    theme="primary"
                    size="md"
                    label="Alterar e-mail"
                  />
                </div>
                <div className="flex items-start justify-between gap-[104px]">
                  <div className="flex flex-col gap-x2">
                    <div className="flex items-center gap-x2 w-fit">
                      <span className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                        Senha
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeSlash size={20} weight="regular" className="text-gray-600" />
                        ) : (
                          <Eye size={20} weight="regular" className="text-gray-600" />
                        )}
                      </button>
                    </div>
                    <p className="font-sans text-[1.25rem] font-normal leading-[1.5rem] text-base-black">
                      {showPassword ? "minhasenha123" : "************"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    theme="primary"
                    size="md"
                    label="Alterar senha"
                  />
                </div>
                <div className="flex flex-col gap-x2">
                    <span className="font-sans text-[1.25rem] font-medium leading-[1.5rem] text-base-black">
                    Data de criação da conta
                  </span>
                    <p className="font-sans text-[1.25rem] font-normal leading-[1.5rem] text-base-black">
                    22/12/2025
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-x4">
              <h2 className="font-sans text-[1.5rem] font-semibold leading-[2rem] text-base-black">
                Preferências
              </h2>
              <div className="flex flex-row gap-[40px] flex-wrap">
                <div className="flex flex-col gap-x4">
                  <h3 className="font-sans text-[1.5rem] font-medium leading-[1.75rem] text-base-black">
                    Notificações sobre novos pedidos de reunião
                  </h3>
                  <div className="flex gap-x4">
                    <Pill
                      version="checkbox"
                      label="Receber por e-mail"
                      checked={notificacoesReuniao.email}
                      onChange={(e) => setNotificacoesReuniao({ ...notificacoesReuniao, email: e.target.checked })}
                    />
                    <Pill
                      version="checkbox"
                      label="Receber por WhatsApp"
                      checked={notificacoesReuniao.whatsapp}
                      onChange={(e) => setNotificacoesReuniao({ ...notificacoesReuniao, whatsapp: e.target.checked })}
                    />
                    <Pill
                      version="checkbox"
                      label="Receber por SMS"
                      checked={notificacoesReuniao.sms}
                      onChange={(e) => setNotificacoesReuniao({ ...notificacoesReuniao, sms: e.target.checked })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-x4">
                  <h3 className="font-sans text-[1.5rem] font-medium leading-[1.75rem] text-base-black">
                    Notificações sobre problemas no pagamento
                  </h3>
                  <div className="flex gap-x4">
                    <Pill
                      version="checkbox"
                      label="Receber por e-mail"
                      checked={notificacoesPagamento.email}
                      onChange={(e) => setNotificacoesPagamento({ ...notificacoesPagamento, email: e.target.checked })}
                    />
                    <Pill
                      version="checkbox"
                      label="Receber por WhatsApp"
                      checked={notificacoesPagamento.whatsapp}
                      onChange={(e) => setNotificacoesPagamento({ ...notificacoesPagamento, whatsapp: e.target.checked })}
                    />
                    <Pill
                      version="checkbox"
                      label="Receber por SMS"
                      checked={notificacoesPagamento.sms}
                      onChange={(e) => setNotificacoesPagamento({ ...notificacoesPagamento, sms: e.target.checked })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h2 className="font-sans text-[1.5rem] font-semibold leading-[2rem] text-base-black mb-x2">
                Encerramento de conta
              </h2>
              <p className="font-sans text-[1rem] font-normal leading-[1.25rem] text-base-black mb-x4">
                Ao solicitar a exclusão, seus dados serão removidos conforme nossa Política de Privacidade, exceto informações que somos obrigados a manter por lei.
              </p>
              <Button
                variant="fill"
                theme="danger"
                size="lg"
                label="Solicitar exclusão da conta"
                className="w-fit"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-base-white p-x4 rounded-x2">
      <Tabs
        tabs={tabs}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        defaultActiveTabId="plano-pagamento"
      />
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}
