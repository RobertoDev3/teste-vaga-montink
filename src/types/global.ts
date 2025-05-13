export type AddressProps = {
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
} | null;

export type productDataProps = {
  title: string;
  price: number;
  images: string[];
  variants: {
    sizes: SizesProps[];
    colors: ColorsProps[];
  };
};

export type SizesProps = { size: string; inStock: boolean };
export type ColorsProps = { color: string; inStock: boolean };
