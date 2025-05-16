
import { ExpenseCategory } from "./types";

type SubcategoryMap = {
  [key in ExpenseCategory]: string[];
};

export const subcategories: SubcategoryMap = {
  FIXED_EXPENSES: [
    "Aluguel / Prestação",
    "Condomínio",
    "IPTU + Taxas Municipais",
    "Luz",
    "Água",
    "Gás",
    "Telefone fixo",
    "Celular",
    "Internet",
    "TV à Cabo",
    "Supermercado",
    "Feira",
    "Empregado(a) doméstico(a)",
    "Outras despesas fixas"
  ],
  TRANSPORTATION: [
    "Parcela do automóvel",
    "IPVA + DPVAT",
    "Seguro",
    "Combustível",
    "Estacionamentos",
    "Lavagens",
    "Manutenção do Veículo",
    "Multas",
    "Transporte Público",
    "Táxi/Uber",
    "Outras despesas com transporte"
  ],
  PERSONAL: [
    "Cabeleireiro",
    "Estética",
    "Academia",
    "Roupas",
    "Dízimo/ Contribuições/ Caridade",
    "Mesadas",
    "Outras despesas pessoais"
  ],
  HEALTH: [
    "Plano de Saúde",
    "Farmácia",
    "Dentista",
    "Outras despesas com saúde"
  ],
  EDUCATION: [
    "Colégio / Faculdade",
    "Cursos",
    "Material escolar/ Uniforme",
    "Outras despesas com educação"
  ],
  LEISURE: [
    "Restaurantes",
    "Viagens",
    "Passagens",
    "Hotel",
    "Jogos/ videogame",
    "Aplicativos/ internet",
    "Outros despesas com lazer"
  ],
  TEMPORARY_EXPENSES: [
    "Mídias Sociais",
    "Manutenção e Reparos Domésticos",
    "Auxílio à família",
    "Dedetização/ esgoto",
    "Fundo de Reserva para Lazer",
    "Correio/ Motoboy",
    "Presentes do Mês",
    "Utilidades domésticas e decoração",
    "Acidente",
    "Pagamento Cartão de Crédito/ Empréstimos",
    "Pagamento Cartão de Crédito/ Empréstimos 1",
    "Pagamento Cartão de Crédito/ Empréstimos 2",
    "Pagamento Cartão de Crédito/ Empréstimos 3",
    "Pagamento Cartão de Crédito/ Empréstimos 4"
  ]
};
