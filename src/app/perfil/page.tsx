"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Radio } from "@/components/Radio";
import { Pill } from "@/components/Pill";
import { UploadSimple, Plus, Info } from "@phosphor-icons/react";
import { useUser } from "@/contexts/UserContext";

export default function PerfilPage() {
  const { updateUser } = useUser();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [tipoAtendimento, setTipoAtendimento] = useState<string>("");
  const [numeroFormacoes, setNumeroFormacoes] = useState<number>(1);
  const [areasAtuacao, setAreasAtuacao] = useState<string[]>([]);
  const [cep, setCep] = useState<string>("");
  const [anoAtuacao, setAnoAtuacao] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [numeroOAB, setNumeroOAB] = useState<string>("");
  const [anosConclusao, setAnosConclusao] = useState<string[]>([]);
  const [estadoOAB, setEstadoOAB] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [estadoUF, setEstadoUF] = useState<string>("");
  const [instituicao, setInstituicao] = useState<string>("");
  const [declaracao, setDeclaracao] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = "Meu perfil | Iuris";
  }, []);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) {
      if (value.length > 5) {
        value = value.slice(0, 5) + "-" + value.slice(5);
      }
      setCep(value);
    }
  };

  const handleAnoAtuacaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setAnoAtuacao(value);
    }
  };

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    setNome(value);
  };

  const handleNumeroOABChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setNumeroOAB(value);
  };

  const handleAnoConclusaoChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      const newAnos = [...anosConclusao];
      newAnos[index] = value;
      setAnosConclusao(newAnos);
    }
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!nome.trim()) {
      newErrors.nome = "Nome completo é obrigatório";
    }
    if (!numeroOAB.trim()) {
      newErrors.numeroOAB = "Número da OAB é obrigatório";
    }
    if (!estadoOAB) {
      newErrors.estadoOAB = "Estado da OAB é obrigatório";
    }
    if (!tipoAtendimento) {
      newErrors.tipoAtendimento = "Tipo de atendimento é obrigatório";
    }
    if (!cep.trim()) {
      newErrors.cep = "CEP é obrigatório";
    }
    if (!logradouro.trim()) {
      newErrors.logradouro = "Logradouro é obrigatório";
    }
    if (!numero.trim()) {
      newErrors.numero = "Número é obrigatório";
    }
    if (!bairro.trim()) {
      newErrors.bairro = "Bairro é obrigatório";
    }
    if (!cidade.trim()) {
      newErrors.cidade = "Cidade é obrigatória";
    }
    if (!estadoUF) {
      newErrors.estadoUF = "Estado (UF) é obrigatório";
    }
    if (!anoAtuacao.trim()) {
      newErrors.anoAtuacao = "Ano de início da atuação é obrigatório";
    }
    if (!instituicao.trim()) {
      newErrors.instituicao = "Instituição é obrigatória";
    }
    if (anosConclusao.length === 0 || !anosConclusao[0]?.trim()) {
      newErrors.anoConclusao = "Ano de conclusão é obrigatório";
    }
    if (areasAtuacao.length === 0) {
      newErrors.areasAtuacao = "Selecione pelo menos uma área de atuação";
    }
    if (!declaracao) {
      newErrors.declaracao = "Você deve declarar que as informações seguem as normas do Código de Ética da OAB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    updateUser({
      name: nome,
      profileImage: profileImage,
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAdicionarFormacao = () => {
    if (numeroFormacoes < 3) {
      setNumeroFormacoes(numeroFormacoes + 1);
      setAnosConclusao([...anosConclusao, ""]);
    }
  };

  return (
    <div className="bg-base-white p-4 rounded">
      <div className="mb-6">
        <h1 className="mb-2 font-sans text-xl sm:text-2xl font-semibold leading-8 sm:leading-10 text-base-black">
          Personalize o seu perfil
        </h1>
        <p className="font-sans text-sm sm:text-base font-normal leading-5 text-gray-600">
          Essa é uma parte bem importante, é aqui onde você criará o seu perfil para as pessoas.
        </p>
      </div>

      <div className="mb-8 flex items-start">
        <div className="mr-6 flex flex-col items-center">
          <div className="mb-3 h-[120px] w-[120px] overflow-hidden rounded-full bg-gray-200">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-gray-400">Foto</span>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Button
            variant="outline"
            theme="primary"
            size="lg"
            label="Enviar foto"
            hasIconLeft={true}
            customIconLeft={UploadSimple}
            onClick={handleButtonClick}
          />
        </div>

        <div className="flex flex-1 flex-wrap gap-6">
          <div className="w-full md:w-1/6 lg:w-1/6 min-w-fit">
            <Input
              state={errors.nome ? "error" : "default"}
              label="Nome completo *"
              placeholder="Ex: Lucas Mesquita"
              type="text"
              value={nome}
              onChange={(e) => {
                handleNomeChange(e);
                if (errors.nome) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.nome;
                    return newErrors;
                  });
                }
              }}
            />
            {errors.nome && (
              <p className="mt-1 text-sm text-red-700">{errors.nome}</p>
            )}
          </div>
          <div className="w-full md:w-1/8 lg:w-1/8 min-w-fit">
            <Input
              state={errors.numeroOAB ? "error" : "default"}
              label="Número da OAB *"
              placeholder="Ex: 80340"
              value={numeroOAB}
              onChange={(e) => {
                handleNumeroOABChange(e);
                if (errors.numeroOAB) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.numeroOAB;
                    return newErrors;
                  });
                }
              }}
            />
            {errors.numeroOAB && (
              <p className="mt-1 text-sm text-red-700">{errors.numeroOAB}</p>
            )}
          </div>
          <div className="w-full md:w-1/12 lg:w-1/12 min-w-fit">
            <Select
              state={errors.estadoOAB ? "error" : "default"}
              label="Estado da OAB *"
              placeholder="Ex: OAB"
              value={estadoOAB}
              onChange={(e) => {
                setEstadoOAB(e.target.value);
                if (errors.estadoOAB) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.estadoOAB;
                    return newErrors;
                  });
                }
              }}
              options={[
                { value: "mg", label: "MG" },
                { value: "sp", label: "SP" },
                { value: "rj", label: "RJ" },
              ]}
            />
            {errors.estadoOAB && (
              <p className="mt-1 text-sm text-red-700">{errors.estadoOAB}</p>
            )}
          </div>
          <div className="w-full md:w-auto lg:w-auto flex flex-col gap-3 min-w-fit">
            <label className="font-sans text-base font-medium leading-5 text-gray-800 whitespace-nowrap">
              Tipo de atendimento *
            </label>
            <div className="flex gap-4 flex-wrap">
              <Pill
                version="radio"
                name="tipo-atendimento"
                value="presencial"
                label="Presencial"
                checked={tipoAtendimento === "presencial"}
                onChange={(e) => {
                  setTipoAtendimento(e.target.value);
                  if (errors.tipoAtendimento) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.tipoAtendimento;
                      return newErrors;
                    });
                  }
                }}
              />
              <Pill
                version="radio"
                name="tipo-atendimento"
                value="online"
                label="Online"
                checked={tipoAtendimento === "online"}
                onChange={(e) => {
                  setTipoAtendimento(e.target.value);
                  if (errors.tipoAtendimento) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.tipoAtendimento;
                      return newErrors;
                    });
                  }
                }}
              />
              <Pill
                version="radio"
                name="tipo-atendimento"
                value="ambos"
                label="Ambos"
                checked={tipoAtendimento === "ambos"}
                onChange={(e) => {
                  setTipoAtendimento(e.target.value);
                  if (errors.tipoAtendimento) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.tipoAtendimento;
                      return newErrors;
                    });
                  }
                }}
              />
            </div>
            {errors.tipoAtendimento && (
              <p className="text-sm text-red-700">{errors.tipoAtendimento}</p>
            )}
          </div>
          <div className="w-full md:w-1/8 lg:w-1/8 min-w-fit">
            <Input
              state={errors.cep ? "error" : "default"}
              label="CEP *"
              placeholder="Ex: 38080-140"
              value={cep}
              onChange={(e) => {
                handleCepChange(e);
                if (errors.cep) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.cep;
                    return newErrors;
                  });
                }
              }}
              maxLength={9}
            />
            {errors.cep && (
              <p className="mt-1 text-sm text-red-700">{errors.cep}</p>
            )}
          </div>
          <div className="w-full md:w-1/5 lg:w-1/5 min-w-fit">
            <Input
              state={errors.logradouro ? "error" : "default"}
              label="Logradouro *"
              placeholder="Ex: Rua Álvaro Henrique"
              value={logradouro}
              onChange={(e) => {
                setLogradouro(e.target.value);
                if (errors.logradouro) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.logradouro;
                    return newErrors;
                  });
                }
              }}
            />
            {errors.logradouro && (
              <p className="mt-1 text-sm text-red-700">{errors.logradouro}</p>
            )}
          </div>
          <div className="w-full md:w-1/12 lg:w-1/12 min-w-fit">
            <Input
              state={errors.numero ? "error" : "default"}
              label="Número *"
              placeholder="Ex: 120"
              type="number"
              value={numero}
              onChange={(e) => {
                setNumero(e.target.value);
                if (errors.numero) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.numero;
                    return newErrors;
                  });
                }
              }}
            />
            {errors.numero && (
              <p className="mt-1 text-sm text-red-700">{errors.numero}</p>
            )}
          </div>
          <div className="w-full md:w-1/8 lg:w-1/8 min-w-fit">
            <Input
              state="default"
              label="Complemento"
              placeholder="Ex: Uberaba"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/6 lg:w-1/6 min-w-fit">
            <Input
              state={errors.bairro ? "error" : "default"}
              label="Bairro *"
              placeholder="Ex: Cássio Resende"
              value={bairro}
              onChange={(e) => {
                setBairro(e.target.value);
                if (errors.bairro) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.bairro;
                    return newErrors;
                  });
                }
              }}
            />
            {errors.bairro && (
              <p className="mt-1 text-sm text-red-700">{errors.bairro}</p>
            )}
          </div>
          <div className="w-full md:w-1/6 lg:w-1/6 min-w-fit">
            <Input
              state={errors.cidade ? "error" : "default"}
              label="Cidade *"
              placeholder="Ex: Uberaba"
              value={cidade}
              onChange={(e) => {
                setCidade(e.target.value);
                if (errors.cidade) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.cidade;
                    return newErrors;
                  });
                }
              }}
            />
            {errors.cidade && (
              <p className="mt-1 text-sm text-red-700">{errors.cidade}</p>
            )}
          </div>
          <div className="w-full md:w-1/12 lg:w-1/12 min-w-fit">
            <Select
              state={errors.estadoUF ? "error" : "default"}
              label="Estado (UF) *"
              placeholder="Ex: MG"
              value={estadoUF}
              onChange={(e) => {
                setEstadoUF(e.target.value);
                if (errors.estadoUF) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.estadoUF;
                    return newErrors;
                  });
                }
              }}
              options={[
                { value: "mg", label: "MG" },
                { value: "sp", label: "SP" },
                { value: "rj", label: "RJ" },
              ]}
            />
            {errors.estadoUF && (
              <p className="mt-1 text-sm text-red-700">{errors.estadoUF}</p>
            )}
          </div>
          <div className="w-full md:w-1/6 lg:w-1/6 min-w-fit">
            <Input
              state={errors.anoAtuacao ? "error" : "default"}
              label="Ano de início da atuação *"
              placeholder="Ex: 2020"
              value={anoAtuacao}
              onChange={(e) => {
                handleAnoAtuacaoChange(e);
                if (errors.anoAtuacao) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.anoAtuacao;
                    return newErrors;
                  });
                }
              }}
              maxLength={4}
            />
            {errors.anoAtuacao && (
              <p className="mt-1 text-sm text-red-700">{errors.anoAtuacao}</p>
            )}
          </div>
        </div>
      </div>

      <div className="my-12">
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <h2 className="font-sans text-lg sm:text-xl font-semibold leading-8 text-base-black">
            Formação acadêmica
          </h2>
          <span className="font-sans text-sm sm:text-base font-normal leading-5 text-gray-600">
            (máximo de até 3 formações)
          </span>
        </div>
        <div className="flex flex-wrap gap-6 gap-y-4 items-start">
          <div className="w-full md:w-1/6 lg:w-1/6 min-w-fit">
            <Select
              label="Tipo *"
              hasHeading={true}
              placeholder=""
              options={[
                { value: "graduacao", label: "Graduação" },
                { value: "pos-graduacao", label: "Pós-graduação" },
                { value: "mestrado", label: "Mestrado" },
                { value: "doutorado", label: "Doutorado" },
              ]}
              value="graduacao"
              disabled
            />
          </div>
          <div className="w-full md:w-1/4 lg:w-1/4 min-w-fit">
            <Input
              label="Título *"
              hasHeading={true}
              hasIcon={false}
              placeholder=""
              value="Bacharelado em Direito"
              disabled
            />
          </div>
          <div className="w-full md:w-1/4 lg:w-1/4 min-w-fit">
            <Input
              state={errors.instituicao ? "error" : "default"}
              label="Instituição *"
              hasHeading={true}
              placeholder="Ex: Universidade de Uberaba"
              value={instituicao}
              onChange={(e) => {
                setInstituicao(e.target.value);
                if (errors.instituicao) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.instituicao;
                    return newErrors;
                  });
                }
              }}
            />
            {errors.instituicao && (
              <p className="mt-1 text-sm text-red-700">{errors.instituicao}</p>
            )}
          </div>
          <div className="w-full md:w-1/12 lg:w-1/12 min-w-fit">
            <Input
              label="Ano de conclusão *"
              hasHeading={true}
              placeholder="Ex: 2022"
              value={anosConclusao[0] || ""}
              onChange={(e) => {
                handleAnoConclusaoChange(0)(e);
                if (errors.anoConclusao) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.anoConclusao;
                    return newErrors;
                  });
                }
              }}
              maxLength={4}
            />
            {errors.anoConclusao && (
              <p className="mt-1 text-sm text-red-700">{errors.anoConclusao}</p>
            )}
          </div>
          {Array.from({ length: numeroFormacoes - 1 }).map((_, index) => (
            <React.Fragment key={index}>
              <div className="w-full md:w-1/6 lg:w-1/6 min-w-fit">
                <Select
                  state="default"
                  label=""
                  hasHeading={false}
                  placeholder="Pós-graduação"
                  options={[
                    { value: "graduacao", label: "Graduação" },
                    { value: "pos-graduacao", label: "Pós-graduação" },
                    { value: "mestrado", label: "Mestrado" },
                    { value: "doutorado", label: "Doutorado" },
                  ]}
                />
              </div>
              <div className="w-full md:w-1/4 lg:w-1/4 min-w-fit">
                <Input
                  state="default"
                  label=""
                  hasHeading={false}
                  placeholder="Ex: Direito de Família e Sucessões"
                />
              </div>
              <div className="w-full md:w-1/4 lg:w-1/4 min-w-fit">
                <Input
                  state="default"
                  label=""
                  hasHeading={false}
                  placeholder="Ex: PUC Minas"
                />
              </div>
              <div className="w-full md:w-1/12 lg:w-1/12 min-w-fit">
                <Input
                  state="default"
                  label=""
                  hasHeading={false}
                  placeholder="Ex: 2024"
                  value={anosConclusao[index + 1] || ""}
                  onChange={handleAnoConclusaoChange(index + 1)}
                  maxLength={4}
                />
              </div>
            </React.Fragment>
          ))}
          {numeroFormacoes < 3 && (
            <div className="w-full md:w-1/3 lg:w-1/3 flex justify-start">
              <Button
                variant="outline"
                theme="primary"
                size="lg"
                label="Adicionar outra formação"
                hasIconLeft={true}
                customIconLeft={Plus}
                onClick={handleAdicionarFormacao}
              />
            </div>
          )}
        </div>
      </div>

      <div className="my-12">
        <h2 className="font-sans text-lg sm:text-xl font-semibold leading-8 text-base-black">
          Selecione as áreas de atuação *
        </h2>
        <p className="mt-2 mb-4 font-sans text-sm sm:text-base font-normal leading-5 text-gray-600">
          Selecione apenas áreas em que você atua regularmente. Máximo de 3 áreas de atuação.
        </p>
        <div className="flex flex-wrap gap-4">
          <Pill
            version="checkbox"
            value="direito-trabalho"
            label="Direito do trabalho"
            checked={areasAtuacao.includes("direito-trabalho")}
            onChange={(e) => {
              if (e.target.checked && areasAtuacao.length < 3) {
                setAreasAtuacao([...areasAtuacao, e.target.value]);
              } else if (!e.target.checked) {
                setAreasAtuacao(areasAtuacao.filter((v) => v !== e.target.value));
              }
              if (errors.areasAtuacao) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.areasAtuacao;
                  return newErrors;
                });
              }
            }}
          />
          <Pill
            version="checkbox"
            value="direito-consumidor"
            label="Direito do consumidor"
            checked={areasAtuacao.includes("direito-consumidor")}
            onChange={(e) => {
              if (e.target.checked && areasAtuacao.length < 3) {
                setAreasAtuacao([...areasAtuacao, e.target.value]);
              } else if (!e.target.checked) {
                setAreasAtuacao(areasAtuacao.filter((v) => v !== e.target.value));
              }
              if (errors.areasAtuacao) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.areasAtuacao;
                  return newErrors;
                });
              }
            }}
          />
          <Pill
            version="checkbox"
            value="direito-familia"
            label="Direito da família"
            checked={areasAtuacao.includes("direito-familia")}
            onChange={(e) => {
              if (e.target.checked && areasAtuacao.length < 3) {
                setAreasAtuacao([...areasAtuacao, e.target.value]);
              } else if (!e.target.checked) {
                setAreasAtuacao(areasAtuacao.filter((v) => v !== e.target.value));
              }
              if (errors.areasAtuacao) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.areasAtuacao;
                  return newErrors;
                });
              }
            }}
          />
        </div>
        {errors.areasAtuacao && (
          <p className="mt-2 text-sm text-red-700">{errors.areasAtuacao}</p>
        )}
      </div>

      <div className="my-8 flex flex-col gap-2">
        <Checkbox
          size="lg"
          label="Declaro que as informações seguem as normas do Código de Ética da OAB. *"
          checked={declaracao}
          onChange={(e) => {
            setDeclaracao(e.target.checked);
            if (errors.declaracao) {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.declaracao;
                return newErrors;
              });
            }
          }}
        />
        {errors.declaracao && (
          <p className="text-sm text-red-700">{errors.declaracao}</p>
        )}
        <p className="font-sans text-base font-normal leading-5 text-gray-600">
        O perfil é exclusivamente informativo e não constitui publicidade jurídica.
        </p>
      </div>

        <Button
          variant="fill"
          theme="primary"
          size="lg"
          label="Salvar alterações"
          onClick={handleSave}
        />
    </div>
  );
}
